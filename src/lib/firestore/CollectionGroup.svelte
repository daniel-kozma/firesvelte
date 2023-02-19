<script lang="ts">
    import type { CustomDocumentData } from '$lib/types';
  import type { Firestore, Query, DocumentData } from 'firebase/firestore'
  import { collectionGroupStore, fbServices } from '../stores'

  type T = $$Generic<DocumentData>

  interface $$Slots {
    default: {
      data: CustomDocumentData<T>[]
      ref: Query<T> | null
      count: number
    }
    loading: {}
  }
  export let ref: string | Query<T>
  export let startWith: T[]
    
  let firestore: Firestore = $fbServices.firestore
  let store = collectionGroupStore<T>(firestore, ref, startWith)
</script>

{#if $store !== undefined}
  <slot data={$store ?? startWith} ref={store.ref} count={$store?.length ?? 0} />
{:else}
  <slot name="loading"><p>Loading Data...</p></slot>
{/if}