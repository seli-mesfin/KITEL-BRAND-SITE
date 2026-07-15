import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// Fallback data if DB is down
const fallbackProducts = [
  { _id: '1', name: 'Kitel Ceramic Mug', description: 'Premium quality 11oz ceramic mug with the official Kitel logo. Perfect for your morning coffee or tea.', category: 'drinkware', image: '/merchandise/mug.png', price: 15.00 },
  { _id: '2', name: 'Corporate Polo Shirt', description: 'Comfortable, breathable cotton-blend polo shirt featuring the Kitel leaf logo embroidered on the chest.', category: 'apparel', image: '/merchandise/polo.png', price: 35.00 },
  { _id: '3', name: 'Stainless Steel Water Bottle', description: 'Eco-friendly, double-wall insulated water bottle. Keeps drinks cold for 24 hours or hot for 12 hours.', category: 'drinkware', image: '/merchandise/bottle.png', price: 25.00 },
  { _id: '4', name: 'Executive Pen', description: 'Smooth-writing ballpoint pen with a sleek metallic finish and subtle Kitel branding.', category: 'stationery', image: '/merchandise/pen.png', price: 8.00 },
  { _id: '5', name: 'Premium Leather Notebook', description: 'A5 size, high-quality ruled pages bound in dark green faux leather with the Kitel emblem embossed.', category: 'stationery', image: '/merchandise/notebook.png', price: 20.00 },
  { _id: '6', name: 'Kitel Baseball Cap', description: 'Adjustable, comfortable cap with a structured fit and embroidered logo.', category: 'apparel', image: '/merchandise/cap.png', price: 18.00 },
  { _id: '7', name: 'Branded Key Chain', description: 'Durable metal keychain featuring the Kitel leaf emblem in enamel.', category: 'accessories', image: '/merchandise/keychain.png', price: 5.00 },
  { _id: '8', name: 'Company Fleet Van', description: 'Official Kitel company service and delivery van decal design.', category: 'branding', image: '/merchandise/van.png', price: 0 },
  { _id: '9', name: 'Outdoor Signage', description: 'Corporate office outdoor sign displaying the Kitel identity.', category: 'branding', image: '/merchandise/signage.png', price: 0 }
];

// GET /api/products — list all products, optionally filter by category
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) {
      filter.category = req.query.category;
    }
    if (req.query.featured === 'true') {
      filter.featured = true;
    }
    const products = await Product.find(filter).sort({ order: 1 });
    res.json(products);
  } catch (err) {
    console.warn('Database error, sending fallback products.', err.message);
    res.json(fallbackProducts);
  }
});

// GET /api/products/:id — single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

export default router;
