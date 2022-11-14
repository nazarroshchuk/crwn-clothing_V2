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
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDHI1UTJKKJYwND2_Bopgzy5DwjLRSnh3s",
  authDomain: "crwn-clothing-db-v2-8a43d.firebaseapp.com",
  projectId: "crwn-clothing-db-v2-8a43d",
  storageBucket: "crwn-clothing-db-v2-8a43d.appspot.com",
  messagingSenderId: "590498475030",
  appId: "1:590498475030:web:f06aeb73435ee05d00d937"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

// method allows to store new documents on DB
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach(object => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  })

  await batch.commit();
  console.log('done')
}

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc
  }, {});
console.log(categoryMap)
  return categoryMap;
}
export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {
  //create new database
  const userDocRef = doc(db, 'users', userAuth.uid );
  const userSnapshot = await getDoc(userDocRef);
  // console.log('userDocRef', userDocRef)
  // console.log('userSnapshot', userSnapshot)

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
