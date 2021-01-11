import {
  NotInAustraliaCheck,
  PassiveModeOne,
  PassiveModeTwo,
  RuleEngine,
  RulePreFlightCheck_10days,
} from "./rule";
import { enumState } from "./state";
import { Traveler } from "./traveler";

const traveler = new Traveler("my-pretend-guid");

traveler.setLocation("Singapore");
traveler.changeState(enumState.PreTravel_greater_than_10);
traveler.addAttribute("itinerary_number", "ITN-1234");

const engine = new RuleEngine();

// Example of basic Rule (B1, B2)
const tracking_mode_origin = new NotInAustraliaCheck();
const preflight_check_10days = new RulePreFlightCheck_10days();

preflight_check_10days.addRuleChains(
  new PassiveModeTwo(),
  new PassiveModeOne()
);
tracking_mode_origin.chained_next_rule_true = preflight_check_10days;

engine.addRule(tracking_mode_origin);

console.log(traveler);

console.log(`Engine: ${engine} :: Size: ${engine.size()}`);

engine.execute(traveler);

console.log(traveler);

traveler.setLocation("Australia");

console.log(traveler);
