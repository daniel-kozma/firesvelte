<script lang="ts">
  import { fbServices } from "$lib/stores";
  import { reload, updateCurrentUser } from "firebase/auth";
  import User from "./User.svelte";

  // is able to pass down any props
  interface $$Props {
    [key: string]: any
  }
</script>

<User let:user>
  <button
    on:click={async () => {
      await reload(user)
      await updateCurrentUser($fbServices.auth, $fbServices.auth.currentUser)
    }}
    {...$$restProps}
    >
    <slot>Refresh</slot>
  </button>
</User>