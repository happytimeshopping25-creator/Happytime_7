import { getFirestore } from "firebase/firestore";
import { firebaseApp } from "./firebase.native";
export const db = getFirestore(firebaseApp);
