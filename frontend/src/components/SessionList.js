import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SessionList.css";

export default function SessionList({ event, onSelect }) {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("time"); // "time", "availability", "price"
  const [filterSoldOut, setFilterSoldOut] = useState(false);

  useEffect(() => {
    if (!event) {
      setSessions([]);
      return;
    }
    setLoading(true);
    axios
      .get("http://localhost:8000/api/sessions/?event=" + (event.id || ""))
      .then((r) => {
        const data = r.data.filter((s) => s.event && s.event.id === event.id);
        setSessions(data);
      })
      .catch((error) => console.error("Error loading sessions:", error))
      .finally(() => setLoading(false));
  }, [event]);

  const getSortedAndFilteredSessions = () => {
    let filteredSessions = [...sessions];

    // Применяем фильтр по доступности
    if (filterSoldOut) {
      filteredSessions = filteredSessions.filter((s) => !s.is_sold_out);
    }

    // Применяем сортировку
    return filteredSessions.sort((a, b) => {
      switch (sortBy) {
        case "availability":
          return b.available_seats - a.available_seats;
        case "price":
          return a.price - b.price;
        case "time":
        default:
          return new Date(a.start_time) - new Date(b.start_time);
      }
    });
  };

  return (
    <div className="card">
      <h3>Sessions{event ? ` for ${event.title}` : ""}</h3>
      {event && (
        <div className="session-controls">
          <div className="sorting">
            <label>Сортировка: </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="time">По времени</option>
              <option value="availability">По доступности мест</option>
              <option value="price">По цене</option>
            </select>
          </div>

          <div className="filtering">
            <label>
              <input
                type="checkbox"
                checked={filterSoldOut}
                onChange={(e) => setFilterSoldOut(e.target.checked)}
              />
              Показать только доступные
            </label>
          </div>
        </div>
      )}

      {!event ? (
        <div>Выберите событие, чтобы увидеть сеансы</div>
      ) : loading ? (
        <div className="loading">Загрузка сеансов...</div>
      ) : sessions.length === 0 ? (
        <div>Нет доступных сеансов для этого события</div>
      ) : (
        <ul className="sessions-list">
          {getSortedAndFilteredSessions().map((s) => (
            <li
              key={s.id}
              className={`session-item ${s.is_sold_out ? "sold-out" : ""} 
                ${s.available_seats < 10 ? "limited-seats" : ""}`}
              onClick={() => !s.is_sold_out && onSelect(s)}
            >
              <div className="session-time">
                {new Date(s.start_time).toLocaleString()}
              </div>
              <div className="session-info">
                <span className="price">{s.price} руб.</span>
                <span
                  className={`availability ${
                    s.is_sold_out
                      ? "sold-out-text"
                      : s.available_seats < 10
                      ? "limited-text"
                      : ""
                  }`}
                >
                  {s.is_sold_out
                    ? "Все билеты проданы"
                    : s.available_seats < 10
                    ? `Осталось только ${s.available_seats} мест!`
                    : `Доступно ${s.available_seats} мест`}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
