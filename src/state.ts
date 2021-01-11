// read state
const states = require("../config/states.json");

// allow users to configure 'states' (either via config or db in future)
export class State {
  name: string;
  description: string;

  constructor(name: string, description: string = undefined) {
    this.name = name;
    this.description = description || name;
  }
}

const stateMap = {};

states.forEach((state: { name: string; description: any }) => {
  stateMap[state.name] = new State(state.name, state.description);
});

console.log(stateMap);

export enum enumState {
  Passive_Mode_1 = "Passive Mode 1",
  Passive_Mode_2 = "Passive Mode 2",
  Passive_Mode_3 = "Passive Mode 3",
  PreTravel_greater_than_10 = "Pre Travel greater than 10 days",
  PreTravel_less_than_10 = "Pre Travel less than 10 days",
}

export class Event {
  event_type: string;
  event_ts: Date;
  event_data?: any;

  constructor(event_type: string, event_data: string = undefined) {
    this.event_type = event_type;
    this.event_ts = new Date();
    this.event_data = event_data;
  }
}

export class StateChangeEvent {
  state: enumState;
  previous_state?: enumState;
  event: Event;
  constructor(state: enumState, previous_state: enumState = undefined) {
    this.state = state;
    this.previous_state = previous_state;
  }

  toString(): string {
    return `${this.previous_state} -> ${this.state} [${this.event.event_type}]`;
  }
}
