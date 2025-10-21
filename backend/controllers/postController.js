import { validationResult } from 'express-validator';
import Post from '../models/Post.js';
import sanitizeHtml from '../utils/sanitizeHtml.js';
import { getPublicFileUrl } from '../middleware/upload.js';

const buildPagination = (page = 1, limit = 12) => {
  const pageNumber = Number(page) || 1;
  const limitNumber = Number(limit) || 12;

  return {
    page: pageNumber < 1 ? 1 : pageNumber,
    limit: limitNumber > 50 ? 50 : limitNumber
  };
};

export const getPublicPosts = async (req, res) => {
  const { page = 1, limit = 12, category, search, sort = 'publishedAt', order = 'desc' } = req.query;
  const { page: pageNumber, limit: limitNumber } = buildPagination(page, limit);

  const query = { status: 'published' };

  if (category) {
    query.category = category;
  }

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } },
      { excerpt: { $regex: search, $options: 'i' } }
    ];
  }

  const sortOptions = { [sort]: order === 'asc' ? 1 : -1 };

  const [posts, total] = await Promise.all([
    Post.find(query)
      .populate('author', 'name email')
      .sort(sortOptions)
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber),
    Post.countDocuments(query)
  ]);

  return res.json({
    success: true,
    posts,
    total,
    page: pageNumber,
    pages: Math.ceil(total / limitNumber)
  });
};

export const getPostBySlug = async (req, res) => {
  const { slug } = req.params;

  const post = await Post.findOne({ slug, status: 'published' }).populate('author', 'name email');

  if (!post) {
    return res.status(404).json({ success: false, message: 'Articolo non trovato' });
  }

  return res.json({ success: true, post });
};

export const getAdminPosts = async (req, res) => {
  const { page = 1, limit = 12, status } = req.query;
  const { page: pageNumber, limit: limitNumber } = buildPagination(page, limit);

  const query = {};

  if (status) {
    query.status = status;
  }

  const [posts, total] = await Promise.all([
    Post.find(query)
      .populate('author', 'name email')
      .sort({ createdAt: -1 })
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber),
    Post.countDocuments(query)
  ]);

  return res.json({
    success: true,
    posts,
    total,
    page: pageNumber,
    pages: Math.ceil(total / limitNumber)
  });
};

export const getAdminPostById = async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id).populate('author', 'name email');

  if (!post) {
    return res.status(404).json({ success: false, message: 'Articolo non trovato' });
  }

  return res.json({ success: true, post });
};

export const createPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: 'Dati non validi',
      errors: errors.array()
    });
  }

  const {
    title,
    slug,
    content,
    excerpt,
    featuredImage,
    category,
    tags,
    status,
    seo
  } = req.body;

  const sanitizedContent = sanitizeHtml(content);

  const post = await Post.create({
    title,
    slug,
    content: sanitizedContent,
    excerpt,
    featuredImage,
    category,
    tags,
    status,
    seo,
    author: req.user._id,
    publishedAt: status === 'published' ? new Date() : undefined
  });

  return res.status(201).json({ success: true, post });
};

export const updatePost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: 'Dati non validi',
      errors: errors.array()
    });
  }

  const { id } = req.params;
  const updates = { ...req.body };

  if (updates.content) {
    updates.content = sanitizeHtml(updates.content);
  }

  if (updates.status === 'published') {
    updates.publishedAt = updates.publishedAt || new Date();
  }

  const post = await Post.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true
  });

  if (!post) {
    return res.status(404).json({ success: false, message: 'Articolo non trovato' });
  }

  return res.json({ success: true, post });
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  const post = await Post.findByIdAndDelete(id);

  if (!post) {
    return res.status(404).json({ success: false, message: 'Articolo non trovato' });
  }

  return res.json({ success: true, message: 'Articolo eliminato' });
};

export const uploadFeaturedImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'Nessun file caricato' });
  }

  const fileUrl = getPublicFileUrl(req, req.file.filename);

  return res.status(201).json({
    success: true,
    file: {
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
      url: fileUrl
    }
  });
};
