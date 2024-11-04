import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBGrYxBu92E89zsceCplWpyP3xVcte22S0",
  authDomain: "netflix-a43b4.firebaseapp.com",
  projectId: "netflix-a43b4",
  storageBucket: "netflix-a43b4.firebasestorage.app",
  messagingSenderId: "615665375125",
  appId: "1:615665375125:web:16b436c38f357b0700089c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);  // Fixed: Changed getFirebase to getFirestore

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        
        // Fixed: Corrected collection syntax and moved closing parenthesis
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
        
        return { success: true };
    } catch (error) {
        console.error(error);
       toast.error(error.code.split("/")[1].split("-").join(" ")) // Better error handling
    }
};

const login = async (email, password) => {  // Fixed: Changed 'login' parameter to 'email'
    try {
        await signInWithEmailAndPassword(auth, email, password);
        return { success: true };
    } catch (error) {
        console.error(error);
        toast.error(error.code.split("/")[1].split("-").join(" "))  // Better error handling
    }
};

const logout = async () => {  // Made async for consistency
    try {
        await signOut(auth);
        return { success: true };
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export { auth, db, login, signup, logout };