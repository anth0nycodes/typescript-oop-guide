# Inheritance

## What is Inheritance?

Inheritance allows a class (child/subclass) to inherit properties and methods from another class (parent/superclass). Promotes code reuse and establishes relationships.

## Inheritance Keywords Reference

### Quick Overview

| Keyword | Purpose | Usage | Required? |
|---------|---------|-------|-----------|
| `extends` | Creates parent-child relationship between classes | `class Child extends Parent` | Yes (for inheritance) |
| `super()` | Calls parent class constructor | In child constructor | Yes (if child has constructor) |
| `super.method()` | Calls parent class method | In child methods | No (optional) |
| `super.property` | Accesses parent class property | In child methods | No (optional) |
| `override` | Explicitly marks overridden methods | Before method in child class | No (optional in TS) |

## Deep Dive: The `super` Keyword

### What is `super`?

The `super` keyword is used in child classes to **access and call functions on the parent class**. It serves two primary purposes:

1. **`super()` as a function**: Calls the parent class's constructor
2. **`super` as an object**: Accesses parent class's properties and methods

### `super()` in Constructors

When a child class has its own constructor, it **MUST** call `super()` before accessing `this`.

```typescript
class Vehicle {
  brand: string;
  year: number;

  constructor(brand: string, year: number) {
    console.log("Vehicle constructor called");
    this.brand = brand;
    this.year = year;
  }
}

class Car extends Vehicle {
  model: string;

  constructor(brand: string, year: number, model: string) {
    // ❌ Error: Must call super() before accessing 'this'
    // this.model = model;

    // ✅ Correct: Call super() first
    super(brand, year); // Calls Vehicle's constructor

    // ✅ Now we can use 'this'
    this.model = model;
    console.log("Car constructor called");
  }
}

const myCar = new Car("Toyota", 2024, "Camry");
// Output:
// "Vehicle constructor called"
// "Car constructor called"
```

### Why `super()` is Required

The parent constructor needs to run to properly initialize the inherited properties. Without it, the object would be in an incomplete state.

```typescript
class Animal {
  private age: number;
  private name: string;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
    // Parent might do important validation or setup
    if (age < 0) {
      throw new Error("Age cannot be negative");
    }
  }

  getName(): string {
    return this.name;
  }
}

class Dog extends Animal {
  breed: string;

  constructor(name: string, age: number, breed: string) {
    // super() ensures Animal's constructor runs,
    // which initializes name and age properly
    super(name, age);

    this.breed = breed;
  }
}

// If super() wasn't called, dog.getName() wouldn't work
// because this.name was never initialized!
const dog = new Dog("Buddy", 3, "Labrador");
console.log(dog.getName()); // "Buddy" - works because super() was called
```

### `super()` Execution Order

Understanding the order of operations when creating instances:

```typescript
class GrandParent {
  constructor() {
    console.log("1. GrandParent constructor start");
    console.log("2. GrandParent constructor end");
  }
}

class Parent extends GrandParent {
  parentProp: string = "parent";

  constructor() {
    console.log("3. Parent constructor start (before super)");
    super(); // Calls GrandParent constructor
    console.log("4. Parent constructor end (after super)");
  }
}

class Child extends Parent {
  childProp: string = "child";

  constructor() {
    console.log("5. Child constructor start (before super)");
    super(); // Calls Parent constructor, which calls GrandParent
    console.log("6. Child constructor end (after super)");
  }
}

const child = new Child();
// Output order:
// "5. Child constructor start (before super)"
// "3. Parent constructor start (before super)"
// "1. GrandParent constructor start"
// "2. GrandParent constructor end"
// "4. Parent constructor end (after super)"
// "6. Child constructor end (after super)"
```

### `super.method()` - Calling Parent Methods

Use `super.methodName()` to call the parent class's version of a method:

```typescript
class Shape {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  describe(): string {
    return `This is a ${this.name}`;
  }

  getInfo(): string {
    return `Shape: ${this.name}`;
  }
}

class Rectangle extends Shape {
  width: number;
  height: number;

  constructor(width: number, height: number) {
    super("Rectangle"); // Call parent constructor
    this.width = width;
    this.height = height;
  }

  // Override parent method
  describe(): string {
    // Call parent's describe(), then add more info
    const parentDescription = super.describe();
    return `${parentDescription} with dimensions ${this.width}x${this.height}`;
  }

  getInfo(): string {
    // Can choose to call parent method or completely override
    const baseInfo = super.getInfo();
    return `${baseInfo}, Area: ${this.width * this.height}`;
  }

  // New method that uses super
  compareToParent(): void {
    console.log("Parent says:", super.describe());
    console.log("I say:", this.describe());
  }
}

const rect = new Rectangle(10, 5);
console.log(rect.describe());
// "This is a Rectangle with dimensions 10x5"

rect.compareToParent();
// "Parent says: This is a Rectangle"
// "I say: This is a Rectangle with dimensions 10x5"
```

### `super.property` - Accessing Parent Properties

You can access parent class properties using `super`, but typically you'd just use `this`:

```typescript
class Parent {
  protected parentValue: number = 100;

  getValue(): number {
    return this.parentValue;
  }
}

class Child extends Parent {
  childValue: number = 50;

  showValues(): void {
    // Both work for accessing inherited protected properties
    console.log("Using this:", this.parentValue);
    console.log("Using super:", super.getValue()); // Calling parent method

    // Note: super.parentValue won't work for properties in TypeScript
    // Use super for methods, use this for properties
  }

  getValue(): number {
    // Call parent's getValue and add our value
    return super.getValue() + this.childValue;
  }
}

const child = new Child();
child.showValues();
console.log(child.getValue()); // 150 (100 + 50)
```

### Common `super` Patterns

#### Pattern 1: Extending Parent Functionality

```typescript
class Logger {
  log(message: string): void {
    console.log(`[LOG] ${message}`);
  }
}

class TimestampedLogger extends Logger {
  log(message: string): void {
    const timestamp = new Date().toISOString();
    // Call parent's log with enhanced message
    super.log(`${timestamp} - ${message}`);
  }
}

const logger = new TimestampedLogger();
logger.log("Application started");
// Output: "[LOG] 2024-01-15T10:30:00.000Z - Application started"
```

#### Pattern 2: Template Method Pattern

```typescript
class DataProcessor {
  constructor(protected data: any[]) {}

  process(): void {
    this.validate();
    this.transform();
    this.save();
  }

  protected validate(): void {
    console.log("Basic validation");
  }

  protected transform(): void {
    console.log("Basic transformation");
  }

  protected save(): void {
    console.log("Saving data");
  }
}

class UserDataProcessor extends DataProcessor {
  // Override specific steps while keeping the overall process
  protected validate(): void {
    super.validate(); // Do parent validation first
    console.log("Additional user validation");
  }

  protected transform(): void {
    super.transform(); // Do parent transformation
    console.log("User-specific transformation");
  }

  // save() is inherited as-is
}

const processor = new UserDataProcessor([]);
processor.process();
// Output:
// "Basic validation"
// "Additional user validation"
// "Basic transformation"
// "User-specific transformation"
// "Saving data"
```

#### Pattern 3: Constructor Parameter Forwarding

```typescript
class DatabaseConnection {
  constructor(
    protected host: string,
    protected port: number,
    protected database: string
  ) {
    console.log(`Connecting to ${host}:${port}/${database}`);
  }

  connect(): void {
    console.log("Connected!");
  }
}

class SecureDatabaseConnection extends DatabaseConnection {
  constructor(
    host: string,
    port: number,
    database: string,
    private sslEnabled: boolean,
    private certificatePath?: string
  ) {
    // Forward some parameters to parent, keep others for child
    super(host, port, database);

    if (sslEnabled && !certificatePath) {
      throw new Error("SSL enabled but no certificate provided");
    }
  }

  connect(): void {
    if (this.sslEnabled) {
      console.log(`Setting up SSL with cert: ${this.certificatePath}`);
    }
    super.connect(); // Call parent's connect
  }
}

const secureConn = new SecureDatabaseConnection(
  "localhost",
  5432,
  "mydb",
  true,
  "/path/to/cert"
);
```

### `super` Error Scenarios

```typescript
class Parent {
  value: number = 10;

  constructor() {
    console.log("Parent constructor");
  }

  getValue(): number {
    return this.value;
  }
}

class Child extends Parent {
  constructor() {
    // ❌ Error: 'super' must be called before accessing 'this'
    // this.value = 20;
    // super();

    // ✅ Correct order
    super();
    this.value = 20;
  }

  // ❌ Error: 'super' can only be referenced in members of derived classes
  // (can't use super in a class that doesn't extend anything)
}

// ❌ Error: Constructors for derived classes must contain a 'super' call
class BadChild extends Parent {
  constructor() {
    // Missing super() call!
    // This will cause an error
  }
}

// ✅ OK: If child class has no constructor, super() is called automatically
class GoodChild extends Parent {
  // No constructor = implicit: constructor() { super(); }
}
```

### When You Don't Need `super()`

If your child class doesn't define a constructor, you don't need to call `super()`:

```typescript
class Animal {
  constructor(public name: string) {}
}

// No constructor in Dog = automatic super() call
class Dog extends Animal {
  // Implicitly has: constructor(name: string) { super(name); }

  bark(): void {
    console.log(`${this.name} says woof!`);
  }
}

const dog = new Dog("Buddy"); // Works fine
dog.bark(); // "Buddy says woof!"
```

## Basic Inheritance

```typescript
// Parent/Base/Superclass
class Animal {
  constructor(public name: string, public age: number) {}

  makeSound(): void {
    console.log("Some generic animal sound");
  }

  sleep(): void {
    console.log(`${this.name} is sleeping`);
  }
}

// Child/Derived/Subclass
class Dog extends Animal {
  constructor(name: string, age: number, public breed: string) {
    super(name, age); // MUST call parent constructor first
  }

  // Override parent method
  makeSound(): void {
    console.log("Woof! Woof!");
  }

  // New method specific to Dog
  fetch(): void {
    console.log(`${this.name} is fetching the ball`);
  }
}

const dog = new Dog("Buddy", 3, "Golden Retriever");
dog.makeSound(); // "Woof! Woof!" (overridden)
dog.sleep();     // "Buddy is sleeping" (inherited)
dog.fetch();     // "Buddy is fetching the ball" (new method)
```

## Calling Parent Methods with `super`

```typescript
class Vehicle {
  constructor(public brand: string) {}

  start(): void {
    console.log("Vehicle is starting...");
  }
}

class Car extends Vehicle {
  constructor(brand: string, public model: string) {
    super(brand);
  }

  start(): void {
    super.start(); // Call parent's start method
    console.log(`${this.brand} ${this.model} engine started`);
    console.log("All systems ready");
  }
}

const car = new Car("Toyota", "Camry");
car.start();
// Output:
// Vehicle is starting...
// Toyota Camry engine started
// All systems ready
```

## Protected Members in Inheritance

```typescript
class BankAccount {
  protected balance: number;

  constructor(initialBalance: number) {
    this.balance = initialBalance;
  }

  getBalance(): number {
    return this.balance;
  }
}

class SavingsAccount extends BankAccount {
  private interestRate: number;

  constructor(initialBalance: number, interestRate: number) {
    super(initialBalance);
    this.interestRate = interestRate;
  }

  addInterest(): void {
    // Can access protected 'balance' from parent
    const interest = this.balance * this.interestRate;
    this.balance += interest;
    console.log(`Added $${interest} interest`);
  }
}

const savings = new SavingsAccount(1000, 0.05);
savings.addInterest(); // ✅ OK
// savings.balance; // ❌ Error - protected
```

## Multi-Level Inheritance

```typescript
class LivingBeing {
  breathe(): void {
    console.log("Breathing...");
  }
}

class Animal extends LivingBeing {
  move(): void {
    console.log("Moving...");
  }
}

class Mammal extends Animal {
  feedYoung(): void {
    console.log("Feeding young with milk");
  }
}

class Dog extends Mammal {
  bark(): void {
    console.log("Woof!");
  }
}

const dog = new Dog();
dog.breathe();   // From LivingBeing
dog.move();      // From Animal
dog.feedYoung(); // From Mammal
dog.bark();      // From Dog
```

## Method Overriding Rules

- Child method must have same or more accessible visibility
- Can't override `private` methods (they're not inherited)
- Can override `protected` and `public` methods

```typescript
class Parent {
  public greet(): void {
    console.log("Hello from parent");
  }
}

class Child extends Parent {
  // ✅ OK - same visibility (public)
  public greet(): void {
    console.log("Hello from child");
  }

  // ❌ Would be error - can't reduce visibility
  // private greet(): void { }
}
```
