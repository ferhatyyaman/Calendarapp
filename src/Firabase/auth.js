// auth.js
import { auth } from "./config";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

// Giriş fonksiyonu
export function loginUser(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Giriş başarılı:", user);
      return user;
    })
    .catch((error) => {
      console.error("Giriş hatası:", error.message);
      throw error;
    });
}

// Aktif kullanıcıyı döndüren fonksiyon
export function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe(); // sadece bir kere çalışsın
      if (user) {
        resolve(user); // aktif kullanıcıyı döndür
      } else {
        reject("Kullanıcı giriş yapmamış.");
      }
    });
  });
}
