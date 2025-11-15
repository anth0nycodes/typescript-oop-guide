# Lesson 07 Exercises: Inheritance

Complete these exercises to practice class inheritance, the `super` keyword, method overriding, and building class hierarchies.

---

## Exercise 1: Basic Inheritance (Easy)

**File:** `01-basic-inheritance-easy.ts`

Create an `Animal` base class and `Dog` subclass:

**Requirements:**

**Animal class:**
- Properties: `name` (string), `age` (number)
- Constructor accepts name and age
- Method `makeSound()`: returns "Some generic animal sound"
- Method `getInfo()`: returns formatted animal information

**Dog class (extends Animal):**
- Additional property: `breed` (string)
- Constructor accepts name, age, and breed (must call super)
- Override `makeSound()`: returns "Woof! Woof!"
- Method `fetch()`: returns "Dog is fetching!"

**Example usage:**
```typescript
const animal = new Animal("Generic Animal", 5);
console.log(animal.makeSound()); // "Some generic animal sound"
console.log(animal.getInfo());   // "Generic Animal is 5 years old"

const dog = new Dog("Buddy", 3, "Golden Retriever");
console.log(dog.makeSound()); // "Woof! Woof!" (overridden)
console.log(dog.getInfo());   // "Buddy is 3 years old" (inherited)
console.log(dog.fetch());     // "Dog is fetching!"
console.log(dog.breed);       // "Golden Retriever"
```

**Learning goals:** Basic inheritance with `extends`, calling `super()` in constructor, method overriding

---

## Exercise 2: Using super in Methods (Easy)

**File:** `02-using-super-methods-easy.ts`

Create a `Vehicle` and `Car` class that demonstrates calling parent methods:

**Requirements:**

**Vehicle class:**
- Properties: `brand` (string), `year` (number), `mileage` (number)
- Constructor accepts brand, year, initial mileage (default 0)
- Method `drive(distance: number)`: adds to mileage, returns message
- Method `getDetails()`: returns vehicle details

**Car class (extends Vehicle):**
- Additional property: `model` (string)
- Constructor accepts brand, year, model, initial mileage
- Override `drive(distance: number)`: calls super.drive(), then returns additional car-specific message
- Override `getDetails()`: calls super.getDetails() and adds model information

**Example usage:**
```typescript
const vehicle = new Vehicle("Generic", 2020, 1000);
console.log(vehicle.drive(50));
// "Drove 50 miles. Total mileage: 1050"

const car = new Car("Toyota", 2022, "Camry", 500);
console.log(car.drive(100));
// "Drove 100 miles. Total mileage: 600"
// "Car Camry drove smoothly"

console.log(car.getDetails());
// "2022 Toyota (600 miles)"
// "Model: Camry"
```

**Learning goals:** Calling parent methods with `super.method()`, extending parent behavior

---

## Exercise 3: Multi-Level Inheritance (Medium)

**File:** `03-multi-level-inheritance-medium.ts`

Create a three-level inheritance hierarchy:

**Requirements:**

**LivingBeing class (base):**
- Property: `isAlive` (boolean, default true)
- Method `breathe()`: returns "Breathing..."

**Animal class (extends LivingBeing):**
- Properties: `name` (string), `species` (string)
- Constructor accepts name and species
- Method `move()`: returns "Moving..."
- Method `eat()`: returns "Eating..."

**Mammal class (extends Animal):**
- Additional property: `furColor` (string)
- Constructor accepts name, species, furColor
- Method `produceMilk()`: returns "Producing milk..."
- Override `breathe()`: calls super and adds mammal-specific info

**Example usage:**
```typescript
const mammal = new Mammal("Lion", "Panthera leo", "Golden");
console.log(mammal.breathe());
// "Breathing..."
// "Mammal breathing with lungs"

console.log(mammal.move());        // "Moving..." (from Animal)
console.log(mammal.produceMilk()); // "Producing milk..." (from Mammal)
console.log(mammal.isAlive);       // true (from LivingBeing)
console.log(mammal.name);          // "Lion" (from Animal)
console.log(mammal.furColor);      // "Golden" (from Mammal)
```

**Learning goals:** Multi-level inheritance, accessing properties and methods from all levels

---

## Exercise 4: Method Overriding and Protected Members (Medium)

**File:** `04-method-overriding-protected-medium.ts`

Create an employee hierarchy with protected members:

**Requirements:**

**Employee class (base):**
- Protected properties: `baseSalary` (number), `bonus` (number, default 0)
- Public properties: `name` (string), `id` (number)
- Constructor accepts name, id, baseSalary
- Method `calculatePay()`: returns baseSalary + bonus
- Method `setBonus(amount: number)`: sets bonus
- Method `getDetails()`: returns employee details

**Manager class (extends Employee):**
- Private property: `teamSize` (number)
- Constructor accepts name, id, baseSalary, teamSize
- Override `calculatePay()`: calls super, adds team bonus (teamSize * 100)
- Method `getTeamSize()`: returns teamSize

**Developer class (extends Employee):**
- Private property: `programmingLanguages` (string[])
- Constructor accepts name, id, baseSalary, languages
- Override `calculatePay()`: calls super, adds language bonus (languages.length * 500)
- Method `addLanguage(language: string)`: adds language to array

**Example usage:**
```typescript
const manager = new Manager("Alice", 1, 80000, 5);
manager.setBonus(5000);
console.log(manager.calculatePay());
// 85500 (80000 + 5000 + 500)

const dev = new Developer("Bob", 2, 90000, ["TypeScript", "Python"]);
dev.setBonus(3000);
console.log(dev.calculatePay());
// 94000 (90000 + 3000 + 1000)

dev.addLanguage("Rust");
console.log(dev.calculatePay());
// 94500 (90000 + 3000 + 1500)
```

**Learning goals:** Protected members in inheritance, method overriding with super, specialized behavior in subclasses

---

## Exercise 5: Complex Inheritance Hierarchy (Hard)

**File:** `05-complex-hierarchy-hard.ts`

Create a comprehensive media library system:

**Requirements:**

**MediaItem (base class):**
- Protected properties: `title` (string), `creator` (string), `year` (number), `rating` (number, 0-10)
- Static property: `totalItems` (tracks all media items)
- Constructor accepts title, creator, year
- Method `rate(score: number)`: validates and sets rating (0-10)
- Method `getRating()`: returns rating
- Method `getInfo()`: returns basic media info
- Static method `getTotalItems()`: returns total items created

**Book (extends MediaItem):**
- Additional properties: `isbn` (string), `pages` (number), `genre` (string)
- Constructor accepts title, author, year, isbn, pages, genre
- Override `getInfo()`: calls super and adds book-specific details
- Method `getReadingTime()`: estimates reading time (pages / 50 words per page)

**Movie (extends MediaItem):**
- Additional properties: `duration` (number, in minutes), `director` (string), `genre` (string)
- Constructor accepts title, director, year, duration, genre
- Override `getInfo()`: calls super and adds movie-specific details
- Method `isLongMovie()`: returns true if duration > 150 minutes

**Album (extends MediaItem):**
- Additional properties: `artist` (string), `tracks` (number), `genre` (string)
- Constructor accepts title, artist, year, tracks, genre
- Override `getInfo()`: calls super and adds album-specific details
- Method `getAverageTrackLength(totalMinutes: number)`: calculates average track length

**Library class:**
- Property: `collection` (array of MediaItem - holds books, movies, albums)
- Method `addItem(item: MediaItem)`: adds to collection
- Method `removeItem(title: string)`: removes from collection
- Method `getByRating(minRating: number)`: returns items with rating >= minRating
- Method `getBooks()`: returns only Book items
- Method `getMovies()`: returns only Movie items
- Method `getAlbums()`: returns only Album items
- Method `getAverageRating()`: calculates average rating of all items

**Example usage:**
```typescript
const library = new Library();

const book = new Book("1984", "George Orwell", 1949, "978-0-452-28423-4", 328, "Dystopian");
const movie = new Movie("Inception", "Christopher Nolan", 2010, 148, "Sci-Fi");
const album = new Album("Abbey Road", "The Beatles", 1969, 17, "Rock");

library.addItem(book);
library.addItem(movie);
library.addItem(album);

book.rate(9);
movie.rate(8.5);
album.rate(10);

console.log(library.getAverageRating()); // 9.17

const highRated = library.getByRating(9);
console.log(highRated.length); // 2 (book and album)

console.log(book.getReadingTime());   // ~6.5 hours
console.log(movie.isLongMovie());     // false (148 < 150)

console.log(MediaItem.getTotalItems()); // 3
```

**Learning goals:** Complex inheritance hierarchies, polymorphism (storing different subclass types in same array), instanceof checking, combining inheritance concepts

---

## How to Complete

1. Work through exercises in order (they build in difficulty)
2. Run each exercise with: `npx ts-node exercises/lesson-07/01-basic-inheritance-easy.ts`
3. Always call `super()` in child class constructors before accessing `this`
4. Use `super.method()` to call parent class methods
5. Practice overriding methods while extending their functionality

## Tips

- Read the lesson content in `docs/07-inheritance.md` if you get stuck
- `extends` creates a parent-child relationship
- `super()` must be called first in child constructors
- Use `super.method()` to call parent methods from child methods
- Protected members are accessible in subclasses but not from outside
- Method overriding allows specialized behavior while reusing parent code
