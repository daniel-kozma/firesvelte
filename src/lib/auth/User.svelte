<script lang="ts">
  import type { Auth, User } from "firebase/auth";
  import { fbServices, userStore } from "../stores";
  interface $$Slots {
    default: { user: User }
    signedOut: {},
    loading: {}
  }
  let auth: Auth = $fbServices.auth;
  const user = userStore(auth);
</script>
{#if $user === undefined}
  <slot name="loading"><p>Loading User Data...</p></slot>
{:else if $user === null}
  <slot name="signedOut"><p>You Are Signed Out. Please Sign In.</p></slot>
{:else}
  <slot user={$user} />
{/if}