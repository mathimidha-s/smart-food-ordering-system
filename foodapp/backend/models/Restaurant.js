const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cuisine: [{ type: String }],
  address: { type: String, required: true },
  area: { type: String, required: true },
  city: { type: String, default: 'Thanjavur' },
  rating: { type: Number, default: 4.0, min: 1, max: 5 },
  reviewCount: { type: Number, default: 0 },
  deliveryTime: { type: String, default: '30-45 min' },
  deliveryFee: { type: Number, default: 30 },
  minOrder: { type: Number, default: 100 },
  imageUrl: { type: String, default: '' },
  isOpen: { type: Boolean, default: true },
  tags: [{ type: String }],
  offers: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Restaurant', restaurantSchema);
