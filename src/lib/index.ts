import FirebaseApp from './FirebaseApp.svelte'

import User from './auth/User.svelte'
import SignInButton from './auth/SignInButton.svelte'
import SignOutButton from './auth/SignOutButton.svelte'
import AuthReloadButton from './auth/AuthReloadButton.svelte'
import EmailPwSignInForm from './auth/EmailPwSignInForm.svelte'
import EmailPwSignUpForm from './auth/EmailPwSignUpForm.svelte'
import EmailVerification from './auth/EmailVerification.svelte'
import EmailVerified from './auth/EmailVerified.svelte'
import PersistenceCheckbox from './auth/PersistenceCheckbox.svelte'

import Doc from './firestore/Doc.svelte'
import Collection from './firestore/Collection.svelte'
import CollectionGroup from './firestore/CollectionGroup.svelte'


export {
  FirebaseApp,
  
  User,
  SignInButton,
  SignOutButton,
  AuthReloadButton,
  EmailPwSignInForm,
  EmailPwSignUpForm,
  EmailVerification,
  EmailVerified,
  PersistenceCheckbox,

  Doc,
  Collection,
  CollectionGroup,
}

export { fbServices, docStore, userStore, collectionStore, collectionGroupStore } from './stores'