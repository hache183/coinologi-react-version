import 'dotenv/config';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const maskMongoUri = (uri = '') => uri.replace(/(:\/\/[^:]+):[^@]+@/, '$1:***@');

const logEnvDiagnostics = () => {
  const envPath = path.join(__dirname, '.env');

  console.log('ℹ️  test-connection diagnostics');
  console.log(`   Working directory: ${__dirname}`);
  console.log(`   Expected .env path: ${envPath}`);
  console.log(`   NODE_ENV: ${process.env.NODE_ENV ?? 'not set'}`);
  console.log(`   MONGO_URI present: ${process.env.MONGO_URI ? 'yes' : 'no'}`);
};

const run = async () => {
  logEnvDiagnostics();

  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.error('❌ Missing MONGO_URI. Verifica il file backend/.env.');
    process.exit(1);
  }

  const options = {
    serverSelectionTimeoutMS: Number(process.env.MONGO_TIMEOUT ?? 10000),
    socketTimeoutMS: Number(process.env.MONGO_SOCKET_TIMEOUT ?? 45000)
  };

  console.log(`🔐 MongoDB URI (masked): ${maskMongoUri(mongoUri)}`);
  console.log(`⚙️  Options: ${JSON.stringify(options)}`);

  try {
    const connection = await mongoose.connect(mongoUri, options);
    console.log(`✅ Connected to host: ${connection.connection.host}`);
    console.log(`📚 Database: ${connection.connection.name}`);
    console.log(`📶 readyState: ${connection.connection.readyState}`);

    await mongoose.disconnect();
    console.log('👋 Connection closed cleanly.');
    process.exit(0);
  } catch (error) {
    console.error(`❌ Connection error (${error.name}): ${error.message}`);
    if (error.code) {
      console.error(`   Codice errore: ${error.code}`);
    }
    if (error.reason) {
      console.error('   Reason:', error.reason);
    }
    if (error.stack) {
      console.error('   Stack snippet:', error.stack.split('\n').slice(0, 4).join('\n'));
    }

    try {
      await mongoose.connection.close();
    } catch (closeError) {
      console.error('   Unable to close mongoose connection cleanly:', closeError);
    }

    process.exit(1);
  }
};

run();
