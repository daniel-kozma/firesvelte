<script>
  import SignInButton from "$lib/auth/SignInButton.svelte";
  import SignOutButton from "$lib/auth/SignOutButton.svelte";
  import User from "$lib/auth/User.svelte";
  import Collection from "$lib/firestore/Collection.svelte";
  import { fbServices } from "$lib/stores";
  import { addDoc, collection, deleteDoc } from "firebase/firestore";
  import { get } from "svelte/store";
</script>
<User let:user>
  <header>
    <hgroup>
      <h1>Hello {user.displayName ?? "new user"}!</h1>
      <h2>Todo App</h2>
    </hgroup>
    <SignOutButton style="width: auto;">Sign out</SignOutButton>
    <br>
    <form on:submit|preventDefault={(e) => {
      if(e.target === null || !(e.target instanceof HTMLFormElement))return console.error("event.target si null or not an html form element")
      const todoText = new FormData(e.target).get("todotext")
      if(todoText === null || typeof todoText !== "string")return console.error("todoText isn't string")
      const todosRef = collection(get(fbServices).firestore, `/userdata/${user.uid}/todos`)
      e.target.reset()
      return addDoc(todosRef, { text: todoText })
    }} class="grid">
      <h2 style="text-align: center; margin-bottom: 0;">+ New</h2>
      <input name="todotext" type="text" placeholder="Todo text">
      <button type="submit">Add</button>
    </form>
    <br><br>
  </header>
  <main>
    <h2>Your todos</h2>
    <Collection
      ref={`/userdata/${user.uid}/todos`}
      startWith={[ { text: "Loading..." } ]}
      let:data={todos}
      checkForEmpty
    >
      <ul>
        {#each todos as todo}
          <li>
            <span>{todo.text}</span>
            <button on:click={() => {
              // @ts-ignore
              deleteDoc(todo.__ref)
            }} style="display: inline; width: auto; margin-left: 2rem;">Remove</button>
          </li>
        {/each}
      </ul>
      <p slot="empty">You don't have any todos.</p>    
      <p slot="loading">Loading...</p>
    </Collection>
  </main>
  <div slot="signedOut">
    <h1>Please sign in</h1>
    <SignInButton style="width: auto;">Sign in</SignInButton>
  </div>

  <h1 slot="loading">Loading...</h1>
</User>