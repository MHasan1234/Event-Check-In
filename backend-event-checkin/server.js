const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { Server } = require('socket.io');

// const Event = require("../models/Event"); // adjust path if needed


dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});


app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes(io));


require('./socket/socketHandler')(io);

// const seedEvents = async () => {
//   const existing = await Event.find({});
//   if (existing.length === 0) {
//     const events = [
//       {
//         name: "Tech Fest 2025",
//         location: "Auditorium",
//         startTime: new Date("2025-07-15T10:00:00Z"),
//       },
//       {
//         name: "Open Mic Night",
//         location: "Cultural Hall",
//         startTime: new Date("2025-07-20T18:00:00Z"),
//       },
//       {
//         name: "Startup Meetup",
//         location: "Conference Room B",
//         startTime: new Date("2025-07-25T14:00:00Z"),
//       },
//     ];
//     await Event.insertMany(events);
//     console.log("✅ Seeded events to DB");
//   } else {
//     console.log("⚠️ Events already exist. Skipping seeding.");
//   }
// };


mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log(' MongoDB connected');
    // await seedEvents();
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
      console.log(` Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error(' DB connection error:', err));
