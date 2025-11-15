# Properties and Constructors

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

## Key Takeaways

1. **Properties** store the data that objects hold
2. **Constructor** initializes objects when created with `new`
3. **`this`** refers to the current object instance
4. **Parameter properties** (with access modifiers) save you code
5. **Optional and default parameters** make constructors flexible
6. **Validation in constructors** ensures objects start in a valid state
7. **Static factory methods** provide alternative ways to create objects

## What's Next?

- Learn about methods and advanced `this` usage (File 03)
- Understand static members that belong to the class itself (File 04)
- Control access to properties with access modifiers (File 05)
