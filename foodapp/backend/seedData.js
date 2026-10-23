const Restaurant = require('./models/Restaurant');
const MenuItem = require('./models/MenuItem');

const restaurants = [
  {
    name: 'Sathars Hotel',
    cuisine: ['South Indian', 'Biryani'],
    address: '12, Gandhiji Road, Thanjavur',
    area: 'Gandhiji Road',
    rating: 4.5,
    reviewCount: 1240,
    deliveryTime: '30-40 min',
    deliveryFee: 25,
    minOrder: 100,
    imageUrl: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=400',
    tags: ['Popular', 'Must Try'],
    offers: '20% off on first order'
  },
  {
    name: 'Vasantha Bhavan',
    cuisine: ['South Indian', 'Tiffin'],
    address: '45, Medical College Road, Thanjavur',
    area: 'Medical College Road',
    rating: 4.3,
    reviewCount: 890,
    deliveryTime: '25-35 min',
    deliveryFee: 20,
    minOrder: 80,
    imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400',
    tags: ['Veg Only', 'Budget Friendly'],
    offers: 'Free delivery above ₹200'
  },
  {
    name: 'Tanjore Biryani House',
    cuisine: ['Biryani', 'Mughlai', 'Non-Veg'],
    address: '88, Punnainallur Road, Thanjavur',
    area: 'Punnainallur',
    rating: 4.6,
    reviewCount: 2150,
    deliveryTime: '35-50 min',
    deliveryFee: 30,
    minOrder: 150,
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400',
    tags: ['Best Biryani', 'Trending'],
    offers: 'Buy 2 get 10% off'
  },
  {
    name: 'Sri Murugan Mess',
    cuisine: ['Chettinad', 'South Indian'],
    address: '23, Nallur Road, Thanjavur',
    area: 'Nallur',
    rating: 4.4,
    reviewCount: 670,
    deliveryTime: '20-30 min',
    deliveryFee: 20,
    minOrder: 100,
    imageUrl: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400',
    tags: ['Chettinad Specials', 'Spicy'],
    offers: ''
  },
  {
    name: 'Royal Cafe & Bakery',
    cuisine: ['Bakery', 'Snacks', 'Chinese'],
    address: '5, Kumbakonam Road, Thanjavur',
    area: 'Kumbakonam Road',
    rating: 4.2,
    reviewCount: 450,
    deliveryTime: '20-30 min',
    deliveryFee: 15,
    minOrder: 50,
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
    tags: ['Snacks', 'Fast Food'],
    offers: '15% off on weekends'
  },
  {
    name: 'Chola Grand Restaurant',
    cuisine: ['Multi-Cuisine', 'North Indian', 'South Indian'],
    address: '100, Hospital Road, Thanjavur',
    area: 'Hospital Road',
    rating: 4.7,
    reviewCount: 3200,
    deliveryTime: '40-55 min',
    deliveryFee: 40,
    minOrder: 200,
    imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400',
    tags: ['Fine Dining', 'Family'],
    offers: 'Complimentary dessert above ₹500'
  }
];

const menuItemsByRestaurant = [
  // Sathars Hotel items
  [
    { name: 'Mutton Biryani', description: 'Fragrant basmati rice cooked with tender mutton and aromatic spices', price: 180, category: 'Biryani', isVeg: false, spiceLevel: 'hot', rating: 4.8 },
    { name: 'Chicken Biryani', description: 'Classic Tanjore-style chicken biryani with seeraga samba rice', price: 150, category: 'Biryani', isVeg: false, spiceLevel: 'medium', rating: 4.7 },
    { name: 'Egg Biryani', description: 'Fluffy eggs layered with fragrant rice and spices', price: 100, category: 'Biryani', isVeg: false, spiceLevel: 'medium', rating: 4.4 },
    { name: 'Veg Biryani', description: 'Mixed vegetables cooked with basmati rice and whole spices', price: 90, category: 'Biryani', isVeg: true, spiceLevel: 'mild', rating: 4.2 },
    { name: 'Mutton Chukka', description: 'Dry-fried mutton with fresh coconut and curry leaves', price: 220, category: 'Starters', isVeg: false, spiceLevel: 'extra-hot', rating: 4.9 },
    { name: 'Chicken 65', description: 'Crispy deep-fried chicken with spices and yogurt marinade', price: 160, category: 'Starters', isVeg: false, spiceLevel: 'hot', rating: 4.6 },
    { name: 'Parotta + Salna', description: 'Flaky layered parotta served with rich mutton salna', price: 80, category: 'Main Course', isVeg: false, spiceLevel: 'medium', rating: 4.5 },
    { name: 'Raita', description: 'Cooling yogurt with cucumber and carrots', price: 30, category: 'Sides', isVeg: true, spiceLevel: 'mild', rating: 4.0 }
  ],
  // Vasantha Bhavan items
  [
    { name: 'Idli (4 pcs)', description: 'Soft steamed rice cakes with sambar and chutneys', price: 50, category: 'Tiffin', isVeg: true, spiceLevel: 'mild', rating: 4.5 },
    { name: 'Masala Dosa', description: 'Crispy dosa with spiced potato filling and chutneys', price: 70, category: 'Tiffin', isVeg: true, spiceLevel: 'mild', rating: 4.7 },
    { name: 'Pongal', description: 'Creamy rice-lentil porridge with pepper and ginger', price: 60, category: 'Tiffin', isVeg: true, spiceLevel: 'mild', rating: 4.4 },
    { name: 'Poori + Kurma', description: 'Deep-fried poori with vegetable kurma', price: 75, category: 'Tiffin', isVeg: true, spiceLevel: 'mild', rating: 4.3 },
    { name: 'Veg Meals', description: 'Full South Indian meals with rice, sambar, rasam, kootu, and more', price: 110, category: 'Meals', isVeg: true, spiceLevel: 'medium', rating: 4.6 },
    { name: 'Curd Rice', description: 'Cooling rice mixed with fresh curd and tempering', price: 60, category: 'Meals', isVeg: true, spiceLevel: 'mild', rating: 4.2 },
    { name: 'Filter Coffee', description: 'Traditional South Indian filter coffee in a dabara set', price: 25, category: 'Beverages', isVeg: true, spiceLevel: 'mild', rating: 4.8 }
  ],
  // Tanjore Biryani House items
  [
    { name: 'Tanjore Special Biryani', description: 'Our signature biryani made with seeraga samba rice and secret spice blend', price: 220, category: 'Biryani', isVeg: false, spiceLevel: 'hot', rating: 4.9 },
    { name: 'Chicken Dum Biryani', description: 'Slow-cooked chicken biryani sealed with dough for perfect dum', price: 180, category: 'Biryani', isVeg: false, spiceLevel: 'medium', rating: 4.8 },
    { name: 'Fish Biryani', description: 'Fresh local fish cooked with aromatic basmati and spices', price: 200, category: 'Biryani', isVeg: false, spiceLevel: 'hot', rating: 4.6 },
    { name: 'Prawn Biryani', description: 'Succulent prawns layered with fragrant seeraga samba rice', price: 250, category: 'Biryani', isVeg: false, spiceLevel: 'hot', rating: 4.7 },
    { name: 'Seekh Kebab', description: 'Minced meat kebabs grilled over charcoal with mint chutney', price: 180, category: 'Starters', isVeg: false, spiceLevel: 'medium', rating: 4.5 },
    { name: 'Chicken Lollipop', description: 'Indo-Chinese style crispy chicken lollipops in spicy sauce', price: 160, category: 'Starters', isVeg: false, spiceLevel: 'hot', rating: 4.4 },
    { name: 'Mutton Rogan Josh', description: 'Kashmiri-style slow-cooked mutton in rich red gravy', price: 260, category: 'Curries', isVeg: false, spiceLevel: 'hot', rating: 4.6 },
    { name: 'Butter Naan', description: 'Soft leavened bread baked in tandoor with butter', price: 40, category: 'Breads', isVeg: true, spiceLevel: 'mild', rating: 4.3 }
  ],
  // Sri Murugan Mess items
  [
    { name: 'Chettinad Chicken Curry', description: 'Authentic Chettinad spice blend with tender chicken pieces', price: 180, category: 'Curries', isVeg: false, spiceLevel: 'extra-hot', rating: 4.9 },
    { name: 'Kuzhi Paniyaram', description: 'Crispy outside, soft inside rice dumplings with chutneys', price: 70, category: 'Tiffin', isVeg: true, spiceLevel: 'mild', rating: 4.6 },
    { name: 'Kavuni Arisi Payasam', description: 'Traditional black rice pudding sweetened with jaggery', price: 80, category: 'Desserts', isVeg: true, spiceLevel: 'mild', rating: 4.7 },
    { name: 'Non-Veg Meals', description: 'Full Chettinad meals with rice, sambar, kootu, fry and chicken curry', price: 160, category: 'Meals', isVeg: false, spiceLevel: 'hot', rating: 4.8 },
    { name: 'Mutton Kola Urundai', description: 'Deep-fried mutton balls with Chettinad spices', price: 200, category: 'Starters', isVeg: false, spiceLevel: 'hot', rating: 4.7 },
    { name: 'Vethal Kuzhambu', description: 'Tangy tamarind curry with sun-dried berries', price: 90, category: 'Curries', isVeg: true, spiceLevel: 'medium', rating: 4.4 }
  ],
  // Royal Cafe items
  [
    { name: 'Samosa (2 pcs)', description: 'Crispy pastry filled with spiced potatoes and peas', price: 30, category: 'Snacks', isVeg: true, spiceLevel: 'mild', rating: 4.3 },
    { name: 'Veg Puff', description: 'Flaky pastry with mixed vegetable filling', price: 25, category: 'Snacks', isVeg: true, spiceLevel: 'mild', rating: 4.1 },
    { name: 'Fried Rice', description: 'Wok-tossed rice with vegetables and soy sauce', price: 100, category: 'Chinese', isVeg: true, spiceLevel: 'mild', rating: 4.2 },
    { name: 'Gobi Manchurian', description: 'Crispy cauliflower in Indo-Chinese spicy sauce', price: 120, category: 'Chinese', isVeg: true, spiceLevel: 'hot', rating: 4.5 },
    { name: 'Cold Coffee', description: 'Chilled coffee blended with milk and ice cream', price: 80, category: 'Beverages', isVeg: true, spiceLevel: 'mild', rating: 4.6 },
    { name: 'Chocolate Cake (slice)', description: 'Rich moist chocolate cake with ganache frosting', price: 70, category: 'Desserts', isVeg: true, spiceLevel: 'mild', rating: 4.7 }
  ],
  // Chola Grand items
  [
    { name: 'Paneer Butter Masala', description: 'Creamy tomato-based curry with soft paneer cubes', price: 200, category: 'North Indian', isVeg: true, spiceLevel: 'mild', rating: 4.6 },
    { name: 'Dal Makhani', description: 'Black lentils slow-cooked overnight with butter and cream', price: 180, category: 'North Indian', isVeg: true, spiceLevel: 'mild', rating: 4.7 },
    { name: 'Grilled Fish', description: 'Fresh catch marinated and grilled with herbs and lemon', price: 320, category: 'Grills', isVeg: false, spiceLevel: 'medium', rating: 4.8 },
    { name: 'Chicken Tikka', description: 'Tender chicken chunks marinated in yogurt and charcoal grilled', price: 280, category: 'Grills', isVeg: false, spiceLevel: 'medium', rating: 4.7 },
    { name: 'Gulab Jamun (2 pcs)', description: 'Soft milk-solid dumplings soaked in rose-flavored sugar syrup', price: 80, category: 'Desserts', isVeg: true, spiceLevel: 'mild', rating: 4.5 },
    { name: 'Tandoori Roti', description: 'Whole wheat bread baked in clay oven', price: 35, category: 'Breads', isVeg: true, spiceLevel: 'mild', rating: 4.2 },
    { name: 'Fresh Lime Soda', description: 'Refreshing lime with soda, sweet or salted', price: 60, category: 'Beverages', isVeg: true, spiceLevel: 'mild', rating: 4.4 }
  ]
];

async function seedData() {
  try {
    const restaurantCount = await Restaurant.countDocuments();
    if (restaurantCount > 0) {
      console.log('Data already seeded, skipping...');
      return;
    }

    console.log('Seeding restaurants and menu items...');

    for (let i = 0; i < restaurants.length; i++) {
      const restaurant = await Restaurant.create(restaurants[i]);
      const items = menuItemsByRestaurant[i].map(item => ({
        ...item,
        restaurantId: restaurant._id
      }));
      await MenuItem.insertMany(items);
      console.log(`Seeded: ${restaurant.name} with ${items.length} menu items`);
    }

    console.log('Seeding complete!');
  } catch (err) {
    console.error('Seeding error:', err.message);
  }
}

module.exports = { seedData };
