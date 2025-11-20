/**
 * Exercise 3: Parameter Properties (Medium)
 *
 * Create a Task class using parameter property shorthand.
 * Mix public and private parameter properties with regular properties.
 *
 * See README.md for full requirements and example usage.
 */

// Your code here

class Task {
  completed: boolean = false;
  createdAt: Date;

  constructor(
    public id: number,
    public title: string,
    private assignedTo: string,
  ) {
    this.createdAt = new Date();
  }

  complete() {
    return (this.completed = true);
  }

  isAssignedTo(username: string) {
    if (this.assignedTo === username) {
      return true;
    }

    return false;
  }

  getStatus() {
    const status = this.completed ? "Complete" : "Incomplete";
    return `Task #${this.id}: ${this.title} - Assigned to ${this.assignedTo} - Status: ${status}`;
  }
}

const task1 = new Task(1, "Write documentation", "alice");
const task2 = new Task(2, "Review PR", "bob");

console.log(task1.getStatus());
// "Task #1: Write documentation - Assigned to alice - Status: Incomplete"

task1.complete();
console.log(task1.getStatus());
// "Task #1: Write documentation - Assigned to alice - Status: Complete"

console.log(task1.isAssignedTo("alice")); // true
console.log(task1.isAssignedTo("bob")); // false

// Note: task1.assignedTo is private and cannot be accessed directly
