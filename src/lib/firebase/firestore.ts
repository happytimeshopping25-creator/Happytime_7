import { getFirestore } from "firebase/firestore";
import { firebaseApp } from "./client";
export const db = getFirestore(firebaseApp);
