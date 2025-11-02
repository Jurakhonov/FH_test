import React from "react";

export const Button = ({ variant = "primary", children, ...props }) => (
  <button className={`${variant}-button`} {...props}>
    {children}
  </button>
);

export const Card = ({ title, children, className = "" }) => (
  <div className={`card ${className}`}>
    {title && <h3>{title}</h3>}
    {children}
  </div>
);

export const Loading = () => (
  <div className="loading">
    <div className="spinner"></div>
    <p>Загрузка...</p>
  </div>
);

export const Message = ({ type = "info", children }) => (
  <div className={`message message-${type}`}>{children}</div>
);

export const Legend = ({ items }) => (
  <div className="legend">
    {items.map(({ type, label }) => (
      <div key={type}>
        <span className={`seat ${type}`} />
        {label}
      </div>
    ))}
  </div>
);
