import mongoose from 'mongoose';
import slugify from 'slugify';

const seoSchema = new mongoose.Schema(
  {
    metaTitle: { type: String, trim: true },
    metaDescription: { type: String, trim: true },
    keywords: [{ type: String, trim: true }]
  },
  { _id: false }
);

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    content: {
      type: String,
      required: true
    },
    excerpt: {
      type: String,
      trim: true
    },
    featuredImage: {
      type: String,
      trim: true
    },
    category: {
      type: String,
      trim: true
    },
    tags: [{
      type: String,
      trim: true
    }],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft'
    },
    publishedAt: {
      type: Date
    },
    seo: seoSchema
  },
  {
    timestamps: true
  }
);

postSchema.pre('validate', function handleSlug(next) {
  if (!this.slug && this.title) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true
    });
  }

  if (!this.slug) {
    return next(new Error('Slug generation failed'));
  }

  this.slug = slugify(this.slug, {
    lower: true,
    strict: true
  });

  next();
});

const Post = mongoose.model('Post', postSchema);

export default Post;
