<script lang="ts">
  import { fbServices } from "$lib/stores";
  import { browserLocalPersistence, browserSessionPersistence, indexedDBLocalPersistence, inMemoryPersistence, setPersistence } from "firebase/auth";
  import { get } from "svelte/store";
  import { onMount } from "svelte";

  interface $$Props {
    [key: string]: any;
  }

  export let ifChecked: keyof typeof persistenceMap = "local"
  export let ifNotChecked: keyof typeof persistenceMap = "session"

  const persistenceMap = {
    local: browserLocalPersistence,
    memory: inMemoryPersistence,
    indexedDB: indexedDBLocalPersistence,
    session: browserSessionPersistence
  }

  let checkbox: HTMLInputElement

  onMount(() => updatePersistence(checkbox?.checked ?? false))

  function handleClick(e: MouseEvent){
    if(e.target === null || !(e.target instanceof HTMLInputElement))throw ""
    updatePersistence(e.target.checked)
  }

  function updatePersistence(checked: boolean){
    return setPersistence(get(fbServices).auth, persistenceMap[checked ? ifChecked : ifNotChecked])
  }
</script>

<input {...$$restProps} bind:this={checkbox} type="checkbox" on:click={handleClick}>