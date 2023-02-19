import type { DocumentData, DocumentReference,  } from "firebase/firestore";
import type { Subscriber, Unsubscriber } from "svelte/store";

export interface CustomDocumentData<T extends DocumentData> extends DocumentData {
  __ref: DocumentReference<T>
  __id: string
  __exists: boolean
}

export type AbstractStore<T> = { subscribe: (subscriber: Subscriber<T>) => Unsubscriber }