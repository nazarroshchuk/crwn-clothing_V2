import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBdhTPn3ij-aF8gC2jm8oFXNnEBzQ9Xl-w",
  authDomain: "crwn-clothing-e0fc9.firebaseapp.com",
  projectId: "crwn-clothing-e0fc9",
  storageBucket: "crwn-clothing-e0fc9.appspot.com",
  messagingSenderId: "1055119973059",
  appId: "1:1055119973059:web:a11eb5c1bd063f688e6076",
  measurementId: "G-RC63XGQF8V"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore()
export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {
  //create new database
  const userDocRef = doc(db, 'users', userAuth.uid );
  const userSnapshot = await getDoc(userDocRef);

  //if user data is not exist
  //create / set the document with the data from userAuth in my collection
  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Date();
    
    try {
      await setDoc(userDocRef, { displayName, email, createAt, ...additionalInfo });
    } catch (e) {
      console.log('error creating user', e.message)
    }
  }
  //if user data exists
  return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = () => signOut(auth)

export const onAuthStateChangedListener = (callback) => {

  onAuthStateChanged(auth, callback)
}
