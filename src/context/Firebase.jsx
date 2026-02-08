import { createContext, useContext,useState,useEffect} from "react";
import { initializeApp } from "firebase/app";
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup,onAuthStateChanged} from "firebase/auth";
import {getFirestore,collection,addDoc,getDocs,doc,getDoc,query,where} from "firebase/firestore";

const FirebaseContext = createContext(null);
const firebaseConfig = {
  apiKey: "AIzaSyCMIvFwJL4butuNZBhZ1BbUd8fw5gX0t5Y",
  authDomain: "first-react-app-e2e33.firebaseapp.com",
  databaseURL: "https://first-react-app-e2e33-default-rtdb.firebaseio.com",
  projectId: "first-react-app-e2e33",
  storageBucket: "first-react-app-e2e33.firebasestorage.app",
  messagingSenderId: "565252475944",
  appId: "1:565252475944:web:15494cfb5c55f4995d791d"
};
const app = initializeApp(firebaseConfig);
const firebaseauth = getAuth(app);
const firestore=getFirestore(app);
const googleprovider = new GoogleAuthProvider();

export const useFirebase = () =>useContext(FirebaseContext);         
export const FirebaseProvider = (props) => {
  const [user,setUser] = useState(null);
  useEffect(() => 
    { 
    onAuthStateChanged(firebaseauth,(user) => {
      if(user) setUser(user);
      else setUser(null);
    })
  },[]);
  const signupUserwithEmailandPassword = (email,password) => {
    createUserWithEmailAndPassword(firebaseauth,email,password);
  }
  const  signinUserwithEmailandPass= (email,password) => {
      signInWithEmailAndPassword(firebaseauth,email,password);
    }
  const signinWithGoogle = () => signInWithPopup(firebaseauth,googleprovider);
  console.log(user);
  const handleCreateNewListing = async(name,isbn,price) => {
     return await addDoc(collection(firestore,"books"),{
      name,
      isbn,
      price,
      userId: user.uid,
      userEmail: user.email,
      userName: user.displayName,
      photoURL: user.photoURL
    });
  }
  const listAllBooks=() => {
    return getDocs(collection(firestore,"books"));
  }
  const getBookById = async(id) => {
     const docRef = doc(firestore,"books",id);
     const result = await getDoc(docRef);
     return result;
  }
  const placeOrder = async(bookId,qty) => {
    const collectionRef = collection(firestore,'books',bookId,"orders");
    const result = await addDoc(collectionRef,{
      username: user.displayName,
      userEmail: user.email,
      userId: user.uid,
      qty:Number(qty),
  });
  return result;
};
  const fetchMyBooks = async(userId) => {
    const collectionRef = collection(firestore,'books');
    const q= query(collectionRef,where("userId","==",userId));
    const result = await getDocs(q);
    return result;
  }
  const getOrders = async(bookId) => {
    const collectionRef = collection(firestore,'books',bookId,"orders");
    const result = await getDocs(collectionRef);
    return result;
  }
  const isLoggedIn = user ? true : false;
  return (
    <FirebaseContext.Provider value={{signupUserwithEmailandPassword,signinUserwithEmailandPass,signinWithGoogle,isLoggedIn,handleCreateNewListing,listAllBooks,getBookById,placeOrder,fetchMyBooks,user,getOrders}}>
        {props.children}
    </FirebaseContext.Provider>
    );
};
