import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { getCurrentUser } from "../../Firabase/auth";
import { userColors } from "../../Firabase/userColors";


import { addReminder, fetchReminders } from "../../Firabase/addReminder";
import { deleteReminder } from "../../Firabase/deleteReminder";

const locales = {
  "tr-TR": require("date-fns/locale/tr"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarView = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadReminders = async () => {
      try {
        const user = await getCurrentUser();
        const userColor = userColors[user.uid] || "#000"; 
  
        const remindersFromDb = await fetchReminders();
        const formattedEvents = remindersFromDb.map((r) => ({
          id: r.id,
          title: r.title,
          start: new Date(r.date),
          end: new Date(r.date),
          color: userColors[r.uid] || "#000", // uid'ye göre renk ata
          createdAt: r.createdAt,
        }));
        setEvents(formattedEvents);
      } catch (error) {
        console.error("Hatırlatma yüklenirken hata:", error);
      }
    };
    loadReminders();
  }, []);
  

  const handleSelectSlot = async ({ start }) => {
    const title = prompt("Hatırlatma başlığı gir:");
    if (title) {
      try {
        const user = await getCurrentUser(); // UID al
        const newReminderId = await addReminder({
          title,
          date: start.toISOString(),
          createdAt: new Date().toISOString(),
        });
  
        const newEvent = {
          id: newReminderId,
          title,
          start,
          end: start,
          color: userColors[user.uid] || "#000", // Renk hemen burada atanıyor
          createdAt: new Date().toISOString(),
        };
  
        setEvents((prevEvents) => [...prevEvents, newEvent]);
      } catch (error) {
        alert("Hatırlatma eklenirken hata oluştu.");
      }
    }
  };
  

  const handleDelete = async (eventToDelete) => {
    try {
      await deleteReminder(eventToDelete.id);
      setEvents((prevEvents) => prevEvents.filter((e) => e.id !== eventToDelete.id));
    } catch (error) {
      alert("Hatırlatma silinirken hata oluştu.");
    }
  };

  return (
    <div style={styles.container}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        defaultView="month"
        views={["month", "week", "day"]}
        style={styles.calendar}
        toolbar={true}
      />

      <div style={styles.reminderBox}>
        <h3 style={styles.reminderTitle}>Hatırlatmalar</h3>
        {events.length === 0 && <p>Henüz hatırlatma yok.</p>}
        {events.map((event) => (
          <div key={event.id} style={{
            ...styles.reminderItem,
            backgroundColor: event.color || "#000",
            height: "100px", 
            flexDirection: "column",
            padding: "10px",
            color: "#fff",
          }}>
            
            <div style={styles.reminderDateText}>
            {event.start.toLocaleDateString("tr-TR")}
          </div>
           
            <div style={{ fontSize: "1.1rem", marginTop: "10px", alignSelf: "flex-start" }}>
              {event.title}
            </div>

            <button
            onClick={() => handleDelete(event)}
            style={{ ...styles.deleteButton, marginTop: "5px", alignSelf: "flex-end" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#c0392b")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#e74c3c")}
          >
            Sil
          </button>

          <div style={{ alignSelf: "flex-end", fontSize: "0.75rem", opacity: 0.8 }}>
               {new Date(event.createdAt).toLocaleString("tr-TR")}
              </div>
          </div>
          
        ))}
      </div>
    </div>
  );
};

export default CalendarView;

const styles = {
  container: {
    height: 500,
  },
  calendar: {
    margin:"10px",
    
  },
  reminderBox: {
    marginTop: "1rem",
    padding: "1rem",
    borderRadius: "8px",
    textAlign: "center",
  },
  reminderTitle: {
    marginBottom: "1rem",
  },
  reminderItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "0.75rem",
    padding: "0.5rem 0.75rem",
    borderRadius: "5px",
    backgroundColor: "#fff",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  reminderDateText: {
    fontWeight: "bold",
    borderBottom: "1px solid rgba(255, 255, 255, 0.5)",
    width: "100%",
  },
  reminderText: {
    fontWeight: "500",
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "0.4rem 0.8rem",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background-color 0.3s ease",
  },
};
