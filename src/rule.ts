import Constants from "./constants";
import { enumState } from "./state";
import { Traveler } from "./traveler";

interface Runnable {
  run(traveler: Traveler): void;
}

class Terminator implements Runnable {
  public run(traveler: Traveler): void {
    console.log("Base.Terminator.Run");
  }
}

const baseTerminator = new Terminator();

abstract class Rule implements Runnable {
  description: string;
  chained_next_rule_true: Rule | Terminator;
  chained_next_rule_false: Rule | Terminator;

  constructor(description: string) {
    this.description = description;
    this.chained_next_rule_true = baseTerminator;
    this.chained_next_rule_false = baseTerminator;
  }

  // easy utility to add multiple rules at once
  addRuleChains(
    rule_true: Rule | Terminator = undefined,
    rule_false: Rule | Terminator = undefined
  ): void {
    this.chained_next_rule_true = rule_true ? rule_true : baseTerminator;
    this.chained_next_rule_false = rule_false ? rule_false : baseTerminator;
  }

  public run(traveler: Traveler): void {
    console.log(`Executing rule: ${this.description}`);
    if (this.execute(traveler)) {
      this.chained_next_rule_true.run(traveler);
    } else {
      this.chained_next_rule_false.run(traveler);
    }
  }

  public abstract execute(traveler: Traveler): boolean;
}

export class RuleEngine {
  rules: Rule[];

  constructor() {
    this.rules = [];
  }

  addRule(rule: Rule) {
    console.log(`Adding new rule: ${rule}`);
    this.rules.push(rule);
  }

  size(): number {
    return this.rules.length;
  }

  execute(traveler: Traveler) {
    this.rules.forEach((rule) => {
      rule.run(traveler);
    });
  }
}

// these are 'configured' by DSL/GUI or something like that
export class NotInAustraliaCheck extends Rule {
  constructor() {
    super("Not in Australia Rule");
  }
  public execute(traveler: Traveler): boolean {
    return traveler.getCurrentLocation() != Constants.Australia;
  }
}

export class RulePreFlightCheck_10days extends Rule {
  constructor() {
    super("Pre Check Rule");
  }
  execute(traveler: Traveler): boolean {
    return (
      traveler.getCurrentState() == enumState.PreTravel_greater_than_10 &&
      traveler.getCurrentLocation() != Constants.Australia
    );
  }
}

export class PassiveModeOne extends Terminator {
  run(traveler: Traveler) {
    traveler.changeState(enumState.Passive_Mode_1);
  }
}
export class PassiveModeTwo extends Terminator {
  run(traveler: Traveler) {
    traveler.changeState(enumState.Passive_Mode_2);
  }
}
export class PassiveModeThree extends Terminator {
  run(traveler: Traveler) {
    traveler.changeState(enumState.Passive_Mode_3);
  }
}
