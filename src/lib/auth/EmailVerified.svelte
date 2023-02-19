<script lang="ts">
  import { fbServices, userStore } from "$lib/stores";
  import EmailVerifyForm from "./EmailVerification.svelte";
    import User from "./User.svelte";

  interface $$Slots {
    default: {}
    notVerified: {}
  }
</script>

<User let:user>
  {#if !user.emailVerified}
    <slot name="notVerified">
      <h1>Please Verify Your Email Before Continuing.</h1>
      <EmailVerifyForm/>
    </slot>
  {:else}
    <slot></slot>
  {/if}
</User>