import React from "react";
import { useNavigate } from "react-router-dom";
import "./header.css";
import { auth } from "../../Firabase/config";
import { signOut } from "firebase/auth";


function Header() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Çıkış yapılırken hata:", error);
    }
  };
  

  const handleNavigation = (e) => {
    const value = e.target.value;
    if (value) {
      navigate(`/${value}`);
    }
  };

  return (
    <header className="header">
      <div className="headerh1">
        <h1 className="headerTitle">Takvim Uygulaması</h1>
      </div>
      <div className="header-right">
        <select onChange={handleNavigation} defaultValue="">
          <option value="" disabled>Sayfalar</option>
          <option value="dashboard">Ana Takvim</option>
          <option value="plans">Günlük Planlar</option>
          <option value="special-days">Özel Günler</option> 
        </select>
        <button onClick={handleLogout} className="logoutButton">
          Çıkış Yap
        </button>
      </div>
    </header>
  );
}

export default Header;
