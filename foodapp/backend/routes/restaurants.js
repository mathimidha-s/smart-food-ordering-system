const express = require('express');
const Restaurant = require('../models/Restaurant');

const router = express.Router();

// Get all restaurants
router.get('/', async (req, res) => {
  try {
    const { search, cuisine, area } = req.query;
    let filter = { city: 'Thanjavur' };
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { cuisine: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    if (cuisine) filter.cuisine = { $in: [new RegExp(cuisine, 'i')] };
    if (area) filter.area = { $regex: area, $options: 'i' };

    const restaurants = await Restaurant.find(filter).sort({ rating: -1 });
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get single restaurant
router.get('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
    res.json(restaurant);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
