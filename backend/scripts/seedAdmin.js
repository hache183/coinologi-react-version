import 'dotenv/config';
import mongoose from 'mongoose';
import User from '../models/User.js';
import connectDB from '../config/db.js';

const {
  ADMIN_NAME = 'Admin User',
  ADMIN_EMAIL,
  ADMIN_PASSWORD
} = process.env;

const exitWithError = (message, error) => {
  console.error(message);
  if (error) {
    console.error(error);
  }
  process.exit(1);
};

if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  exitWithError('ADMIN_EMAIL and ADMIN_PASSWORD environment variables are required to seed an admin user.');
}

const seedAdmin = async () => {
  try {
    await connectDB();

    const existing = await User.findOne({ email: ADMIN_EMAIL });

    if (existing) {
      console.log(`Admin user already exists with email ${ADMIN_EMAIL}`);
      await mongoose.connection.close();
      process.exit(0);
    }

    await User.create({
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      role: 'admin'
    });

    console.log('Admin user created successfully.');
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    await mongoose.connection.close();
    exitWithError('Failed to seed admin user.', error);
  }
};

seedAdmin();
