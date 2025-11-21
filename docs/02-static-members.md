# Static Members

## What are Static Members?

**Static members** (properties and methods) belong to the **class itself**, not to individual objects created from the class. There's only **one copy** shared by everyone.

### Instance vs Static: The Key Difference

```typescript
class Counter {
  // Instance property - each object has its own copy
  instanceCount: number = 0;

  // Static property - shared by ALL objects (belongs to the class)
  static totalCount: number = 0;

  constructor() {
    this.instanceCount++;      // Increment this object's counter
    Counter.totalCount++;       // Increment the shared counter
  }
}

const counter1 = new Counter();
const counter2 = new Counter();
const counter3 = new Counter();

console.log(counter1.instanceCount); // 1 - each has its own
console.log(counter2.instanceCount); // 1
console.log(counter3.instanceCount); // 1

console.log(Counter.totalCount);     // 3 - shared across all
```

### Accessing Static Members

- **Static members**: Access via the **class name** (`ClassName.member`)
- **Instance members**: Access via an **object** (`object.member`)

```typescript
class Example {
  static staticProp: string = "I'm static";
  instanceProp: string = "I'm an instance property";

  static staticMethod(): void {
    console.log("I'm a static method");
  }

  instanceMethod(): void {
    console.log("I'm an instance method");
  }
}

// Accessing static members - use class name
console.log(Example.staticProp);  // ✅ "I'm static"
Example.staticMethod();           // ✅ "I'm a static method"

// Accessing instance members - use object
const obj = new Example();
console.log(obj.instanceProp);    // ✅ "I'm an instance property"
obj.instanceMethod();             // ✅ "I'm an instance method"

// Wrong ways:
// console.log(obj.staticProp);   // ❌ undefined
// console.log(Example.instanceProp); // ❌ Error
```

## Static Properties

Static properties are variables that belong to the class, not instances.

### Common Use Cases for Static Properties

```typescript
class DatabaseConnection {
  // Static properties
  static maxConnections: number = 100;
  static activeConnections: number = 0;
  static readonly DATABASE_URL: string = "postgres://localhost:5432";

  // Instance property
  connectionId: string;

  constructor(connectionId: string) {
    if (DatabaseConnection.activeConnections >= DatabaseConnection.maxConnections) {
      throw new Error("Too many connections!");
    }

    this.connectionId = connectionId;
    DatabaseConnection.activeConnections++;
  }

  close(): void {
    DatabaseConnection.activeConnections--;
    console.log(`Connection ${this.connectionId} closed`);
  }

  static getStatus(): string {
    return `${DatabaseConnection.activeConnections}/${DatabaseConnection.maxConnections} connections active`;
  }
}

const conn1 = new DatabaseConnection("conn-1");
const conn2 = new DatabaseConnection("conn-2");

console.log(DatabaseConnection.getStatus()); // "2/100 connections active"

conn1.close();
console.log(DatabaseConnection.getStatus()); // "1/100 connections active"
```

### Constants as Static Properties

```typescript
class MathConstants {
  static readonly PI: number = 3.14159265359;
  static readonly E: number = 2.71828182846;
  static readonly GOLDEN_RATIO: number = 1.61803398875;
}

class Configuration {
  static readonly API_URL: string = "https://api.example.com";
  static readonly TIMEOUT: number = 5000;
  static readonly MAX_RETRIES: number = 3;
}

// Use like enums or constants
console.log(MathConstants.PI);
console.log(Configuration.API_URL);
```

## Static Methods

Static methods are functions that belong to the class. They **cannot** access instance properties or `this` (unless `this` refers to the class).

### Utility Functions

Static methods are perfect for utility functions that don't need instance data:

```typescript
class StringUtils {
  // Static methods - utility functions
  static capitalize(str: string): string {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  static reverse(str: string): string {
    return str.split('').reverse().join('');
  }

  static truncate(str: string, maxLength: number): string {
    if (str.length <= maxLength) return str;
    return str.substring(0, maxLength) + '...';
  }

  static slugify(str: string): string {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-');
  }
}

// Use without creating objects
console.log(StringUtils.capitalize("hello"));        // "Hello"
console.log(StringUtils.reverse("hello"));           // "olleh"
console.log(StringUtils.truncate("hello world", 8)); // "hello wo..."
console.log(StringUtils.slugify("Hello World!"));    // "hello-world"
```

### Static Methods Can Call Other Static Methods

```typescript
class MathUtils {
  static square(n: number): number {
    return n * n;
  }

  static cube(n: number): number {
    return n * n * n;
  }

  // Static method calling another static method
  static sumOfSquares(...numbers: number[]): number {
    return numbers.reduce((sum, n) => sum + this.square(n), 0);
    // 'this' here refers to MathUtils class
  }
}

console.log(MathUtils.square(5));           // 25
console.log(MathUtils.sumOfSquares(1, 2, 3)); // 1 + 4 + 9 = 14
```

## Static Factory Methods

Static methods that create and return instances of the class - alternative constructors:

```typescript
class User {
  constructor(
    public id: string,
    public username: string,
    public email: string,
    public role: string
  ) {}

  // Static factory methods
  static createAdmin(username: string, email: string): User {
    return new User(
      crypto.randomUUID(),
      username,
      email,
      "admin"
    );
  }

  static createRegularUser(username: string, email: string): User {
    return new User(
      crypto.randomUUID(),
      username,
      email,
      "user"
    );
  }

  static createGuest(): User {
    const randomId = Math.random().toString(36).substring(7);
    return new User(
      crypto.randomUUID(),
      `guest_${randomId}`,
      "",
      "guest"
    );
  }

  static fromJSON(json: string): User {
    const data = JSON.parse(json);
    return new User(data.id, data.username, data.email, data.role);
  }
}

// Different ways to create users
const admin = User.createAdmin("alice", "alice@example.com");
const user = User.createRegularUser("bob", "bob@example.com");
const guest = User.createGuest();

console.log(admin.role);  // "admin"
console.log(user.role);   // "user"
console.log(guest.role);  // "guest"
```

## When to Use Static vs Instance

### Use Static When:

1. **The function doesn't need instance data**
2. **Utility/helper functions**
3. **Constants and configuration**
4. **Factory methods** (alternative ways to create instances)
5. **Tracking class-level information** (count of instances, registries)

```typescript
// ✅ GOOD: Static for utilities
class DateUtils {
  static isWeekend(date: Date): boolean {
    const day = date.getDay();
    return day === 0 || day === 6;
  }

  static daysUntil(futureDate: Date): number {
    const now = new Date();
    const diff = futureDate.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }
}

DateUtils.isWeekend(new Date()); // No object needed!
```

### Use Instance When:

1. **The function needs access to instance properties**
2. **The behavior varies per object**
3. **The function modifies object state**

```typescript
// ✅ GOOD: Instance methods need object data
class BankAccount {
  private balance: number = 0;

  // Instance method - needs this.balance
  deposit(amount: number): void {
    this.balance += amount;
  }

  // Instance method - needs this.balance
  withdraw(amount: number): boolean {
    if (amount > this.balance) return false;
    this.balance -= amount;
    return true;
  }

  getBalance(): number {
    return this.balance;
  }
}

const account = new BankAccount();
account.deposit(100); // Needs the specific account's balance
```

### Anti-Pattern: Static When Instance is Needed

```typescript
// ❌ BAD: Using instance method when static would be better
class BadMathHelper {
  add(a: number, b: number): number {
    return a + b; // Doesn't use 'this' at all!
  }
}

const helper = new BadMathHelper(); // Unnecessary object creation
helper.add(2, 3);

// ✅ GOOD: Use static instead
class GoodMathHelper {
  static add(a: number, b: number): number {
    return a + b;
  }
}

GoodMathHelper.add(2, 3); // No object needed
```

## `this` in Static Methods

In static methods, `this` refers to the **class itself**, not an instance:

```typescript
class MyClass {
  static count: number = 0;
  static instances: MyClass[] = [];

  constructor() {
    // In constructor, 'this' = instance
    MyClass.count++;
    MyClass.instances.push(this);
  }

  static getCount(): number {
    // In static method, 'this' = the class (MyClass)
    return this.count; // Same as MyClass.count
  }

  static resetCount(): void {
    this.count = 0;       // Same as MyClass.count = 0
    this.instances = [];  // Same as MyClass.instances = []
  }

  static createMultiple(n: number): MyClass[] {
    const result: MyClass[] = [];
    for (let i = 0; i < n; i++) {
      result.push(new this()); // 'this' refers to MyClass
    }
    return result;
  }
}

new MyClass();
new MyClass();
new MyClass();

console.log(MyClass.getCount()); // 3
MyClass.resetCount();
console.log(MyClass.getCount()); // 0
```

## Real-World Pattern: Registry/Singleton

### Registry Pattern

```typescript
class User {
  private static users: Map<string, User> = new Map();

  constructor(
    public id: string,
    public username: string
  ) {
    // Register this user when created
    User.users.set(id, this);
  }

  static findById(id: string): User | undefined {
    return User.users.get(id);
  }

  static findByUsername(username: string): User | undefined {
    for (const user of User.users.values()) {
      if (user.username === username) {
        return user;
      }
    }
    return undefined;
  }

  static getAll(): User[] {
    return Array.from(User.users.values());
  }

  static count(): number {
    return User.users.size;
  }
}

// Users are automatically registered
const user1 = new User("1", "alice");
const user2 = new User("2", "bob");
const user3 = new User("3", "charlie");

// Access via static methods
console.log(User.count());                    // 3
console.log(User.findById("2")?.username);    // "bob"
console.log(User.findByUsername("alice")?.id); // "1"
console.log(User.getAll().length);             // 3
```

### Singleton Pattern

Ensure only one instance of a class exists:

```typescript
class Database {
  private static instance: Database | null = null;
  private connections: number = 0;

  // Private constructor prevents direct instantiation
  private constructor() {
    console.log("Database instance created");
  }

  // Static method to get the single instance
  static getInstance(): Database {
    if (Database.instance === null) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  connect(): void {
    this.connections++;
    console.log(`Connected. Total connections: ${this.connections}`);
  }
}

// Can't use 'new Database()' - constructor is private
// const db = new Database(); // ❌ Error

// Get the singleton instance
const db1 = Database.getInstance();
const db2 = Database.getInstance();
const db3 = Database.getInstance();

console.log(db1 === db2); // true - same instance
console.log(db2 === db3); // true - same instance

db1.connect(); // Connected. Total connections: 1
db2.connect(); // Connected. Total connections: 2
db3.connect(); // Connected. Total connections: 3
```

## Combining Static and Instance Members

```typescript
class Product {
  // Static members
  private static products: Product[] = [];
  private static nextId: number = 1;
  static readonly TAX_RATE: number = 0.07;

  // Instance members
  public readonly id: number;

  constructor(
    public name: string,
    public price: number
  ) {
    this.id = Product.nextId++;
    Product.products.push(this);
  }

  // Instance method using static property
  getPriceWithTax(): number {
    return this.price * (1 + Product.TAX_RATE);
  }

  // Static methods
  static getAll(): Product[] {
    return [...Product.products]; // Return copy
  }

  static findById(id: number): Product | undefined {
    return Product.products.find(p => p.id === id);
  }

  static getTotalValue(): number {
    return Product.products.reduce((sum, p) => sum + p.price, 0);
  }
}

const product1 = new Product("Laptop", 999);
const product2 = new Product("Mouse", 25);
const product3 = new Product("Keyboard", 75);

console.log(product1.getPriceWithTax());  // 1068.93 (instance method)
console.log(Product.getAll().length);     // 3 (static method)
console.log(Product.getTotalValue());     // 1099 (static method)
```

## Key Takeaways

1. **Static members belong to the class**, not instances
2. **Access via class name** (`ClassName.member`), not objects
3. **Use static for utilities** that don't need instance data
4. **Use static for constants** and configuration
5. **Static factory methods** provide alternative ways to create objects
6. **`this` in static methods** refers to the class
7. **Singleton pattern** uses static to ensure one instance
8. **Registry pattern** uses static to track all instances

## What's Next?

- Understand inheritance and how to extend classes (File 03)
- Use getters and setters for controlled property access (File 04)
- Learn about access modifiers (public, private, protected) (File 05)
