const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const port = 5000;
const secretKey = 'swarnajit01'; 

app.use(cors());
app.use(cors({ origin: 'https://e-commerce-hosting-x12r.vercel.app/', 
              methods: ['GET', 'POST', 'PUT', 'DELETE'], 
              credentials: true
}));

app.use(express.json());

mongoose.connect('mongodb+srv://swarnajit:aMF9PuWr9YgcTQA9@cluster0.94qfb.mongodb.net/Ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const user01 = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] // Add cart field
});

const User = mongoose.model('User', user01);

const product01 = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    stock: Number,
    imageUrl: String,  
});

const Product = mongoose.model('Product', product01);

// Authentication routes
app.post('/register', async (req, res) => {
  const { name, username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, username, email, password: hashedPassword });
  await newUser.save();
  res.status(201).json(newUser);
});

app.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' });
    res.json({ message: 'Sign-in successful', token });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

// Product management routes
app.get('/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.get('/products/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});

app.post('/products', authenticateToken, async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.status(201).json(newProduct);
});

app.put('/products/:id', authenticateToken, async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedProduct);
});

app.delete('/products/:id', authenticateToken, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// Add a root route
app.get('/', (req, res) => {
  res.send('Welcome to the Ecommerce API');
});

function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Retrieve the user's shopping cart
app.get('/cart', authenticateToken, async (req, res) => {
  const user = await User.findById(req.user.id).populate('cart');
  res.json(user.cart);
});

// Add an item to the cart
app.post('/cart', authenticateToken, async (req, res) => {
  const { productId } = req.body;
  const user = await User.findById(req.user.id);
  user.cart.push(productId);
  await user.save();
  res.status(201).json(user.cart);
});

// Remove an item from the cart
app.delete('/cart/:id', authenticateToken, async (req, res) => {
  const user = await User.findById(req.user.id);
  user.cart = user.cart.filter(item => item.toString() !== req.params.id);
  await user.save();
  res.status(204).send();
});

const order01 = new mongoose.Schema({
  username: String,
  email: String,
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: Number,
  orderDate: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', order01);

// Order routes
app.post('/orders', authenticateToken, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const user = await User.findById(req.user.id);
    const newOrder = new Order({
      username: user.username,
      email: user.email,
      productId,
      quantity
    });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Failed to place order' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

module.exports = app;
