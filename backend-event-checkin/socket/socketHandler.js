const Event = require('../models/Event'); // 

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(' Client connected:', socket.id);

    
    socket.on('join-room', async ({ eventId }) => {
      socket.join(eventId);
      console.log(` Client joined event room: ${eventId}`);

      try {
        const event = await Event.findById(eventId).populate('attendees', 'name email');
        io.to(eventId).emit('attendee-update', event.attendees); 
      } catch (err) {
        console.error(' Error fetching event for socket:', err.message);
      }
    });

    socket.on('disconnect', () => {
      console.log(' Client disconnected:', socket.id);
      
    });
  });
};
