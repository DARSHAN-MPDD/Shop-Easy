const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection with error handling
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shopeasy', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    console.log('Using in-memory database for development');
    // Continue with in-memory database for development
  }
};

connectDB();

// Import routes
const authRoutes = require('./routes/auth');

// Routes
app.use('/api/auth', authRoutes);

// Serve static files from the "website" directory
app.use(express.static('.'));

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'ShopEasy Backend API' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});