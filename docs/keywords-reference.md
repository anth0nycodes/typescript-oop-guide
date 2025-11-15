# TypeScript OOP Keywords Reference

Quick reference guide for all TypeScript Object-Oriented Programming keywords.

## Core Keywords

### `class`
**Purpose:** Defines a blueprint for creating objects
**Syntax:** `class ClassName { }`
**Used in:** Top-level declaration
**Learn more:** [01-classes-and-objects.md](01-classes-and-objects.md)

```typescript
class Person {
  name: string;
  age: number;
}
```

---

### `new`
**Purpose:** Creates an instance of a class
**Syntax:** `new ClassName(arguments)`
**Used in:** Anywhere you create objects
**Learn more:** [01-classes-and-objects.md](01-classes-and-objects.md#creating-objects-with-the-new-keyword)

```typescript
const person = new Person("Alice", 30);
```

---

### `constructor`
**Purpose:** Special method that initializes new objects
**Syntax:** `constructor(parameters) { }`
**Used in:** Inside class body
**Learn more:** [02-properties-and-constructors.md](02-properties-and-constructors.md#the-constructor-initializing-objects)

```typescript
class User {
  constructor(public username: string, public email: string) {
    console.log("User created!");
  }
}
```

---

### `this`
**Purpose:** Refers to the current instance of the class
**Syntax:** `this.propertyName` or `this.methodName()`
**Used in:** Inside class methods and constructor
**Learn more:** [02-properties-and-constructors.md](02-properties-and-constructors.md#the-this-keyword-basics), [03-methods-and-this.md](03-methods-and-this.md)

```typescript
class Counter {
  count: number = 0;

  increment(): void {
    this.count++; // Refers to current Counter instance
  }
}
```

---

### `static`
**Purpose:** Makes members belong to the class itself, not instances
**Syntax:** `static propertyName: type` or `static methodName() { }`
**Used in:** Before properties or methods
**Learn more:** [04-static-members.md](04-static-members.md)

```typescript
class MathUtils {
  static PI: number = 3.14159;

  static add(a: number, b: number): number {
    return a + b;
  }
}

// Access via class name
console.log(MathUtils.PI);
console.log(MathUtils.add(2, 3));
```

---

## Access Modifiers

### `public`
**Purpose:** Makes members accessible everywhere (default)
**Syntax:** `public propertyName: type`
**Used in:** Before properties, methods, or constructor parameters
**Learn more:** [05-access-modifiers-encapsulation.md](05-access-modifiers-encapsulation.md#the-public-modifier)

```typescript
class Car {
  public brand: string; // Accessible everywhere

  constructor(brand: string) {
    this.brand = brand;
  }
}

const car = new Car("Toyota");
console.log(car.brand); // ✅ OK
```

---

### `private`
**Purpose:** Makes members accessible only within the class
**Syntax:** `private propertyName: type`
**Used in:** Before properties, methods, or constructor parameters
**Learn more:** [05-access-modifiers-encapsulation.md](05-access-modifiers-encapsulation.md#the-private-modifier)

```typescript
class BankAccount {
  private balance: number; // Only accessible inside BankAccount

  deposit(amount: number): void {
    this.balance += amount; // ✅ OK - within class
  }
}

const account = new BankAccount();
// console.log(account.balance); // ❌ Error - private
```

---

### `protected`
**Purpose:** Makes members accessible within class and subclasses
**Syntax:** `protected propertyName: type`
**Used in:** Before properties, methods, or constructor parameters
**Learn more:** [05-access-modifiers-encapsulation.md](05-access-modifiers-encapsulation.md#the-protected-modifier)

```typescript
class Animal {
  protected species: string; // Accessible in Animal and subclasses

  constructor(species: string) {
    this.species = species;
  }
}

class Dog extends Animal {
  describe(): string {
    return `This is a ${this.species}`; // ✅ OK - in subclass
  }
}

const dog = new Dog("Canis familiaris");
// console.log(dog.species); // ❌ Error - protected
```

---

### `readonly`
**Purpose:** Makes properties immutable after initialization
**Syntax:** `readonly propertyName: type`
**Used in:** Before properties or constructor parameters
**Learn more:** [05-access-modifiers-encapsulation.md](05-access-modifiers-encapsulation.md#the-readonly-modifier)

```typescript
class User {
  readonly id: string;
  readonly createdAt: Date;

  constructor(id: string) {
    this.id = id;                // ✅ OK - in constructor
    this.createdAt = new Date(); // ✅ OK - in constructor
  }
}

const user = new User("user-123");
// user.id = "user-456"; // ❌ Error - readonly
```

---

## Getters and Setters

### `get`
**Purpose:** Defines a getter for computed or controlled property access
**Syntax:** `get propertyName(): type { return value; }`
**Used in:** Inside class body
**Learn more:** [06-getters-setters.md](06-getters-setters.md)

```typescript
class Circle {
  constructor(public radius: number) {}

  get area(): number {
    return Math.PI * this.radius * this.radius;
  }
}

const circle = new Circle(5);
console.log(circle.area); // Accessed like a property
```

---

### `set`
**Purpose:** Defines a setter for controlled property modification
**Syntax:** `set propertyName(value: type) { }`
**Used in:** Inside class body
**Learn more:** [06-getters-setters.md](06-getters-setters.md)

```typescript
class User {
  private _age: number = 0;

  set age(value: number) {
    if (value >= 0 && value < 150) {
      this._age = value;
    } else {
      throw new Error("Invalid age");
    }
  }

  get age(): number {
    return this._age;
  }
}

const user = new User();
user.age = 25; // Calls the setter
console.log(user.age); // Calls the getter
```

---

## Inheritance Keywords

### `extends`
**Purpose:** Creates inheritance relationship between classes
**Syntax:** `class Child extends Parent { }`
**Used in:** Class declaration
**Learn more:** [07-inheritance.md](07-inheritance.md)

```typescript
class Animal {
  constructor(public name: string) {}
}

class Dog extends Animal {
  bark(): void {
    console.log("Woof!");
  }
}

const dog = new Dog("Buddy");
console.log(dog.name); // Inherited from Animal
dog.bark();            // Defined in Dog
```

---

### `super`
**Purpose:** Refers to parent class (for constructors and methods)
**Syntax:** `super(arguments)` or `super.methodName()`
**Used in:** Inside child class constructor or methods
**Learn more:** [07-inheritance.md](07-inheritance.md#deep-dive-the-super-keyword)

```typescript
class Vehicle {
  constructor(public brand: string) {}

  start(): void {
    console.log("Vehicle starting...");
  }
}

class Car extends Vehicle {
  constructor(brand: string, public model: string) {
    super(brand); // Call parent constructor
  }

  start(): void {
    super.start(); // Call parent method
    console.log(`${this.brand} ${this.model} started`);
  }
}
```

---

## Abstract Classes and Interfaces

### `abstract`
**Purpose:** Defines abstract classes or methods that must be implemented by subclasses
**Syntax:** `abstract class ClassName { }` or `abstract methodName(): type;`
**Used in:** Class declaration or method declaration
**Learn more:** [08-abstract-classes.md](08-abstract-classes.md)

```typescript
abstract class Shape {
  abstract getArea(): number; // Must be implemented

  describe(): void {
    console.log(`Area: ${this.getArea()}`);
  }
}

class Circle extends Shape {
  constructor(public radius: number) {
    super();
  }

  getArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}

// const shape = new Shape(); // ❌ Error - cannot instantiate abstract class
const circle = new Circle(5); // ✅ OK
```

---

### `interface`
**Purpose:** Defines a contract that classes must follow
**Syntax:** `interface InterfaceName { }`
**Used in:** Top-level declaration
**Learn more:** [09-interfaces-polymorphism.md](09-interfaces-polymorphism.md)

```typescript
interface Printable {
  print(): void;
}

interface Saveable {
  save(): void;
}

class Document implements Printable, Saveable {
  print(): void {
    console.log("Printing document...");
  }

  save(): void {
    console.log("Saving document...");
  }
}
```

---

### `implements`
**Purpose:** Makes a class implement an interface
**Syntax:** `class ClassName implements InterfaceName { }`
**Used in:** Class declaration
**Learn more:** [09-interfaces-polymorphism.md](09-interfaces-polymorphism.md)

```typescript
interface Vehicle {
  start(): void;
  stop(): void;
}

class Car implements Vehicle {
  start(): void {
    console.log("Car starting");
  }

  stop(): void {
    console.log("Car stopping");
  }
}
```

---

## Type Checking

### `instanceof`
**Purpose:** Checks if an object was created from a specific class
**Syntax:** `object instanceof ClassName`
**Used in:** Conditional expressions
**Learn more:** [01-classes-and-objects.md](01-classes-and-objects.md#checking-object-types-with-instanceof)

```typescript
class Dog {
  bark(): void {
    console.log("Woof!");
  }
}

class Cat {
  meow(): void {
    console.log("Meow!");
  }
}

const pet = new Dog();

if (pet instanceof Dog) {
  pet.bark(); // TypeScript knows pet is a Dog
} else if (pet instanceof Cat) {
  pet.meow();
}

console.log(pet instanceof Dog); // true
console.log(pet instanceof Cat); // false
```

---

### `typeof`
**Purpose:** Returns the type of a primitive value or "object" for objects
**Syntax:** `typeof value`
**Used in:** Conditional expressions
**Note:** For class instances, use `instanceof` instead

```typescript
const str = "hello";
const num = 42;
const obj = new Date();

console.log(typeof str);  // "string"
console.log(typeof num);  // "number"
console.log(typeof obj);  // "object" (not very useful for class instances)

// Use instanceof for class instances
console.log(obj instanceof Date); // true
```

---

## Keyword Combinations

You can combine multiple keywords for powerful effects:

```typescript
class Example {
  // Public + readonly + static = class constant
  public static readonly MAX_SIZE: number = 100;

  // Private + readonly = immutable internal state
  private readonly id: string;

  // Protected + static = shared across subclasses
  protected static counter: number = 0;

  // Parameter property: public + readonly in constructor
  constructor(
    public readonly name: string,
    private readonly createdAt: Date = new Date()
  ) {
    this.id = crypto.randomUUID();
  }
}
```

---

## Quick Reference Table

| Keyword | Category | Restricts Access? | Example |
|---------|----------|------------------|---------|
| `class` | Core | No | `class MyClass { }` |
| `new` | Core | No | `new MyClass()` |
| `constructor` | Core | No | `constructor() { }` |
| `this` | Core | No | `this.property` |
| `static` | Modifier | No | `static method() { }` |
| `public` | Access Modifier | No | `public prop: string` |
| `private` | Access Modifier | Yes | `private prop: string` |
| `protected` | Access Modifier | Yes | `protected prop: string` |
| `readonly` | Modifier | Yes (write) | `readonly prop: string` |
| `get` | Accessor | No | `get prop() { }` |
| `set` | Accessor | No | `set prop(value) { }` |
| `extends` | Inheritance | No | `class A extends B { }` |
| `super` | Inheritance | No | `super()` or `super.method()` |
| `abstract` | Abstraction | Yes (instantiation) | `abstract class A { }` |
| `interface` | Contract | No | `interface I { }` |
| `implements` | Contract | No | `class A implements I { }` |
| `instanceof` | Type Check | No | `obj instanceof Class` |

---

## See Also

- [00 - Real-World Use Cases](00-real-world-use-cases.md)
- [01 - Classes and Objects](01-classes-and-objects.md)
- [02 - Properties and Constructors](02-properties-and-constructors.md)
- [03 - Methods and this](03-methods-and-this.md)
- [04 - Static Members](04-static-members.md)
- [05 - Access Modifiers and Encapsulation](05-access-modifiers-encapsulation.md)
- [06 - Getters and Setters](06-getters-setters.md)
- [07 - Inheritance](07-inheritance.md)
- [08 - Abstract Classes](08-abstract-classes.md)
- [09 - Interfaces and Polymorphism](09-interfaces-polymorphism.md)
