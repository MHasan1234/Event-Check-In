import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import { useAuth } from "../context/AuthContext";

const EventDetail = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const [event, setEvent] = useState(null);
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    const fetchEvent = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/events/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEvent(res.data.event);
        setAttendees(res.data.attendees || []);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching event details");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();

    socket.emit("join-room", { eventId: id });

    socket.on("eventUpdated", (data) => {
      if (data.eventId === id) {
        setAttendees(data.attendees);
      }
    });

    return () => {
      socket.off("eventUpdated");
      socket.emit("leave-room", { eventId: id });
    };
  }, [id, token, socket]);

  const handleJoin = async () => {
    try {
      await axios.post(
        `http://localhost:5000/api/events/join/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      setError(err.response?.data?.message || "Join failed");
    }
  };

  if (loading) return <div className="container py-5">Loading...</div>;
  if (error) return <div className="container py-5 text-danger">{error}</div>;

  return (
    <div className="container py-5">
      {event && (
        <>
          <h2>{event.name}</h2>
          <p>
            {event.location}
            <br />
            {new Date(event.startTime).toLocaleString()}
          </p>

          <button className="btn btn-success my-3" onClick={handleJoin}>
            Join Event
          </button>

          <hr />
          <h4>Live Attendees ({attendees.length})</h4>
          <ul className="list-group">
            {attendees.map((user) => (
              <li key={user._id} className="list-group-item">
                {user.name}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default EventDetail;