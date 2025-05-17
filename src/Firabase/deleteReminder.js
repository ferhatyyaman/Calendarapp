// src/Firabase/deleteReminder.js
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "./config";

export const deleteReminder = async (id) => {
  await deleteDoc(doc(db, "reminders", id));
};
