/**
 * Exercise 5: Library System (Hard)
 *
 * Build a comprehensive library management system with three classes:
 * 1. Book - represents a book with checkout functionality
 * 2. Member - represents a library member who can borrow books
 * 3. Library - manages the collection of books and members
 *
 * See README.md for full requirements and example usage.
 */

// Your code here

class Book {
  isbn: string;
  title: string;
  author: string;
  isAvailable: boolean;

  constructor(isbn: string, title: string, author: string) {
    this.isbn = isbn;
    this.title = title;
    this.author = author;
    this.isAvailable = true;
  }

  checkOut() {
    if (this.isAvailable === false) {
      return false;
    }

    if (this.isAvailable) {
      this.isAvailable = false;
      return false;
    }
    return true;
  }

  returnBook() {
    return (this.isAvailable = true);
  }

  getInfo() {
    return `${this.title} by ${this.author} (ISBN: ${this.isbn}) - ${this.isAvailable ? "Available" : "Unavailable"}`;
  }
}

class Member {
  memberId: string;
  name: string;
  borrowedBooks: Book[];
  maxBooks: number = 3;

  constructor(memberId: string, name: string, maxBooks?: number) {
    this.memberId = memberId;
    this.name = name;
    this.borrowedBooks = [];
    this.maxBooks = maxBooks ?? this.maxBooks;
  }

  borrowBook(book: Book) {
    const isUnderLimitAndAvailable =
      this.borrowedBooks.length < this.maxBooks && book.isAvailable;

    if (!isUnderLimitAndAvailable) {
      throw new Error("Cannot borrow book, you have reached your limit");
    }

    this.borrowedBooks.push(book);
    return book.checkOut();
  }

  returnBook(book: Book) {
    if (!this.borrowedBooks.includes(book)) {
      throw new Error("This book was not borrowed by the member");
    }

    return book.returnBook();
  }

  getBorrowedCount() {
    return this.borrowedBooks.length;
  }

  canBorrow() {
    const limit = this.maxBooks;
    return this.borrowedBooks.length < limit ? true : false;
  }

  listBorrowedBooks() {
    let borrowedBookTitles: string[] = [];

    for (const book of this.borrowedBooks) {
      borrowedBookTitles.push(book.title);
    }

    return borrowedBookTitles;
  }
}

class Library {
  name: string;
  books: Book[];
  members: Member[];

  constructor(name: string) {
    this.name = name;
    this.books = [];
    this.members = [];
  }

  addBook(book: Book) {
    return this.books.push(book);
  }

  addMember(member: Member) {
    return this.members.push(member);
  }

  findBook(isbn: string) {
    // loop through books and return the book with the matching isbn
    for (let i = 0; i < this.books.length; i++) {
      if (this.books[i].isbn === isbn) {
        return this.books[i];
      }
    }

    return undefined;
  }

  findMember(memberId: string) {
    // loop through members and return the member with the matching memberId
    for (let i = 0; i < this.members.length; i++) {
      if (this.members[i].memberId === memberId) {
        return this.members[i];
      }
    }

    return undefined;
  }

  getAvailableBooks() {
    return this.books.filter((book) => book.isAvailable);
  }

  getTotalBooks() {
    return this.books.length;
  }

  getMemberCount() {
    return this.members.length;
  }
}

const library = new Library("City Central Library");

const book1 = new Book("978-0-1", "1984", "George Orwell");
const book2 = new Book("978-0-2", "The Hobbit", "J.R.R. Tolkien");
const book3 = new Book("978-0-3", "Dune", "Frank Herbert");

library.addBook(book1);
library.addBook(book2);
library.addBook(book3);

// Test Library methods
console.log(library.getTotalBooks()); // 3
console.log(library.getAvailableBooks().length); // 3

const member1 = new Member("M001", "Alice");
const member2 = new Member("M002", "Bob", 2);

library.addMember(member1);
library.addMember(member2);

// Test Member count
console.log(library.getMemberCount()); // 2

// Test Book getInfo
console.log(book1.getInfo()); // "1984 by George Orwell (ISBN: 978-0-1) - Available"

// Test borrowing
member1.borrowBook(book1);
member1.borrowBook(book2);

console.log(member1.getBorrowedCount()); // 2
console.log(member1.canBorrow()); // true (under limit of 3)
console.log(member1.listBorrowedBooks()); // ["1984", "The Hobbit"]

// Test Library search methods
const foundBook = library.findBook("978-0-1");
console.log(foundBook?.title); // "1984"

const foundMember = library.findMember("M001");
console.log(foundMember?.name); // "Alice"

// Test edge case: book not found
console.log(library.findBook("invalid-isbn")); // undefined

// Test available books
console.log(library.getAvailableBooks().length); // 1 (only book3)
console.log(book1.isAvailable); // false

// Test returning books
member1.returnBook(book1);
console.log(book1.isAvailable); // true
console.log(book1.getInfo()); // "1984 by George Orwell (ISBN: 978-0-1) - Available"
console.log(library.getAvailableBooks().length); // 2

// Test edge case: trying to borrow unavailable book
const success = book2.checkOut();
console.log(success); // false (already checked out)

// Test edge case: member at borrow limit
member2.borrowBook(book1);
member2.borrowBook(book3);
console.log(member2.canBorrow()); // false (at limit of 2)

// Test edge case: trying to borrow when at limit
const book4 = new Book("978-0-4", "Neuromancer", "William Gibson");
library.addBook(book4);
member2.borrowBook(book4);
console.log(member2.getBorrowedCount()); // 2 (should still be 2, borrow failed)
