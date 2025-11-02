import React, { useState } from "react";
import axios from "axios";
import "./PaymentFlow.css";

export default function PaymentFlow({
  session,
  selectedSeats,
  onSuccess,
  onCancel,
}) {
  const [status, setStatus] = useState("initial"); // initial, processing, success, error
  const [paymentDetails, setPaymentDetails] = useState(null);

  const totalAmount = session.price * selectedSeats.length;

  const handlePayment = async () => {
    setStatus("processing");

    try {
      // Имитация запроса к Payme
      const response = await axios.post(
        "http://localhost:8000/api/create-payment/",
        {
          session_id: session.id,
          seats: selectedSeats,
          amount: totalAmount,
        }
      );

      setPaymentDetails(response.data);

      // Имитация процесса оплаты
      setTimeout(() => {
        setStatus("success");
        onSuccess(response.data);
      }, 2000);
    } catch (error) {
      console.error("Payment error:", error);
      setStatus("error");
    }
  };

  if (status === "success" && paymentDetails) {
    return (
      <div className="payment-receipt">
        <h3>Билеты успешно оплачены!</h3>
        <div className="receipt-details">
          <p>
            <strong>Номер заказа:</strong> {paymentDetails.order_id}
          </p>
          <p>
            <strong>Событие:</strong> {session.event.title}
          </p>
          <p>
            <strong>Дата и время:</strong>{" "}
            {new Date(session.start_time).toLocaleString()}
          </p>
          <p>
            <strong>Места:</strong> {selectedSeats.join(", ")}
          </p>
          <p>
            <strong>Стоимость:</strong> {totalAmount} руб.
          </p>
        </div>
        <button className="primary-button" onClick={() => window.print()}>
          Распечатать билеты
        </button>
      </div>
    );
  }

  return (
    <div className="payment-flow">
      <h3>Оформление заказа</h3>

      <div className="order-summary">
        <h4>Детали заказа</h4>
        <p>
          <strong>Событие:</strong> {session.event.title}
        </p>
        <p>
          <strong>Сеанс:</strong>{" "}
          {new Date(session.start_time).toLocaleString()}
        </p>
        <p>
          <strong>Выбранные места:</strong> {selectedSeats.join(", ")}
        </p>
        <p>
          <strong>Стоимость одного места:</strong> {session.price} руб.
        </p>
        <p className="total-amount">
          <strong>Итого к оплате:</strong> {totalAmount} руб.
        </p>
      </div>

      <div className="payment-actions">
        {status === "processing" ? (
          <div className="processing">
            <div className="spinner"></div>
            <p>Обработка платежа...</p>
          </div>
        ) : status === "error" ? (
          <div className="error-message">
            <p>Произошла ошибка при оплате. Пожалуйста, попробуйте снова.</p>
            <button className="primary-button" onClick={handlePayment}>
              Повторить
            </button>
          </div>
        ) : (
          <div className="buttons">
            <button className="primary-button" onClick={handlePayment}>
              Оплатить
            </button>
            <button className="secondary-button" onClick={onCancel}>
              Отмена
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
