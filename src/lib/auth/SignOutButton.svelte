<script lang="ts">
  import { signOut } from "firebase/auth";
  import { fbServices } from "../stores";

  // is able to pass down any props
  interface $$Props {
    [key: string]: any
  }
</script>

<button
  on:click={() => signOut($fbServices.auth)}
  {...$$restProps}
>
  <slot>Sign Out</slot>
</button>