require('dotenv').config();
const express   = require('express');
const cors      = require('cors');
const connectDB = require('./config/db');

const productRoutes = require('./routes/productRoutes');
const userRoutes    = require('./routes/userRoutes');

// Inspect exports
console.log('productRoutes is:', typeof productRoutes);
console.log('userRoutes    is:', typeof userRoutes);

connectDB();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/users',    userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
