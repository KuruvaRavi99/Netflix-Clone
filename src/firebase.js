
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDg5cm1yrTYXioR6_CT63uaMYCJVyQQe6Q",
  authDomain: "netflix-clone-bcb99.firebaseapp.com",
  projectId: "netflix-clone-bcb99",
  storageBucket: "netflix-clone-bcb99.firebasestorage.app",
  messagingSenderId: "327402857730",
  appId: "1:327402857730:web:9cb0a791edd250b9bc8e1b"
};

const app = initializeApp(firebaseConfig);
const auth= getAuth(app);
const db=getFirestore(app);

const signup=async(name,email,password)=>{
  try{
    const res=await createUserWithEmailAndPassword(auth,email,password);
    const user=res.user;
    await addDoc(collection(db,"user"),{
      uid: user.uid,
      name,
      authProvider:"local",
      email,
    });
  }catch(error)
  {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}

const login= async (email,password)=>{
  try{
    await signInWithEmailAndPassword(auth,email,password);
  }catch(error){
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}

const logout=()=>{
  signOut(auth);
}
export {auth,db,login,signup,logout};