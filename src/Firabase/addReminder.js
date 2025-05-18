// addReminder.js
import { db } from "./config";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { getCurrentUser } from "./auth"; // UID almak için

// Hatırlatma ekle
export const addReminder = async (reminder) => {
  const user = await getCurrentUser(); // Giriş yapan kullanıcıyı al
  const docRef = await addDoc(collection(db, "reminders"), {
    ...reminder,
    uid: user.uid, // UID’yi Firestore’a yaz
  });
  return docRef.id;
};

// Hatırlatmaları çek
export const fetchReminders = async () => {
  const querySnapshot = await getDocs(collection(db, "reminders"));
  let reminders = [];
  querySnapshot.forEach((doc) => {
    reminders.push({ id: doc.id, ...doc.data() }); // UID dahil
  });
  return reminders;
};

// Hatırlatma sil
export const deleteReminder = async (id) => {
  await deleteDoc(doc(db, "reminders", id));
};
