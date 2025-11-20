/**
 * Exercise 4: The 'this' Context Problem (Medium)
 *
 * Create a Timer class that demonstrates the 'this' context problem
 * and solutions using arrow functions and .bind()
 *
 * See README.md for full requirements and example usage.
 */

class Timer {
  seconds: number = 0;
  isRunning: boolean = false;

  constructor() {}

  tick() {
    this.seconds++;
    console.log(`Timer: ${this.seconds} seconds`);
    return;
  }

  tickArrow = () => {
    this.seconds++;
    console.log(`Timer (Arrow): ${this.seconds} seconds`);
    return;
  };

  start() {
    this.isRunning = true;
  }

  stop() {
    this.isRunning = false;
  }

  getTime() {
    return this.seconds;
  }

  reset() {
    this.seconds = 0;
    this.isRunning = false;
  }
}

const timer = new Timer();

// This works
timer.tick();
console.log(timer.getTime()); // 1

// Extracting method loses 'this' (demonstrates problem)
const tickFn = timer.tick;
// tickFn(); // Would cause error if called

// Arrow function preserves 'this' (solution)
const tickArrowFn = timer.tickArrow;
tickArrowFn();
console.log(timer.getTime()); // 2

// Using bind as another solution
const boundTick = timer.tick.bind(timer);
boundTick();
console.log(timer.getTime()); // 3
