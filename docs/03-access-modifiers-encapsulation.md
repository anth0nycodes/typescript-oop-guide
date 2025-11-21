# Access Modifiers and Encapsulation

## What is Encapsulation?

**Encapsulation** is one of the core principles of object-oriented programming. It means:

1. **Hiding** internal implementation details
2. **Exposing** only what's necessary through a public interface
3. **Protecting** data from direct access and modification

Think of it like a car - you don't need to know how the engine works internally, you just use the pedals and steering wheel (the public interface).

### Why Encapsulation Matters

```typescript
// ❌ BAD: No encapsulation
class BankAccountBad {
  balance: number; // Public - anyone can modify!

  constructor(initialBalance: number) {
    this.balance = initialBalance;
  }
}

const account1 = new BankAccountBad(1000);
account1.balance = -5000; // ❌ Nothing stops this!
account1.balance = 999999; // ❌ Or this!

// ✅ GOOD: With encapsulation
class BankAccountGood {
  private balance: number; // Hidden from outside

  constructor(initialBalance: number) {
    this.balance = initialBalance;
  }

  deposit(amount: number): void {
    if (amount > 0) {
      this.balance += amount;
    } else {
      throw new Error("Deposit amount must be positive");
    }
  }

  withdraw(amount: number): boolean {
    if (amount > this.balance) {
      return false; // Insufficient funds
    }
    if (amount <= 0) {
      throw new Error("Withdraw amount must be positive");
    }
    this.balance -= amount;
    return true;
  }

  getBalance(): number {
    return this.balance;
  }
}

const account2 = new BankAccountGood(1000);
// account2.balance = -5000; // ❌ Error! Cannot access private property
account2.deposit(500);        // ✅ Controlled access with validation
```

## Access Modifiers

Access modifiers control who can access properties and methods. TypeScript provides three access modifiers:

| Modifier    | Accessible From             |
| ----------- | --------------------------- |
| `public`    | Everywhere (default)        |
| `private`   | Only within the same class  |
| `protected` | Within class and subclasses |

## The `public` Modifier

**Public** members are accessible from anywhere. This is the **default** if you don't specify a modifier.

```typescript
class Car {
  // These are equivalent:
  public brand: string;
  model: string; // Also public (default)

  constructor(brand: string, model: string) {
    this.brand = brand;
    this.model = model;
  }

  public honk(): void {
    console.log("Beep beep!");
  }
}

const car = new Car("Toyota", "Camry");
console.log(car.brand);  // ✅ OK - public property
console.log(car.model);  // ✅ OK - public property
car.brand = "Honda";     // ✅ OK - can modify
car.honk();              // ✅ OK - public method
```

### When to Use `public`

- Properties and methods that are part of the public API
- Data that external code needs to access
- Methods that define the object's behavior

## The `private` Modifier

**Private** members are only accessible **within the class** itself. External code and subclasses cannot access them.

```typescript
class BankAccount {
  private balance: number;
  private accountNumber: string;
  public owner: string; // Public for comparison

  constructor(owner: string, accountNumber: string, initialBalance: number) {
    this.owner = owner;
    this.accountNumber = accountNumber;
    this.balance = initialBalance;
  }

  // Private method - internal helper
  private logTransaction(type: string, amount: number): void {
    console.log(`[${type}] $${amount} - New balance: $${this.balance}`);
  }

  // Public methods provide controlled access
  deposit(amount: number): void {
    if (amount <= 0) {
      throw new Error("Deposit amount must be positive");
    }
    this.balance += amount; // ✅ OK - accessing private from within class
    this.logTransaction("DEPOSIT", amount); // ✅ OK - calling private method
  }

  withdraw(amount: number): boolean {
    if (amount > this.balance) {
      return false;
    }
    this.balance -= amount; // ✅ OK
    this.logTransaction("WITHDRAW", amount); // ✅ OK
    return true;
  }

  getBalance(): number {
    return this.balance; // ✅ OK
  }
}

const account = new BankAccount("Alice", "12345", 1000);

// Public property - accessible
console.log(account.owner); // ✅ "Alice"

// Private properties - not accessible
// console.log(account.balance);       // ❌ Error
// console.log(account.accountNumber); // ❌ Error
// account.logTransaction("TEST", 10); // ❌ Error

// Use public methods instead
console.log(account.getBalance()); // ✅ 1000
account.deposit(500);               // ✅ OK
```

### When to Use `private`

- Internal implementation details
- Data that should be validated before modification
- Helper methods not meant for external use
- Preventing breaking changes (if internal logic changes, external code isn't affected)

## The `protected` Modifier

**Protected** members are accessible within the class **and** its subclasses, but not from external code.

```typescript
class Animal {
  protected species: string; // Subclasses can access
  private age: number;       // Only Animal can access
  public name: string;       // Everyone can access

  constructor(name: string, species: string, age: number) {
    this.name = name;
    this.species = species;
    this.age = age;
  }

  protected makeSound(): void {
    console.log("Some generic sound");
  }
}

class Dog extends Animal {
  constructor(name: string, age: number) {
    super(name, "Canis familiaris", age);
  }

  describe(): string {
    // ✅ Can access protected members from parent
    return `${this.name} is a ${this.species}`;
  }

  bark(): void {
    // ✅ Can call protected method from parent
    this.makeSound();
    console.log("Woof!");
  }

  // Cannot access private members
  // getAge(): number {
  //   return this.age; // ❌ Error: 'age' is private
  // }
}

const dog = new Dog("Buddy", 3);
console.log(dog.name);        // ✅ OK - public
console.log(dog.describe());  // ✅ "Buddy is a Canis familiaris"
dog.bark();                   // ✅ OK

// console.log(dog.species);  // ❌ Error - protected
// console.log(dog.age);      // ❌ Error - private
// dog.makeSound();           // ❌ Error - protected method
```

### When to Use `protected`

- Members that subclasses need to access
- Shared functionality between parent and child classes
- When you want to allow inheritance but not external access

## Access Modifiers Summary

```typescript
class Example {
  public publicProp: string = "accessible everywhere";
  protected protectedProp: string = "accessible in class and subclasses";
  private privateProp: string = "accessible only in this class";

  showAccess(): void {
    console.log(this.publicProp);    // ✅ OK
    console.log(this.protectedProp); // ✅ OK
    console.log(this.privateProp);   // ✅ OK
  }
}

class SubExample extends Example {
  showSubAccess(): void {
    console.log(this.publicProp);    // ✅ OK
    console.log(this.protectedProp); // ✅ OK
    // console.log(this.privateProp); // ❌ Error
  }
}

const obj = new Example();
console.log(obj.publicProp);    // ✅ OK
// console.log(obj.protectedProp); // ❌ Error
// console.log(obj.privateProp);   // ❌ Error
```

## Bonus: The `readonly` Property Modifier

While not an access modifier, `readonly` is a property modifier that's often used alongside access modifiers. **Readonly** properties can only be assigned during initialization (inline or in the constructor), then become immutable.

```typescript
class User {
  readonly id: string;
  readonly createdAt: Date;
  username: string; // Not readonly - can change

  constructor(id: string, username: string) {
    this.id = id;                // ✅ OK - in constructor
    this.createdAt = new Date(); // ✅ OK - in constructor
    this.username = username;
  }

  updateUsername(newUsername: string): void {
    this.username = newUsername; // ✅ OK - not readonly
    // this.id = "new-id";       // ❌ Error - readonly
  }
}

const user = new User("user-123", "alice");
console.log(user.id);        // ✅ "user-123"
user.username = "alicia";    // ✅ OK
// user.id = "user-456";     // ❌ Error - readonly property
// user.createdAt = new Date(); // ❌ Error - readonly
```

### Readonly with Inline Initialization

```typescript
class Configuration {
  readonly API_URL: string = "https://api.example.com";
  readonly MAX_RETRIES: number = 3;
  readonly TIMEOUT: number = 5000;

  // Can read but not modify
  getApiUrl(): string {
    return this.API_URL;
  }
}

const config = new Configuration();
console.log(config.API_URL); // ✅ "https://api.example.com"
// config.MAX_RETRIES = 5;   // ❌ Error
```

### When to Use `readonly`

- IDs that shouldn't change after creation
- Timestamps that should be immutable
- Configuration values
- Any data that should be set once and never modified

### Combining `readonly` with Access Modifiers

You can combine `readonly` with access modifiers for fine-grained control:

```typescript
class Employee {
  // Public and readonly - visible but immutable
  public readonly id: number;

  // Private and readonly - hidden and immutable
  private readonly socialSecurityNumber: string;

  // Protected and readonly - subclasses can read but not modify
  protected readonly department: string;

  // Just public - visible and mutable
  public name: string;

  constructor(id: number, ssn: string, department: string, name: string) {
    this.id = id;
    this.socialSecurityNumber = ssn;
    this.department = department;
    this.name = name;
  }
}

const employee = new Employee(1, "123-45-6789", "Engineering", "Alice");
console.log(employee.id);   // ✅ OK - public readonly
console.log(employee.name); // ✅ OK - public
employee.name = "Alicia";   // ✅ OK - mutable

// employee.id = 2;                        // ❌ Error - readonly
// console.log(employee.socialSecurityNumber); // ❌ Error - private
// console.log(employee.department);       // ❌ Error - protected
```

## Naming Conventions for Private Members

It's a common convention (not required) to prefix private members with an underscore `_`:

```typescript
class Person {
  // Convention: prefix private properties with _
  private _age: number;
  private _email: string;
  public name: string;

  constructor(name: string, age: number, email: string) {
    this.name = name;
    this._age = age;
    this._email = email;
  }

  // Public getter method for private property
  getAge(): number {
    return this._age;
  }

  // Public setter method with validation
  setAge(age: number): void {
    if (age > 0 && age < 150) {
      this._age = age;
    } else {
      throw new Error("Invalid age");
    }
  }

  getEmail(): string {
    return this._email;
  }

  setEmail(email: string): void {
    if (email.includes('@')) {
      this._email = email;
    } else {
      throw new Error("Invalid email");
    }
  }
}
```

**Note:** This is a convention, not enforced by TypeScript. Some teams use it, others don't. Also, `getAge()` and `setAge()` are regular methods, not TypeScript's `get`/`set` accessors (which are covered in File 04).

## Best Practices

### 1. Default to Private, Expose Only What's Needed

```typescript
// ✅ GOOD: Private by default
class GoodExample {
  private data: number;
  private helperMethod(): void { }

  public getData(): number {
    return this.data;
  }
}

// ❌ BAD: Everything public
class BadExample {
  public data: number;
  public helperMethod(): void { }
}
```

### 2. Use `readonly` for Immutable Data

```typescript
class Product {
  readonly id: string;
  readonly createdAt: Date;
  name: string; // Can change

  constructor(id: string, name: string) {
    this.id = id;
    this.createdAt = new Date();
    this.name = name;
  }
}
```

### 3. Provide Controlled Access with Methods

```typescript
class Temperature {
  private celsius: number;

  constructor(celsius: number) {
    this.celsius = celsius;
  }

  // Accessor methods provide controlled access - can add validation/logic
  getCelsius(): number {
    return this.celsius;
  }

  getFahrenheit(): number {
    return (this.celsius * 9/5) + 32;
  }

  setCelsius(value: number): void {
    if (value < -273.15) {
      throw new Error("Cannot go below absolute zero");
    }
    this.celsius = value;
  }
}
```

## Key Takeaways

1. **Encapsulation** hides implementation details and protects data
2. TypeScript has **three access modifiers**:
   - **`public`** - accessible everywhere (default)
   - **`private`** - only within the class
   - **`protected`** - within class and subclasses
3. **`readonly`** is a property modifier (not an access modifier) that makes properties immutable after initialization
4. **Default to private**, expose only what's necessary
5. **Use accessor methods** (like `getValue()`/`setValue()`) for controlled access to private data
6. **Combine `readonly` with access modifiers** for fine-grained control

## What's Next?

- Learn about getters and setters for elegant property access (File 04)
- Understand how access modifiers work with inheritance (File 05)
- Explore static members that belong to the class (File 02)
