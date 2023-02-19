<script>
  import EmailPwSignInForm from "$lib/auth/EmailPwSignInForm.svelte";
  import EmailPwSignUpForm from "$lib/auth/EmailPwSignUpForm.svelte";
    import EmailVerified from "$lib/auth/EmailVerified.svelte";
  import PersistenceCheckbox from "$lib/auth/PersistenceCheckbox.svelte";
  import SignOutButton from "$lib/auth/SignOutButton.svelte";
  import User from "$lib/auth/User.svelte";
  import { deleteUser } from "firebase/auth"
</script>
<User let:user>
  <EmailVerified>
    <h1>Hello {user.displayName ?? ""}!</h1>
    <SignOutButton style="width: auto;"/>
    <button on:click={() => deleteUser(user)} style="width: auto;">Delete User</button>
  </EmailVerified>

  <div slot="signedOut">
    <h1>Sign In</h1>
    <EmailPwSignInForm class="grid"/>
    <hr>
    <h1>Sign Up</h1>
    <EmailPwSignUpForm addUsername class="grid"/>
  </div>
</User>