import { db } from "./app"
import {
    collection as refColl,
    doc as refDoc,
    onSnapshot,
} from "firebase/firestore"

export const doc = (...args) => refDoc(db, ...args)
export const coll = (...args) => refColl(db, ...args)

export const listenTo = (ref) => ({
    subscribe: (cb) => onSnapshot(ref, cb)
})