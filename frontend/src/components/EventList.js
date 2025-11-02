import React from "react";

export default function EventList({ events, category, onSelect, selected }) {
  const filtered =
    !category || category === "all"
      ? events
      : events.filter((e) => {
          if (!e.category) return false;
          if (typeof e.category === "object")
            return e.category.id === Number(category);
          return Number(e.category) === Number(category);
        });
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
