# Classes and Objects - The Foundation

## What is a Class?

A **class** is a blueprint or template for creating objects. Think of it like an architectural blueprint:
- A blueprint describes what a house will look like (rooms, doors, windows)
- A class describes what objects will contain (properties) and what they can do (methods)

```typescript
// This is a blueprint for creating Person objects
class Person {
  name: string;
  age: number;
}
```

When you create a class, you're defining a new **custom type** that you can use throughout your application.

## Class Syntax and Anatomy

A class definition consists of several parts:

```typescript
class ClassName {
  // 1. Properties - data that each object holds
  propertyName: type;

  // 2. Constructor - initializes new objects
  constructor(parameters) {
    // Initialization code
  }

  // 3. Methods - functions that define behavior
  methodName(): returnType {
    // Method code
  }
}
```

### Example Breakdown

```typescript
class Car {
  // Properties: what data does each Car object have?
  brand: string;
  model: string;
  year: number;

  // Constructor: how do we create a new Car?
  constructor(brand: string, model: string, year: number) {
    this.brand = brand;
    this.model = model;
    this.year = year;
  }

  // Method: what can a Car do?
  getInfo(): string {
    return `${this.year} ${this.brand} ${this.model}`;
  }
}
```

## Creating Objects with the `new` Keyword

To create an object from a class, use the `new` keyword:

```typescript
// Create a new Car object
const myCar = new Car("Toyota", "Camry", 2024);

// Each object is independent
const yourCar = new Car("Honda", "Civic", 2023);

console.log(myCar.getInfo());  // "2024 Toyota Camry"
console.log(yourCar.getInfo()); // "2023 Honda Civic"
```

### What Does `new` Do?

When you write `new Car(...)`, JavaScript:
1. Creates a new empty object
2. Runs the constructor to set up the object's properties
3. Returns the fully initialized object

```typescript
// This:
const car = new Car("Tesla", "Model 3", 2024);

// Creates an object like:
// {
//   brand: "Tesla",
//   model: "Model 3",
//   year: 2024,
//   getInfo: [Function]
// }
```

### Must Use `new`

You **must** use `new` when creating class instances:

```typescript
const car1 = new Car("Toyota", "Camry", 2024); // ✅ Correct

// const car2 = Car("Honda", "Civic", 2023);    // ❌ Error!
// Class constructor cannot be invoked without 'new'
```

## Naming Conventions

Following consistent naming conventions makes your code more readable:

| Element | Convention | Examples |
|---------|------------|----------|
| Classes | **PascalCase** | `Person`, `ShoppingCart`, `UserAccount` |
| Properties | **camelCase** | `firstName`, `totalPrice`, `isActive` |
| Methods | **camelCase** | `calculateTotal()`, `getUserData()`, `save()` |
| Private members | **_camelCase** | `_password`, `_internalState` |
| Constants | **UPPER_SNAKE_CASE** | `MAX_RETRIES`, `DEFAULT_TIMEOUT` |

```typescript
class ShoppingCart {
  // Properties: camelCase
  itemCount: number;
  totalPrice: number;

  // Private property: underscore prefix (convention)
  private _discountCode: string;

  // Constant: UPPER_SNAKE_CASE
  static readonly MAX_ITEMS: number = 100;

  constructor() {
    this.itemCount = 0;
    this.totalPrice = 0;
    this._discountCode = "";
  }

  // Methods: camelCase
  addItem(price: number): void {
    this.itemCount++;
    this.totalPrice += price;
  }

  getTotal(): number {
    return this.totalPrice;
  }
}
```

## Complete Example: Building a Book Class

Let's build a complete example step by step:

```typescript
class Book {
  // Properties
  title: string;
  author: string;
  pages: number;
  isRead: boolean;

  // Constructor
  constructor(title: string, author: string, pages: number) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = false; // Default value
  }

  // Methods
  markAsRead(): void {
    this.isRead = true;
    console.log(`"${this.title}" marked as read`);
  }

  getSummary(): string {
    const status = this.isRead ? "finished" : "not read yet";
    return `"${this.title}" by ${this.author} (${this.pages} pages) - ${status}`;
  }
}

// Using the Book class
const book1 = new Book("1984", "George Orwell", 328);
const book2 = new Book("The Hobbit", "J.R.R. Tolkien", 310);

console.log(book1.getSummary());
// "1984" by George Orwell (328 pages) - not read yet

book1.markAsRead();
// "1984" marked as read

console.log(book1.getSummary());
// "1984" by George Orwell (328 pages) - finished

// book1 and book2 are completely independent objects
console.log(book2.isRead); // false - book2 wasn't affected
```

## Checking Object Types with `instanceof`

The `instanceof` operator checks if an object was created from a specific class:

```typescript
class Dog {
  constructor(public name: string) {}
}

class Cat {
  constructor(public name: string) {}
}

const myDog = new Dog("Buddy");
const myCat = new Cat("Whiskers");

console.log(myDog instanceof Dog);  // true
console.log(myDog instanceof Cat);  // false
console.log(myCat instanceof Cat);  // true

// Useful for type checking
function handlePet(pet: Dog | Cat) {
  if (pet instanceof Dog) {
    console.log("It's a dog!");
  } else if (pet instanceof Cat) {
    console.log("It's a cat!");
  }
}

handlePet(myDog);  // "It's a dog!"
handlePet(myCat);  // "It's a cat!"
```

## Key Takeaways

1. **Classes are blueprints** for creating objects with specific properties and behaviors
2. **Use `new ClassName()`** to create objects from a class
3. **Each object is independent** - changing one doesn't affect others
4. **Properties** store data, **methods** define actions
5. **Constructor** runs automatically when creating new objects
6. **Follow naming conventions** for consistent, readable code

## Properties: The Data Objects Hold

Properties (also called fields or attributes) are variables that belong to a class. Each object created from the class gets its own copy of these properties.

### Property Declaration

```typescript
class User {
  // Declare properties with types
  username: string;
  email: string;
  age: number;
  isActive: boolean;
}
```

### Property Initialization Methods

There are four main ways to initialize properties:

```typescript
class Example {
  // 1. Inline initialization - happens before constructor
  prop1: string = "default value";

  // 2. Initialization in constructor (most common)
  prop2: string;

  // 3. Optional property (can be undefined)
  prop3?: number;

  // 4. Definite assignment assertion (promise to initialize later)
  prop4!: string;

  constructor() {
    this.prop2 = "initialized in constructor";
    // prop3 is undefined (optional, so it's okay)
    this.prop4 = "initialized as promised";
  }
}
```

### Property Types

```typescript
class Product {
  // Primitive types
  name: string;
  price: number;
  inStock: boolean;

  // Arrays
  tags: string[];
  ratings: number[];

  // Objects
  manufacturer: {
    name: string;
    country: string;
  };

  // Dates
  createdAt: Date;

  // Optional
  description?: string;

  // Union types
  status: "available" | "out-of-stock" | "discontinued";

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
    this.inStock = true;
    this.tags = [];
    this.ratings = [];
    this.manufacturer = { name: "", country: "" };
    this.createdAt = new Date();
    this.status = "available";
  }
}
```

## The Constructor: Initializing Objects

The **constructor** is a special method that automatically runs when you create a new object with `new`. Its job is to set up the initial state of the object.

### Basic Constructor

```typescript
class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    console.log("Constructor is running!");

    // Initialize properties
    this.name = name;
    this.age = age;

    console.log(`Created person: ${name}`);
  }
}

const alice = new Person("Alice", 30);
// Output:
// "Constructor is running!"
// "Created person: Alice"
```

### Constructor Rules

1. **Name is always `constructor`** (not the class name)
2. **No return type** (implicitly returns the new object)
3. **Only one constructor per class** (no overloading)
4. **Optional** - if not defined, an empty one is provided

```typescript
// These classes are equivalent:

class Example1 {
  // No constructor defined
}

class Example2 {
  constructor() {
    // Empty constructor automatically provided
  }
}
```

### Constructor Execution Flow

Understanding what happens when you create an instance:

```typescript
class Car {
  brand: string;
  model: string;
  mileage: number = 0; // Default value set before constructor

  constructor(brand: string, model: string) {
    console.log("Step 1: Constructor starts");

    // Step 1: Memory allocated for new object
    // Step 2: Default values assigned (mileage = 0)
    // Step 3: Constructor body executes

    this.brand = brand;
    this.model = model;

    console.log("Step 2: Properties initialized");

    // Step 4: Object automatically returned
  }
}

console.log("About to create car...");
const car = new Car("Toyota", "Camry");
console.log("Car created!");

// Output:
// "About to create car..."
// "Step 1: Constructor starts"
// "Step 2: Properties initialized"
// "Car created!"
```

### Constructor Validation

Constructors are perfect for validating data:

```typescript
class BankAccount {
  accountNumber: string;
  balance: number;
  owner: string;

  constructor(accountNumber: string, owner: string, initialBalance: number) {
    // Validate inputs
    if (initialBalance < 0) {
      throw new Error("Initial balance cannot be negative");
    }

    if (!owner || owner.trim() === "") {
      throw new Error("Owner name is required");
    }

    if (!/^\d{10}$/.test(accountNumber)) {
      throw new Error("Account number must be 10 digits");
    }

    // If validation passes, initialize
    this.accountNumber = accountNumber;
    this.owner = owner;
    this.balance = initialBalance;
  }
}

// Valid
const account1 = new BankAccount("1234567890", "Alice", 1000);

// Invalid - will throw error
// const account2 = new BankAccount("123", "Bob", -500);
```

## The `this` Keyword (Basics)

The `this` keyword refers to the current object being created or used. It's how you access the object's properties and methods from inside the class.

### Why `this` is Necessary

Without `this`, you can't tell the difference between parameters and properties:

```typescript
class Rectangle {
  width: number;
  height: number;

  constructor(width: number, height: number) {
    // Which 'width' is which?
    // this.width = property (belongs to object)
    // width = parameter (from constructor)

    this.width = width;   // Set property to parameter value
    this.height = height;
  }
}
```

### `this` in Constructors

```typescript
class User {
  firstName: string;
  lastName: string;
  fullName: string;

  constructor(firstName: string, lastName: string) {
    // Use 'this' to access the object being created
    this.firstName = firstName;
    this.lastName = lastName;

    // 'this' lets you access other properties
    this.fullName = `${this.firstName} ${this.lastName}`;
  }
}

const user = new User("John", "Doe");
console.log(user.fullName); // "John Doe"
```

### `this` Points to the Instance

Each object has its own `this`:

```typescript
class Counter {
  count: number = 0;

  constructor(startValue: number) {
    this.count = startValue; // 'this' refers to the specific counter
  }
}

const counter1 = new Counter(0);
const counter2 = new Counter(10);

console.log(counter1.count); // 0 - counter1's 'this'
console.log(counter2.count); // 10 - counter2's 'this'
```

## Parameter Properties (Constructor Shorthand)

TypeScript provides a shortcut for declaring and initializing properties in the constructor:

### Traditional Way

```typescript
class Product {
  name: string;
  price: number;
  category: string;

  constructor(name: string, price: number, category: string) {
    this.name = name;
    this.price = price;
    this.category = category;
  }
}
```

### Shorthand Way

```typescript
class Product {
  // Access modifier in constructor parameter = automatic property
  constructor(
    public name: string,
    public price: number,
    public category: string
  ) {
    // Properties automatically declared and assigned!
    // No need for this.name = name, etc.
  }
}

const product = new Product("Laptop", 999, "Electronics");
console.log(product.name); // "Laptop"
```

### How Parameter Properties Work

Adding `public`, `private`, `protected`, or `readonly` before a constructor parameter:
1. **Declares** the property
2. **Initializes** it with the parameter value
3. **Saves you code**

```typescript
// These are EXACTLY equivalent:

// Verbose version
class User1 {
  username: string;
  email: string;

  constructor(username: string, email: string) {
    this.username = username;
    this.email = email;
  }
}

// Shorthand version
class User2 {
  constructor(
    public username: string,
    public email: string
  ) {}
}
```

### Mixing Regular and Parameter Properties

```typescript
class Employee {
  // Regular property
  salary: number;

  // Parameter properties (with access modifiers)
  constructor(
    public name: string,
    public id: string,
    initialSalary: number  // Regular parameter (no modifier)
  ) {
    // Regular parameter needs manual assignment
    this.salary = initialSalary;

    // public name and public id are auto-assigned!
  }
}
```

## Optional and Default Parameters

### Optional Parameters

Use `?` to make constructor parameters optional:

```typescript
class User {
  constructor(
    public username: string,
    public email: string,
    public age?: number  // Optional
  ) {}
}

// Both valid
const user1 = new User("alice", "alice@example.com", 25);
const user2 = new User("bob", "bob@example.com"); // age is undefined
```

### Default Parameters

Provide default values for parameters:

```typescript
class User {
  constructor(
    public username: string,
    public email: string,
    public role: string = "user",     // Default: "user"
    public isActive: boolean = true   // Default: true
  ) {}
}

const user1 = new User("alice", "alice@example.com");
console.log(user1.role);     // "user" (default)
console.log(user1.isActive); // true (default)

const admin = new User("admin", "admin@example.com", "admin", true);
console.log(admin.role);     // "admin" (provided)
```

### Combining Optional and Default

```typescript
class BlogPost {
  constructor(
    public title: string,
    public content: string,
    public author: string = "Anonymous",  // Default value
    public tags?: string[],               // Optional
    public publishedAt: Date = new Date() // Default: current time
  ) {}
}

const post1 = new BlogPost("Hello", "World");
console.log(post1.author);      // "Anonymous"
console.log(post1.tags);        // undefined
console.log(post1.publishedAt); // Current date/time

const post2 = new BlogPost(
  "TypeScript Guide",
  "Learn TypeScript...",
  "John Doe",
  ["typescript", "tutorial"]
);
console.log(post2.author); // "John Doe"
console.log(post2.tags);   // ["typescript", "tutorial"]
```

## Constructor Patterns

### Pattern 1: Computed Properties

```typescript
class Person {
  firstName: string;
  lastName: string;
  fullName: string;
  initials: string;

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;

    // Compute derived values in constructor
    this.fullName = `${firstName} ${lastName}`;
    this.initials = `${firstName[0]}${lastName[0]}`.toUpperCase();
  }
}

const person = new Person("John", "Doe");
console.log(person.fullName);  // "John Doe"
console.log(person.initials);  // "JD"
```

### Pattern 2: Setup Logic

```typescript
class GameCharacter {
  name: string;
  health: number;
  inventory: string[];
  createdAt: Date;

  constructor(name: string) {
    this.name = name;

    // Perform setup in constructor
    this.health = 100;
    this.inventory = ["sword", "shield"]; // Start with basic items
    this.createdAt = new Date();

    console.log(`${name} has entered the game!`);
  }
}
```

### Pattern 3: Factory Methods (Alternative to Constructor Overloading)

Since TypeScript only allows one constructor, use static methods for alternative ways to create objects:

```typescript
class User {
  constructor(
    public username: string,
    public email: string,
    public role: string
  ) {}

  // Static factory methods provide alternative creation patterns
  static createAdmin(username: string, email: string): User {
    return new User(username, email, "admin");
  }

  static createGuest(): User {
    const randomId = Math.random().toString(36).substring(7);
    return new User(`guest_${randomId}`, "", "guest");
  }

  static createFromData(data: { username: string; email: string }): User {
    return new User(data.username, data.email, "user");
  }
}

// Different ways to create users
const admin = User.createAdmin("alice", "alice@example.com");
const guest = User.createGuest();
const user = User.createFromData({ username: "bob", email: "bob@example.com" });

console.log(admin.role);  // "admin"
console.log(guest.role);  // "guest"
console.log(user.role);   // "user"
```

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

1. **Classes are blueprints** for creating objects with specific properties and behaviors
2. **Properties** store the data that objects hold
3. **Constructor** initializes objects when created with `new` and can validate input
4. **`this`** refers to the current object instance
5. **Parameter properties** (with access modifiers) save you code
6. **Optional and default parameters** make constructors flexible
7. **Static factory methods** provide alternative ways to create objects
8. **Methods** define what objects can do
9. **`this` can be lost** when methods are passed as callbacks
10. **Arrow functions** preserve `this` automatically
11. **`.bind()`** can permanently attach `this` to a function
12. **Return `this`** to enable method chaining
13. **Use arrow functions** for event handlers and callbacks
14. **Use regular methods** for normal object behavior

## What's Next?

Now that you have a comprehensive understanding of classes, objects, properties, constructors, methods, and `this`, you'll learn:
- Static members that belong to the class itself (File 02)
- Inheritance to extend classes and reuse code (File 03)
- Getters and setters for controlled property access (File 04)
- Access modifiers to control visibility (File 05)
