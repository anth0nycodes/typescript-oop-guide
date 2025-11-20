# Contributing to TypeScript OOP Learning Guide

Thanks for your interest in contributing! This guide is meant to help developers learn TypeScript OOP concepts.

## ⚠️ Are You a Learner or a Contributor?

### 👨‍🎓 If You're Just Learning (Completing Exercises)

**DO NOT create Pull Requests!** Your exercise solutions are for your own learning.

**What you should do:**

1. Fork this repository
2. Clone your fork and set up the upstream remote (see README.md)
3. Complete exercises and commit to your fork
4. **Regularly check for updates** using `git fetch upstream` and `git merge upstream/main`
5. Keep learning at your own pace!

**Why no PRs?** Pull Requests are only for contributing improvements to the learning materials themselves (new exercises, documentation fixes, etc.), NOT for submitting your personal exercise solutions.

See the [Keeping Your Fork Updated](README.md#-keeping-your-fork-updated) section in README.md for detailed instructions on how to stay up-to-date.

---

### 🛠️ If You're Contributing Improvements

This section is for you! Continue reading below for how to contribute new exercises, documentation improvements, bug fixes, and other enhancements to the learning materials.

## How to Contribute

1. **Fork** the repository
2. **Clone your fork** to your local machine:
   ```bash
   git clone https://github.com/YOUR-USERNAME/typescript-oop-guide.git
   cd typescript-oop-guide
   ```
3. **Set up the upstream remote** to keep your fork synced:
   ```bash
   git remote add upstream https://github.com/ah-materials/typescript-oop-guide.git
   git remote -v  # Verify the remotes are set up correctly
   ```
4. **Install dependencies**:
   ```bash
   npm install
   ```
5. **Create a branch** for your changes:
   ```bash
   git checkout -b your-name/feature-description
   ```
6. **Make your changes** (see guidelines below)
7. **Test** your changes thoroughly
8. **Commit** with a clear message:
   ```bash
   git commit -m "Add: brief description of changes"
   ```
9. **Push** to your fork:
   ```bash
   git push origin your-name/feature-description
   ```
10. **Open a Pull Request** with a description of your changes

## What We're Looking For

- **Additional exercises** with clear requirements and examples
- **Improvements to existing notes** (clarity, examples, corrections)
- **Advanced topics** (generics, decorators, mixins, design patterns)
- **Code examples** demonstrating real-world use cases
- **Bug fixes** or typo corrections

## Guidelines

### For Notes

- Keep explanations beginner-friendly
- Use clear, commented code examples
- Follow the existing format and structure
- Test all code examples to ensure they work

### For Exercises

- Provide clear requirements
- Include example usage
- Ensure exercises are appropriately challenging for the topic level

### Code Style

- Use TypeScript best practices
- Follow naming conventions outlined in the notes
- Include type annotations
- Add comments for complex logic

## Questions or Issues?

Open an issue in the repository with:

- Clear description of the problem or suggestion
- Code examples (if applicable)
- Expected vs actual behavior (for bugs)

---

We appreciate all contributions, big or small!
