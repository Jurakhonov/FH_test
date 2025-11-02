import React from "react";

export default function CategoryList({ categories, onSelect, selected }) {
  return (
    <div className="card">
      <h3>Categories</h3>
      <ul>
        <li
          className={!selected ? "active" : ""}
          onClick={() => onSelect(null)}
        >
          All
        </li>
        {categories.map((c) => (
          <li
            key={c.id}
            className={selected === c.id ? "active" : ""}
            onClick={() => onSelect(c.id)}
          >
            {c.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
