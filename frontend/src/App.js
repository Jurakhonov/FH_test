import React, { useEffect, useState } from "react";
import axios from "axios";
import CategoryList from "./components/CategoryList";
import EventList from "./components/EventList";
import SessionList from "./components/SessionList";
import SeatSelection from "./components/SeatSelection";
import PaymentFlow from "./components/PaymentFlow";
import { mockData } from "./mockData";
import { CONFIG } from "./config";

export default function App() {
  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    if (CONFIG.USE_MOCK_DATA) {
      setCategories(mockData.categories);
      setEvents(mockData.events);
    } else {
      axios
        .get(CONFIG.API_URL + "/categories/")
        .then((r) => setCategories(r.data));
      axios.get(CONFIG.API_URL + "/events/").then((r) => setEvents(r.data));
    }
  }, []);

  return (
    <div className="app">
      <h1>Simple Booking</h1>
      <div className="grid">
        <div className="col">
          <CategoryList
            categories={categories}
            onSelect={setSelectedCategory}
            selected={selectedCategory}
          />
          <EventList
            events={events}
            category={selectedCategory}
            onSelect={setSelectedEvent}
            selected={selectedEvent}
          />
        </div>
        <div className="col">
          <SessionList event={selectedEvent} onSelect={setSelectedSession} />
          {selectedSession && !showPayment && (
            <SeatSelection
              sessionId={selectedSession.id}
              baseApi={API}
              onSeatsSelected={(seats) => {
                setSelectedSeats(seats);
                setShowPayment(true);
              }}
            />
          )}
          {showPayment && (
            <PaymentFlow
              session={selectedSession}
              selectedSeats={selectedSeats}
              onSuccess={(details) => {
                // Сброс состояния после успешной оплаты
                setSelectedSession(null);
                setSelectedSeats([]);
                setShowPayment(false);
              }}
              onCancel={() => {
                setShowPayment(false);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
