import React from "react";
import "./WelcomePopup.css";

function WelcomePopup({ onClose }) {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>💧 Su İçmeyi Unutma</h2>
        <p>Gün boyunca yeterince su içmek sağlığın için çok önemli.
Her saat başı bir bardak su içmeyi hedefle! 💙</p>
      </div>
    </div>
  );
}

export default WelcomePopup;
