// backend/seeder.js
require('dotenv').config();
const mongoose      = require('mongoose');
const connectDB     = require('./config/db');
const Product       = require('./models/Product');
const sampleProducts = require('./data/products');

const importData = async () => {
  try {
    await connectDB();
    await Product.deleteMany();           // Clear existing
    await Product.insertMany(sampleProducts);
    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error('Error importing data:', error);
    process.exit(1);
  }
};

importData();
