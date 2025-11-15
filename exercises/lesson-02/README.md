# Lesson 02 Exercises: Properties and Constructors

Complete these exercises to practice working with properties, constructors, parameter properties, and object initialization patterns.

---

## Exercise 1: Property Initialization (Easy)

**File:** `01-property-initialization-easy.ts`

Create a `Product` class demonstrating different property initialization methods:

**Requirements:**
- Property `id` (number): Initialize inline with a random number
- Property `name` (string): Initialize in constructor
- Property `price` (number): Initialize in constructor
- Property `inStock` (boolean): Initialize inline with `true`
- Property `description` (optional string): Can be undefined
- Property `category` (string): Initialize in constructor with default value "General"
- Method `getInfo()`: Returns a formatted string with product details

**Example usage:**
```typescript
const product1 = new Product("Laptop", 999);
console.log(product1.getInfo());
// "Product #<random-id>: Laptop - $999 (In Stock) - Category: General"

const product2 = new Product("Mouse", 25, "Electronics");
product2.description = "Wireless gaming mouse";
console.log(product2.getInfo());
```

**Learning goals:** Property initialization methods, optional properties, inline defaults

---

## Exercise 2: Constructor Validation (Easy)

**File:** `02-constructor-validation-easy.ts`

Create a `User` class with constructor validation:

**Requirements:**
- Properties: `username` (string), `email` (string), `age` (number)
- Constructor validates:
  - `username`: must be at least 3 characters, no spaces
  - `email`: must contain "@" symbol
  - `age`: must be between 13 and 120
- Throw descriptive error messages when validation fails
- Method `getProfile()`: Returns formatted user profile string

**Example usage:**
```typescript
// Valid users
const user1 = new User("alice_wonder", "alice@example.com", 25);
const user2 = new User("bob123", "bob@test.com", 30);

console.log(user1.getProfile()); // "alice_wonder (alice@example.com) - Age: 25"

// Invalid users (should throw errors)
// const invalid1 = new User("ab", "test@test.com", 25);        // Error: username too short
// const invalid2 = new User("alice", "invalid-email", 25);     // Error: invalid email
// const invalid3 = new User("bob", "bob@test.com", 10);        // Error: age too young
```

**Learning goals:** Input validation, throwing errors, constructor logic

---

## Exercise 3: Parameter Properties (Medium)

**File:** `03-parameter-properties-medium.ts`

Create a `Task` class using parameter property shorthand:

**Requirements:**
- Use parameter properties for: `id` (public number), `title` (public string), `assignedTo` (private string)
- Regular property: `completed` (boolean, starts false)
- Regular property: `createdAt` (Date, initialize in constructor)
- Method `complete()`: Sets completed to true
- Method `isAssignedTo(username: string)`: Returns true if task is assigned to given username
- Method `getStatus()`: Returns string describing task status

**Example usage:**
```typescript
const task1 = new Task(1, "Write documentation", "alice");
const task2 = new Task(2, "Review PR", "bob");

console.log(task1.getStatus());
// "Task #1: Write documentation - Assigned to alice - Status: Incomplete"

task1.complete();
console.log(task1.getStatus());
// "Task #1: Write documentation - Assigned to alice - Status: Complete"

console.log(task1.isAssignedTo("alice")); // true
console.log(task1.isAssignedTo("bob"));   // false

// Note: task1.assignedTo is private and cannot be accessed directly
```

**Learning goals:** Parameter properties, public vs private, mixing parameter and regular properties

---

## Exercise 4: Optional and Default Parameters (Medium)

**File:** `04-optional-default-params-medium.ts`

Create a `BlogPost` class with flexible constructor parameters:

**Requirements:**
- Parameter properties:
  - `title` (public string, required)
  - `content` (public string, required)
  - `author` (public string, default: "Anonymous")
  - `tags` (public array of strings, default: empty array)
  - `published` (public boolean, default: false)
- Regular property: `createdAt` (Date, initialize to current time)
- Optional parameter: `publishDate` (Date or undefined)
- Method `publish()`: Sets published to true
- Method `addTag(tag: string)`: Adds tag to tags array
- Method `getSummary()`: Returns formatted post summary

**Example usage:**
```typescript
const post1 = new BlogPost("Hello World", "This is my first post");
console.log(post1.getSummary());
// "Hello World by Anonymous - 0 tags - Unpublished"

const post2 = new BlogPost(
  "TypeScript Tips",
  "Here are some tips...",
  "Alice",
  ["typescript", "programming"]
);
post2.publish();
console.log(post2.getSummary());
// "TypeScript Tips by Alice - 2 tags - Published"

post1.addTag("intro");
post1.addTag("first-post");
console.log(post1.tags); // ["intro", "first-post"]
```

**Learning goals:** Optional parameters, default parameters, flexible constructors

---

## Exercise 5: Factory Methods Pattern (Hard)

**File:** `05-factory-methods-hard.ts`

Create an `Account` class with multiple factory methods for different account creation scenarios:

**Requirements:**

**Account class:**
- Properties: `accountId` (string), `ownerName` (string), `accountType` (string), `balance` (number), `openedAt` (Date)
- Constructor accepts all properties
- Method `deposit(amount: number)`: Adds to balance
- Method `getAccountInfo()`: Returns formatted account details

**Static Factory Methods:**
- `createSavings(ownerName: string, initialDeposit: number)`: Creates a savings account
  - accountId: "SAV-" + random 6-digit number
  - accountType: "Savings"
  - balance: initialDeposit (must be >= 100)
  - openedAt: current date

- `createChecking(ownerName: string)`: Creates a checking account with $0 balance
  - accountId: "CHK-" + random 6-digit number
  - accountType: "Checking"
  - balance: 0
  - openedAt: current date

- `createBusinessAccount(businessName: string, initialDeposit: number)`: Creates business account
  - accountId: "BUS-" + random 6-digit number
  - accountType: "Business"
  - balance: initialDeposit (must be >= 1000)
  - openedAt: current date

- `createFromData(data: object)`: Creates account from data object
  - Validates all required fields exist
  - Useful for loading accounts from database/API

**Example usage:**
```typescript
// Different ways to create accounts
const savings = Account.createSavings("Alice", 500);
console.log(savings.getAccountInfo());
// "Account SAV-123456: Alice - Savings Account - Balance: $500"

const checking = Account.createChecking("Bob");
console.log(checking.getAccountInfo());
// "Account CHK-789012: Bob - Checking Account - Balance: $0"

const business = Account.createBusinessAccount("ACME Corp", 5000);
console.log(business.getAccountInfo());
// "Account BUS-345678: ACME Corp - Business Account - Balance: $5000"

// Create from data (simulating database load)
const accountData = {
  accountId: "SAV-999999",
  ownerName: "Charlie",
  accountType: "Savings",
  balance: 1200,
  openedAt: new Date("2024-01-01")
};
const loaded = Account.createFromData(accountData);
console.log(loaded.getAccountInfo());

// Validation in factory methods
// const invalid = Account.createSavings("Dave", 50); // Error: minimum deposit is $100
// const invalid2 = Account.createBusinessAccount("XYZ Inc", 500); // Error: minimum deposit is $1000
```

**Learning goals:** Static factory methods, alternative object creation patterns, method overloading alternatives, validation in factory methods

---

## How to Complete

1. Work through exercises in order (they build in difficulty)
2. Run each exercise with: `npx ts-node exercises/lesson-02/01-property-initialization-easy.ts`
3. Test validation logic - try to break your code with invalid inputs
4. Understand the difference between parameter properties and regular properties
5. Experiment with different combinations of optional and default parameters

## Tips

- Read the lesson content in `docs/02-properties-and-constructors.md` if you get stuck
- Use constructor validation to catch errors early
- Parameter properties (with access modifiers) save a lot of boilerplate code
- Factory methods are useful when you have multiple ways to create similar objects
- Test edge cases in your constructors (negative numbers, empty strings, etc.)
