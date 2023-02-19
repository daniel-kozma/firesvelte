import { writable, derived } from 'svelte/store'
import { doc, collection, onSnapshot, collectionGroup, type DocumentData } from 'firebase/firestore'
import type {
  Firestore,
  Query,
  CollectionReference,
  DocumentReference,
} from 'firebase/firestore'
import { onAuthStateChanged, type User, type Auth } from 'firebase/auth'
import type { FirebaseApp } from 'firebase/app'
import type { AbstractStore, CustomDocumentData } from './types'


export function docStore<T extends DocumentData = DocumentData>(
  firestore: Firestore,
  ref: string | DocumentReference<T>,
  startWith?: T
): AbstractStore<CustomDocumentData<T> | undefined> & { ref: DocumentReference<T> } {
  // Fallback for SSR
  if (!firestore || !globalThis.window) {
    console.warn('Firestore is not initialized or not in browser')
    const { subscribe } = writable(startWith)
    // @ts-ignore
    return { subscribe, ref: null }
  }

  const docRef = typeof ref === 'string' ? doc(firestore, ref) as DocumentReference<T> : ref

  const { subscribe } = writable<CustomDocumentData<T> | undefined>(undefined, (set) =>
    onSnapshot(docRef, (s) => 
      set(({ __id: s.id, __ref: s.ref, __exists: s.exists(), ...s.data() } as CustomDocumentData<T>))
    )
  )

  return { subscribe, ref: docRef }
}

export function collectionStore<T extends DocumentData = DocumentData>(
  firestore: Firestore,
  ref: string | Query<T> | CollectionReference<T>,
  startWith: T[] = []
): AbstractStore<CustomDocumentData<T>[] | undefined> & { ref: Query<T> } {
  // Fallback for SSR
  if (!firestore || !globalThis.window) {
    console.warn('Firestore is not initialized or not in browser')
    const { subscribe } = writable(startWith)
    // @ts-ignore
    return { subscribe, ref: null, }
  }

  const colRef = typeof ref === 'string' ? collection(firestore, ref) as CollectionReference<T> : ref

  const { subscribe } = writable<CustomDocumentData<T>[] | undefined>(undefined, (set) =>
    onSnapshot(colRef, (snapshot) => 
      set(snapshot.docs.map(s => 
        ({ __id: s.id, __ref: s.ref, __exists: s.exists(), ...s.data() } as CustomDocumentData<T>)
      ))
    )
  )

  return { subscribe, ref: colRef, }
}

export function collectionGroupStore<T extends DocumentData = DocumentData>(
  firestore: Firestore,
  ref: string | Query<T>,
  startWith: T[] = []
): AbstractStore<CustomDocumentData<T>[] | undefined> & { ref: Query<T> }  {
  let unsubscribe: () => void

  // Fallback for SSR
  if (!firestore || !globalThis.window) {
    console.warn('Firestore is not initialized or not in browser')
    const {subscribe} = writable(startWith)
    // @ts-ignore
    return { subscribe, ref: null, }
  }

  const colRef = typeof ref === 'string' ? collectionGroup(firestore, ref) as Query<T> : ref

  const { subscribe } = writable<CustomDocumentData<T>[] | undefined>(undefined, (set) => 
    onSnapshot(colRef, (snapshot) =>
      set(snapshot.docs.map((s) => 
       ({__id: s.id, __ref: s.ref, __exists: s.exists(), ...s.data()} as CustomDocumentData<T>)
      ))
    )
  )

  return {
    subscribe,
    ref: colRef,
  }
}

export function userStore(auth: Auth): AbstractStore<User | undefined | null> {
  if (!auth || !globalThis.window) {
    console.warn('Auth is not initialized or not in browser')
    const { subscribe } = writable(undefined)
    return { subscribe, }
  }

  const { subscribe } = writable<User | null | undefined>(undefined, (set) => 
    onAuthStateChanged(auth, set)
  )

  return { subscribe, }
}

export const fbServices = writable<{ app: FirebaseApp, auth: Auth, firestore: Firestore }>()