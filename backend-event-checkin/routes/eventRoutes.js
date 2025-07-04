const express = require('express');
const { getAllEvents,getEventById, joinEvent } = require('../controllers/eventController');
const authenticateToken = require("../middlewares/authMiddleware");

const router = express.Router();

module.exports = (io) => {
  router.get('/', getAllEvents);
  router.get('/:id', getEventById);
  router.post('/join/:id', authenticateToken,   (req, res) => joinEvent(io)(req, res));
  return router;
};
