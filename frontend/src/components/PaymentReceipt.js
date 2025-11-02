import React from "react";
import "./PaymentReceipt.css";

export default function PaymentReceipt({
  session,
  selectedSeats,
  totalAmount,
  transactionId,
}) {
  const currentDate = new Date().toLocaleString();

  return (
    <div className="receipt">
      <div className="receipt-header">
        <h2>Payment Receipt</h2>
        <div className="receipt-date">{currentDate}</div>
      </div>

      <div className="receipt-details">
        <div className="receipt-row">
          <span>Event:</span>
          <span>{session.event.title}</span>
        </div>
        <div className="receipt-row">
          <span>Session:</span>
          <span>{new Date(session.start_time).toLocaleString()}</span>
        </div>
        <div className="receipt-row">
          <span>Seats:</span>
          <span>{selectedSeats.join(", ")}</span>
        </div>
        <div className="receipt-row">
          <span>Price per seat:</span>
          <span>${session.price}</span>
        </div>
        <div className="receipt-row total">
          <span>Total Amount:</span>
          <span>${totalAmount}</span>
        </div>
      </div>

      <div className="receipt-footer">
        <div className="transaction-id">Transaction ID: {transactionId}</div>
        <div className="receipt-note">Thank you for your purchase!</div>
      </div>
    </div>
  );
}
