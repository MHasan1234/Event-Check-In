const express = require('express');
const { getAllEvents, joinEvent } = require('../controllers/eventController');

const router = express.Router();

module.exports = (io) => {
  router.get('/', getAllEvents);
  router.post('/join/:id', joinEvent(io));
  return router;
};
