const Event = require('../models/Event');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const getAllEvents = async (req, res) => {
  const events = await Event.find().populate('attendees', 'name email');
  res.json(events);
};
// controllers/eventController.js
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('attendees', 'name email');
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json({ event, attendees: event.attendees });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
const joinEvent = (io) => async (req, res) => {
  const eventId = req.params.id;
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token missing' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    if (!event.attendees.includes(user._id)) {
      event.attendees.push(user._id);
      user.joinedEvents.push(event._id);
      await event.save();
      await user.save();
    }

    const updatedEvent = await Event.findById(eventId).populate('attendees', 'name');

    //  Emit real-time update
    io.emit('eventUpdated', { eventId, attendees: updatedEvent.attendees });

    res.json({ message: 'Joined event successfully', attendees: updatedEvent.attendees });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = {
  getAllEvents,getEventById,
  joinEvent,
};
