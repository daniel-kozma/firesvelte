<script lang="ts">
  import { formSubmitUtil } from "$lib/util";
  import type { FirebaseError } from "firebase/app";
  import { sendEmailVerification,  } from "firebase/auth";
  import FIREBASE_AUTH_ERROR_MESSAGES from "./firebase_auth_error_messages.json"
  import User from "./User.svelte";
  import type { User as UserType } from "firebase/auth";

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
  sent: {}
}

let showForm = true
let errorMessage: string | null = null
let emailSent = false

async function handleSubmit(e: SubmitEvent, user: UserType){
  errorMessage = null
  showForm = false
  formSubmitUtil(e)
  await sendEmailVerification(user)
    .catch((e: FirebaseError & { code: keyof typeof FIREBASE_AUTH_ERROR_MESSAGES }) => {
      errorMessage = FIREBASE_AUTH_ERROR_MESSAGES[e.code]
      showForm = true
      throw errorMessage
    })
  showForm = true
  emailSent = true
}

</script>

<User let:user>
  {#if errorMessage !== null}
    <slot name="error" message={errorMessage}><p>Error: {errorMessage}</p></slot>
  {/if}

  {#if showForm === true}
    <form
      on:submit={(e) => handleSubmit(e, user)}
      {...$$restProps}
    >
      {#if emailSent}
        <slot name="sent">
          <p>Verification Email Sent. Click the Link in the Email. Also, please check your spam folder as well.</p>
          <button type="button" on:click={() => location.reload()}>I Clicked The Link</button>
          <button type="button" on:click={() => location.reload()}>Try Again</button>
        </slot>
      {:else}  
        <slot>
          <button type="submit">{emailSent ? "Resend" : "Send"} Verification Email</button>
        </slot>
      {/if}
    </form>
  {:else}
    <slot name="loading"><p>Sending Verification Email...</p></slot>
  {/if}
</User>