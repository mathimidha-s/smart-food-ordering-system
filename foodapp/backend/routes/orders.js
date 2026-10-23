const express = require('express');
const Order = require('../models/Order');
const auth = require('../middleware/auth');

const router = express.Router();

// Place order
router.post('/', auth, async (req, res) => {
  try {
    const { restaurantId, restaurantName, items, subtotal, deliveryFee, taxes, totalAmount, deliveryAddress, paymentMethod, specialInstructions } = req.body;

    const estimatedDelivery = new Date(Date.now() + 45 * 60 * 1000); // 45 mins

    const order = new Order({
      userId: req.user._id,
      restaurantId,
      restaurantName,
      items,
      subtotal,
      deliveryFee,
      taxes,
      totalAmount,
      deliveryAddress,
      paymentMethod,
      specialInstructions,
      estimatedDelivery,
      statusHistory: [{ status: 'placed', message: 'Order placed successfully!' }]
    });

    await order.save();

    // Simulate auto status progression
    simulateOrderProgress(order._id);

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get user orders
router.get('/my-orders', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get single order
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, userId: req.user._id });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Cancel order
router.put('/:id/cancel', auth, async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, userId: req.user._id });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (!['placed', 'confirmed'].includes(order.status))
      return res.status(400).json({ message: 'Order cannot be cancelled at this stage' });

    order.status = 'cancelled';
    order.statusHistory.push({ status: 'cancelled', message: 'Order cancelled by customer' });
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Simulate order progress (demo purposes)
function simulateOrderProgress(orderId) {
  const steps = [
    { status: 'confirmed', message: 'Restaurant confirmed your order!', delay: 30000 },
    { status: 'preparing', message: 'Chef is preparing your food 👨‍🍳', delay: 90000 },
    { status: 'out_for_delivery', message: 'Your order is on the way! 🛵', delay: 180000 },
    { status: 'delivered', message: 'Order delivered! Enjoy your meal 😋', delay: 300000 }
  ];

  steps.forEach(({ status, message, delay }) => {
    setTimeout(async () => {
      try {
        const order = await Order.findById(orderId);
        if (order && order.status !== 'cancelled') {
          order.status = status;
          order.statusHistory.push({ status, message });
          if (status === 'delivered') order.paymentStatus = 'paid';
          await order.save();
        }
      } catch (err) { /* silent */ }
    }, delay);
  });
}

module.exports = router;
