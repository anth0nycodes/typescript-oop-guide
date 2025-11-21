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

**Validation Requirements:**
- Constructor:
  - Initial balance must be >= 0
  - Cannot start with a negative balance
- `deposit(amount)`:
  - Amount must be positive (> 0)
  - Reject zero or negative amounts
  - Only add to balance if validation passes
- `withdraw(amount)`:
  - Amount must be positive (> 0)
  - Amount must not exceed current balance
  - Only subtract from balance if validation passes
- `_balance`:
  - Must remain private (not accessible outside the class)
  - Should never be negative after any operation

**Example usage:**
```typescript
const wallet = new Wallet(100);

// Test initial balance
console.log(wallet.getBalance()); // 100

// Test deposit
wallet.deposit(50);
console.log(wallet.getBalance()); // 150

wallet.deposit(25);
console.log(wallet.getBalance()); // 175

// Test withdraw
wallet.withdraw(30);
console.log(wallet.getBalance()); // 145

wallet.withdraw(45);
console.log(wallet.getBalance()); // 100

// Test edge case: withdraw exact balance
wallet.withdraw(100);
console.log(wallet.getBalance()); // 0

// Test edge case: withdraw with insufficient funds (should fail)
wallet.deposit(50);
console.log(wallet.getBalance()); // 50
// wallet.withdraw(100); // Should throw error or return false (insufficient funds)

// Test edge case: deposit zero or negative (should fail)
// wallet.deposit(0);   // Should throw error or be rejected
// wallet.deposit(-50); // Should throw error or be rejected

// Test that balance is private
// wallet._balance = 999999; // ❌ Error - private property cannot be accessed

// Test multiple independent wallets
const wallet2 = new Wallet(200);
wallet.deposit(50);
console.log(wallet.getBalance());  // 100
console.log(wallet2.getBalance()); // 200 (independent)
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

**Validation Requirements:**
- Constructor:
  - isbn, title, and author must be non-empty strings
  - publishedYear must be a valid year (positive number, reasonable range)
  - available defaults to true
- `checkOut()`:
  - Only succeed if book is currently available (available === true)
  - Return boolean indicating success/failure
  - Set available to false only on success
- `returnBook()`:
  - Always set available to true
  - Can return book even if already available (idempotent)
- Readonly properties:
  - Cannot be modified after construction
  - isbn, title, author, publishedYear are immutable

**Example usage:**
```typescript
const book = new Book("978-0-123", "1984", "George Orwell", 1949);

// Test initial state
console.log(book.getInfo());
// "1984 by George Orwell (1949) - ISBN: 978-0-123 - Available"
console.log(book.available); // true

// Test readonly properties are accessible
console.log(book.isbn);          // "978-0-123"
console.log(book.title);         // "1984"
console.log(book.author);        // "George Orwell"
console.log(book.publishedYear); // 1949

// Test checkOut
const checkOutSuccess = book.checkOut();
console.log(checkOutSuccess); // true
console.log(book.available);  // false
console.log(book.getInfo());
// "1984 by George Orwell (1949) - ISBN: 978-0-123 - Not Available"

// Test edge case: checking out already checked out book
const checkOutFail = book.checkOut();
console.log(checkOutFail);   // false (already checked out)
console.log(book.available); // false (unchanged)

// Test returnBook
book.returnBook();
console.log(book.available); // true
console.log(book.getInfo());
// "1984 by George Orwell (1949) - ISBN: 978-0-123 - Available"

// Test edge case: returning already available book
book.returnBook();
console.log(book.available); // true (idempotent)

// Test that readonly properties cannot be modified
// book.isbn = "999";        // ❌ Error - readonly property
// book.title = "New Title"; // ❌ Error - readonly property
// book.author = "Someone";  // ❌ Error - readonly property
// book.publishedYear = 2000;// ❌ Error - readonly property

// Test that available can be modified directly (not readonly)
book.available = false; // ✅ OK - not readonly
console.log(book.available); // false
book.available = true;
console.log(book.available); // true

// Test multiple independent books
const book2 = new Book("978-0-456", "The Hobbit", "J.R.R. Tolkien", 1937);
book.checkOut();
console.log(book.available);  // false
console.log(book2.available); // true (independent)
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

**Validation Requirements:**
- Vehicle class:
  - Constructor: brand and model must be non-empty strings
  - `startEngine()`: only callable from subclasses (protected)
  - `stopEngine()`: only callable from subclasses (protected)
  - `engineStatus`: only accessible from subclasses (protected)
- Car class:
  - Constructor: fuelLevel must be between 0 and 100
  - `drive()`: only works if engine is "on" and fuel > 0, consumes fuel (e.g., 10 units)
  - `refuel(amount)`: amount must be positive, cannot exceed 100 total
  - `start()`: only works if fuel > 0, sets engine to "on"
  - `stop()`: always works, sets engine to "off"

**Example usage:**
```typescript
const car = new Car("Toyota", "Camry", 50);

// Test initial state
console.log(car.brand);             // "Toyota"
console.log(car.model);             // "Camry"
console.log(car.getEngineStatus()); // "off"

// Test start
car.start();
console.log(car.getEngineStatus()); // "on"

// Test drive
car.drive();
console.log(car.getEngineStatus()); // "on" (still on, fuel decreased to 40)

// Test stop
car.stop();
console.log(car.getEngineStatus()); // "off"

// Test edge case: trying to drive when engine is off
car.drive();
console.log(car.getEngineStatus()); // "off" (drive should fail, engine still off)

// Test edge case: starting with no fuel
const emptyCar = new Car("Honda", "Civic", 0);
emptyCar.start();
console.log(emptyCar.getEngineStatus()); // "off" (cannot start with no fuel)

// Test refuel
emptyCar.refuel(30);
emptyCar.start();
console.log(emptyCar.getEngineStatus()); // "on" (can start now)

// Test edge case: refuel beyond max (100)
car.refuel(60);
// Should cap at 100 or handle appropriately

// Test edge case: drive until out of fuel
car.start();
car.drive(); // 40 fuel
car.drive(); // 30 fuel
car.drive(); // 20 fuel
car.drive(); // 10 fuel
car.drive(); // 0 fuel, engine should stop or prevent further driving

// Test that protected members are not accessible
// car.engineStatus = "broken";     // ❌ Error - protected property
// car.startEngine();                // ❌ Error - protected method
// car.stopEngine();                 // ❌ Error - protected method

// Test multiple independent cars
const car2 = new Car("Ford", "Mustang", 80);
car.start();
console.log(car.getEngineStatus());  // "on"
console.log(car2.getEngineStatus()); // "off" (independent)
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

**Validation Requirements:**
- Constructor:
  - Initialize items as empty array
  - Initialize discountPercentage as 0
- `addItem(name, price, quantity)`:
  - name must be non-empty string
  - price must be positive (> 0)
  - quantity must be positive (> 0)
  - If item with same name exists, update quantity instead of adding duplicate
- `removeItem(name)`:
  - Only remove if item exists
  - Return boolean or do nothing if not found
- `updateQuantity(name, newQuantity)`:
  - newQuantity must be positive (> 0)
  - Only update if item exists
  - If newQuantity is 0, consider removing the item
- `applyDiscount(percentage)`:
  - percentage must be between 0 and 100
  - Reject values outside this range
- `getItems()`:
  - Must return a COPY of the items array, not the original
  - Modifying returned array should not affect cart's internal state
- `items` and `discountPercentage`:
  - Must remain private and inaccessible from outside

**Example usage:**
```typescript
const cart = new ShoppingCart();

// Test initial state
console.log(cart.getItemCount()); // 0
console.log(cart.getTotal());     // 0

// Test addItem
cart.addItem("Laptop", 1000, 1);
console.log(cart.getItemCount()); // 1
console.log(cart.getTotal());     // 1000

cart.addItem("Mouse", 25, 2);
console.log(cart.getItemCount()); // 2
console.log(cart.getTotal());     // 1050

cart.addItem("Keyboard", 50, 1);
console.log(cart.getItemCount()); // 3
console.log(cart.getTotal());     // 1100

// Test edge case: adding duplicate item (should update quantity)
cart.addItem("Mouse", 25, 1);
console.log(cart.getItemCount()); // 3 (not 4, quantity updated)
console.log(cart.getTotal());     // 1125

// Test applyDiscount
cart.applyDiscount(10); // 10% off
console.log(cart.getTotal()); // 1012.5

cart.applyDiscount(20); // 20% off
console.log(cart.getTotal()); // 900

// Test edge case: invalid discount
// cart.applyDiscount(-10);  // Should throw error or be rejected
// cart.applyDiscount(150);  // Should throw error or be rejected

// Test updateQuantity
cart.updateQuantity("Mouse", 1);
console.log(cart.getTotal()); // 875

cart.updateQuantity("Laptop", 2);
console.log(cart.getTotal()); // 1700

// Test edge case: update non-existent item
cart.updateQuantity("NonExistent", 5); // Should fail gracefully

// Test removeItem
cart.removeItem("Keyboard");
console.log(cart.getItemCount()); // 2
console.log(cart.getTotal());     // 1650

// Test edge case: remove non-existent item
cart.removeItem("NonExistent"); // Should fail gracefully

// Test getItems returns a copy
const items = cart.getItems();
console.log(items.length); // 2

// Modifying returned copy doesn't affect cart
items.push({name: "Hack", price: 0, quantity: 1});
console.log(items.length);        // 3 (modified copy)
console.log(cart.getItemCount()); // 2 (original unchanged)

items[0].price = 99999;
console.log(cart.getTotal()); // Still 1650 (not affected by copy modification)

// Test that private properties are not accessible
// cart.items.push({...});          // ❌ Error - items is private
// cart.discountPercentage = 50;    // ❌ Error - discountPercentage is private

// Test clear
cart.clear();
console.log(cart.getItemCount()); // 0
console.log(cart.getTotal());     // 0

// Test multiple independent carts
const cart2 = new ShoppingCart();
cart.addItem("Item1", 100, 1);
cart2.addItem("Item2", 200, 1);
console.log(cart.getTotal());  // 100
console.log(cart2.getTotal()); // 200 (independent)
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

**Validation Requirements:**
- BankAccount:
  - Constructor: accountNumber must be non-empty string, accountType must be non-empty string
  - `deposit(amount)`: amount must be positive (> 0), records transaction
  - `withdraw(amount)`: amount must be positive (> 0), sufficient balance check, records transaction
  - `recordTransaction()`: must be protected (only accessible to subclasses)
  - `balance` and `transactions`: must be protected/private
  - `accountNumber`: must be readonly (cannot change after construction)
- SavingsAccount:
  - Constructor: interestRate must be positive
  - `applyInterest()`: calculates interest based on current balance, adds to balance, records transaction
  - Override `withdraw()`: prevent withdrawal if balance - amount < minimumBalance
- CheckingAccount:
  - Constructor: overdraftLimit must be non-negative
  - Override `withdraw()`: allow negative balance up to -overdraftLimit
  - `applyMonthlyFee()`: always deduct fee, records transaction

**Example usage:**
```typescript
// Test SavingsAccount
const savings = new SavingsAccount("SAV-001", 0.02);

// Test initial state
console.log(savings.getBalance()); // 0
console.log(savings.accountType);  // "Savings"

// Test deposit
savings.deposit(1000);
console.log(savings.getBalance()); // 1000

savings.deposit(500);
console.log(savings.getBalance()); // 1500

// Test applyInterest
savings.applyInterest();
console.log(savings.getBalance()); // 1530 (1500 * 1.02)

// Test withdraw
savings.withdraw(200);
console.log(savings.getBalance()); // 1330

// Test edge case: withdraw that would go below minimum balance
// savings.withdraw(1250); // Should fail - would leave balance at 80 (< 100 minimum)
console.log(savings.getBalance()); // 1330 (unchanged)

// Test edge case: withdraw exact amount to minimum balance
savings.withdraw(1230);
console.log(savings.getBalance()); // 100 (at minimum, should succeed)

// Test CheckingAccount
const checking = new CheckingAccount("CHK-001", 500);

// Test initial state
console.log(checking.getBalance()); // 0
console.log(checking.accountType);  // "Checking"

// Test deposit
checking.deposit(300);
console.log(checking.getBalance()); // 300

// Test withdraw with overdraft
checking.withdraw(600); // Overdraft allowed up to 500
console.log(checking.getBalance()); // -300

checking.withdraw(100);
console.log(checking.getBalance()); // -400

// Test edge case: withdraw beyond overdraft limit
// checking.withdraw(200); // Should fail - would exceed overdraft limit of 500
console.log(checking.getBalance()); // -400 (unchanged)

// Test applyMonthlyFee
checking.applyMonthlyFee();
console.log(checking.getBalance()); // -410 (if fee is 10)

// Test transaction history
const history = checking.getTransactionHistory();
console.log(history.length); // Up to 10 most recent transactions

// Verify transactions are recorded correctly
savings.deposit(100);
savings.withdraw(50);
savings.applyInterest();
const savingsHistory = savings.getTransactionHistory();
console.log(savingsHistory.length); // At least 3 (deposit, withdraw, interest)

// Test that protected/private properties are not accessible
// savings.balance = 999999;           // ❌ Error - protected property
// savings.recordTransaction("test", 100); // ❌ Error - protected method
// savings.accountNumber = "NEW";      // ❌ Error - readonly property

// Test multiple independent accounts
const savings2 = new SavingsAccount("SAV-002", 0.03);
savings.deposit(500);
savings2.deposit(1000);
console.log(savings.getBalance());  // Previous balance + 500
console.log(savings2.getBalance()); // 1000 (independent)
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
