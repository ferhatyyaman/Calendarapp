import React from "react";
import "./SpecialDays.css";
import Header from "../components/Header/header";

const calculateRemainingDays = (dateStr) => {
  const today = new Date();
  const [day, month, year] = dateStr.split(".");
  const next = new Date(today.getFullYear(), parseInt(month) - 1, parseInt(day));

  if (next < today) {
    next.setFullYear(today.getFullYear() + 1);
  }

  const diffTime = next - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

function SpecialDays() {
  const specialDates = [
    { label: "Doğum Günü", date: "01.11.2000" },
    { label: "Doğum Günü", date: "17.01.1999" },
    { label: "Yıldönümü ", date: "02.02.2022" },
    { label: "İlk Buluşma", date: "13.01.2019" }
  ];

  return (
    <div>
        <div className="special-days-container">
        <Header />
        <h2>Özel Günler</h2>
        <ul>
        {specialDates.map((event, index) => (
            <li key={index}>
            {event.label}: {calculateRemainingDays(event.date)} gün kaldı
            </li>
        ))}
        </ul>
    </div>
    </div>
  );
}

export default SpecialDays;
