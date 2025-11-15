# Lesson 06 Exercises: Getters and Setters

Complete these exercises to practice using getters and setters for computed properties, validation, and controlled access to object state.

---

## Exercise 1: Basic Getters and Setters (Easy)

**File:** `01-basic-getters-setters-easy.ts`

Create a `Person` class with getters and setters for validation:

**Requirements:**
- Private properties: `_firstName` (string), `_lastName` (string), `_age` (number)
- Getter/Setter for `firstName`: validate not empty
- Getter/Setter for `lastName`: validate not empty
- Getter/Setter for `age`: validate between 0 and 150
- Getter only for `fullName`: returns "firstName lastName"
- Method `introduce()`: uses getters to return introduction

**Example usage:**
```typescript
const person = new Person("John", "Doe", 30);

console.log(person.fullName); // "John Doe"
console.log(person.age);       // 30

person.firstName = "Jane";
console.log(person.fullName);  // "Jane Doe"

// person.age = -5;    // ❌ Error - age validation
// person.age = 200;   // ❌ Error - age validation

console.log(person.introduce()); // "Hi, I'm Jane Doe and I'm 30 years old"
```

**Learning goals:** Basic getter/setter syntax, validation in setters, computed read-only properties

---

## Exercise 2: Computed Properties (Easy)

**File:** `02-computed-properties-easy.ts`

Create a `Rectangle` class with computed area and perimeter:

**Requirements:**
- Private properties: `_width` (number), `_height` (number)
- Getter/Setter for `width`: validate positive number
- Getter/Setter for `height`: validate positive number
- Getter only for `area`: computed as width * height
- Getter only for `perimeter`: computed as 2 * (width + height)
- Getter only for `isSquare`: returns true if width === height
- Setter for `square`: when set to true, makes it a square (height = width)

**Example usage:**
```typescript
const rect = new Rectangle(5, 10);

console.log(rect.area);      // 50
console.log(rect.perimeter); // 30
console.log(rect.isSquare);  // false

rect.width = 8;
console.log(rect.area);      // 80

rect.square = true;
console.log(rect.width);     // 8
console.log(rect.height);    // 8
console.log(rect.isSquare);  // true
```

**Learning goals:** Computed properties, read-only getters, setters that affect multiple properties

---

## Exercise 3: Data Transformation (Medium)

**File:** `03-data-transformation-medium.ts`

Create a `Temperature` class that handles conversion transparently:

**Requirements:**
- Private property: `_celsius` (number, stores in Celsius)
- Getter/Setter for `celsius`: direct access
- Getter/Setter for `fahrenheit`: converts to/from Celsius
- Getter/Setter for `kelvin`: converts to/from Celsius
- Getter only for `isFreezing`: returns true if <= 0°C
- Getter only for `isBoiling`: returns true if >= 100°C
- Method `compare(other: Temperature)`: returns which is hotter

**Example usage:**
```typescript
const temp = new Temperature();

temp.celsius = 25;
console.log(temp.celsius);    // 25
console.log(temp.fahrenheit); // 77
console.log(temp.kelvin);     // 298.15

temp.fahrenheit = 212;
console.log(temp.celsius);    // 100
console.log(temp.isBoiling);  // true

temp.kelvin = 273.15;
console.log(temp.celsius);    // 0
console.log(temp.isFreezing); // true
```

**Learning goals:** Data transformation in getters/setters, multiple representations of the same data

---

## Exercise 4: Validation and Side Effects (Medium)

**File:** `04-validation-side-effects-medium.ts`

Create a `UserAccount` class with password hashing and email validation:

**Requirements:**
- Private properties: `_username` (string), `_email` (string), `_passwordHash` (string), `_lastModified` (Date)
- Getter/Setter for `username`: validate min 3 chars, max 20 chars, alphanumeric only
- Getter/Setter for `email`: validate contains "@" and "."
- Setter only for `password`: hashes password (use simple hash for exercise), updates lastModified
- Method `verifyPassword(password: string)`: checks if password matches hash
- Getter only for `accountInfo`: returns formatted account information
- Getter only for `passwordAge`: returns days since password was last changed

**Example usage:**
```typescript
const user = new UserAccount("john_doe", "john@example.com");

user.password = "mysecretpass";
console.log(user.verifyPassword("mysecretpass")); // true
console.log(user.verifyPassword("wrongpass"));    // false

user.email = "newemail@example.com";
// user.email = "invalid"; // ❌ Error - invalid email format

console.log(user.accountInfo);
// "Username: john_doe, Email: newemail@example.com"

console.log(user.passwordAge); // 0 (just set)
```

**Learning goals:** Complex validation, side effects in setters (updating lastModified), write-only setters

---

## Exercise 5: Shopping Cart with Smart Getters (Hard)

**File:** `05-shopping-cart-smart-getters-hard.ts`

Create a comprehensive shopping cart with intelligent getters and setters:

**Requirements:**

**CartItem class:**
- Private properties: `_name` (string), `_price` (number), `_quantity` (number)
- Getter/Setter for `name`, `price` (validate > 0), `quantity` (validate >= 0)
- Getter only for `subtotal`: price * quantity

**ShoppingCart class:**
- Private property: `_items` (array of CartItem)
- Private property: `_discountCode` (string | null)
- Private property: `_taxRate` (number, default 0.08 for 8%)
- Method `addItem(name: string, price: number, quantity: number)`: adds or updates item
- Method `removeItem(name: string)`: removes item
- Method `updateQuantity(name: string, quantity: number)`: updates item quantity
- Getter only for `items`: returns copy of items array
- Getter only for `subtotal`: sum of all item subtotals
- Getter/Setter for `discountCode`: validates discount codes
- Getter only for `discount`: calculates discount based on code ("SAVE10" = 10%, "SAVE20" = 20%)
- Getter only for `subtotalAfterDiscount`: subtotal minus discount
- Getter only for `tax`: calculated on subtotal after discount
- Getter only for `total`: final total with tax
- Getter only for `isEmpty`: returns true if no items
- Getter only for `itemCount`: total number of items
- Method `clear()`: empties cart

**Example usage:**
```typescript
const cart = new ShoppingCart();

cart.addItem("Laptop", 1000, 1);
cart.addItem("Mouse", 25, 2);

console.log(cart.subtotal);     // 1050
console.log(cart.itemCount);    // 2

cart.discountCode = "SAVE10";
console.log(cart.discount);     // 105 (10% of 1050)
console.log(cart.subtotalAfterDiscount); // 945
console.log(cart.tax);          // 75.6 (8% of 945)
console.log(cart.total);        // 1020.6

cart.updateQuantity("Mouse", 1);
console.log(cart.subtotal);     // 1025
console.log(cart.total);        // 982.5

// Get items (returns copy, can't modify original)
const items = cart.items;
console.log(items.length);      // 2

console.log(cart.isEmpty);      // false
cart.clear();
console.log(cart.isEmpty);      // true
```

**Learning goals:** Complex computed properties, chained calculations, smart getters that depend on other getters, real-world application

---

## How to Complete

1. Work through exercises in order (they build in difficulty)
2. Run each exercise with: `npx ts-node exercises/lesson-06/01-basic-getters-setters-easy.ts`
3. Remember: getters have no parameters, setters have exactly one parameter
4. Always validate in setters before modifying internal state
5. Use getters for computed properties that don't need to be stored

## Tips

- Read the lesson content in `docs/06-getters-setters.md` if you get stuck
- Getters are called without parentheses: `obj.property` not `obj.property()`
- Setters are assigned to like regular properties: `obj.property = value`
- Use private `_property` and public `property` getter/setter pattern
- Computed properties (getters without setters) are useful for derived data
- Setters can have side effects (like updating lastModified timestamp)
