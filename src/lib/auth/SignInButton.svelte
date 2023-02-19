<script lang="ts">
  import { browserLocalPersistence, browserSessionPersistence, EmailAuthProvider, FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, indexedDBLocalPersistence, inMemoryPersistence, PhoneAuthProvider, setPersistence, signInWithPopup, TwitterAuthProvider, type AuthProvider, type Persistence } from "firebase/auth";
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import { fbServices } from "../stores";

  // is able to pass down any props
  interface $$Props {
    [key: string]: any;
  }

  export let provider: AuthProvider = new GoogleAuthProvider()
  export let persistence: Persistence | keyof typeof persistenceMap | undefined = undefined

  const persistenceMap = {
    local: browserLocalPersistence,
    memory: inMemoryPersistence,
    indexedDB: indexedDBLocalPersistence,
    session: browserSessionPersistence
  }

  onMount(() => {
    if(persistence === undefined)return
    if(typeof persistence === "string")return setPersistence(get(fbServices).auth, persistenceMap[persistence])
    return setPersistence(get(fbServices).auth, persistence)
  })

</script>

<button
  on:click={() => signInWithPopup($fbServices.auth, provider)}
  {...$$restProps}
>
  <slot>Sign In</slot>
</button>