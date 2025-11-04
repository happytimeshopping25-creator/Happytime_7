import { getStorage } from "firebase/storage";
import { firebaseApp } from "./client";
export const storage = getStorage(firebaseApp);
