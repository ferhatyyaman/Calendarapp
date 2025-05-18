import React, { useEffect, useState } from "react";
import Header from "../components/Header/header"; 

const WeatherPage = () => {
  const [ankaraWeather, setAnkaraWeather] = useState(null);
  const [istanbulWeather, setIstanbulWeather] = useState(null);

  const API_KEY = "3BUOmV5aSWOTFKzTOQfsGL:78ObKlyPBUgQ7FJR6SCQKl"; // Buraya kendi API key'ini yaz

  const fetchWeather = async (city) => {
    try {
      const response = await fetch(
        `https://api.collectapi.com/weather/getWeather?data.lang=tr&data.city=${city}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            authorization: `apikey ${API_KEY}`,
          },
        }
      );
      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error(`${city} hava durumu alınırken hata:`, error);
      return null;
    }
  };

  useEffect(() => {
    const getWeatherData = async () => {
      const ankara = await fetchWeather("ankara");
      const istanbul = await fetchWeather("istanbul");
      setAnkaraWeather(ankara);
      setIstanbulWeather(istanbul);
    };

    getWeatherData();
  }, []);

  const renderWeather = (cityName, weatherData) => (
    <div style={styles.card}>
      <h2 style={styles.cityName}>{cityName}</h2>
      {weatherData ? (
        weatherData.map((day, i) => (
          <div key={i} style={styles.weatherItem}>
            <div style={styles.day}>{day.day}</div>
            <div style={styles.tempDesc}>
              <span style={styles.degree}>{day.degree}°C</span> - <span>{day.description}</span>
            </div>
          </div>
        ))
      ) : (
        <p>Yükleniyor...</p>
      )}
    </div>
  );

  return (
    <div style={styles.container}>
         <Header />
      <div >
        <h1 style={styles.header}>🌤 Hava Durumu</h1>
        {renderWeather("Ankara", ankaraWeather)}
        {renderWeather("İstanbul", istanbulWeather)}
      </div>
  </div>
  );
};

export default WeatherPage;

const styles = {
  container: {
    padding: "2rem 1rem",
    maxWidth: 700,
    margin: "0 auto",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f0f4f8",
    minHeight: "100vh",
  },
  header: {
    textAlign: "center",
    fontSize: "2.5rem",
    marginBottom: "2rem",
    color: "#34495e",
    fontWeight: "700",
    letterSpacing: "1px",
  },
  card: {
    backgroundColor: "white",
    padding: "1.5rem 2rem",
    borderRadius: "12px",
    marginBottom: "2rem",
    boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
    transition: "transform 0.3s ease",
    cursor: "default",
  },
  cityName: {
    fontSize: "1.8rem",
    marginBottom: "1rem",
    borderBottom: "2px solid #3498db",
    paddingBottom: "0.3rem",
    color: "#2980b9",
  },
  weatherItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.5rem 0",
    borderBottom: "1px solid #ecf0f1",
  },
  day: {
    fontWeight: "600",
    fontSize: "1.1rem",
    color: "#2c3e50",
  },
  tempDesc: {
    fontSize: "1rem",
    color: "#7f8c8d",
    display: "flex",
    gap: "0.5rem",
    alignItems: "center",
  },
  degree: {
    fontWeight: "700",
    color: "#e67e22",
  },
};
