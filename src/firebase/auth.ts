import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateCurrentUser
} from "firebase/auth"

import { auth } from "./app"

export { auth }

export const user = {
    subscribe: (cb) => onAuthStateChanged(auth, cb),
    set: value => updateCurrentUser(auth, value),
    update: cb => updateCurrentUser(auth, cb(auth.currentUser)),
    get: () => auth.currentUser
}

export const logout = () => signOut(auth)
export const loginWithGoogle = () => signInWithPopup(auth, new GoogleAuthProvider())

export const createAccount = (email, pw) => createUserWithEmailAndPassword(auth, email, pw)
export const loginWithEmail = (email, pw) => signInWithEmailAndPassword(auth, email, pw)