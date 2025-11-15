# Lesson 03 Exercises: Methods and `this`

Complete these exercises to practice writing methods, understanding the `this` keyword, and solving `this` context issues.

---

## Exercise 1: Basic Methods (Easy)

**File:** `01-basic-methods-easy.ts`

Create a `Calculator` class with various methods:

**Requirements:**
- Property: `result` (number, starts at 0)
- Method `add(value: number)`: adds value to result
- Method `subtract(value: number)`: subtracts value from result
- Method `multiply(value: number)`: multiplies result by value
- Method `divide(value: number)`: divides result by value (check for division by zero)
- Method `getResult()`: returns current result
- Method `clear()`: resets result to 0

**Example usage:**
```typescript
const calc = new Calculator();
calc.add(10);
calc.multiply(5);
console.log(calc.getResult()); // 50

calc.subtract(20);
calc.divide(2);
console.log(calc.getResult()); // 15

calc.clear();
console.log(calc.getResult()); // 0
```

**Learning goals:** Basic method syntax, working with `this`, void vs return types

---

## Exercise 2: Methods Calling Methods (Easy)

**File:** `02-methods-calling-methods-easy.ts`

Create a `TodoList` class where methods interact with each other:

**Requirements:**
- Property: `todos` (array of strings)
- Property: `completedTodos` (array of strings)
- Method `addTodo(task: string)`: adds task to todos
- Method `completeTodo(task: string)`: moves task from todos to completedTodos
- Method `removeTodo(task: string)`: removes task from todos array
- Method `getTodoCount()`: returns number of incomplete todos
- Method `getCompletedCount()`: returns number of completed todos
- Method `getStatus()`: returns formatted string using getTodoCount() and getCompletedCount()
- Method `clearCompleted()`: empties completedTodos array and calls getStatus()

**Example usage:**
```typescript
const list = new TodoList();
list.addTodo("Buy groceries");
list.addTodo("Write code");
list.addTodo("Exercise");

console.log(list.getStatus()); // "3 incomplete, 0 completed"

list.completeTodo("Buy groceries");
list.completeTodo("Exercise");

console.log(list.getStatus()); // "1 incomplete, 2 completed"

list.clearCompleted();
console.log(list.getStatus()); // "1 incomplete, 0 completed"
```

**Learning goals:** Methods calling other methods, using `this` to access methods, code reuse

---

## Exercise 3: Understanding `this` (Medium)

**File:** `03-understanding-this-medium.ts`

Create a `Player` class that demonstrates how `this` works:

**Requirements:**
- Properties: `name` (string), `score` (number), `level` (number)
- Method `addPoints(points: number)`: adds points to score, calls checkLevelUp()
- Method `checkLevelUp()`: private method that increases level if score >= level * 100
- Method `getInfo()`: returns formatted string with player info
- Method `compareWith(otherPlayer: Player)`: returns which player has higher score
- Method `transferPoints(amount: number, toPlayer: Player)`: transfers points to another player

**Example usage:**
```typescript
const player1 = new Player("Alice", 0, 1);
const player2 = new Player("Bob", 50, 1);

player1.addPoints(150);
console.log(player1.getInfo()); // "Alice - Level 2 - Score: 150"

player2.addPoints(100);
console.log(player2.getInfo()); // "Bob - Level 2 - Score: 150"

console.log(player1.compareWith(player2)); // "Both players have equal scores"

player1.transferPoints(50, player2);
console.log(player1.getInfo()); // "Alice - Level 1 - Score: 100"
console.log(player2.getInfo()); // "Bob - Level 2 - Score: 200"
```

**Learning goals:** Understanding `this` in different contexts, passing objects to methods, `this` vs other objects

---

## Exercise 4: The `this` Context Problem (Medium)

**File:** `04-this-context-problem-medium.ts`

Create a `Timer` class that demonstrates and solves the `this` context problem:

**Requirements:**
- Property: `seconds` (number, starts at 0)
- Property: `isRunning` (boolean, starts false)
- Regular method `tick()`: increments seconds and logs current time
- Arrow function method `tickArrow`: does the same as tick but preserves `this`
- Method `start()`: sets isRunning to true
- Method `stop()`: sets isRunning to false
- Method `getTime()`: returns current seconds
- Method `reset()`: resets seconds to 0 and stops timer

**Example usage:**
```typescript
const timer = new Timer();

// This works
timer.tick();
console.log(timer.getTime()); // 1

// Extracting method loses 'this' (demonstrates problem)
const tickFn = timer.tick;
// tickFn(); // Would cause error if called

// Arrow function preserves 'this' (solution)
const tickArrowFn = timer.tickArrow;
tickArrowFn();
console.log(timer.getTime()); // 2

// Using bind as another solution
const boundTick = timer.tick.bind(timer);
boundTick();
console.log(timer.getTime()); // 3
```

**Learning goals:** The `this` context problem, arrow functions vs regular methods, `.bind()` method

---

## Exercise 5: Method Chaining (Hard)

**File:** `05-method-chaining-hard.ts`

Create a `QueryBuilder` class that supports method chaining:

**Requirements:**
- Property: `query` (string, starts as empty)
- Method `select(fields: string)`: adds SELECT clause, returns `this`
- Method `from(table: string)`: adds FROM clause, returns `this`
- Method `where(condition: string)`: adds WHERE clause, returns `this`
- Method `orderBy(field: string, direction: "ASC" | "DESC")`: adds ORDER BY clause, returns `this`
- Method `limit(count: number)`: adds LIMIT clause, returns `this`
- Method `build()`: returns the final query string
- Method `reset()`: clears query, returns `this`

**Example usage:**
```typescript
const qb = new QueryBuilder();

const query1 = qb
  .select("id, name, email")
  .from("users")
  .where("age > 18")
  .orderBy("name", "ASC")
  .limit(10)
  .build();

console.log(query1);
// "SELECT id, name, email FROM users WHERE age > 18 ORDER BY name ASC LIMIT 10"

// Can chain reset and build new query
const query2 = qb
  .reset()
  .select("*")
  .from("products")
  .where("price < 100")
  .build();

console.log(query2);
// "SELECT * FROM products WHERE price < 100"

// Methods can be called independently too
const qb2 = new QueryBuilder();
qb2.select("title, content");
qb2.from("posts");
qb2.where("published = true");
console.log(qb2.build());
// "SELECT title, content FROM posts WHERE published = true"
```

**Bonus Challenge:**
Add a `QueryBuilder` method `and(condition: string)` and `or(condition: string)` for complex WHERE clauses:

```typescript
const query3 = new QueryBuilder()
  .select("*")
  .from("orders")
  .where("status = 'pending'")
  .and("total > 100")
  .or("priority = 'high'")
  .build();
```

**Learning goals:** Method chaining, returning `this`, fluent interfaces, building complex objects

---

## How to Complete

1. Work through exercises in order (they build in difficulty)
2. Run each exercise with: `npx ts-node exercises/lesson-03/01-basic-methods-easy.ts`
3. For exercise 4, experiment with extracting methods and seeing what breaks
4. For exercise 5, make sure each method returns `this` for chaining
5. Test both chained and non-chained method calls

## Tips

- Read the lesson content in `docs/03-methods-and-this.md` if you get stuck
- `this` always refers to the object instance that called the method
- Arrow functions preserve `this` from where they're defined
- Method chaining requires returning `this` from each method
- Use `.bind()` when you need to preserve `this` in callbacks
