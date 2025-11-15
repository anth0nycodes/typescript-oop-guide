# Lesson 08 Exercises: Abstract Classes

Complete these exercises to practice using abstract classes, abstract methods, and the template method pattern.

---

## Exercise 1: Basic Abstract Class (Easy)

**File:** `01-basic-abstract-class-easy.ts`

Create an abstract `Shape` class with concrete implementations:

**Requirements:**

**Abstract Shape class:**
- Property: `color` (string)
- Constructor accepts color
- Abstract method `getArea()`: returns number
- Abstract method `getPerimeter()`: returns number
- Concrete method `describe()`: returns formatted description using getArea()

**Circle class (extends Shape):**
- Additional property: `radius` (number)
- Constructor accepts color and radius
- Implement `getArea()`: π * r²
- Implement `getPerimeter()`: 2 * π * r

**Rectangle class (extends Shape):**
- Additional properties: `width` (number), `height` (number)
- Constructor accepts color, width, height
- Implement `getArea()`: width * height
- Implement `getPerimeter()`: 2 * (width + height)

**Example usage:**
```typescript
// const shape = new Shape("red"); // ❌ Error - cannot instantiate abstract class

const circle = new Circle("red", 5);
console.log(circle.getArea());      // 78.54
console.log(circle.getPerimeter()); // 31.42
console.log(circle.describe());     // "A red shape with area 78.54"

const rectangle = new Rectangle("blue", 4, 6);
console.log(rectangle.getArea());      // 24
console.log(rectangle.getPerimeter()); // 20
console.log(rectangle.describe());     // "A blue shape with area 24"
```

**Learning goals:** Abstract classes and methods, implementing abstract methods, concrete methods in abstract classes

---

## Exercise 2: Abstract Methods and Template Pattern (Easy)

**File:** `02-template-pattern-easy.ts`

Create an abstract `Beverage` class with a template method pattern:

**Requirements:**

**Abstract Beverage class:**
- Abstract method `brew()`: returns string
- Abstract method `addCondiments()`: returns string
- Concrete method `boilWater()`: returns "Boiling water"
- Concrete method `pourInCup()`: returns "Pouring into cup"
- Concrete method `prepare()`: template method that calls all steps in order

**Coffee class (extends Beverage):**
- Implement `brew()`: returns "Brewing coffee grounds"
- Implement `addCondiments()`: returns "Adding sugar and milk"

**Tea class (extends Beverage):**
- Implement `brew()`: returns "Steeping tea leaves"
- Implement `addCondiments()`: returns "Adding lemon"

**Example usage:**
```typescript
const coffee = new Coffee();
console.log(coffee.prepare());
// "Boiling water"
// "Brewing coffee grounds"
// "Pouring into cup"
// "Adding sugar and milk"

const tea = new Tea();
console.log(tea.prepare());
// "Boiling water"
// "Steeping tea leaves"
// "Pouring into cup"
// "Adding lemon"
```

**Learning goals:** Template method pattern, abstract methods enforcing structure, algorithm skeleton in base class

---

## Exercise 3: Abstract Class with State (Medium)

**File:** `03-abstract-with-state-medium.ts`

Create an abstract `Employee` class with shared state and behavior:

**Requirements:**

**Abstract Employee class:**
- Static property: `nextId` (tracks next employee ID)
- Readonly property: `id` (assigned from nextId)
- Protected property: `baseSalary` (number)
- Public property: `name` (string)
- Constructor accepts name and baseSalary
- Abstract method `calculatePay()`: returns number
- Abstract method `getEmployeeType()`: returns string
- Concrete method `getDetails()`: returns formatted employee details
- Concrete method `promote(increase: number)`: increases baseSalary

**FullTimeEmployee (extends Employee):**
- Private property: `benefits` (number)
- Constructor accepts name, baseSalary, benefits
- Implement `calculatePay()`: baseSalary + benefits
- Implement `getEmployeeType()`: returns "Full-Time"

**ContractEmployee (extends Employee):**
- Private property: `hourlyRate` (number)
- Private property: `hoursWorked` (number)
- Constructor accepts name, hourlyRate, hoursWorked
- Implement `calculatePay()`: hourlyRate * hoursWorked
- Implement `getEmployeeType()`: returns "Contract"
- Method `logHours(hours: number)`: adds to hoursWorked

**Example usage:**
```typescript
const fullTime = new FullTimeEmployee("Alice", 60000, 10000);
const contract = new ContractEmployee("Bob", 50, 160);

console.log(fullTime.getDetails());
// "Full-Time Employee #1: Alice"

console.log(contract.getDetails());
// "Contract Employee #2: Bob"

console.log(fullTime.calculatePay()); // 70000
console.log(contract.calculatePay()); // 8000

fullTime.promote(5000);
console.log(fullTime.calculatePay()); // 75000

contract.logHours(20);
console.log(contract.calculatePay()); // 9000
```

**Learning goals:** Abstract classes with state, static properties in abstract classes, protected members

---

## Exercise 4: Multiple Abstract Methods (Medium)

**File:** `04-multiple-abstract-methods-medium.ts`

Create an abstract `Vehicle` class with multiple abstract methods:

**Requirements:**

**Abstract Vehicle class:**
- Protected property: `fuel` (number, current fuel level)
- Public readonly properties: `brand` (string), `model` (string)
- Constructor accepts brand, model, initial fuel
- Abstract method `startEngine()`: returns string
- Abstract method `getFuelEfficiency()`: returns number (miles per gallon)
- Abstract method `getVehicleType()`: returns string
- Concrete method `drive(distance: number)`: calculates fuel consumption, updates fuel
- Concrete method `refuel(amount: number)`: adds to fuel (max 100)
- Concrete method `getFuelLevel()`: returns current fuel

**Car (extends Vehicle):**
- Additional property: `numDoors` (number)
- Implement `startEngine()`: "Car engine started with a quiet hum"
- Implement `getFuelEfficiency()`: 30 mpg
- Implement `getVehicleType()`: "Car"

**Truck (extends Vehicle):**
- Additional property: `cargoCapacity` (number)
- Implement `startEngine()`: "Truck engine roared to life"
- Implement `getFuelEfficiency()`: 15 mpg
- Implement `getVehicleType()`: "Truck"

**Motorcycle (extends Vehicle):**
- Additional property: `hasSidecar` (boolean)
- Implement `startEngine()`: "Motorcycle engine revved loudly"
- Implement `getFuelEfficiency()`: 50 mpg
- Implement `getVehicleType()`: "Motorcycle"

**Example usage:**
```typescript
const car = new Car("Toyota", "Camry", 50, 4);
const truck = new Truck("Ford", "F-150", 80, 1000);
const motorcycle = new Motorcycle("Harley", "Sportster", 20, false);

console.log(car.startEngine());
// "Car engine started with a quiet hum"

car.drive(60); // Consumes 2 gallons (60 miles / 30 mpg)
console.log(car.getFuelLevel()); // 48

truck.drive(30); // Consumes 2 gallons (30 miles / 15 mpg)
console.log(truck.getFuelLevel()); // 78

motorcycle.drive(100); // Consumes 2 gallons (100 miles / 50 mpg)
console.log(motorcycle.getFuelLevel()); // 18
```

**Learning goals:** Multiple abstract methods, different implementations, shared concrete methods

---

## Exercise 5: Payment Processing System (Hard)

**File:** `05-payment-system-hard.ts`

Create an abstract payment processing system with validation:

**Requirements:**

**Abstract Payment class:**
- Static property: `transactionCount` (tracks all transactions)
- Readonly property: `transactionId` (string)
- Protected property: `amount` (number)
- Protected property: `status` (string: "pending", "completed", "failed")
- Public property: `timestamp` (Date)
- Constructor accepts amount
- Abstract method `processPayment()`: returns boolean (success/failure)
- Abstract method `getPaymentMethod()`: returns string
- Abstract method `validatePayment()`: returns boolean
- Concrete method `execute()`: validates, processes, updates status
- Concrete method `getReceipt()`: returns formatted receipt
- Static method `getTransactionCount()`: returns total transactions

**CreditCardPayment (extends Payment):**
- Private properties: `cardNumber` (string), `cvv` (string), `expiryDate` (string)
- Constructor accepts amount, cardNumber, cvv, expiryDate
- Implement `validatePayment()`: checks card number length (16 digits), cvv (3 digits)
- Implement `processPayment()`: simulates processing, returns true if amount < 10000
- Implement `getPaymentMethod()`: "Credit Card"

**PayPalPayment (extends Payment):**
- Private properties: `email` (string), `password` (string)
- Constructor accepts amount, email, password
- Implement `validatePayment()`: checks email contains "@"
- Implement `processPayment()`: simulates processing, returns true if amount < 5000
- Implement `getPaymentMethod()`: "PayPal"

**BankTransferPayment (extends Payment):**
- Private properties: `accountNumber` (string), `routingNumber` (string)
- Constructor accepts amount, accountNumber, routingNumber
- Implement `validatePayment()`: checks account and routing numbers not empty
- Implement `processPayment()`: simulates processing, returns true (always successful)
- Implement `getPaymentMethod()`: "Bank Transfer"

**PaymentProcessor class:**
- Method `processPayments(payments: Payment[])`: executes all payments
- Method `getSuccessfulPayments(payments: Payment[])`: returns completed payments
- Method `getTotalProcessed(payments: Payment[])`: returns total amount of successful payments

**Example usage:**
```typescript
const cc = new CreditCardPayment(299.99, "1234567890123456", "123", "12/25");
const paypal = new PayPalPayment(150.00, "user@example.com", "secret");
const bank = new BankTransferPayment(5000.00, "123456789", "987654321");

cc.execute();
console.log(cc.getReceipt());
// "Transaction #1: Credit Card - $299.99 - Status: completed"

paypal.execute();
console.log(paypal.getReceipt());
// "Transaction #2: PayPal - $150.00 - Status: completed"

bank.execute();
console.log(bank.getReceipt());
// "Transaction #3: Bank Transfer - $5000.00 - Status: completed"

const processor = new PaymentProcessor();
const payments = [cc, paypal, bank];

const successful = processor.getSuccessfulPayments(payments);
console.log(successful.length); // 3

console.log(processor.getTotalProcessed(payments)); // 5449.99

console.log(Payment.getTransactionCount()); // 3
```

**Learning goals:** Complex abstract class design, validation before processing, polymorphism with payment methods, real-world payment system design

---

## How to Complete

1. Work through exercises in order (they build in difficulty)
2. Run each exercise with: `npx ts-node exercises/lesson-08/01-basic-abstract-class-easy.ts`
3. Remember: you cannot instantiate abstract classes directly
4. All abstract methods MUST be implemented in concrete subclasses
5. Abstract classes can have concrete methods that all subclasses inherit

## Tips

- Read the lesson content in `docs/08-abstract-classes.md` if you get stuck
- Use `abstract class` keyword to define abstract classes
- Use `abstract` keyword before method signature (no implementation)
- Abstract classes are great for defining templates and enforcing structure
- Template method pattern: concrete method in base class calls abstract methods
- Abstract classes can have constructors, properties, and concrete methods
