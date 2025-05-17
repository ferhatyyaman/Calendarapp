import { auth } from "./config";  
import { signInWithEmailAndPassword } from "firebase/auth";

function loginUser(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;
      console.log("Giriş başarılı:", user);
      return user;
    })
    .catch(error => {
      console.error("Giriş hatası:", error.message);
      throw error;
    });
}

export { loginUser };
