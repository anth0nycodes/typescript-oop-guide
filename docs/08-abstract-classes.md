# Abstract Classes (Abstraction)

## What is Abstraction?

Abstraction hides complex implementation details and shows only essential features. Abstract classes provide a template that subclasses must follow.

## Keywords and Rules

- `abstract class` - Cannot be instantiated directly
- `abstract method` - Must be implemented by subclasses (no body)
- Can have both abstract and concrete (regular) methods
- Can have properties, constructors, and regular methods
- Used when classes share common behavior but have unique implementations

## Basic Abstract Class

```typescript
abstract class Shape {
  constructor(public color: string) {}

  // Abstract methods - no implementation
  abstract getArea(): number;
  abstract getPerimeter(): number;

  // Concrete method - has implementation
  describe(): string {
    return `A ${this.color} shape with area ${this.getArea()}`;
  }
}

// const shape = new Shape("red"); // ❌ Error - cannot instantiate abstract class

class Circle extends Shape {
  constructor(color: string, public radius: number) {
    super(color);
  }

  // MUST implement abstract methods
  getArea(): number {
    return Math.PI * this.radius ** 2;
  }

  getPerimeter(): number {
    return 2 * Math.PI * this.radius;
  }
}

class Rectangle extends Shape {
  constructor(
    color: string,
    public width: number,
    public height: number
  ) {
    super(color);
  }

  getArea(): number {
    return this.width * this.height;
  }

  getPerimeter(): number {
    return 2 * (this.width + this.height);
  }
}

const circle = new Circle("red", 5);
const rectangle = new Rectangle("blue", 4, 6);

console.log(circle.describe());    // "A red shape with area 78.54..."
console.log(rectangle.describe()); // "A blue shape with area 24"
```

## Abstract Classes with State and Behavior

```typescript
abstract class Employee {
  private static nextId: number = 1;
  public readonly id: number;

  constructor(
    public name: string,
    protected baseSalary: number
  ) {
    this.id = Employee.nextId++;
  }

  // Abstract - each employee type calculates differently
  abstract calculatePay(): number;
  abstract getEmployeeType(): string;

  // Concrete - shared behavior
  getDetails(): string {
    return `${this.getEmployeeType()} #${this.id}: ${this.name}`;
  }

  promote(salaryIncrease: number): void {
    this.baseSalary += salaryIncrease;
    console.log(`${this.name} promoted! New base: $${this.baseSalary}`);
  }
}

class FullTimeEmployee extends Employee {
  constructor(
    name: string,
    baseSalary: number,
    private benefits: number
  ) {
    super(name, baseSalary);
  }

  calculatePay(): number {
    return this.baseSalary + this.benefits;
  }

  getEmployeeType(): string {
    return "Full-Time Employee";
  }
}

class ContractEmployee extends Employee {
  constructor(
    name: string,
    private hourlyRate: number,
    private hoursWorked: number
  ) {
    super(name, 0); // No base salary
  }

  calculatePay(): number {
    return this.hourlyRate * this.hoursWorked;
  }

  getEmployeeType(): string {
    return "Contract Employee";
  }

  logHours(hours: number): void {
    this.hoursWorked += hours;
  }
}

const emp1 = new FullTimeEmployee("Alice", 5000, 1000);
const emp2 = new ContractEmployee("Bob", 50, 160);

console.log(emp1.getDetails());      // "Full-Time Employee #1: Alice"
console.log(emp1.calculatePay());    // 6000

console.log(emp2.getDetails());      // "Contract Employee #2: Bob"
console.log(emp2.calculatePay());    // 8000
```

## Abstract vs Interface

```typescript
// Abstract class - can have implementation
abstract class Animal {
  constructor(public name: string) {} // Can have constructor

  abstract makeSound(): void; // Must implement

  move(): void {              // Shared implementation
    console.log("Moving...");
  }
}

// Interface - only contracts, no implementation
interface Flyable {
  altitude: number;           // Must have this property
  fly(): void;                // Must implement
  land(): void;               // Must implement
}

// Can extend abstract class AND implement interface
class Bird extends Animal implements Flyable {
  altitude: number = 0;

  constructor(name: string) {
    super(name);
  }

  makeSound(): void {
    console.log("Chirp!");
  }

  fly(): void {
    this.altitude = 100;
    console.log(`${this.name} is flying`);
  }

  land(): void {
    this.altitude = 0;
    console.log(`${this.name} landed`);
  }
}
```
