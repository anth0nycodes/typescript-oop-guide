# Classes and Objects - The Foundation

## What is a Class?

A **class** is a blueprint or template for creating objects. Think of it like an architectural blueprint:
- A blueprint describes what a house will look like (rooms, doors, windows)
- A class describes what objects will contain (properties) and what they can do (methods)

```typescript
// This is a blueprint for creating Person objects
class Person {
  name: string;
  age: number;
}
```

When you create a class, you're defining a new **custom type** that you can use throughout your application.

## Class Syntax and Anatomy

A class definition consists of several parts:

```typescript
class ClassName {
  // 1. Properties - data that each object holds
  propertyName: type;

  // 2. Constructor - initializes new objects
  constructor(parameters) {
    // Initialization code
  }

  // 3. Methods - functions that define behavior
  methodName(): returnType {
    // Method code
  }
}
```

### Example Breakdown

```typescript
class Car {
  // Properties: what data does each Car object have?
  brand: string;
  model: string;
  year: number;

  // Constructor: how do we create a new Car?
  constructor(brand: string, model: string, year: number) {
    this.brand = brand;
    this.model = model;
    this.year = year;
  }

  // Method: what can a Car do?
  getInfo(): string {
    return `${this.year} ${this.brand} ${this.model}`;
  }
}
```

## Creating Objects with the `new` Keyword

To create an object from a class, use the `new` keyword:

```typescript
// Create a new Car object
const myCar = new Car("Toyota", "Camry", 2024);

// Each object is independent
const yourCar = new Car("Honda", "Civic", 2023);

console.log(myCar.getInfo());  // "2024 Toyota Camry"
console.log(yourCar.getInfo()); // "2023 Honda Civic"
```

### What Does `new` Do?

When you write `new Car(...)`, JavaScript:
1. Creates a new empty object
2. Runs the constructor to set up the object's properties
3. Returns the fully initialized object

```typescript
// This:
const car = new Car("Tesla", "Model 3", 2024);

// Creates an object like:
// {
//   brand: "Tesla",
//   model: "Model 3",
//   year: 2024,
//   getInfo: [Function]
// }
```

### Must Use `new`

You **must** use `new` when creating class instances:

```typescript
const car1 = new Car("Toyota", "Camry", 2024); // ✅ Correct

// const car2 = Car("Honda", "Civic", 2023);    // ❌ Error!
// Class constructor cannot be invoked without 'new'
```

## Naming Conventions

Following consistent naming conventions makes your code more readable:

| Element | Convention | Examples |
|---------|------------|----------|
| Classes | **PascalCase** | `Person`, `ShoppingCart`, `UserAccount` |
| Properties | **camelCase** | `firstName`, `totalPrice`, `isActive` |
| Methods | **camelCase** | `calculateTotal()`, `getUserData()`, `save()` |
| Private members | **_camelCase** | `_password`, `_internalState` |
| Constants | **UPPER_SNAKE_CASE** | `MAX_RETRIES`, `DEFAULT_TIMEOUT` |

```typescript
class ShoppingCart {
  // Properties: camelCase
  itemCount: number;
  totalPrice: number;

  // Private property: underscore prefix (convention)
  private _discountCode: string;

  // Constant: UPPER_SNAKE_CASE
  static readonly MAX_ITEMS: number = 100;

  constructor() {
    this.itemCount = 0;
    this.totalPrice = 0;
    this._discountCode = "";
  }

  // Methods: camelCase
  addItem(price: number): void {
    this.itemCount++;
    this.totalPrice += price;
  }

  getTotal(): number {
    return this.totalPrice;
  }
}
```

## Complete Example: Building a Book Class

Let's build a complete example step by step:

```typescript
class Book {
  // Properties
  title: string;
  author: string;
  pages: number;
  isRead: boolean;

  // Constructor
  constructor(title: string, author: string, pages: number) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = false; // Default value
  }

  // Methods
  markAsRead(): void {
    this.isRead = true;
    console.log(`"${this.title}" marked as read`);
  }

  getSummary(): string {
    const status = this.isRead ? "finished" : "not read yet";
    return `"${this.title}" by ${this.author} (${this.pages} pages) - ${status}`;
  }
}

// Using the Book class
const book1 = new Book("1984", "George Orwell", 328);
const book2 = new Book("The Hobbit", "J.R.R. Tolkien", 310);

console.log(book1.getSummary());
// "1984" by George Orwell (328 pages) - not read yet

book1.markAsRead();
// "1984" marked as read

console.log(book1.getSummary());
// "1984" by George Orwell (328 pages) - finished

// book1 and book2 are completely independent objects
console.log(book2.isRead); // false - book2 wasn't affected
```

## Checking Object Types with `instanceof`

The `instanceof` operator checks if an object was created from a specific class:

```typescript
class Dog {
  constructor(public name: string) {}
}

class Cat {
  constructor(public name: string) {}
}

const myDog = new Dog("Buddy");
const myCat = new Cat("Whiskers");

console.log(myDog instanceof Dog);  // true
console.log(myDog instanceof Cat);  // false
console.log(myCat instanceof Cat);  // true

// Useful for type checking
function handlePet(pet: Dog | Cat) {
  if (pet instanceof Dog) {
    console.log("It's a dog!");
  } else if (pet instanceof Cat) {
    console.log("It's a cat!");
  }
}

handlePet(myDog);  // "It's a dog!"
handlePet(myCat);  // "It's a cat!"
```

## Key Takeaways

1. **Classes are blueprints** for creating objects with specific properties and behaviors
2. **Use `new ClassName()`** to create objects from a class
3. **Each object is independent** - changing one doesn't affect others
4. **Properties** store data, **methods** define actions
5. **Constructor** runs automatically when creating new objects
6. **Follow naming conventions** for consistent, readable code

## What's Next?

Now that you understand the basics of classes and objects, you'll learn:
- How properties and constructors work in detail (File 02)
- How methods and the `this` keyword work (File 03)
- How to control access to class members (Files 04-05)
