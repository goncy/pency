import firebase from "../firebase/client";

import {User} from "./types";

export default {
  signIn: (email: string, password: string) =>
    firebase.auth.signInWithEmailAndPassword(email, password),
  signOut: () => firebase.auth.signOut(),
  onChange: (onChange: (user: User | null) => void) => firebase.auth.onAuthStateChanged(onChange),
};
