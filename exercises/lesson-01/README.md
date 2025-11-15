# Lesson 01 Exercises: Classes and Objects

Complete these exercises to practice creating classes, instantiating objects, and understanding the fundamentals of OOP.

---

## Exercise 1: Simple Class (Easy)

**File:** `01-simple-class-easy.ts`

Create a `Person` class with basic properties:

**Requirements:**
- Properties: `name` (string), `age` (number), `city` (string)
- Constructor that accepts all three properties
- No methods needed for this exercise

**Example usage:**
```typescript
const person1 = new Person("Alice", 30, "New York");
const person2 = new Person("Bob", 25, "Los Angeles");

console.log(person1.name); // "Alice"
console.log(person2.age);  // 25
```

**Learning goals:** Basic class syntax, properties, constructors, object instantiation

---

## Exercise 2: Class with Methods (Easy)

**File:** `02-class-with-methods-easy.ts`

Create a `Counter` class with methods to increment and get values:

**Requirements:**
- Property: `count` (number, starts at 0)
- Constructor with no parameters (initializes count to 0)
- Method `increment()`: increases count by 1
- Method `decrement()`: decreases count by 1 (don't go below 0)
- Method `getValue()`: returns the current count
- Method `reset()`: sets count back to 0

**Example usage:**
```typescript
const counter = new Counter();
console.log(counter.getValue()); // 0

counter.increment();
counter.increment();
counter.increment();
console.log(counter.getValue()); // 3

counter.decrement();
console.log(counter.getValue()); // 2

counter.reset();
console.log(counter.getValue()); // 0
```

**Learning goals:** Methods, the `this` keyword, working with object state

---

## Exercise 3: Multiple Objects (Medium)

**File:** `03-multiple-objects-medium.ts`

Create a `BankAccount` class and work with multiple independent instances:

**Requirements:**
- Properties: `accountNumber` (string), `ownerName` (string), `balance` (number)
- Constructor accepts accountNumber, ownerName, and initial balance (default to 0)
- Method `deposit(amount: number)`: adds amount to balance, returns new balance
- Method `withdraw(amount: number)`: subtracts amount if sufficient funds, returns boolean (success/failure)
- Method `getBalance()`: returns current balance
- Method `transfer(amount: number, toAccount: BankAccount)`: transfers money to another account if sufficient funds

**Example usage:**
```typescript
const account1 = new BankAccount("ACC001", "Alice", 1000);
const account2 = new BankAccount("ACC002", "Bob", 500);

account1.deposit(200);
console.log(account1.getBalance()); // 1200

account1.withdraw(300);
console.log(account1.getBalance()); // 900

account1.transfer(400, account2);
console.log(account1.getBalance()); // 500
console.log(account2.getBalance()); // 900
```

**Learning goals:** Multiple object instances, object independence, methods interacting with other objects

---

## Exercise 4: Object Interactions (Medium)

**File:** `04-object-interactions-medium.ts`

Create a `Student` class and a `Course` class that interact with each other:

**Requirements:**

**Student class:**
- Properties: `name` (string), `studentId` (string), `enrolledCourses` (array of course names)
- Constructor accepts name and studentId
- Method `enroll(courseName: string)`: adds course to enrolledCourses
- Method `drop(courseName: string)`: removes course from enrolledCourses
- Method `listCourses()`: returns array of enrolled course names
- Method `isEnrolledIn(courseName: string)`: returns boolean

**Course class:**
- Properties: `courseName` (string), `instructor` (string), `students` (array of Student objects), `maxCapacity` (number)
- Constructor accepts courseName, instructor, and maxCapacity
- Method `addStudent(student: Student)`: adds student if capacity allows, also enrolls student in this course
- Method `removeStudent(student: Student)`: removes student from course
- Method `getEnrollmentCount()`: returns number of enrolled students
- Method `isFull()`: returns boolean

**Example usage:**
```typescript
const student1 = new Student("Alice", "S001");
const student2 = new Student("Bob", "S002");

const course = new Course("TypeScript 101", "Dr. Smith", 2);

course.addStudent(student1);
course.addStudent(student2);

console.log(course.getEnrollmentCount()); // 2
console.log(course.isFull()); // true
console.log(student1.listCourses()); // ["TypeScript 101"]
```

**Learning goals:** Object relationships, bidirectional interactions, managing collections of objects

---

## Exercise 5: Library System (Hard)

**File:** `05-library-system-hard.ts`

Build a comprehensive library management system with multiple interacting classes:

**Requirements:**

**Book class:**
- Properties: `isbn` (string), `title` (string), `author` (string), `isAvailable` (boolean, starts true)
- Constructor accepts isbn, title, author
- Method `checkOut()`: sets isAvailable to false if available, returns boolean (success/failure)
- Method `returnBook()`: sets isAvailable to true
- Method `getInfo()`: returns formatted string with book details

**Member class:**
- Properties: `memberId` (string), `name` (string), `borrowedBooks` (array of Book objects), `maxBooks` (number, default 3)
- Constructor accepts memberId, name, optional maxBooks
- Method `borrowBook(book: Book)`: borrows book if under limit and book is available
- Method `returnBook(book: Book)`: returns a borrowed book
- Method `getBorrowedCount()`: returns number of currently borrowed books
- Method `canBorrow()`: returns boolean (true if under maxBooks limit)
- Method `listBorrowedBooks()`: returns array of borrowed book titles

**Library class:**
- Properties: `name` (string), `books` (array of Book objects), `members` (array of Member objects)
- Constructor accepts name
- Method `addBook(book: Book)`: adds book to library collection
- Method `addMember(member: Member)`: adds member to library
- Method `findBook(isbn: string)`: returns Book or undefined
- Method `findMember(memberId: string)`: returns Member or undefined
- Method `getAvailableBooks()`: returns array of available books
- Method `getTotalBooks()`: returns total number of books
- Method `getMemberCount()`: returns number of registered members

**Example usage:**
```typescript
const library = new Library("City Central Library");

const book1 = new Book("978-0-1", "1984", "George Orwell");
const book2 = new Book("978-0-2", "The Hobbit", "J.R.R. Tolkien");
const book3 = new Book("978-0-3", "Dune", "Frank Herbert");

library.addBook(book1);
library.addBook(book2);
library.addBook(book3);

const member1 = new Member("M001", "Alice");
const member2 = new Member("M002", "Bob", 2);

library.addMember(member1);
library.addMember(member2);

member1.borrowBook(book1);
member1.borrowBook(book2);

console.log(member1.getBorrowedCount()); // 2
console.log(member1.canBorrow()); // true (under limit of 3)

console.log(library.getAvailableBooks().length); // 1 (only book3)
console.log(book1.isAvailable); // false

member1.returnBook(book1);
console.log(book1.isAvailable); // true
console.log(library.getAvailableBooks().length); // 2
```

**Learning goals:** Complex object relationships, multi-class systems, real-world application design, managing state across multiple objects

---

## How to Complete

1. Work through exercises in order (they build in difficulty)
2. Run each exercise with: `npx ts-node exercises/lesson-01/01-simple-class-easy.ts`
3. Test your code thoroughly with different scenarios
4. Make sure all example usage works as expected
5. Understand why each exercise works before moving to the next

## Tips

- Read the lesson content in `docs/01-classes-and-objects.md` if you get stuck
- Use `console.log()` to verify your code works
- Test edge cases (e.g., withdrawing more than balance, enrolling in full course)
- Focus on understanding the `this` keyword and how objects maintain independent state
