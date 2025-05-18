import React, { useEffect, useState } from "react";
import Calendar from "../components/Calendar/CalendarView";
import { useNavigate } from "react-router-dom";
import {fetchTodos, } from "../Firabase/todo";
import "./Dashboard.css";
import Header from "../components/Header/header";
import WelcomePopup from "../components/Pop_up/WelcomePopup";

import { getCurrentUser } from "../Firabase/auth";
import { userColors } from "../Firabase/userColors";


function Dashboard() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [showPopup, setShowPopup] = useState(true);

  const [userColor, setUserColor] = useState("#000");

  useEffect(() => {
    const load = async () => {
      const user = await getCurrentUser();
      setUserColor(userColors[user.uid] || "#000");
  
      const data = await fetchTodos();
      setTodos(data);
    };
    load();
  }, []);
  


  return (
    <div className="container">
      {showPopup && <WelcomePopup onClose={() => setShowPopup(false)} />}
      <Header />
      <div className="contentWrapper">
        <div className="calendarWrapper">
          <Calendar />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
