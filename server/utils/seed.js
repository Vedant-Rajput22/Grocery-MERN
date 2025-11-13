import Product from '../models/Product.js';

const samples = [
  {
    name: 'Local Organic Tomatoes 1kg',
    description: ['Juicy, seasonal', 'Ideal for salads and sauces'],
    category: 'Vegetables',
    price: 40,
    offerPrice: 35,
    images: ['https://images.unsplash.com/photo-1560807707-8cc77767d783?q=80&w=800&auto=format&fit=crop'],
    tags: ['local', 'organic', 'plastic free'],
  },
  {
    name: 'High Protein Greek Yogurt 400g',
    description: ['Thick and creamy', 'No added sugar'],
    category: 'Dairy',
    price: 80,
    offerPrice: 72,
    images: ['https://images.unsplash.com/photo-1582562124811-c09040d0f1d3?q=80&w=800&auto=format&fit=crop'],
    tags: ['high protein', 'sugar free'],
  },
  {
    name: 'Whole Grain Bread',
    description: ['Freshly baked', 'High fiber'],
    category: 'Bakery',
    price: 60,
    offerPrice: 55,
    images: ['https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=800&auto=format&fit=crop'],
    tags: ['whole grain', 'plastic free'],
  },
  {
    name: 'Cold Pressed Orange Juice 1L',
    description: ['No added sugar', 'Rich in Vitamin C'],
    category: 'Drinks',
    price: 120,
    offerPrice: 110,
    images: ['https://images.unsplash.com/photo-1545908706-3d19f7203db9?q=80&w=800&auto=format&fit=crop'],
    tags: ['sugar free'],
  },
  {
    name: 'Quinoa 500g',
    description: ['High protein grain', 'Gluten free'],
    category: 'Grains',
    price: 140,
    offerPrice: 129,
    images: ['https://images.unsplash.com/photo-1596040033229-5645f1d8a21e?q=80&w=800&auto=format&fit=crop'],
    tags: ['high protein', 'plastic free'],
  },
  {
    name: 'Fresh Apples 1kg',
    description: ['Crisp and juicy', 'Great for snacking'],
    category: 'Fruits',
    price: 120,
    offerPrice: 110,
    images: ['https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?q=80&w=800&auto=format&fit=crop'],
    tags: ['local'],
  },
  {
    name: 'Spinach 250g',
    description: ['Leafy greens', 'Rich in iron'],
    category: 'Vegetables',
    price: 45,
    offerPrice: 39,
    images: ['https://images.unsplash.com/photo-1604908554027-8427f3e6e352?q=80&w=800&auto=format&fit=crop'],
    tags: ['local', 'plastic free'],
  },
  {
    name: 'Dark Chocolate 70% 100g',
    description: ['Intense cocoa', 'Lower sugar'],
    category: 'Instant',
    price: 99,
    offerPrice: 89,
    images: ['https://images.unsplash.com/photo-1612208695882-c7c59b5d6e29?q=80&w=800&auto=format&fit=crop'],
    tags: ['sugar free'],
  },
];

export default async function seedProductsIfEmpty() {
  try {
    const count = await Product.countDocuments();
    if (count > 0) return;
    await Product.insertMany(samples);
    console.log(`Seeded ${samples.length} products.`);
  } catch (err) {
    console.log('Seeding failed:', err.message);
  }
}

