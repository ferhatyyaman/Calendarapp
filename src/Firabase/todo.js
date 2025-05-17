import { db } from "./config";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

const todoCollection = collection(db, "todos");

// Todo ekleme
export const addTodo = async (todo) => {
  const docRef = await addDoc(todoCollection, todo);
  return docRef.id;
};

// Tüm todoları çekme
export const fetchTodos = async () => {
  const snapshot = await getDocs(todoCollection);
  let todos = [];
  snapshot.forEach(doc => {
    todos.push({ id: doc.id, ...doc.data() });
  });
  return todos;
};

// Todo silme
export const deleteTodo = async (id) => {
  await deleteDoc(doc(db, "todos", id));
};
