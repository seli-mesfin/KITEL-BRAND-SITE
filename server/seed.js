import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/kitel';

const products = [
  {
    name: 'Kitel Ceramic Mug',
    description: 'Premium quality 11oz ceramic mug with the official Kitel logo. Perfect for your morning coffee or tea.',
    category: 'drinkware',
    image: '/merchandise/mug.png',
    price: 15.00,
    featured: true,
    order: 1
  },
  {
    name: 'Corporate Polo Shirt',
    description: 'Comfortable, breathable cotton-blend polo shirt featuring the Kitel leaf logo embroidered on the chest.',
    category: 'apparel',
    image: '/merchandise/polo.png',
    price: 35.00,
    featured: true,
    order: 2
  },
  {
    name: 'Stainless Steel Water Bottle',
    description: 'Eco-friendly, double-wall insulated water bottle. Keeps drinks cold for 24 hours or hot for 12 hours.',
    category: 'drinkware',
    image: '/merchandise/bottle.png',
    price: 25.00,
    featured: true,
    order: 3
  },
  {
    name: 'Executive Pen',
    description: 'Smooth-writing ballpoint pen with a sleek metallic finish and subtle Kitel branding.',
    category: 'stationery',
    image: '/merchandise/pen.png',
    price: 8.00,
    featured: false,
    order: 4
  },
  {
    name: 'Premium Leather Notebook',
    description: 'A5 size, high-quality ruled pages bound in dark green faux leather with the Kitel emblem embossed.',
    category: 'stationery',
    image: '/merchandise/notebook.png',
    price: 20.00,
    featured: true,
    order: 5
  },
  {
    name: 'Kitel Baseball Cap',
    description: 'Adjustable, comfortable cap with a structured fit and embroidered logo.',
    category: 'apparel',
    image: '/merchandise/cap.png',
    price: 18.00,
    featured: false,
    order: 6
  },
  {
    name: 'Branded Key Chain',
    description: 'Durable metal keychain featuring the Kitel leaf emblem in enamel.',
    category: 'accessories',
    image: '/merchandise/keychain.png',
    price: 5.00,
    featured: false,
    order: 7
  },
  {
    name: 'Company Fleet Van',
    description: 'Official Kitel company service and delivery van decal design.',
    category: 'branding',
    image: '/merchandise/van.png',
    price: 0,
    featured: true,
    order: 8
  },
  {
    name: 'Outdoor Signage',
    description: 'Corporate office outdoor sign displaying the Kitel identity.',
    category: 'branding',
    image: '/merchandise/signage.png',
    price: 0,
    featured: false,
    order: 9
  }
];

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB. Seeding database...');
    
    // Clear existing products
    await Product.deleteMany({});
    
    // Insert new products
    await Product.insertMany(products);
    
    console.log('Database seeded successfully!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Failed to seed database', err);
    process.exit(1);
  });
