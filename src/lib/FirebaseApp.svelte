<script lang="ts">
  import { getAuth, type Auth } from 'firebase/auth'
  import { getFirestore, type Firestore } from 'firebase/firestore'
  import { initializeApp, type FirebaseOptions } from "firebase/app"
  import { fbServices } from './stores'
  export let credentials: FirebaseOptions
  // export let firestore: Firestore;
  // export let auth: Auth;
  const app = initializeApp(credentials)
  const auth = getAuth(app)
  const firestore = getFirestore(app)
  fbServices.set({ app, auth, firestore })
</script>


<slot />