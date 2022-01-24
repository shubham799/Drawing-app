import { db } from "../firebase";
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc, query, where } from "firebase/firestore";

const usersCollectionRef = collection(db, "users");

export const getUserById = async (docId) => {
    const snap = await getDoc(doc(db, 'users', docId));
    return snap.exists() ? { ...snap.data(), id: snap.id } : null
}

export const addUser = async (user) => {
    return addDoc(usersCollectionRef, user);
}

export const getUserByEmailAndPassword = async (email, password) => {
    const q = query(usersCollectionRef, where('email', '==', email), where('password', '==', password));
    const querySnapshot = await getDocs(q);
    const response = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return response.length > 0 ? response[0] : null
}

export const checkEmailIdExist = async (email) => {
    const q = query(usersCollectionRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    const response = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return response.length > 0 ? true : false
}