import mongoose from 'mongoose';

const redactMongoUri = (uri = '') => uri.replace(/(:\/\/[^:]+):[^@]+@/, '$1:***@');

const logConnectionHints = (error) => {
  if (!error || !error.message) {
    return;
  }

  const message = error.message.toLowerCase();

  if (message.includes('authentication')) {
    console.error('\n💡 Verifica username/password nel file .env');
  } else if (message.includes('enotfound')) {
    console.error('\n💡 Verifica il nome del cluster e la sezione Network Access su MongoDB Atlas');
  } else if (message.includes('timed out')) {
    console.error('\n💡 Controlla la connessione di rete o aumenta serverSelectionTimeoutMS');
  } else if (message.includes('ip') || message.includes('whitelist')) {
    console.error('\n💡 Aggiungi il tuo IP alla whitelist su MongoDB Atlas (0.0.0.0/0 per sviluppo)');
  }
};

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.error('❌ MONGO_URI is not defined in environment variables');
    process.exit(1);
  }

  if (!mongoUri.includes('.net/') || mongoUri.split('.net/')[1].startsWith('?')) {
    console.error('❌ Database name missing in MONGO_URI');
    console.error('   Format: mongodb+srv://<user>:<password>@cluster.mongodb.net/DATABASE?options');
    process.exit(1);
  }

  const options = {
    serverSelectionTimeoutMS: Number(process.env.MONGO_TIMEOUT ?? 10000),
    socketTimeoutMS: Number(process.env.MONGO_SOCKET_TIMEOUT ?? 45000)
  };

  console.log('🚀 Attempting MongoDB connection');
  console.log(`🔐 URI (masked): ${redactMongoUri(mongoUri)}`);
  console.log(`⚙️  Options: ${JSON.stringify(options)}`);

  mongoose.set('strictQuery', false);

  try {
    const conn = await mongoose.connect(mongoUri, options);

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    console.log(`📚 Database: ${conn.connection.name}`);

    if ((process.env.NODE_ENV || 'development').toLowerCase() === 'development') {
      mongoose.set('debug', true);
      console.log('🪵 Mongoose debug mode attivo (NODE_ENV=development)');
    }

    return conn;
  } catch (error) {
    console.error(`❌ MongoDB connection error (${error.name}): ${error.message}`);
    if (error.code) {
      console.error(`   Codice errore: ${error.code}`);
    }
    if (error.reason) {
      console.error('   Reason:', error.reason);
    }
    logConnectionHints(error);
    process.exit(1);
  }
};

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️  MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB error:', err);
});

export default connectDB;