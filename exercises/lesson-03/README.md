# Lesson 03 Exercises: Inheritance

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

**Validation Requirements:**
- Animal class:
  - Constructor: name must be non-empty string, age must be >= 0
  - `makeSound()`: return appropriate sound string
  - `getInfo()`: return formatted string with name and age
- Dog class:
  - Constructor: must call `super(name, age)` before accessing `this`
  - breed must be non-empty string
  - Override `makeSound()`: must return different sound than parent

**Example usage:**
```typescript
const animal = new Animal("Generic Animal", 5);

// Test Animal methods
console.log(animal.name);        // "Generic Animal"
console.log(animal.age);         // 5
console.log(animal.makeSound()); // "Some generic animal sound"
console.log(animal.getInfo());   // "Generic Animal is 5 years old"

const dog = new Dog("Buddy", 3, "Golden Retriever");

// Test inherited properties
console.log(dog.name);        // "Buddy"
console.log(dog.age);         // 3

// Test Dog-specific property
console.log(dog.breed);       // "Golden Retriever"

// Test overridden method
console.log(dog.makeSound()); // "Woof! Woof!" (overridden)

// Test inherited method
console.log(dog.getInfo());   // "Buddy is 3 years old" (inherited)

// Test Dog-specific method
console.log(dog.fetch());     // "Dog is fetching!"

// Test multiple dogs
const dog2 = new Dog("Max", 5, "Labrador");
console.log(dog2.makeSound()); // "Woof! Woof!"
console.log(dog2.breed);       // "Labrador"
console.log(dog2.getInfo());   // "Max is 5 years old"

// Test that Animal and Dog are independent
const animal2 = new Animal("Cat", 2);
console.log(animal2.makeSound()); // "Some generic animal sound" (not "Woof!")
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

**Validation Requirements:**
- Vehicle class:
  - Constructor: brand non-empty, year valid number, mileage >= 0
  - `drive(distance)`: distance must be positive, updates mileage
  - `getDetails()`: return formatted string
- Car class:
  - Constructor: must call `super()` first, model non-empty
  - Override `drive()`: must call `super.drive(distance)` to update mileage
  - Override `getDetails()`: must call `super.getDetails()` and extend result

**Example usage:**
```typescript
const vehicle = new Vehicle("Generic", 2020, 1000);

// Test Vehicle methods
console.log(vehicle.brand);   // "Generic"
console.log(vehicle.year);    // 2020
console.log(vehicle.mileage); // 1000

console.log(vehicle.drive(50));
// "Drove 50 miles. Total mileage: 1050"
console.log(vehicle.mileage); // 1050

console.log(vehicle.drive(100));
// "Drove 100 miles. Total mileage: 1150"

console.log(vehicle.getDetails());
// "2020 Generic (1150 miles)"

const car = new Car("Toyota", 2022, "Camry", 500);

// Test inherited properties
console.log(car.brand);   // "Toyota"
console.log(car.year);    // 2022
console.log(car.mileage); // 500

// Test Car-specific property
console.log(car.model);   // "Camry"

// Test overridden drive (calls super)
console.log(car.drive(100));
// "Drove 100 miles. Total mileage: 600"
// "Car Camry drove smoothly"
console.log(car.mileage); // 600 (updated by super.drive())

car.drive(50);
console.log(car.mileage); // 650

// Test overridden getDetails (calls super)
console.log(car.getDetails());
// "2022 Toyota (650 miles)"
// "Model: Camry"

// Test multiple vehicles
const car2 = new Car("Honda", 2023, "Accord", 0);
car2.drive(200);
console.log(car.mileage);  // 650
console.log(car2.mileage); // 200 (independent)
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

**Validation Requirements:**
- LivingBeing: isAlive defaults to true
- Animal: name and species non-empty, must call super()
- Mammal: furColor non-empty, must call super(name, species)
- Override `breathe()`: must call super.breathe() and extend

**Example usage:**
```typescript
const mammal = new Mammal("Lion", "Panthera leo", "Golden");

// Test methods from all levels
console.log(mammal.breathe());
// "Breathing..."
// "Mammal breathing with lungs"

console.log(mammal.move());        // "Moving..." (from Animal)
console.log(mammal.eat());         // "Eating..." (from Animal)
console.log(mammal.produceMilk()); // "Producing milk..." (from Mammal)

// Test properties from all levels
console.log(mammal.isAlive);       // true (from LivingBeing)
console.log(mammal.name);          // "Lion" (from Animal)
console.log(mammal.species);       // "Panthera leo" (from Animal)
console.log(mammal.furColor);      // "Golden" (from Mammal)

// Test multiple mammals
const mammal2 = new Mammal("Bear", "Ursus arctos", "Brown");
console.log(mammal2.name);         // "Bear"
console.log(mammal2.species);      // "Ursus arctos"
console.log(mammal2.furColor);     // "Brown"
console.log(mammal2.breathe());
// "Breathing..."
// "Mammal breathing with lungs"

// Test that properties are independent
console.log(mammal.name);          // "Lion" (unchanged)
console.log(mammal.furColor);      // "Golden" (unchanged)
```

**Learning goals:** Multi-level inheritance, accessing properties and methods from all levels

---

## Exercise 4: Method Overriding with Inheritance (Medium)

**File:** `04-method-overriding-medium.ts`

Create an employee hierarchy demonstrating method overriding:

**Requirements:**

**Employee class (base):**
- Properties: `name` (string), `id` (number), `baseSalary` (number), `bonus` (number, default 0)
- Constructor accepts name, id, baseSalary
- Method `calculatePay()`: returns baseSalary + bonus
- Method `setBonus(amount: number)`: sets bonus
- Method `getDetails()`: returns employee details

**Manager class (extends Employee):**
- Additional property: `teamSize` (number)
- Constructor accepts name, id, baseSalary, teamSize
- Override `calculatePay()`: calls super, adds an additional team bonus (teamSize \* 100)
- Method `getTeamSize()`: returns teamSize

**Developer class (extends Employee):**
- Additional property: `programmingLanguages` (string[])
- Constructor accepts name, id, baseSalary, programmingLanguages
- Override `calculatePay()`: calls super, adds an additional programmingLanguages bonus (programmingLanguages.length \* 500)
- Method `addProgrammingLanguage(programmingLanguage: string)`: adds programmingLanguage to array

**Validation Requirements:**
- Employee: name non-empty, id positive, baseSalary >= 0, bonus defaults to 0
- Manager: teamSize must be >= 0
- Developer: programmingLanguages must be an array, addProgrammingLanguage() requires a non-empty string
- All calculatePay() overrides must call super.calculatePay()

**Example usage:**
```typescript
const manager = new Manager("Alice", 1, 80000, 5);

// Test initial state
console.log(manager.name);    // "Alice"
console.log(manager.id);      // 1
console.log(manager.getDetails()); // Employee details

// Test calculatePay without bonus
console.log(manager.calculatePay());
// 80500 (80000 + 0 + 500 team bonus)

// Test setBonus
manager.setBonus(5000);
console.log(manager.calculatePay());
// 85500 (80000 + 5000 + 500)

// Test getTeamSize
console.log(manager.getTeamSize()); // 5

const dev = new Developer("Bob", 2, 90000, ["TypeScript", "Python"]);

// Test initial state
console.log(dev.name);         // "Bob"
console.log(dev.id);           // 2
console.log(dev.calculatePay());
// 91000 (90000 + 0 + 1000 language bonus for 2 languages)

// Test setBonus
dev.setBonus(3000);
console.log(dev.calculatePay());
// 94000 (90000 + 3000 + 1000)

// Test addProgrammingLanguage
dev.addProgrammingLanguage("Rust");
console.log(dev.calculatePay());
// 94500 (90000 + 3000 + 1500 for 3 languages)

dev.addProgrammingLanguage("Go");
console.log(dev.calculatePay());
// 95000 (90000 + 3000 + 2000 for 4 languages)

// Test getDetails (inherited)
console.log(dev.getDetails()); // Employee details

// Test multiple employees
const dev2 = new Developer("Charlie", 3, 85000, ["JavaScript"]);
dev2.setBonus(2000);
console.log(dev2.calculatePay());
// 87500 (85000 + 2000 + 500 for 1 language)

console.log(dev.calculatePay());  // 95000 (unchanged)
console.log(manager.calculatePay()); // 85500 (independent)
```

**Learning goals:** Method overriding with super, specialized behavior in subclasses, working with inherited properties

---

## Exercise 5: Complex Inheritance Hierarchy (Hard)

**File:** `05-complex-hierarchy-hard.ts`

Create a comprehensive media library system:

**Requirements:**

**MediaItem (base class):**
- Properties:
  - `title` (string): the title of the media item
  - `creator` (string): the creator's name (author for books, director for movies, artist for albums)
  - `year` (number): the year of release
  - `rating` (number): the rating score, initially unset, valid range 0-10
- Static property:
  - `totalItems` (number): tracks the total count of all MediaItem instances created
- Constructor: accepts `title`, `creator`, and `year` parameters, validates them, and increments the static `totalItems` counter
- Method `rate(score: number)`: validates that the score is between 0 and 10 (inclusive), then sets the `rating` property to the provided score
- Method `getRating()`: returns the current `rating` value
- Method `getInfo()`: returns a string containing the basic media information (title, creator, year, and rating if set)
- Static method `getTotalItems()`: returns the current value of the static `totalItems` counter

**Book (extends MediaItem):**
- Additional properties:
  - `isbn` (string): the book's ISBN number
  - `pages` (number): the total number of pages in the book
  - `genre` (string): the book's genre category
- Constructor: accepts `title`, `author` (passed to super as `creator`), `year`, `isbn`, `pages`, and `genre` parameters, validates all book-specific properties, and calls `super(title, author, year)`
- Override `getInfo()`: calls `super.getInfo()` to get the base information, then appends book-specific details including ISBN, page count, and genre
- Method `getReadingTime()`: calculates and returns the estimated reading time in hours based on 50 pages per hour

**Movie (extends MediaItem):**
- Additional properties:
  - `duration` (number): the movie's runtime in minutes
  - `director` (string): the director's name (also passed to super as `creator`)
  - `genre` (string): the movie's genre category
- Constructor: accepts `title`, `director` (passed to super as `creator`), `year`, `duration`, and `genre` parameters, validates all movie-specific properties, and calls `super(title, director, year)`
- Override `getInfo()`: calls `super.getInfo()` to get the base information, then appends movie-specific details including director, duration, and genre
- Method `isLongMovie()`: returns `true` if the movie's duration is greater than 150 minutes, otherwise returns `false`

**Album (extends MediaItem):**
- Additional properties:
  - `artist` (string): the artist or band name (also passed to super as `creator`)
  - `tracks` (number): the total number of tracks on the album
  - `genre` (string): the album's genre category
- Constructor: accepts `title`, `artist` (passed to super as `creator`), `year`, `tracks`, and `genre` parameters, validates all album-specific properties, and calls `super(title, artist, year)`
- Override `getInfo()`: calls `super.getInfo()` to get the base information, then appends album-specific details including artist, track count, and genre
- Method `getAverageTrackLength(totalMinutes: number)`: accepts the album's total duration in minutes and returns the average track length in minutes by dividing `totalMinutes` by the number of `tracks`

**Library class:**
- Property:
  - `collection` (MediaItem[]): an array that stores all media items (can hold Book, Movie, and Album instances thanks to polymorphism)
- Method `addItem(item: MediaItem)`: accepts a MediaItem instance (or any subclass) and adds it to the `collection` array
- Method `removeItem(title: string)`: accepts a title string, finds the first media item in the collection with a matching title, and removes it from the collection
- Method `getByRating(minRating: number)`: accepts a minimum rating value and returns an array of all media items that have a rating greater than or equal to `minRating`
- Method `getBooks()`: returns an array containing only the Book instances from the collection (use `instanceof` to filter)
- Method `getMovies()`: returns an array containing only the Movie instances from the collection (use `instanceof` to filter)
- Method `getAlbums()`: returns an array containing only the Album instances from the collection (use `instanceof` to filter)
- Method `getAverageRating()`: calculates and returns the average rating across all items in the collection that have been rated

**Validation Requirements:**
- MediaItem class:
  - Constructor: `title` must be a non-empty string, `creator` must be a non-empty string, `year` must be a valid number
  - `rate(score)`: `score` must be between 0 and 10 (inclusive)
  - `rating` property should initially be unset (or set to a default value) until `rate()` is called
- Book class:
  - Constructor: must call `super(title, author, year)` before accessing `this`
  - `isbn` must be a non-empty string
  - `pages` must be greater than 0
  - `genre` must be a non-empty string
- Movie class:
  - Constructor: must call `super(title, director, year)` before accessing `this`
  - `duration` must be greater than 0
  - `director` must be a non-empty string
  - `genre` must be a non-empty string
- Album class:
  - Constructor: must call `super(title, artist, year)` before accessing `this`
  - `artist` must be a non-empty string
  - `tracks` must be greater than 0
  - `genre` must be a non-empty string
- All `getInfo()` method overrides must call `super.getInfo()` to maintain the inheritance chain
- The static `totalItems` counter must increment each time a MediaItem (or any subclass) is instantiated
- Library filtering methods (`getBooks()`, `getMovies()`, `getAlbums()`) must use `instanceof` checks to correctly identify and filter by type

**Example usage:**
```typescript
const library = new Library();

// Create media items
const book = new Book(
  "1984",
  "George Orwell",
  1949,
  "978-0-452-28423-4",
  328,
  "Dystopian",
);
const movie = new Movie("Inception", "Christopher Nolan", 2010, 148, "Sci-Fi");
const album = new Album("Abbey Road", "The Beatles", 1969, 17, "Rock");

// Test static counter
console.log(MediaItem.getTotalItems()); // 3

// Test addItem
library.addItem(book);
library.addItem(movie);
library.addItem(album);

// Test rate method (inherited)
book.rate(9);
console.log(book.getRating()); // 9

movie.rate(8.5);
console.log(movie.getRating()); // 8.5

album.rate(10);
console.log(album.getRating()); // 10

// Test getInfo (overridden in each subclass)
console.log(book.getInfo());
// Base info + "ISBN: 978-0-452-28423-4, Pages: 328, Genre: Dystopian"

console.log(movie.getInfo());
// Base info + "Director: Christopher Nolan, Duration: 148 mins, Genre: Sci-Fi"

console.log(album.getInfo());
// Base info + "Artist: The Beatles, Tracks: 17, Genre: Rock"

// Test getAverageRating
console.log(library.getAverageRating()); // 9.17 (27.5 / 3)

// Test getByRating
const highRated = library.getByRating(9);
console.log(highRated.length); // 2 (book and album)

const allRated = library.getByRating(0);
console.log(allRated.length); // 3 (all items)

// Test type-specific methods
console.log(book.getReadingTime());   // ~6.5 hours (328 pages)
console.log(movie.isLongMovie());     // false (148 < 150 minutes)
console.log(album.getAverageTrackLength(47)); // ~2.76 minutes per track

// Test Library filtering methods
const books = library.getBooks();
console.log(books.length); // 1

const movies = library.getMovies();
console.log(movies.length); // 1

const albums = library.getAlbums();
console.log(albums.length); // 1

// Test removeItem
library.removeItem("Inception");
console.log(library.getMovies().length); // 0

// Test multiple media items
const book2 = new Book(
  "The Hobbit",
  "J.R.R. Tolkien",
  1937,
  "978-0-547-92822-7",
  310,
  "Fantasy",
);
library.addItem(book2);
book2.rate(8);

console.log(library.getBooks().length); // 2
console.log(library.getAverageRating()); // 9 ((9 + 10 + 8) / 3)

console.log(MediaItem.getTotalItems()); // 4
```

**Learning goals:** Complex inheritance hierarchies, polymorphism (storing different subclass types in same array), instanceof checking, combining inheritance concepts

---

## How to Complete

1. Work through exercises in order (they build in difficulty)
2. Run each exercise with: `npx ts-node exercises/lesson-03/01-basic-inheritance-easy.ts`
3. Always call `super()` in child class constructors before accessing `this`
4. Use `super.method()` to call parent class methods
5. Practice overriding methods while extending their functionality

## Tips

- Read the lesson content in `docs/03-inheritance.md` if you get stuck
- `extends` creates a parent-child relationship
- `super()` must be called first in child constructors
- Use `super.method()` to call parent methods from child methods
- Protected members are accessible in subclasses but not from outside
- Method overriding allows specialized behavior while reusing parent code
