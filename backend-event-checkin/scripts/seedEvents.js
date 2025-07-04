
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const Event = require("../models/Event");

// dotenv.config();



// const MONGO_URI = process.env.MONGO_URI;
// console.log("MONGO_URI:", MONGO_URI);

// const events = [
//   {
//     name: "Tech Fest 2025",
//     location: "Auditorium",
//     startTime: new Date("2025-07-15T10:00:00Z"),
//   },
//   {
//     name: "Open Mic Night",
//     location: "Cultural Hall",
//     startTime: new Date("2025-07-20T18:00:00Z"),
//   },
//   {
//     name: "Startup Meetup",
//     location: "Conference Room B",
//     startTime: new Date("2025-07-25T14:00:00Z"),
//   },
// ];

// async function seed() {
//   try {
//     await mongoose.connect(MONGO_URI);
//     await Event.deleteMany();
//     await Event.insertMany(events);
//     console.log(" Events seeded successfully!");
//   } catch (error) {
//     console.error(" Error seeding events:", error);
//   } finally {
//     mongoose.disconnect();
//   }
// }

// seed();
