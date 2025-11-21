# Lesson 02 Exercises: Static Members

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

**Validation Requirements:**

- Constructor:
  - Must increment `totalCars` by exactly 1 for each new car created
  - Must assign `carId` based on the incremented `totalCars` value
  - `brand` and `model` must be non-empty strings
- `getTotalCars()`:
  - Must return the current value of `totalCars`
  - Should accurately reflect all cars created across all instances

**Example usage:**

```typescript
// Test initial state
console.log(Car.getTotalCars()); // 0
console.log(Car.totalCars); // 0

const car1 = new Car("Toyota", "Camry");

// Test first car
console.log(car1.getInfo()); // "Car #1: Toyota Camry"
console.log(Car.getTotalCars()); // 1
console.log(Car.totalCars); // 1

const car2 = new Car("Honda", "Civic");
const car3 = new Car("Ford", "Mustang");

// Test all cars
console.log(car2.getInfo()); // "Car #2: Honda Civic"
console.log(car3.getInfo()); // "Car #3: Ford Mustang"
console.log(Car.getTotalCars()); // 3

// Test that totalCars is shared across all instances
console.log(Car.totalCars); // 3 (accessed via class)

// Test creating more cars increments totalCars
const car4 = new Car("Tesla", "Model 3");
console.log(car4.getInfo()); // "Car #4: Tesla Model 3"
console.log(Car.getTotalCars()); // 4

// Test that each car has unique ID
console.log(car1.carId); // 1
console.log(car2.carId); // 2
console.log(car3.carId); // 3
console.log(car4.carId); // 4
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

**Validation Requirements:**

- Static conversion methods:
  - `celsiusToFahrenheit()`: Use formula (C × 9/5) + 32
  - `fahrenheitToCelsius()`: Use formula (F - 32) × 5/9
  - `celsiusToKelvin()`: Use formula C + 273.15
  - `kelvinToCelsius()`: Use formula K - 273.15
  - All conversions must be accurate to at least 2 decimal places
- Static constants:
  - Must be `readonly` and cannot be modified after initialization
- Constructor:
  - Must accept and store a valid Celsius temperature value

**Example usage:**

```typescript
// Test static constants
console.log(Temperature.FREEZING_POINT_C); // 0
console.log(Temperature.BOILING_POINT_C); // 100
console.log(Temperature.ABSOLUTE_ZERO_C); // -273.15

// Test static Celsius to Fahrenheit conversion
console.log(Temperature.celsiusToFahrenheit(0)); // 32
console.log(Temperature.celsiusToFahrenheit(100)); // 212
console.log(Temperature.celsiusToFahrenheit(25)); // 77
console.log(Temperature.celsiusToFahrenheit(-40)); // -40

// Test static Fahrenheit to Celsius conversion
console.log(Temperature.fahrenheitToCelsius(32)); // 0
console.log(Temperature.fahrenheitToCelsius(212)); // 100
console.log(Temperature.fahrenheitToCelsius(77)); // 25

// Test static Celsius to Kelvin conversion
console.log(Temperature.celsiusToKelvin(0)); // 273.15
console.log(Temperature.celsiusToKelvin(100)); // 373.15
console.log(Temperature.celsiusToKelvin(-273.15)); // 0 (absolute zero)

// Test static Kelvin to Celsius conversion
console.log(Temperature.kelvinToCelsius(273.15)); // 0
console.log(Temperature.kelvinToCelsius(373.15)); // 100
console.log(Temperature.kelvinToCelsius(0)); // -273.15

// Test instance methods
const temp1 = new Temperature(25);
console.log(temp1.celsius); // 25
console.log(temp1.toFahrenheit()); // 77
console.log(temp1.toKelvin()); // 298.15

const temp2 = new Temperature(0);
console.log(temp2.toFahrenheit()); // 32
console.log(temp2.toKelvin()); // 273.15

const temp3 = new Temperature(100);
console.log(temp3.toFahrenheit()); // 212
console.log(temp3.toKelvin()); // 373.15
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

**Validation Requirements:**

- Constructor:
  - Must throw an error if `activeConnections >= maxConnections`
  - Must increment `activeConnections` by exactly 1
  - Must add `connectionId` to `connectionHistory` array
  - `connectionId` must be a non-empty string
  - Must set `isActive` to `true`
  - Must initialize `connectedAt` with current date/time
- `disconnect()`:
  - Must only decrement `activeConnections` if connection is currently active
  - Must set `isActive` to `false`
  - Must not allow `activeConnections` to go below 0
- `reconnect()`:
  - Must check if connection can be made (not exceeding `maxConnections`)
  - Must only reconnect if currently disconnected (`isActive === false`)
  - Must increment `activeConnections` only if reconnection succeeds
- `canConnect()`:
  - Must return `true` only if `activeConnections < maxConnections`

**Example usage:**

```typescript
// Test initial state
console.log(DatabaseConnection.canConnect()); // true
console.log(DatabaseConnection.getStatus()); // "0/5 connections active"
console.log(DatabaseConnection.getHistory().length); // 0

// Test creating first connection
const conn1 = new DatabaseConnection("conn-1");
console.log(conn1.isActive); // true
console.log(DatabaseConnection.getStatus()); // "1/5 connections active"
console.log(DatabaseConnection.getHistory()); // ["conn-1"]

// Test creating more connections
const conn2 = new DatabaseConnection("conn-2");
const conn3 = new DatabaseConnection("conn-3");

console.log(DatabaseConnection.getStatus()); // "3/5 connections active"
console.log(DatabaseConnection.canConnect()); // true

// Test disconnect
conn1.disconnect();
console.log(conn1.isActive); // false
console.log(DatabaseConnection.getStatus()); // "2/5 connections active"

// Test reconnect
conn1.reconnect();
console.log(conn1.isActive); // true
console.log(DatabaseConnection.getStatus()); // "3/5 connections active"

// Test edge case: Create connections up to the limit
const conn4 = new DatabaseConnection("conn-4");
const conn5 = new DatabaseConnection("conn-5");

console.log(DatabaseConnection.getStatus()); // "5/5 connections active"
console.log(DatabaseConnection.canConnect()); // false

// Test edge case: Trying to create connection when at limit (should throw error)
try {
  const conn6 = new DatabaseConnection("conn-6");
} catch (error) {
  console.log("Error: Max connections reached"); // This should run
}

console.log(DatabaseConnection.getStatus()); // "5/5 connections active" (unchanged)

// Test that disconnecting allows new connection
conn2.disconnect();
console.log(DatabaseConnection.canConnect()); // true
console.log(DatabaseConnection.getStatus()); // "4/5 connections active"

const conn7 = new DatabaseConnection("conn-7");
console.log(DatabaseConnection.getStatus()); // "5/5 connections active"

// Test connection history tracks all connections created
const history = DatabaseConnection.getHistory();
console.log(history.length); // 6
console.log(history); // ["conn-1", "conn-2", "conn-3", "conn-4", "conn-5", "conn-7"]
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

**Validation Requirements:**

- `max()` and `min()`:
  - Must handle at least one number in the arguments
  - Must correctly identify the largest/smallest value
- `average()`:
  - Must return the arithmetic mean of all numbers
  - Must handle at least one number in the arguments
- `sum()`:
  - Must return the total of all numbers
  - Must return 0 if no numbers provided
- `factorial(n)`:
  - `n` must be a non-negative integer (>= 0)
  - Must return 1 for factorial(0)
  - Must correctly calculate n! for positive integers
- `isPrime(n)`:
  - Must return `false` for numbers <= 1
  - Must return `true` only for prime numbers
  - Must return `false` for composite numbers
- `fibonacci(n)`:
  - `n` must be a non-negative integer (>= 0)
  - Must return correct Fibonacci number for position n
  - Sequence: 0, 1, 1, 2, 3, 5, 8, 13, ...
- `randomInt(min, max)`:
  - Must return an integer within the range [min, max] inclusive
  - `min` must be <= `max`

**Example usage:**

```typescript
// Test max method
console.log(MathUtils.max(1, 5, 3, 9, 2)); // 9
console.log(MathUtils.max(10)); // 10
console.log(MathUtils.max(-5, -10, -3)); // -3

// Test min method
console.log(MathUtils.min(1, 5, 3, 9, 2)); // 1
console.log(MathUtils.min(10)); // 10
console.log(MathUtils.min(-5, -10, -3)); // -10

// Test average method
console.log(MathUtils.average(10, 20, 30)); // 20
console.log(MathUtils.average(5, 5, 5)); // 5
console.log(MathUtils.average(100)); // 100

// Test sum method
console.log(MathUtils.sum(1, 2, 3, 4, 5)); // 15
console.log(MathUtils.sum(10, 20)); // 30
console.log(MathUtils.sum()); // 0

// Test factorial method
console.log(MathUtils.factorial(0)); // 1
console.log(MathUtils.factorial(1)); // 1
console.log(MathUtils.factorial(5)); // 120
console.log(MathUtils.factorial(7)); // 5040

// Test isPrime method
console.log(MathUtils.isPrime(0)); // false
console.log(MathUtils.isPrime(1)); // false
console.log(MathUtils.isPrime(2)); // true
console.log(MathUtils.isPrime(17)); // true
console.log(MathUtils.isPrime(18)); // false
console.log(MathUtils.isPrime(29)); // true

// Test fibonacci method
console.log(MathUtils.fibonacci(0)); // 0
console.log(MathUtils.fibonacci(1)); // 1
console.log(MathUtils.fibonacci(7)); // 13
console.log(MathUtils.fibonacci(10)); // 55

// Test randomInt method
const random1 = MathUtils.randomInt(1, 10);
console.log(random1 >= 1 && random1 <= 10); // true
const random2 = MathUtils.randomInt(5, 5);
console.log(random2); // 5

// No need to create instances - all methods are static
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

**Validation Requirements:**

- **User class:**
  - Constructor:
    - All string properties must be non-empty
    - `permissions` must be an array (can be empty)
    - `createdAt` must be a valid Date object
  - `hasPermission(permission)`:
    - Must check if `permission` exists in the `permissions` array
    - Case-sensitive comparison
- **UserFactory class:**
  - `createAdmin()`:
    - Must create user with role "admin"
    - Must include all permissions: ["create", "read", "update", "delete", "manage_users", "delete_users", "edit_posts"]
    - Must increment `userCount`
  - `createModerator()`:
    - Must create user with role "moderator"
    - Must include limited permissions: ["read", "update", "edit_posts", "delete_posts"]
    - Must increment `userCount`
  - `createRegularUser()`:
    - Must create user with role "user"
    - Must include basic permissions: ["read", "create_posts", "comment"]
    - Must increment `userCount`
  - `createCustomUser()`:
    - Must accept custom role and permissions
    - Must increment `userCount`
  - `createFromAPIData()`:
    - Must extract username, email, role, and permissions from data object
    - Must handle missing properties with defaults
    - Must increment `userCount`
  - `createBatch()`:
    - Must create `count` number of users
    - Must use appropriate factory method based on `role` parameter
    - Supported roles: "admin", "moderator", "user", "api"
    - Must throw error for unsupported role types
    - Must generate unique usernames and emails for each user
    - Must increment `userCount` by `count`
  - All factory methods:
    - Must generate unique IDs for each user (based on `userCount`)
    - Must set `createdAt` to current date/time

**Example usage:**

```typescript
// Test initial state
console.log(UserFactory.getTotalUsers()); // 0

// Test createAdmin
const admin = UserFactory.createAdmin("admin1", "admin@example.com");
console.log(admin.getInfo()); // "User #1: admin1 (admin@example.com) - Role: admin"
console.log(admin.role); // "admin"
console.log(admin.hasPermission("delete_users")); // true
console.log(admin.hasPermission("manage_users")); // true
console.log(admin.hasPermission("read")); // true
console.log(UserFactory.getTotalUsers()); // 1

// Test createModerator
const mod = UserFactory.createModerator("mod1", "mod@example.com");
console.log(mod.getInfo()); // "User #2: mod1 (mod@example.com) - Role: moderator"
console.log(mod.role); // "moderator"
console.log(mod.hasPermission("edit_posts")); // true
console.log(mod.hasPermission("delete_posts")); // true
console.log(mod.hasPermission("delete_users")); // false (not a moderator permission)
console.log(UserFactory.getTotalUsers()); // 2

// Test createRegularUser
const user = UserFactory.createRegularUser("john", "john@example.com");
console.log(user.getInfo()); // "User #3: john (john@example.com) - Role: user"
console.log(user.role); // "user"
console.log(user.hasPermission("create_posts")); // true
console.log(user.hasPermission("comment")); // true
console.log(user.hasPermission("edit_posts")); // false (not a user permission)
console.log(user.hasPermission("delete_users")); // false
console.log(UserFactory.getTotalUsers()); // 3

// Test createCustomUser
const customUser = UserFactory.createCustomUser(
  "custom1",
  "custom@example.com",
  "contributor",
  ["read", "create_posts", "edit_own_posts"],
);
console.log(customUser.role); // "contributor"
console.log(customUser.hasPermission("edit_own_posts")); // true
console.log(customUser.hasPermission("delete_users")); // false
console.log(UserFactory.getTotalUsers()); // 4

// Test createFromAPIData
const apiData = {
  username: "jane",
  email: "jane@example.com",
  role: "user",
  permissions: ["read", "comment"],
};
const apiUser = UserFactory.createFromAPIData(apiData);
console.log(apiUser.username); // "jane"
console.log(apiUser.role); // "user"
console.log(apiUser.hasPermission("read")); // true
console.log(apiUser.hasPermission("comment")); // true
console.log(UserFactory.getTotalUsers()); // 5

// Test createBatch
const moderators = UserFactory.createBatch(3, "moderator");
console.log(moderators.length); // 3
console.log(moderators[0].role); // "moderator"
console.log(moderators[1].role); // "moderator"
console.log(moderators[2].role); // "moderator"
console.log(UserFactory.getTotalUsers()); // 8 (5 + 3 moderators)

// Test that IDs are unique
console.log(admin.id); // "1"
console.log(mod.id); // "2"
console.log(user.id); // "3"
console.log(customUser.id); // "4"
console.log(apiUser.id); // "5"
console.log(moderators[0].id); // "6"
console.log(moderators[1].id); // "7"
console.log(moderators[2].id); // "8"

// Test that all users have createdAt timestamps
console.log(admin.createdAt instanceof Date); // true
console.log(mod.createdAt instanceof Date); // true
```

**Learning goals:** Factory pattern, static factory methods, complex object creation, batch operations

---

## How to Complete

1. Work through exercises in order (they build in difficulty)
2. Run each exercise with: `npx ts-node exercises/lesson-02/01-static-properties-easy.ts`
3. Pay attention to when to use static vs instance members
4. Remember: static members are accessed via the class name, instance members via objects
5. For utility classes (Exercise 4), no instances should be created

## Tips

- Read the lesson content in `docs/02-static-members.md` if you get stuck
- Static members belong to the class, not instances
- Use static for: shared state, constants, utility functions, factory methods
- Use instance members for: data unique to each object
- Static methods cannot access instance properties (no `this` for instances)
