const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) res.json(product);
  else {
    res.status(404);
    throw new Error('Product not found');
  }
});

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample Gadget',
    brand: 'BrandX',
    model: 'ModelY',
    price: 0,
    specs: [],
    warranty: '1 year',
    description: 'Sample description',
    image: '/images/sample.jpg',
    countInStock: 0
  });
  const created = await product.save();
  res.status(201).json(created);
});

const updateProduct = asyncHandler(async (req, res) => {
  const fields = ['name','brand','model','price','specs','warranty','description','image','countInStock'];
  const product = await Product.findById(req.params.id);
  if (product) {
    fields.forEach(f => { if (req.body[f] !== undefined) product[f] = req.body[f]; });
    const updated = await product.save();
    res.json(updated);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };