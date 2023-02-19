<script lang="ts">
  import { fbServices } from "$lib/stores";
  import { formSubmitUtil } from "$lib/util";
  import type { FirebaseError } from "firebase/app";
  import { signInWithEmailAndPassword, type UserCredential } from "firebase/auth";
  import { get } from "svelte/store";
  import FIREBASE_AUTH_ERROR_MESSAGES from "./firebase_auth_error_messages.json"

// is able to pass down any props
interface $$Props {
  [key: string]: any;
}

interface $$Slots {
  default: {}
  loading: {}
  error: {
    message: string
  }
}

export let runAfter: ((user: UserCredential, formData: object) => void) | undefined = undefined

let showForm = true
let errorMessage: string | null = null


async function handleSubmit(e: SubmitEvent){
  errorMessage = null
  showForm = false
  const formData = formSubmitUtil(e) as {[k:string]:string}
  const userCredential = await signInWithEmailAndPassword(get(fbServices).auth, formData.email, formData.password)
    .catch((e: FirebaseError & { code: keyof typeof FIREBASE_AUTH_ERROR_MESSAGES }) => {
      errorMessage = FIREBASE_AUTH_ERROR_MESSAGES[e.code]
      showForm = true
      throw errorMessage
    })
  if(typeof runAfter === "function")runAfter(userCredential, formData)
}

</script>


{#if errorMessage !== null}
  <slot name="error" message={errorMessage}><p>Error: {errorMessage}</p></slot>
{/if}

{#if showForm === true}
  <form
    on:submit={handleSubmit}
    {...$$restProps}
  >
    <slot>
      <div><input type="email" name="email" placeholder="Email Address"></div>
      <div><input type="password" name="password" placeholder="Password"></div>
      <div><button type="submit">Sign In</button></div>
    </slot>
  </form>
{:else}
  <slot name="loading"><p>Signing In...</p></slot>
{/if}