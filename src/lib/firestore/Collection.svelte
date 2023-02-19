<script lang="ts">
  import type {
    CollectionReference,
    Firestore,
    Query,
    DocumentData,
  } from 'firebase/firestore'
  import { collectionStore, fbServices } from '../stores'
  import type { CustomDocumentData } from '../types';

  type T = $$Generic<DocumentData>

  interface $$Slots {
    default: {
      data: CustomDocumentData<T>[]
      ref: CollectionReference<T> | Query<T> | null
      count: number
    },
    loading: {},
    empty: {
      ref: CollectionReference<T> | Query<T> | null
    },
  }

  export let checkForEmpty = false

  export let ref: string | CollectionReference<T> | Query<T>
  export let startWith: T[] = []

  let firestore: Firestore = $fbServices.firestore
  let store = collectionStore<T>(firestore, ref, startWith)
</script>

{#if $store === undefined}
  <slot name="loading"><p>Loading Data...</p></slot>
{:else}
  {#if checkForEmpty && ($store.length ?? 0) === 0}
    <slot name="empty" ref={store.ref}/>
  {:else}
    <slot data={$store ?? startWith} ref={store.ref} count={$store?.length ?? 0} />
  {/if}
{/if}
