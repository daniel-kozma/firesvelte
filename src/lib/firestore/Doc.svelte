<script lang="ts">
  import { setDoc, type DocumentReference, type Firestore, type DocumentData } from "firebase/firestore"
  import { docStore, fbServices } from "../stores"
  import type { CustomDocumentData } from "../types"

  type T = $$Generic<DocumentData>

  interface $$Slots {
    default: {
      data: CustomDocumentData<T>
      ref: DocumentReference<T>
    }
    loading: {}
  }

  export let createIfDoesntExist = false

  export let ref: string | DocumentReference<T>
  export let startWith: T

  let firestore: Firestore = $fbServices.firestore
  let store = docStore<T>(firestore, ref, startWith)

  $: if($store === null && createIfDoesntExist)setDoc<T>(store.ref, startWith)
</script>
{#if $store !== undefined}
  <slot data={$store ?? startWith} ref={store.ref} />
{:else}
  <slot name="loading"><p>Loading Data...</p></slot>
{/if}