# Interfaces and Polymorphism

## What are Interfaces?

- Contracts that define the shape of an object
- No implementation, only structure
- Classes can implement multiple interfaces
- Support polymorphism

## Keywords

- `interface` - Define a contract
- `implements` - Class implements interface
- `extends` - Interface extends another interface

## Basic Interface

```typescript
interface Person {
  name: string;
  age: number;
  greet(): void;
}

class Student implements Person {
  constructor(
    public name: string,
    public age: number,
    public grade: string
  ) {}

  greet(): void {
    console.log(`Hi, I'm ${this.name}, a ${this.grade} student`);
  }
}

class Teacher implements Person {
  constructor(
    public name: string,
    public age: number,
    public subject: string
  ) {}

  greet(): void {
    console.log(`Hello, I'm ${this.name}, I teach ${this.subject}`);
  }
}
```

## Multiple Interfaces

```typescript
interface Drivable {
  drive(): void;
  stop(): void;
}

interface Flyable {
  fly(): void;
  land(): void;
}

// Implementing multiple interfaces
class FlyingCar implements Drivable, Flyable {
  drive(): void {
    console.log("Driving on road");
  }

  stop(): void {
    console.log("Stopping");
  }

  fly(): void {
    console.log("Flying in air");
  }

  land(): void {
    console.log("Landing");
  }
}
```

## Optional Properties and Methods

```typescript
interface Config {
  apiUrl: string;
  timeout?: number;        // Optional
  retries?: number;        // Optional
  onError?(): void;        // Optional method
}

class ApiClient implements Config {
  apiUrl: string;
  timeout?: number;

  constructor(apiUrl: string, timeout?: number) {
    this.apiUrl = apiUrl;
    this.timeout = timeout;
  }
}
```

## Polymorphism - The Power of Interfaces

Polymorphism allows treating different types uniformly through a common interface.

```typescript
interface PaymentMethod {
  processPayment(amount: number): void;
  refund(amount: number): void;
}

class CreditCard implements PaymentMethod {
  constructor(private cardNumber: string) {}

  processPayment(amount: number): void {
    console.log(`Charging $${amount} to card ${this.cardNumber}`);
  }

  refund(amount: number): void {
    console.log(`Refunding $${amount} to card ${this.cardNumber}`);
  }
}

class PayPal implements PaymentMethod {
  constructor(private email: string) {}

  processPayment(amount: number): void {
    console.log(`Charging $${amount} to PayPal account ${this.email}`);
  }

  refund(amount: number): void {
    console.log(`Refunding $${amount} to PayPal account ${this.email}`);
  }
}

class Bitcoin implements PaymentMethod {
  constructor(private walletAddress: string) {}

  processPayment(amount: number): void {
    console.log(`Sending $${amount} to Bitcoin wallet ${this.walletAddress}`);
  }

  refund(amount: number): void {
    console.log(`Refunding $${amount} to Bitcoin wallet ${this.walletAddress}`);
  }
}

// Polymorphism in action - function accepts any PaymentMethod
function checkout(paymentMethod: PaymentMethod, amount: number): void {
  console.log("Processing checkout...");
  paymentMethod.processPayment(amount);
  console.log("Checkout complete!");
}

const card = new CreditCard("1234-5678");
const paypal = new PayPal("user@example.com");
const bitcoin = new Bitcoin("1A2B3C4D");

checkout(card, 100);    // Works with CreditCard
checkout(paypal, 50);   // Works with PayPal
checkout(bitcoin, 75);  // Works with Bitcoin
```

## Interface Extending Interface

```typescript
interface Animal {
  name: string;
  age: number;
}

interface Mammal extends Animal {
  furColor: string;
}

interface Dog extends Mammal {
  breed: string;
  bark(): void;
}

class GermanShepherd implements Dog {
  constructor(
    public name: string,
    public age: number,
    public furColor: string,
    public breed: string
  ) {}

  bark(): void {
    console.log("Woof!");
  }
}
```

## Type Aliases vs Interfaces

```typescript
// Interface
interface UserInterface {
  id: number;
  name: string;
}

// Type alias
type UserType = {
  id: number;
  name: string;
};

// Both can be used similarly, but interfaces are better for OOP
class Admin implements UserInterface {
  constructor(public id: number, public name: string) {}
}
```

## Key Naming Conventions Summary

| Element | Convention | Example |
|---------|-----------|---------|
| Class | PascalCase | `UserAccount`, `ShoppingCart` |
| Interface | PascalCase, often starts with I (optional) | `Drivable`, `IPaymentMethod` |
| Method | camelCase | `calculateTotal()`, `getUserData()` |
| Property | camelCase | `firstName`, `totalAmount` |
| Private property | _camelCase | `_balance`, `_userId` |
| Static constant | UPPER_SNAKE_CASE | `MAX_RETRIES`, `API_URL` |
| Generic type | Single uppercase letter or PascalCase | `T`, `TResult`, `TKey` |
