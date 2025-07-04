import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Events = () => {
  const [events, setEvents] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/events", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEvents(res.data);
      } catch (err) {
        alert("Failed to load events");
      }
    };

    fetchEvents();
  }, [token]);

  return (
    <div className="container py-5">
      <h2 className="mb-4">Upcoming Events</h2>
      <div className="row g-4">
        {events.map((event) => (
          <div key={event._id} className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title">{event.name}</h5>
                  <p className="card-text">
                     {event.location}
                    <br />
                     {new Date(event.startTime).toLocaleString()}
                  </p>
                </div>
                <Link to={`/events/${event._id}`} className="btn btn-outline-primary mt-3">
                  View & Join
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
