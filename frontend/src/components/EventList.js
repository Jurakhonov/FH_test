import React from "react";

export default function EventList({ events, category, onSelect, selected }) {
  const filtered = category
    ? events.filter((e) => {
        // handle backend returning category as object or id or null
        if (!e.category) return false;
        if (typeof e.category === "object") return e.category.id === category;
        return Number(e.category) === Number(category);
      })
    : events;
  return (
    <div className="card">
      <h3>Events</h3>
      <ul>
        {filtered.map((e) => (
          <li
            key={e.id}
            className={selected && selected.id === e.id ? "active" : ""}
            onClick={() => onSelect(e)}
          >
            {e.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
