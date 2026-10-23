const express = require('express');
const MenuItem = require('../models/MenuItem');

const router = express.Router();

// Get menu by restaurant
router.get('/:restaurantId', async (req, res) => {
  try {
    const items = await MenuItem.find({
      restaurantId: req.params.restaurantId,
      isAvailable: true
    }).sort({ category: 1, name: 1 });
    
    // Group by category
    const grouped = items.reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {});

    res.json({ items, grouped });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
