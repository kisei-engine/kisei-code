import { enumState, StateChangeEvent, Event } from "./state";

// this will be replaced by actual database and state there
export class Traveler {
  private guid: string;
  private current_location: string;
  private current_state: enumState;
  private events: StateChangeEvent[];
  private attributes: Map<string, string>;

  constructor(guid: string) {
    this.guid = guid;
    this.attributes = new Map();
    this.events = [];
  }

  getCurrentState(): enumState {
    return this.current_state;
  }

  getCurrentLocation(): string {
    return this.current_location;
  }

  setLocation(location: string) {
    const state_change = new StateChangeEvent(
      this.current_state,
      this.current_state
    );
    state_change.event = new Event(
      "Location Change",
      `from: ${this.current_location} to: ${location}`
    );
    this.events.push(state_change);
    this.current_location = location;
  }

  changeState(state: enumState): void {
    this.events.push(new StateChangeEvent(state, this.current_state));
    this.current_state = state;
  }

  addAttribute(key: string, value: string): void {
    this.attributes[key] = value;
  }

  hasAttribute(key: string): boolean {
    return this.attributes.has(key);
  }

  getAttribute(key: string): string {
    return this.attributes.get(key);
  }
}
