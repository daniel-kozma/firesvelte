# FireSvelte
**A library that massively oversimplifies the usage of firebase with svelte(kit)**

> All of the components are provided by FireSvelte in the example below
```svelte
  <FirebaseApp {credentials}>
    <User let:user>
      <EmailVerified>
        <h1>Hello {user.displayName}!</h1>
        <SignOutButton/>
        <h2>Your Posts</h2>
        <Collection
          ref={`/userData/${user.uid}/posts`}
          startWith={[]}
          checkForEmpty
          let:data={posts}
          let:ref={postsRef}
          let:count
        >
          <p>You have {count} posts.</p>
          <ul>
            {#each posts as post}
              <li>
                <h3>{post.title}</h3>
                <p>{post.preview}</p>
                <button
                  on:click={() => deleteDoc(post.__ref)}
                >
                  Delete post
                </button>
              </li>
            {/each}
          </ul>
          <div slot="empty">
            <p>You don't have any posts</p>
          </div>
        </Collection>
      </EmailVerified>
      <div slot="signedOut">
        <h1>Sign in</h1>
        <div>
          <PersistenceCheckbox checked ifChecked="local" ifNotChecked="session" id="persistence"/>
          <label for="persistence">Keep me logged in</label>
        </div>
        <EmailPwSignInForm/>
        <SignInButton>Or sign in with Google</SignInButton>
        <h1>Sign up</h1>
        <EmailPwSignUpForm addUsername/>
      </div>
    </User>
  </FirebaseApp>
```

**Everything is fully customizable (using slots and passing down all props e.g. in the `SignInButton`)**
**Everything is written in TypeScript**

## What does FireSvelte provide?
### General:
- Automatically **initializes firebase** `app`, `auth`, `firestore` and `storage`. You just have to provide your firebase credentials to the `FirebaseApp` component.
- Sets the `app`, `auth`, `firestore` and `storage` in a (global) *store* called *`fbServices`*.

### Auth
- `userStore` with `User` component with `signedOut` and `loading` states.
- `SignInButton`. You can pass in the `persistence` and an `AuthProvider`, or use default one, which is Google.
- `SignOutButton`.
- `PersistenceCheckbox`.
- `EmailPwSignUpForm` (with support with automatic username uploading) and `EmailPwSignInForm`, both of which have default templates, but are fully customizable, very easily.
- `AuthReloadButton` (for utility).
- `EmailVerification`, which handles all the email verification.
- `EmailVerified`, which ensures, that the user's email is verified, or else they will be shown the `EmailVerification`.

### Firestore
- `docStore`, `collectionStore` and `collectionGroupStore` (written in TypeScript with Generics).
- `Doc`, `Collection` and `CollectionGroup` with `loading` state, `startWith` value, typed
- `CustomDocumentData` type, which directly has all the `data`, (no need to call `.data()`), `__ref` from the reference of the document, `__id` and `__exists`