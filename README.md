# TypeScript OOP Learning Guide

A comprehensive guide to learning Object-Oriented Programming (OOP) in TypeScript, complete with detailed notes and hands-on exercises.

## 📚 What's Included

This repository contains everything you need to master TypeScript OOP concepts:

### Study Notes (10 Topics + Reference)

All documentation is organized in the [`docs/`](docs/) folder:

0. [**Real-World Use Cases**](docs/00-real-world-use-cases.md) - Understanding when and why to use classes
1. [**Classes and Objects**](docs/01-classes-and-objects.md) - The foundation: what classes are and how to create objects
2. [**Properties and Constructors**](docs/02-properties-and-constructors.md) - Data storage and object initialization
3. [**Methods and `this`**](docs/03-methods-and-this.md) - Defining behavior and understanding context
4. [**Static Members**](docs/04-static-members.md) - Class-level properties and methods
5. [**Access Modifiers & Encapsulation**](docs/05-access-modifiers-encapsulation.md) - public, private, protected, and readonly
6. [**Getters and Setters**](docs/06-getters-setters.md) - Property accessors, validation, and computed properties
7. [**Inheritance**](docs/07-inheritance.md) - Extending classes, `super` keyword, and method overriding
8. [**Abstract Classes**](docs/08-abstract-classes.md) - Abstraction, abstract methods, and templates
9. [**Interfaces & Polymorphism**](docs/09-interfaces-polymorphism.md) - Contracts, multiple implementations, and polymorphism

**Quick Reference:**
- [**Keywords Reference**](docs/keywords-reference.md) - Complete reference for all OOP keywords (class, new, this, static, extends, super, etc.)

### Exercises (6 Challenges)

Progressive exercises that build on each concept:

- [Exercise 1: Basic Classes](exercises.md#exercise-1-basic-classes)
- [Exercise 2: Access Modifiers](exercises.md#exercise-2-access-modifiers)
- [Exercise 3: Getters and Setters](exercises.md#exercise-3-getters-and-setters)
- [Exercise 4: Inheritance](exercises.md#exercise-4-inheritance)
- [Exercise 5: Abstract Classes](exercises.md#exercise-5-abstract-classes)
- [Exercise 6: Interfaces and Polymorphism](exercises.md#exercise-6-interfaces-and-polymorphism)

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [TypeScript](https://www.typescriptlang.org/) (v4 or higher)
- A code editor (VS Code recommended)

### Installation

1. Clone this repository:

```bash
git clone <repository-url>
cd typescript-classes
```

2. Install dependencies:

```bash
npm install
```

## 📖 How to Use This Guide

### For Learners

1. **Read the notes** in order (00-09):
   - Start with [`docs/00-real-world-use-cases.md`](docs/00-real-world-use-cases.md)
   - Progress through each topic sequentially
   - Take your time to understand each concept
   - Use the [Keywords Reference](docs/keywords-reference.md) for quick lookups

2. **Complete the exercises** from [`exercises.md`](exercises.md):
   - Create separate `.ts` files for each exercise (e.g., `exercise1.ts`)
   - Complete one exercise at a time
   - Test your code by running: `npx ts-node exerciseX.ts`

3. **Practice and experiment**:
   - Modify the examples from the notes
   - Try creating your own classes
   - Combine concepts in creative ways

## 🛠️ Running Your TypeScript File

```bash
npm run dev
```

## 📋 Learning Path

The documentation is structured to build progressively:

```
Basics (Understanding the Foundation)
├── 00: Why use classes?
├── 01: What are classes and objects?
├── 02: How to store data (properties & constructors)
└── 03: How to define behavior (methods & this)
    ↓
Class-Level Features
├── 04: Static members (class-level vs instance-level)
└── 05: Access control (public, private, protected, readonly)
    ↓
Advanced Property Access
└── 06: Getters and setters (controlled access patterns)
    ↓
Advanced Concepts (Code Reuse and Abstraction)
├── 07: Inheritance (code reuse through extension)
├── 08: Abstract classes (templates for subclasses)
└── 09: Interfaces & polymorphism (contracts and flexibility)
```

## 🤝 Contributing

Contributions are welcome! Here's how you can help improve this guide:

### Areas for Improvement

- [ ] Create additional exercises
- [ ] Improve on existing topics / add more advanced OOP topics
- [ ] Include unit tests for exercises

### How to Contribute

1. Fork this repository
2. Create a new branch (`git checkout -b your-name/feature`)
3. Make your changes
4. Test your changes thoroughly
5. Commit your changes (`git commit -m 'Add some improvement'`)
6. Push to the branch (`git push origin feature/improvement`)
7. Open a Pull Request

### Contribution Guidelines

- **Notes**: Ensure explanations are clear, concise, and beginner-friendly
- **Code Examples**: Follow TypeScript best practices and include comments
- **Exercises**: Provide clear requirements and expected output
- **Formatting**: Use consistent markdown formatting
- **Testing**: Verify all code examples work with the latest TypeScript version
- **Documentation Location**: All notes should be in the `docs/` folder

## 📝 Exercise Solutions

Solutions are intentionally not included to encourage independent learning. If you're stuck:

1. Review the relevant note file in the `docs/` folder
2. Check the [Keywords Reference](docs/keywords-reference.md)
3. Check TypeScript documentation
4. Experiment with different approaches
5. Ask for help in the discussions section

## 📚 Additional Resources

- [TypeScript Official Docs](https://www.typescriptlang.org/docs/)
- [TypeScript Handbook - Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html)
- [MDN OOP Guide](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_programming)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

Created as a comprehensive learning resource for developers learning TypeScript OOP concepts.

---

**Happy Learning!** 🚀

If you find this guide helpful, please consider giving it a star ⭐
