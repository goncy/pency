import {User as FirebaseUser} from "firebase";

export type User = FirebaseUser;
export interface State {
  user: User | null;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface Actions {
  signIn: (email: Credentials["email"], password: Credentials["password"]) => void;
  signOut: () => void;
}

export interface Context {
  state: State;
  actions: Actions;
}

export type Status = "init" | "pending";
