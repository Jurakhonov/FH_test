import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SeatSelection.css";

export default function SeatSelection({ sessionId, baseApi, onSeatsSelected }) {
  const [grid, setGrid] = useState({ seats: [], rows: 0, cols: 0 });
  const [selected, setSelected] = useState([]);
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (sessionId) {
      axios
        .get(`${baseApi}/sessions/${sessionId}/seats/`)
        .then((r) => setGrid(r.data))
        .catch(() => setGrid({ seats: [], rows: 0, cols: 0 }));
      setSelected([]);
    }
  }, [sessionId, baseApi]);

  function toggleSeat(id) {
    const s = grid.seats.find((x) => x.id === id);
    if (!s || s.reserved) return;
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function checkout() {
    if (selected.length === 0) {
      setMessage("Выберите места");
      return;
    }
    // Передаем выбранные места в родительский компонент
    onSeatsSelected(selected);
  }

  // build grid as 2D array
  const rows = Array.from({ length: grid.rows || 0 }, (_, i) => i + 1);
  const cols = Array.from({ length: grid.cols || 0 }, (_, i) => i + 1);

  function seatClass(s) {
    if (s.reserved) return "seat reserved";
    if (selected.includes(s.id)) return "seat selected";
    return "seat " + s.type;
  }

  return (
    <div className="card seat-selection-card">
      <h3>Seats</h3>
      <div className="legend">
        <div>
          <span className="seat econom" /> Эконом
        </div>
        <div>
          <span className="seat standard" /> Стандарт
        </div>
        <div>
          <span className="seat premium" /> Премиум
        </div>
        <div>
          <span className="seat vip" /> VIP
        </div>
        <div>
          <span className="seat reserved" /> Занято
        </div>
        <div>
          <span className="seat selected" /> Выбрано
        </div>
      </div>

      {message && <div className="message">{message}</div>}

      <div className="theater-container">
        <div className="screen-container">
          <div className="screen"></div>
        </div>
        <div className="grid-seats">
          {rows.map((r) => (
            <div key={r} className="seat-row">
              <span className="row-number">Row {r}</span>
              {cols.map((c) => {
                const s = grid.seats.find((x) => x.row === r && x.col === c);
                if (!s) return <div key={c} className="seat empty" />;
                return (
                  <div
                    key={s.id}
                    className={seatClass(s)}
                    onClick={() => toggleSeat(s.id)}
                    title={`Row ${s.row}, Seat ${
                      s.col
                    } - ${s.type.toUpperCase()}`}
                  >
                    {s.col}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginTop: 20, textAlign: "center" }}>
        <button onClick={checkout} className="pay-button">
          Pay with Payme{" "}
          {selected.length > 0 ? `(${selected.length} seats)` : ""}
        </button>
      </div>
      <div className="message">{message}</div>
    </div>
  );
}
