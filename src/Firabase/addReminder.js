import { db } from "./config"; // Firebase Firestore bağlantın
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";

// Hatırlatma ekleme fonksiyonu
export const addReminder = async (reminder) => {
  const docRef = await addDoc(collection(db, "reminders"), reminder);
  return docRef.id; // yeni kaydın id'sini döndür
};

// Firebase'den tüm hatırlatmaları çekme fonksiyonu
export const fetchReminders = async () => {
  const querySnapshot = await getDocs(collection(db, "reminders"));
  let reminders = [];
  querySnapshot.forEach((doc) => {
    reminders.push({ id: doc.id, ...doc.data() });
  });
  return reminders;
};

// Hatırlatma silme fonksiyonu
export const deleteReminder = async (id) => {
  await deleteDoc(doc(db, "reminders", id));
};
