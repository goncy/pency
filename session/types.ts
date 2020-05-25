import {User as FirebaseUser} from "firebase";

export type User = FirebaseUser;
export interface State {
  user: User | null;
}

export interface Actions {
  signOut: () => void;
}

export interface Context {
  state: State;
  actions: Actions;
}
