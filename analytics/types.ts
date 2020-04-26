export type EventName = string;

export type EventParams = firebase.analytics.EventParams;

export interface Actions {
  log: (eventName: EventName, eventParams?: Partial<EventParams>) => void;
}

export interface Context {
  actions: Actions;
}
