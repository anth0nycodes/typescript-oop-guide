# Methods and the `this` Keyword

## Instance Methods: Defining Behavior

Methods are functions that belong to a class. They define what objects can **do**. Each object created from the class can call these methods.

### Basic Method Syntax

```typescript
class Calculator {
  result: number = 0;

  // Method: function inside a class
  add(value: number): void {
    this.result += value;
  }

  subtract(value: number): void {
    this.result -= value;
  }

  getResult(): number {
    return this.result;
  }
}

const calc = new Calculator();
calc.add(10);
calc.subtract(3);
console.log(calc.getResult()); // 7
```

### Methods with Different Return Types

```typescript
class User {
  constructor(
    public username: string,
    public email: string,
    private loginCount: number = 0
  ) {}

  // void - no return value
  login(): void {
    this.loginCount++;
    console.log(`${this.username} logged in`);
  }

  // string - returns text
  getGreeting(): string {
    return `Hello, ${this.username}!`;
  }

  // number - returns a number
  getLoginCount(): number {
    return this.loginCount;
  }

  // boolean - returns true/false
  hasLoggedIn(): boolean {
    return this.loginCount > 0;
  }
}
```

### Methods Can Call Other Methods

Methods can call other methods on the same object using `this`:

```typescript
class ShoppingCart {
  private items: string[] = [];
  private total: number = 0;

  addItem(item: string, price: number): void {
    this.items.push(item);
    this.total += price;
    this.displayStatus(); // Call another method
  }

  removeItem(item: string, price: number): void {
    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
      this.total -= price;
      this.displayStatus(); // Call another method
    }
  }

  private displayStatus(): void {
    console.log(`Cart has ${this.items.length} items, total: $${this.total}`);
  }

  checkout(): void {
    console.log("Checking out...");
    this.displayStatus();
    this.clear(); // Call another method
  }

  private clear(): void {
    this.items = [];
    this.total = 0;
  }
}
```

## The `this` Keyword Deep Dive

### What is `this`?

`this` is a special keyword that refers to **the current object** that is using the method. It's how methods access the object's properties and other methods.

```typescript
class Person {
  constructor(public name: string, public age: number) {}

  describe(): string {
    // 'this' refers to whichever Person object called describe()
    return `${this.name} is ${this.age} years old`;
  }
}

const alice = new Person("Alice", 30);
const bob = new Person("Bob", 25);

console.log(alice.describe()); // "Alice is 30 years old" - this = alice
console.log(bob.describe());   // "Bob is 25 years old" - this = bob
```

### Why `this` is Necessary

Without `this`, methods couldn't access the object's properties:

```typescript
class Counter {
  count: number = 0;

  increment(): void {
    // Must use 'this' to access the count property
    this.count++;

    // Without 'this', JavaScript looks for a local variable 'count'
    // which doesn't exist!
  }

  getCount(): number {
    return this.count; // 'this' makes it clear: the object's count
  }
}
```

### `this` Points to Different Objects

The same method works correctly for different objects because `this` changes:

```typescript
class BankAccount {
  constructor(
    public owner: string,
    private balance: number
  ) {}

  deposit(amount: number): void {
    this.balance += amount;
    console.log(`${this.owner}'s new balance: $${this.balance}`);
  }
}

const account1 = new BankAccount("Alice", 1000);
const account2 = new BankAccount("Bob", 500);

account1.deposit(200); // "Alice's new balance: $1200" - this = account1
account2.deposit(100); // "Bob's new balance: $600" - this = account2
```

## The `this` Context Problem

### Losing `this` Context

**Problem:** The value of `this` depends on **how a function is called**, not where it's defined. This can cause issues:

```typescript
class Counter {
  count: number = 0;

  increment(): void {
    this.count++;
    console.log(this.count);
  }
}

const counter = new Counter();

// Direct call - 'this' works
counter.increment(); // ✅ 1

// Extracted method - 'this' is lost!
const incrementFn = counter.increment;
// incrementFn(); // ❌ Error! 'this' is undefined
```

### Common Scenario: Event Handlers

This problem often appears with event handlers and callbacks:

```typescript
class Button {
  label: string = "Click me";
  clickCount: number = 0;

  handleClick(): void {
    this.clickCount++;
    console.log(`${this.label} clicked ${this.clickCount} times`);
  }
}

const button = new Button();

// Simulating event listener
const element = {
  addEventListener: (event: string, callback: () => void) => {
    callback(); // Calls function without 'this' context
  }
};

// This won't work as expected:
// element.addEventListener("click", button.handleClick); // ❌ 'this' will be undefined
```

## Solutions to the `this` Problem

### Solution 1: Arrow Functions

Arrow functions **preserve** the `this` context from where they're defined:

```typescript
class Counter {
  count: number = 0;

  // Regular method - 'this' can be lost
  increment(): void {
    this.count++;
  }

  // Arrow function method - 'this' is permanently bound
  incrementArrow = (): void => {
    this.count++;
  }
}

const counter = new Counter();

// Regular method - loses 'this'
const inc1 = counter.increment;
// inc1(); // ❌ Error

// Arrow function - keeps 'this'
const inc2 = counter.incrementArrow;
inc2(); // ✅ Works! this is still counter
console.log(counter.count); // 1
```

### Solution 2: `.bind()`

Use `.bind()` to permanently attach `this` to a function:

```typescript
class Logger {
  constructor(public prefix: string) {}

  log(message: string): void {
    console.log(`[${this.prefix}] ${message}`);
  }
}

const logger = new Logger("APP");

// Without bind - loses 'this'
const logFn1 = logger.log;
// logFn1("test"); // ❌ Error

// With bind - keeps 'this'
const logFn2 = logger.log.bind(logger);
logFn2("test"); // ✅ "[APP] test"
```

### Solution 3: Wrapper Functions

Wrap the method call in another function:

```typescript
class Counter {
  count: number = 0;

  increment(): void {
    this.count++;
  }
}

const counter = new Counter();

// Wrapper function keeps the context
const incrementFn = () => counter.increment();
incrementFn(); // ✅ Works
```

### When to Use Each Solution

```typescript
class EventHandler {
  message: string = "Hello";

  // Use arrow functions for callbacks that will be passed around
  handleClick = (): void => {
    console.log(this.message); // 'this' always works
  }

  // Use regular methods when you control how they're called
  display(): void {
    console.log(this.message);
  }
}

const handler = new EventHandler();

// Passing to event listener - arrow function is safe
button.addEventListener("click", handler.handleClick);

// Direct call - regular method is fine
handler.display();
```

## Arrow Functions vs Regular Methods

### Regular Methods

```typescript
class Example {
  value: number = 42;

  // Regular method
  regularMethod(): void {
    console.log(this.value);
  }
}

const ex = new Example();
ex.regularMethod(); // ✅ Works when called directly

// But can lose 'this' when passed around
const fn = ex.regularMethod;
// fn(); // ❌ Might fail
```

### Arrow Function Methods

```typescript
class Example {
  value: number = 42;

  // Arrow function method (property)
  arrowMethod = (): void => {
    console.log(this.value);
  }
}

const ex = new Example();
ex.arrowMethod(); // ✅ Works

// Keeps 'this' even when extracted
const fn = ex.arrowMethod;
fn(); // ✅ Still works!
```

### Trade-offs

| Aspect | Regular Methods | Arrow Functions |
|--------|----------------|-----------------|
| `this` binding | Can be lost | Always preserved |
| Memory | Shared across instances | Created per instance |
| Inheritance | Can be overridden | Cannot be overridden |
| Use for | Normal methods | Callbacks, event handlers |

```typescript
class MyClass {
  // Regular method - one shared copy for all instances
  regularMethod(): void {}

  // Arrow function - each instance gets its own copy
  arrowMethod = (): void => {}
}

const obj1 = new MyClass();
const obj2 = new MyClass();

// Regular methods are shared
console.log(obj1.regularMethod === obj2.regularMethod); // true

// Arrow functions are not shared
console.log(obj1.arrowMethod === obj2.arrowMethod); // false
```

## Method Chaining with `this`

Return `this` from methods to enable chaining:

```typescript
class QueryBuilder {
  private query: string = "";

  select(fields: string): this {
    this.query += `SELECT ${fields} `;
    return this; // Return the object itself
  }

  from(table: string): this {
    this.query += `FROM ${table} `;
    return this;
  }

  where(condition: string): this {
    this.query += `WHERE ${condition} `;
    return this;
  }

  build(): string {
    return this.query.trim();
  }
}

// Chain methods together
const query = new QueryBuilder()
  .select("*")
  .from("users")
  .where("age > 18")
  .build();

console.log(query); // "SELECT * FROM users WHERE age > 18"
```

### Why Return `this`?

```typescript
class Calculator {
  private result: number = 0;

  add(value: number): this {
    this.result += value;
    return this; // Allow chaining
  }

  multiply(value: number): this {
    this.result *= value;
    return this;
  }

  subtract(value: number): this {
    this.result -= value;
    return this;
  }

  getResult(): number {
    return this.result;
  }
}

// Without chaining (tedious):
const calc1 = new Calculator();
calc1.add(10);
calc1.multiply(2);
calc1.subtract(5);
console.log(calc1.getResult()); // 15

// With chaining (fluent):
const calc2 = new Calculator();
const result = calc2
  .add(10)
  .multiply(2)
  .subtract(5)
  .getResult();
console.log(result); // 15
```

## Advanced `this` Patterns

### `this` in Nested Functions

```typescript
class Timer {
  seconds: number = 0;

  // Regular function problem
  startBroken(): void {
    setInterval(function() {
      // ❌ 'this' is NOT the Timer instance here!
      // this.seconds++;
    }, 1000);
  }

  // Arrow function solution
  startFixed(): void {
    setInterval(() => {
      // ✅ Arrow function preserves 'this'
      this.seconds++;
      console.log(this.seconds);
    }, 1000);
  }
}

const timer = new Timer();
timer.startFixed(); // Counts: 1, 2, 3, ...
```

### `this` with Array Methods

```typescript
class TodoList {
  todos: string[] = ["Task 1", "Task 2", "Task 3"];

  // Problem: losing 'this' in callbacks
  printAllBroken(): void {
    this.todos.forEach(function(todo) {
      // ❌ 'this' is undefined here
      // console.log(`${this.prefix}: ${todo}`);
    });
  }

  // Solution 1: Arrow function
  printAllArrow(): void {
    this.todos.forEach((todo) => {
      // ✅ Arrow function preserves 'this'
      console.log(`Todo: ${todo}`);
    });
  }

  // Solution 2: bind
  printAllBind(): void {
    this.todos.forEach(function(todo) {
      console.log(`Todo: ${todo}`);
    }.bind(this)); // Bind 'this' to the callback
  }
}
```

## Key Takeaways

1. **Methods** define what objects can do
2. **`this`** refers to the current object instance
3. **`this` can be lost** when methods are passed as callbacks
4. **Arrow functions** preserve `this` automatically
5. **`.bind()`** can permanently attach `this` to a function
6. **Return `this`** to enable method chaining
7. **Use arrow functions** for event handlers and callbacks
8. **Use regular methods** for normal object behavior

## What's Next?

- Learn about static members that belong to the class (File 04)
- Control access with access modifiers (File 05)
- Use getters and setters for controlled property access (File 06)
