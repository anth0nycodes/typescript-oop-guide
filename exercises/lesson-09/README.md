# Lesson 09 Exercises: Interfaces and Polymorphism

Complete these exercises to practice defining interfaces, implementing them in classes, and using polymorphism.

---

## Exercise 1: Basic Interface (Easy)

**File:** `01-basic-interface-easy.ts`

Create an interface and implement it in classes:

**Requirements:**

**Printable interface:**
- Method: `print()`: void

**Document class (implements Printable):**
- Properties: `title` (string), `content` (string)
- Constructor accepts title and content
- Implement `print()`: logs document title and content

**Image class (implements Printable):**
- Properties: `filename` (string), `width` (number), `height` (number)
- Constructor accepts filename, width, height
- Implement `print()`: logs image details

**Function:** `printAll(items: Printable[])`: calls print() on each item

**Example usage:**
```typescript
const doc = new Document("Report", "This is the report content");
const img = new Image("photo.jpg", 1920, 1080);

doc.print(); // "Document: Report\nThis is the report content"
img.print(); // "Image: photo.jpg (1920x1080)"

printAll([doc, img]); // Prints both (demonstrates polymorphism)
```

**Learning goals:** Basic interface syntax, implementing interfaces, polymorphism

---

## Exercise 2: Multiple Interfaces (Easy)

**File:** `02-multiple-interfaces-easy.ts`

Create classes that implement multiple interfaces:

**Requirements:**

**Flyable interface:**
- Method: `fly()`: void
- Method: `land()`: void

**Swimmable interface:**
- Method: `swim()`: void

**Duck class (implements Flyable, Swimmable):**
- Property: `name` (string)
- Constructor accepts name
- Implement all methods from both interfaces

**Airplane class (implements Flyable):**
- Property: `model` (string)
- Constructor accepts model
- Implement methods from Flyable

**Fish class (implements Swimmable):**
- Property: `species` (string)
- Constructor accepts species
- Implement methods from Swimmable

**Example usage:**
```typescript
const duck = new Duck("Donald");
duck.fly();  // "Donald is flying"
duck.swim(); // "Donald is swimming"
duck.land(); // "Donald is landing"

const plane = new Airplane("Boeing 747");
plane.fly();  // "Boeing 747 is flying"
plane.land(); // "Boeing 747 is landing"

const fish = new Fish("Goldfish");
fish.swim(); // "Goldfish is swimming"
```

**Learning goals:** Multiple interface implementation, interface segregation

---

## Exercise 3: Optional Properties and Methods (Medium)

**File:** `03-optional-properties-medium.ts`

Create interfaces with optional members:

**Requirements:**

**UserProfile interface:**
- Required: `username` (string), `email` (string)
- Optional: `bio` (string), `website` (string), `avatarUrl` (string)
- Required method: `getDisplayName()`: string
- Optional method: `updateProfile?()`: void

**BasicUser class (implements UserProfile):**
- Implements only required properties and methods
- `getDisplayName()` returns username

**PremiumUser class (implements UserProfile):**
- Implements all properties including optional ones
- Implements both required and optional methods
- `getDisplayName()` returns formatted name with bio
- `updateProfile()` allows updating profile info

**Example usage:**
```typescript
const basicUser = new BasicUser("john_doe", "john@example.com");
console.log(basicUser.getDisplayName()); // "john_doe"

const premiumUser = new PremiumUser(
  "jane_doe",
  "jane@example.com",
  "Software Developer",
  "https://jane.dev"
);
console.log(premiumUser.getDisplayName());
// "jane_doe - Software Developer"

if (premiumUser.updateProfile) {
  premiumUser.updateProfile(); // Optional method exists
}
```

**Learning goals:** Optional properties and methods in interfaces, flexible implementations

---

## Exercise 4: Interface Extension and Polymorphism (Medium)

**File:** `04-interface-extension-medium.ts`

Create extended interfaces and demonstrate polymorphism:

**Requirements:**

**Entity interface:**
- Property: `id` (number)
- Method: `save()`: void
- Method: `delete()`: void

**Timestamped interface (extends Entity):**
- Additional property: `createdAt` (Date)
- Additional property: `updatedAt` (Date)
- Additional method: `touch()`: void (updates updatedAt)

**User class (implements Timestamped):**
- Properties: all from Timestamped interface + `username` (string), `email` (string)
- Constructor initializes all required properties
- Implement all required methods

**Post class (implements Timestamped):**
- Properties: all from Timestamped interface + `title` (string), `content` (string)
- Constructor initializes all required properties
- Implement all required methods

**Repository class:**
- Property: `entities` (array of Entity objects)
- Method `add(entity: Entity)`: adds to entities array
- Method `saveAll()`: calls save() on all entities
- Method `getTimestamped()`: returns only Timestamped entities

**Example usage:**
```typescript
const user = new User(1, "alice", "alice@example.com");
const post = new Post(2, "Hello World", "First post!");

const repo = new Repository();
repo.add(user);
repo.add(post);

repo.saveAll(); // Saves all entities (polymorphism)

const timestamped = repo.getTimestamped();
timestamped.forEach(item => item.touch()); // Updates all timestamps
```

**Learning goals:** Interface extension, polymorphism with interfaces, type checking

---

## Exercise 5: Complete Application with Interfaces (Hard)

**File:** `05-complete-application-hard.ts`

Build a task management system using interfaces and polymorphism:

**Requirements:**

**Task interface:**
- Properties: `id` (number), `title` (string), `completed` (boolean)
- Methods: `complete()`: void, `uncomplete()`: void, `getDescription()`: string

**Schedulable interface:**
- Properties: `dueDate` (Date)
- Methods: `isOverdue()`: boolean, `getDaysUntilDue()`: number

**Assignable interface:**
- Properties: `assignedTo` (string | null)
- Methods: `assign(person: string)`: void, `unassign()`: void

**Prioritizable interface:**
- Properties: `priority` ("low" | "medium" | "high")
- Methods: `setPriority(level: string)`: void, `isHighPriority()`: boolean

**SimpleTask class (implements Task):**
- Implements basic task functionality
- Constructor accepts id and title

**ScheduledTask class (implements Task, Schedulable):**
- Implements both Task and Schedulable
- Constructor accepts id, title, dueDate

**AssignedTask class (implements Task, Assignable, Prioritizable):**
- Implements Task, Assignable, and Prioritizable
- Constructor accepts id, title, assignedTo, priority

**FullTask class (implements Task, Schedulable, Assignable, Prioritizable):**
- Implements all four interfaces
- Constructor accepts all necessary parameters

**TaskManager class:**
- Property: `tasks` (array of Task objects - can hold any task type)
- Method `addTask(task: Task)`: adds task to array
- Method `removeTask(id: number)`: removes task by id
- Method `completeTask(id: number)`: marks task as complete
- Method `getCompletedTasks()`: returns completed tasks
- Method `getIncompleteTasks()`: returns incomplete tasks
- Method `getOverdueTasks()`: returns only schedulable tasks that are overdue
- Method `getTasksByAssignee(person: string)`: returns tasks assigned to person
- Method `getHighPriorityTasks()`: returns high priority tasks

**Example usage:**
```typescript
const manager = new TaskManager();

const simple = new SimpleTask(1, "Buy groceries");
const scheduled = new ScheduledTask(2, "Submit report", new Date("2025-01-15"));
const assigned = new AssignedTask(3, "Review code", "Alice", "high");
const full = new FullTask(
  4,
  "Complete project",
  new Date("2025-02-01"),
  "Bob",
  "high"
);

manager.addTask(simple);
manager.addTask(scheduled);
manager.addTask(assigned);
manager.addTask(full);

manager.completeTask(1);

const incomplete = manager.getIncompleteTasks();
console.log(incomplete.length); // 3

const overdue = manager.getOverdueTasks();
console.log(overdue.length); // Depends on current date

const aliceTasks = manager.getTasksByAssignee("Alice");
console.log(aliceTasks.length); // 1

const highPriority = manager.getHighPriorityTasks();
console.log(highPriority.length); // 2

// Polymorphism in action - iterate through all tasks
manager.tasks.forEach(task => {
  console.log(task.getDescription());

  // Type narrowing
  if ('isOverdue' in task) {
    console.log(`  Overdue: ${task.isOverdue()}`);
  }
  if ('assignedTo' in task && task.assignedTo) {
    console.log(`  Assigned to: ${task.assignedTo}`);
  }
});
```

**Learning goals:** Complex interface usage, multiple interface implementation, polymorphism, type narrowing, real-world application design

---

## How to Complete

1. Work through exercises in order (they build in difficulty)
2. Run each exercise with: `npx ts-node exercises/lesson-09/01-basic-interface-easy.ts`
3. Remember: interfaces define contracts, classes implement them
4. Use `implements` keyword to implement interfaces
5. Classes can implement multiple interfaces separated by commas

## Tips

- Read the lesson content in `docs/09-interfaces-polymorphism.md` if you get stuck
- Interfaces only define structure, no implementation
- Use interfaces for: contracts, polymorphism, flexible design
- Multiple interfaces allow mixing different capabilities
- Use `extends` for interface inheritance, `implements` for class implementation
- Type narrowing with `in` operator checks if property/method exists
- Polymorphism: treat different objects uniformly through shared interfaces
