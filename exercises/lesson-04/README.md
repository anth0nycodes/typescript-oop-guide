# Lesson 04 Exercises: Static Members

Complete these exercises to practice using static properties and methods, understanding class-level vs instance-level members.

---

## Exercise 1: Static Properties (Easy)

**File:** `01-static-properties-easy.ts`

Create a `Car` class that tracks total cars created:

**Requirements:**
- Static property: `totalCars` (number, starts at 0)
- Instance properties: `brand` (string), `model` (string), `carId` (number)
- Constructor increments `totalCars` and assigns unique `carId` based on `totalCars`
- Static method `getTotalCars()`: returns total cars created
- Instance method `getInfo()`: returns formatted car information

**Example usage:**
```typescript
const car1 = new Car("Toyota", "Camry");
const car2 = new Car("Honda", "Civic");
const car3 = new Car("Ford", "Mustang");

console.log(Car.getTotalCars()); // 3

console.log(car1.getInfo()); // "Car #1: Toyota Camry"
console.log(car2.getInfo()); // "Car #2: Honda Civic"
console.log(car3.getInfo()); // "Car #3: Ford Mustang"

// Static property accessed via class name
console.log(Car.totalCars); // 3
```

**Learning goals:** Static properties, tracking shared state, static vs instance access

---

## Exercise 2: Static Constants (Easy)

**File:** `02-static-constants-easy.ts`

Create a `Temperature` class with static conversion methods and constants:

**Requirements:**
- Static readonly constants:
  - `FREEZING_POINT_C = 0`
  - `BOILING_POINT_C = 100`
  - `ABSOLUTE_ZERO_C = -273.15`
- Static methods:
  - `celsiusToFahrenheit(celsius: number)`: converts C to F
  - `fahrenheitToCelsius(fahrenheit: number)`: converts F to C
  - `celsiusToKelvin(celsius: number)`: converts C to K
  - `kelvinToCelsius(kelvin: number)`: converts K to C
- Instance property: `celsius` (number)
- Instance methods:
  - `toFahrenheit()`: converts this instance's temperature to F
  - `toKelvin()`: converts this instance's temperature to K

**Example usage:**
```typescript
// Using static methods (utility functions)
console.log(Temperature.celsiusToFahrenheit(0));   // 32
console.log(Temperature.celsiusToFahrenheit(100)); // 212
console.log(Temperature.fahrenheitToCelsius(32));  // 0

// Using static constants
console.log(Temperature.FREEZING_POINT_C); // 0
console.log(Temperature.BOILING_POINT_C);  // 100

// Using instances
const temp = new Temperature(25);
console.log(temp.toFahrenheit()); // 77
console.log(temp.toKelvin());     // 298.15
```

**Learning goals:** Static constants, static utility methods, mixing static and instance members

---

## Exercise 3: Resource Management (Medium)

**File:** `03-resource-management-medium.ts`

Create a `DatabaseConnection` class that limits total active connections:

**Requirements:**
- Static properties:
  - `maxConnections` (number, set to 5)
  - `activeConnections` (number, starts at 0)
  - `connectionHistory` (array of connection IDs)
- Instance properties:
  - `connectionId` (string)
  - `isActive` (boolean)
  - `connectedAt` (Date)
- Constructor:
  - Throws error if activeConnections >= maxConnections
  - Increments activeConnections
  - Adds connectionId to connectionHistory
  - Sets isActive to true
- Instance methods:
  - `disconnect()`: decrements activeConnections, sets isActive to false
  - `reconnect()`: attempts to reconnect (check max connections)
- Static methods:
  - `getStatus()`: returns string with active/max connections
  - `canConnect()`: returns boolean if new connection is possible
  - `getHistory()`: returns connection history

**Example usage:**
```typescript
console.log(DatabaseConnection.canConnect()); // true

const conn1 = new DatabaseConnection("conn-1");
const conn2 = new DatabaseConnection("conn-2");
const conn3 = new DatabaseConnection("conn-3");

console.log(DatabaseConnection.getStatus()); // "3/5 connections active"

conn1.disconnect();
console.log(DatabaseConnection.getStatus()); // "2/5 connections active"

// Create connections up to the limit
const conn4 = new DatabaseConnection("conn-4");
const conn5 = new DatabaseConnection("conn-5");
const conn6 = new DatabaseConnection("conn-6");

console.log(DatabaseConnection.canConnect()); // false

// This should throw error - max connections reached
// const conn7 = new DatabaseConnection("conn-7"); // Error!

conn2.disconnect();
console.log(DatabaseConnection.canConnect()); // true
```

**Learning goals:** Resource management, static state tracking, validation with static properties

---

## Exercise 4: Utility Class (Medium)

**File:** `04-utility-class-medium.ts`

Create a `MathUtils` class with only static methods (no instances needed):

**Requirements:**
- All methods should be static (this is a utility class, no instances created)
- Static methods:
  - `max(...numbers: number[])`: returns largest number
  - `min(...numbers: number[])`: returns smallest number
  - `average(...numbers: number[])`: returns average
  - `sum(...numbers: number[])`: returns sum
  - `factorial(n: number)`: returns factorial of n
  - `isPrime(n: number)`: returns true if n is prime
  - `fibonacci(n: number)`: returns nth Fibonacci number
  - `randomInt(min: number, max: number)`: returns random integer in range

**Example usage:**
```typescript
// No instances needed - just use the class
console.log(MathUtils.max(1, 5, 3, 9, 2)); // 9
console.log(MathUtils.min(1, 5, 3, 9, 2)); // 1
console.log(MathUtils.average(10, 20, 30)); // 20
console.log(MathUtils.sum(1, 2, 3, 4, 5)); // 15

console.log(MathUtils.factorial(5)); // 120
console.log(MathUtils.isPrime(17)); // true
console.log(MathUtils.isPrime(18)); // false

console.log(MathUtils.fibonacci(7)); // 13 (0,1,1,2,3,5,8,13)
console.log(MathUtils.randomInt(1, 10)); // Random number between 1-10

// No need to create instances
// const math = new MathUtils(); // Not necessary!
```

**Learning goals:** Utility classes, static-only classes, practical use of static methods

---

## Exercise 5: Factory Pattern with Static Methods (Hard)

**File:** `05-factory-pattern-hard.ts`

Create a `User` class and `UserFactory` with advanced factory patterns:

**Requirements:**

**User class:**
- Properties: `id` (string), `username` (string), `email` (string), `role` (string), `createdAt` (Date), `permissions` (string[])
- Constructor accepts all properties
- Method `hasPermission(permission: string)`: checks if user has permission
- Method `getInfo()`: returns formatted user info

**UserFactory class (static methods only):**
- Static property: `userCount` (tracks total users created)
- Static method `createAdmin(username: string, email: string)`: creates admin user with all permissions
- Static method `createModerator(username: string, email: string)`: creates moderator with limited permissions
- Static method `createRegularUser(username: string, email: string)`: creates regular user with basic permissions
- Static method `createCustomUser(username: string, email: string, role: string, permissions: string[])`: creates user with custom settings
- Static method `createFromAPIData(data: any)`: creates user from API response object
- Static method `createBatch(count: number, role: string)`: creates multiple users at once
- Static method `getTotalUsers()`: returns total users created

**Example usage:**
```typescript
const admin = UserFactory.createAdmin("admin1", "admin@example.com");
console.log(admin.getInfo()); // "User #1: admin1 (admin@example.com) - Role: admin"
console.log(admin.hasPermission("delete_users")); // true

const mod = UserFactory.createModerator("mod1", "mod@example.com");
console.log(mod.hasPermission("delete_users")); // false
console.log(mod.hasPermission("edit_posts")); // true

const user = UserFactory.createRegularUser("john", "john@example.com");
console.log(user.hasPermission("create_posts")); // true
console.log(user.hasPermission("edit_posts")); // false

// Create from API data
const apiData = {
  username: "jane",
  email: "jane@example.com",
  role: "user",
  permissions: ["read", "comment"]
};
const apiUser = UserFactory.createFromAPIData(apiData);

// Batch creation
const moderators = UserFactory.createBatch(5, "moderator");
console.log(UserFactory.getTotalUsers()); // 8 (admin + mod + user + apiUser + 5 mods)
```

**Learning goals:** Factory pattern, static factory methods, complex object creation, batch operations

---

## How to Complete

1. Work through exercises in order (they build in difficulty)
2. Run each exercise with: `npx ts-node exercises/lesson-04/01-static-properties-easy.ts`
3. Pay attention to when to use static vs instance members
4. Remember: static members are accessed via the class name, instance members via objects
5. For utility classes (Exercise 4), no instances should be created

## Tips

- Read the lesson content in `docs/04-static-members.md` if you get stuck
- Static members belong to the class, not instances
- Use static for: shared state, constants, utility functions, factory methods
- Use instance members for: data unique to each object
- Static methods cannot access instance properties (no `this` for instances)
