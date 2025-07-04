# 📲 Real-Time Event Check-In App

A full-stack MERN application that allows users to view upcoming events and check in to them. Attendee updates happen in real time using Socket.io.

---

## 🚀 Tech Stack

| Layer        | Tech                     |
|--------------|--------------------------|
| Frontend     | React + Vite + Bootstrap |
| Backend      | Node.js, Express         |
| Realtime     | Socket.io                |
| Database     | MongoDB + Mongoose       |
| Auth         | JWT                      |
| State Mgmt   | React Context API        |

---

## 🔧 Features

- ✅ Login with name + email (auto-registers)
- ✅ View all available events
- ✅ Join an event (token-protected)
- ✅ Live attendee list updates via WebSocket
- ✅ Responsive UI with Bootstrap

---

## 📁 Project Structure

```
📦event-checkin
├── backend-event-checkin
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middlewares/
│   ├── socket/
│   ├── server.js
├── event-checkin-frontend
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── context/
│   │   ├── api/
│   │   └── socket.js
```

---

## 🧪 How to Run Locally

### 1. Clone the Repository
```bash
git clone https://github.com/MHasan1234/Event-Check-In.git
cd event-checkin
```

### 2. Backend Setup
```bash
cd backend-event-checkin
npm install
```

**Create a `.env` file**:
```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

```bash
npm start
```

### 3. Frontend Setup
```bash
cd ../event-checkin-frontend
npm install
npm run dev
```

---

## 🔐 Example Login Credentials

Any name and email will work. The user will be auto-created and logged in.

---

## 📸 Screenshots

![image](https://github.com/user-attachments/assets/e5fbb24a-c381-4ec0-bec9-c182fe752ac7)
![image](https://github.com/user-attachments/assets/4eefb337-f1b1-43d9-87f7-37a158f3012a)
![image](https://github.com/user-attachments/assets/3f4f0fba-ba76-4986-85c8-e8ad6e7e1c50)


## 📢 Realtime Flow

- When user joins an event:
  - Server updates DB
  - Broadcasts updated attendee list to all clients in the event room

---

## 🙏 Acknowledgements

Submitted by: **Mushirul Hassan**  
Email: mushirulhassan2@gmail.com
