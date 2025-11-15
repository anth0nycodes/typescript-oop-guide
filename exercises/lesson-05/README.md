# Lesson 05 Exercises: Access Modifiers and Encapsulation

Complete these exercises to practice using access modifiers (public, private, protected, readonly) and understanding encapsulation principles.

---

## Exercise 1: Public vs Private (Easy)

**File:** `01-public-vs-private-easy.ts`

Create a `Wallet` class that demonstrates the importance of private properties:

**Requirements:**
- Private property: `_balance` (number)
- Public constructor accepting initial balance
- Public method `deposit(amount: number)`: adds to balance with validation (amount > 0)
- Public method `withdraw(amount: number)`: removes from balance with validation (amount > 0, sufficient funds)
- Public method `getBalance()`: returns current balance

**Example usage:**
```typescript
const wallet = new Wallet(100);

wallet.deposit(50);
console.log(wallet.getBalance()); // 150

wallet.withdraw(30);
console.log(wallet.getBalance()); // 120

// wallet._balance = 999999; // ❌ Error - private property
// wallet.deposit(-50);      // ❌ Error - validation prevents this
```

**Learning goals:** Private properties, encapsulation, controlled access through methods

---

## Exercise 2: Readonly Properties (Easy)

**File:** `02-readonly-properties-easy.ts`

Create a `Book` class with immutable properties:

**Requirements:**
- Readonly properties: `isbn` (string), `title` (string), `author` (string), `publishedYear` (number)
- Property: `available` (boolean, can be modified)
- Constructor accepts all properties
- Method `checkOut()`: sets available to false if currently available
- Method `returnBook()`: sets available to true
- Method `getInfo()`: returns formatted book info

**Example usage:**
```typescript
const book = new Book("978-0-123", "1984", "George Orwell", 1949);

console.log(book.getInfo());
// "1984 by George Orwell (1949) - ISBN: 978-0-123 - Available"

book.checkOut();
console.log(book.available); // false

// book.isbn = "999";        // ❌ Error - readonly property
// book.title = "New Title"; // ❌ Error - readonly property
book.available = true;       // ✅ OK - not readonly
```

**Learning goals:** Readonly modifier, immutable properties, when to use readonly

---

## Exercise 3: Protected Access (Medium)

**File:** `03-protected-access-medium.ts`

Create a `Vehicle` base class and `Car` subclass demonstrating protected members:

**Requirements:**

**Vehicle class:**
- Protected property: `engineStatus` (string: "off" or "on")
- Public property: `brand` (string)
- Public property: `model` (string)
- Constructor accepts brand and model
- Protected method `startEngine()`: sets engineStatus to "on"
- Protected method `stopEngine()`: sets engineStatus to "off"
- Public method `getEngineStatus()`: returns engineStatus

**Car class (extends Vehicle):**
- Private property: `fuelLevel` (number, 0-100)
- Constructor accepts brand, model, and initial fuel level
- Public method `drive()`: checks fuel and engine status, consumes fuel
- Public method `refuel(amount: number)`: adds fuel (max 100)
- Public method `start()`: starts engine if fuel > 0
- Public method `stop()`: stops engine

**Example usage:**
```typescript
const car = new Car("Toyota", "Camry", 50);

console.log(car.getEngineStatus()); // "off"

car.start();
console.log(car.getEngineStatus()); // "on"

car.drive();
console.log(car.getEngineStatus()); // Still "on", fuel decreased

car.stop();
console.log(car.getEngineStatus()); // "off"

// car.engineStatus = "broken"; // ❌ Error - protected property
// car.startEngine();            // ❌ Error - protected method
```

**Learning goals:** Protected modifier, inheritance with access control, protected vs private

---

## Exercise 4: Proper Encapsulation (Medium)

**File:** `04-proper-encapsulation-medium.ts`

Create a `ShoppingCart` class with proper encapsulation:

**Requirements:**
- Private property: `items` (array of {name: string, price: number, quantity: number})
- Private property: `discountPercentage` (number, 0-100)
- Public method `addItem(name: string, price: number, quantity: number)`: adds item with validation
- Public method `removeItem(name: string)`: removes item by name
- Public method `updateQuantity(name: string, newQuantity: number)`: updates item quantity
- Public method `applyDiscount(percentage: number)`: sets discount (0-100)
- Public method `getTotal()`: calculates total with discount applied
- Public method `getItemCount()`: returns total number of items
- Public method `getItems()`: returns copy of items array (not direct reference!)
- Public method `clear()`: empties cart

**Example usage:**
```typescript
const cart = new ShoppingCart();

cart.addItem("Laptop", 1000, 1);
cart.addItem("Mouse", 25, 2);

console.log(cart.getTotal()); // 1050
console.log(cart.getItemCount()); // 2

cart.applyDiscount(10); // 10% off
console.log(cart.getTotal()); // 945

cart.updateQuantity("Mouse", 1);
console.log(cart.getTotal()); // 922.5

// cart.items.push({...}); // ❌ Error - items is private
const items = cart.getItems();
items.push({name: "Hack", price: 0, quantity: 1}); // Modifying returned copy doesn't affect cart
console.log(cart.getItemCount()); // Still 2
```

**Learning goals:** Full encapsulation, data validation, protecting internal state, returning copies instead of references

---

## Exercise 5: Access Control in Practice (Hard)

**File:** `05-access-control-practice-hard.ts`

Create a `BankAccount` hierarchy with proper access control:

**Requirements:**

**BankAccount (base class):**
- Private property: `accountNumber` (readonly string)
- Protected property: `balance` (number)
- Private property: `transactions` (array of {type: string, amount: number, date: Date})
- Public readonly property: `accountType` (string)
- Constructor accepts accountNumber and accountType
- Protected method `recordTransaction(type: string, amount: number)`: adds to transactions
- Public method `deposit(amount: number)`: adds to balance, records transaction
- Public method `withdraw(amount: number)`: removes from balance with validation, records transaction
- Public method `getBalance()`: returns balance
- Public method `getTransactionHistory()`: returns copy of recent transactions (last 10)

**SavingsAccount (extends BankAccount):**
- Private property: `interestRate` (number, e.g., 0.02 for 2%)
- Private property: `minimumBalance` (number, default 100)
- Constructor accepts accountNumber and interestRate
- Public method `applyInterest()`: adds interest to balance, records transaction
- Override `withdraw()`: prevent withdrawal if balance would fall below minimum

**CheckingAccount (extends BankAccount):**
- Private property: `overdraftLimit` (number)
- Private property: `monthlyFee` (number)
- Constructor accepts accountNumber and overdraftLimit
- Override `withdraw()`: allow overdraft up to limit
- Public method `applyMonthlyFee()`: deducts fee from balance

**Example usage:**
```typescript
const savings = new SavingsAccount("SAV-001", 0.02);
savings.deposit(1000);
savings.applyInterest();
console.log(savings.getBalance()); // 1020

// savings.withdraw(950); // ❌ Error - would go below minimum balance

const checking = new CheckingAccount("CHK-001", 500);
checking.deposit(300);
checking.withdraw(600); // ✅ OK - overdraft allowed
console.log(checking.getBalance()); // -300 (overdraft)

checking.applyMonthlyFee();
console.log(checking.getBalance()); // -310 (if fee is 10)

console.log(checking.getTransactionHistory());
// Returns last 10 transactions
```

**Learning goals:** Complex access control, inheritance with protected members, method overriding, real-world encapsulation patterns

---

## How to Complete

1. Work through exercises in order (they build in difficulty)
2. Run each exercise with: `npx ts-node exercises/lesson-05/01-public-vs-private-easy.ts`
3. Pay attention to when each access modifier is appropriate
4. Remember: private for implementation details, protected for subclass access, public for external interface
5. Always validate data in public methods

## Tips

- Read the lesson content in `docs/05-access-modifiers-encapsulation.md` if you get stuck
- Private = only this class, Protected = this class + subclasses, Public = everywhere
- Use readonly for properties that shouldn't change after initialization
- When returning arrays/objects from getters, return copies to prevent external modification
- Encapsulation isn't just about hiding - it's about controlling HOW data is accessed and modified
