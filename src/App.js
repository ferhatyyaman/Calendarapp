import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Auth/Login";
import Dashboard from "./pages/Dashboard";
import DailyPlans from "./pages/DailyPlans";
import { auth } from "./Firabase/config";
import SpecialDays from "./pages/SpecialDays";
import WeatherPage from "./pages/WeatherPage"; 

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <p>Yükleniyor...</p>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/plans" element={user ? <DailyPlans /> : <Navigate to="/" />} />
        <Route path="/special-days" element={user ? <SpecialDays /> : <Navigate to="/" />} />
        <Route path="/weather" element={user ? <WeatherPage /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
