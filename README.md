# TypeScript OOP Learning Guide

A comprehensive guide to learning Object-Oriented Programming (OOP) in TypeScript, complete with detailed notes and hands-on exercises.

## 📚 What's Included

This repository contains everything you need to master TypeScript OOP concepts:

### Study Notes (8 Topics + Reference)

All documentation is organized in the [`docs/`](docs/) folder:

0. [**Real-World Use Cases**](docs/00-real-world-use-cases.md) - Understanding when and why to use classes
1. [**Classes and Objects**](docs/01-classes-and-objects.md) - Comprehensive guide covering classes, objects, properties, constructors, methods, and the `this` keyword
2. [**Static Members**](docs/02-static-members.md) - Class-level properties and methods
3. [**Access Modifiers & Encapsulation**](docs/03-access-modifiers-encapsulation.md) - public, private, protected, and readonly
4. [**Getters and Setters**](docs/04-getters-setters.md) - Property accessors, validation, and computed properties
5. [**Inheritance**](docs/05-inheritance.md) - Extending classes, `super` keyword, and method overriding
6. [**Abstract Classes**](docs/06-abstract-classes.md) - Abstraction, abstract methods, and templates
7. [**Interfaces & Polymorphism**](docs/07-interfaces-polymorphism.md) - Contracts, multiple implementations, and polymorphism

**Quick Reference:**

- [**Keywords Reference**](docs/keywords-reference.md) - Complete reference for all OOP keywords (class, new, this, static, extends, super, etc.)

### Exercises (37 Challenges)

Progressive exercises organized by lesson:

- [Lesson 01: Classes, Objects, Properties, Constructors, Methods, and `this`](exercises/lesson-01/) - 7 exercises (Easy → Hard)
- [Lesson 02: Static Members](exercises/lesson-02/) - 5 exercises (Easy → Hard)
- [Lesson 03: Access Modifiers and Encapsulation](exercises/lesson-03/) - 5 exercises (Easy → Hard)
- [Lesson 04: Getters and Setters](exercises/lesson-04/) - 5 exercises (Easy → Hard)
- [Lesson 05: Inheritance](exercises/lesson-05/) - 5 exercises (Easy → Hard)
- [Lesson 06: Abstract Classes](exercises/lesson-06/) - 5 exercises (Easy → Hard)
- [Lesson 07: Interfaces and Polymorphism](exercises/lesson-07/) - 5 exercises (Easy → Hard)

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [TypeScript](https://www.typescriptlang.org/) (v4 or higher)
- A code editor (VS Code recommended)

### Installation

#### For Learners (Tracking Your Own Progress)

1. **Fork this repository** on GitHub (click the "Fork" button at the top right)

2. **Clone YOUR fork** to your local machine:

```bash
git clone https://github.com/YOUR-USERNAME/typescript-oop-guide.git
cd typescript-oop-guide
```

3. **Set up the upstream remote** (this is how you'll get updates):

```bash
git remote add upstream https://github.com/ah-materials/typescript-oop-guide.git
git remote -v  # Verify it's set up correctly
```

4. **Install dependencies**:

```bash
npm install
```

#### For Contributors (Adding New Content/Fixes)

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed instructions.

## 📖 How to Use This Guide

### For Learners

1. **Read the notes** in order:
   - Start with [`docs/00-real-world-use-cases.md`](docs/00-real-world-use-cases.md)
   - Then read [`docs/01-classes-and-objects.md`](docs/01-classes-and-objects.md) - this comprehensive guide covers classes, objects, properties, constructors, methods, and `this`
   - Progress through the remaining topics (02-07)
   - Take your time to understand each concept
   - Use the [Keywords Reference](docs/keywords-reference.md) for quick lookups

2. **Complete the exercises**:
   - Each lesson has its own folder in `exercises/` (e.g., `exercises/lesson-01/`)
   - Lesson 01 contains 7 exercises covering all foundational concepts; other lessons contain 5 exercises each
   - Exercises have progressive difficulty (Easy → Medium → Hard)
   - Read the `README.md` in each lesson folder for exercise descriptions
   - Complete exercises in order within each lesson
   - Run your solutions with: `npx ts-node exercises/lesson-<number>/<file-name>.ts`
   - Commit your solutions to your forked repository to track your progress

3. **Practice and experiment**:
   - Modify the examples from the notes
   - Try creating your own classes
   - Combine concepts in creative ways

### Working with Exercises

**Finding exercises:**

Each lesson has its own directory:

```
exercises/
├── lesson-01/          # Classes, Objects, Properties, Constructors, Methods, and `this`
│   ├── README.md       # Exercise descriptions and requirements
│   ├── 01-simple-class-easy.ts
│   ├── 02-class-with-methods-easy.ts
│   ├── 03-multiple-objects-medium.ts
│   ├── 04-object-interactions-medium.ts
│   ├── 05-library-system-hard.ts
│   ├── 06-parameter-properties-medium.ts
│   └── 07-this-context-problem-medium.ts
├── lesson-02/          # Static Members
├── lesson-03/          # Access Modifiers and Encapsulation
└── ... (lesson-04 through lesson-07)
```

**Completing exercises:**

1. Navigate to the lesson folder (e.g., `exercises/lesson-01/`)
2. Read the `README.md` for exercise requirements
3. Edit the exercise TypeScript files (they start as empty templates)
4. Run your solution: `npx ts-node exercises/lesson-01/01-simple-class-easy.ts`
5. Test thoroughly and move to the next exercise

**Running exercise files:**

```bash
# Run exercises from any lesson
npx ts-node exercises/lesson-01/01-simple-class-easy.ts
npx ts-node exercises/lesson-01/08-parameter-properties-medium.ts
npx ts-node exercises/lesson-09/05-complete-application-hard.ts
```

**Saving your work:**

- Commit your exercise solutions in your **forked repository** to track your learning progress
- Your solutions are personal - don't create PRs to submit exercise solutions
- Focus on learning at your own pace!

### 🔄 Keeping Your Fork Updated

**IMPORTANT:** This repository is regularly updated with new exercises, bug fixes, and improvements. Check for updates weekly!

**⚠️ DO NOT create Pull Requests from your fork back to this repository** if you're just completing exercises. That's not how you get updates - follow the steps below instead.

#### How to Get New Updates

Every week (or before starting a new lesson), run these commands to pull the latest changes:

```bash
# 1. Check what's new in the original repository
git fetch upstream

# 2. Make sure you're on your main branch
git checkout main

# 3. Merge the updates from the original repo into your fork
git merge upstream/main

# 4. Push the updates to your fork on GitHub
git push origin main
```

**What this does:**

- `git fetch upstream` - Downloads the latest changes from the original repository
- `git merge upstream/main` - Combines those changes with your work (your exercise solutions stay intact!)
- `git push origin main` - Updates your fork on GitHub

**Tip:** If you've been working on exercises in your main branch, commit them first before running these commands!

#### Best Practice Workflow

To avoid conflicts when updating:

1. **Work on a separate branch** for your exercises:

   ```bash
   git checkout -b my-progress
   ```

2. **Commit your work regularly**:

   ```bash
   git add .
   git commit -m "Complete lesson 3 exercises"
   git push origin my-progress
   ```

3. **When updates are available**, switch to main and update:

   ```bash
   git checkout main
   git fetch upstream
   git merge upstream/main
   git push origin main
   ```

4. **Merge updates into your progress branch**:
   ```bash
   git checkout my-progress
   git merge main
   ```

This keeps your exercise solutions separate and makes updating much easier!

## 📋 Learning Path

The documentation is structured to build progressively:

```
Basics (Understanding the Foundation)
├── 00: Why use classes?
└── 01: Comprehensive guide - classes, objects, properties, constructors, methods, and `this`
    ↓
Class-Level Features
├── 02: Static members (class-level vs instance-level)
└── 03: Access control (public, private, protected, readonly)
    ↓
Advanced Property Access
└── 04: Getters and setters (controlled access patterns)
    ↓
Advanced Concepts (Code Reuse and Abstraction)
├── 05: Inheritance (code reuse through extension)
├── 06: Abstract classes (templates for subclasses)
└── 07: Interfaces & polymorphism (contracts and flexibility)
```

## 🤝 Contributing

### Are You a Learner or Contributor?

**👨‍🎓 If you're just completing exercises:** DO NOT create Pull Requests! Just commit your solutions to your fork and use `git fetch upstream` + `git merge upstream/main` to get updates. See the [Keeping Your Fork Updated](#-keeping-your-fork-updated) section above.

**🛠️ If you want to contribute improvements to the learning materials:** We welcome contributions! See below.

---

### What We're Looking For

Contributions to improve the learning materials are welcome:

- Additional exercises with clear requirements and examples
- Improvements to existing notes (clarity, examples, corrections)
- Advanced topics (generics, decorators, mixins, design patterns)
- Code examples demonstrating real-world use cases
- Bug fixes or typo corrections

### Quick Start for Contributors

1. Fork this repository
2. Clone your fork and set up the upstream remote
3. Create a new branch (`git checkout -b your-name/feature-description`)
4. Make your changes to the learning materials
5. Test thoroughly
6. Commit and push to your fork
7. Open a Pull Request describing your improvements

**For detailed contribution instructions**, including how to set up your development environment and guidelines for different types of contributions, see [CONTRIBUTING.md](CONTRIBUTING.md).

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
