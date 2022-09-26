import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
const app = initializeApp({
    // Paste credentials here
})

export default app

export const auth = getAuth(app)
export const db = getFirestore()