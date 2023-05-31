import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import {
  getDocs,
  getFirestore,
  collection,
  doc,
  getDoc,
  where,
  query
} from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyDooBQzGG-d9Lj1IKi7hl48-OHP8pocAFk",
  authDomain: "fir-auth-4519d.firebaseapp.com",
  projectId: "fir-auth-4519d",
  storageBucket: "fir-auth-4519d.appspot.com",
  messagingSenderId: "778618458877",
  appId: "1:778618458877:web:d1e7dc2a122dba51aaa494"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
const vansCollection = collection(db, "vans")
export const auth = getAuth(app)


export async function getVans() {
    const querySnapshot = await getDocs(vansCollection)
    const dataArr = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }))

  return dataArr
}

export async function getVan(id) {
  const docRefe = doc(db, "vans", id)
  const vanSnapshot = await getDoc(docRefe)

  return {
    ...vanSnapshot.data(),
    id: vanSnapshot.id
  }
}

export async function getHostVans() {
  const q = query(vansCollection, where("hostId", "==", "123"))
  const querySnapshot = await getDocs(q)
  const dataArr = querySnapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id
  }))

  return dataArr
}