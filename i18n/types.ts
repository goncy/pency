export interface State {
  dictionaries: Record<string, string>;
}

export interface Context {
  state: State;
}
