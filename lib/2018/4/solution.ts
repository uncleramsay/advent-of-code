import { readFileSync, exists } from 'fs';
import { get, set, sortBy, sum, tail } from 'lodash';

class Solution {
  private input: string;
  private guardSleepSchedule: number[][];

  constructor() {
    this.input = readFileSync(`${__dirname}/data.txt`, 'utf8').trim();
    this.guardSleepSchedule = [];
    this.processData();
  }

  private processData(): void {
    let currentGuard: number;
    let minuteAsleep: number | null = null;

    const instructions = this.input.split('\n').sort();
    instructions.forEach((instruction: string) => {
      const timeMatches = instruction.match(
        /^\[(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})\] (.+)$/,
      );
      const [year, month, day, hour, minute, event] = tail(timeMatches);

      if (!timeMatches) {
        console.error(`Couldn't parse line ${instruction}`);
        process.exit();
      }

      // Guards
      let eventMatches = event.match(/^Guard #(\d+) /);
      if (eventMatches) {
        currentGuard = parseInt(eventMatches[1], 10);
      } else if (/^falls asleep/.test(event)) {
        // Falling Asleep
        minuteAsleep = parseInt(minute, 10);
      } else if (/^wakes up/.test(event)) {
        // Waking Up
        if (minuteAsleep === null) {
          console.error('Woke without sleeping');
          process.exit();
          return;
        }

        for (let i = minuteAsleep; i < parseInt(minute, 10); i++) {
          const count = get(this.guardSleepSchedule, [currentGuard, i], 0);
          set(this.guardSleepSchedule, [currentGuard, i], count + 1);
        }
        minuteAsleep = null;
      }
    });
  }

  public part1() {
    let sleepiestGuard: number = 0;
    let mostSleep: number = 0;

    this.guardSleepSchedule.forEach((guard: number[], id: number) => {
      if (sum(guard) > mostSleep) {
        sleepiestGuard = id;
        mostSleep = sum(guard);
      }
    });

    let sleepiestMinute = 0;
    mostSleep = 0;
    this.guardSleepSchedule[sleepiestGuard].forEach(
      (timesAsleep: number, minute: number) => {
        if (timesAsleep > mostSleep) {
          sleepiestMinute = minute;
          mostSleep = timesAsleep;
        }
      },
    );

    return sleepiestGuard * sleepiestMinute;
  }

  public part2() {
    let chosenGuard: number = 0;
    let sleepiestMinute: number = 0;
    let sleepiestMinuteTimesAsleep: number = 0;

    this.guardSleepSchedule.forEach((guard: number[], id: number) => {
      guard.forEach((timesAsleep: number, minute: number) => {
        if (timesAsleep > sleepiestMinuteTimesAsleep) {
          sleepiestMinuteTimesAsleep = timesAsleep;
          sleepiestMinute = minute;
          chosenGuard = id;
        }
      });
    });

    return chosenGuard * sleepiestMinute;
  }
}

export default Solution;
