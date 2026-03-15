const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {tls:true});
    console.log(`Database connected at ${conn.connection.host}`);
  } catch (err) {
    console.error(`Database failed to connect: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;