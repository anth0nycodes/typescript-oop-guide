/**
 * Exercise 4: Object Interactions (Medium)
 *
 * Create two classes:
 * 1. Student - manages student enrollment
 * 2. Course - manages course capacity and students
 *
 * These classes should interact with each other.
 * See README.md for full requirements and example usage.
 */

// Your code here

class Student {
  name: string;
  studentId: string;
  enrolledCourses: string[];

  constructor(name: string, studentId: string) {
    this.name = name;
    this.studentId = studentId;
    this.enrolledCourses = [];
  }

  enroll(courseName: string) {
    if (courseName.length === 0) {
      throw new Error("Course name cannot be empty");
    }
    this.enrolledCourses.push(courseName);
  }

  drop(course: Course) {
    if (!this.enrolledCourses.includes(course.courseName)) {
      throw new Error("You can't drop a course you are not enrolled in");
    }

    this.enrolledCourses = this.enrolledCourses.filter(
      (courseName) => courseName !== course.courseName,
    );

    course.students = course.students.filter((s) => s !== this);

    return this.enrolledCourses;
  }

  listCourses() {
    return this.enrolledCourses;
  }

  isEnrolledIn(courseName: string) {
    return this.enrolledCourses.includes(courseName);
  }
}

class Course {
  courseName: string;
  instructor: string;
  students: Student[];
  maxCapacity: number;

  constructor(courseName: string, instructor: string, maxCapacity: number) {
    this.courseName = courseName;
    this.instructor = instructor;
    this.maxCapacity = maxCapacity;
    this.students = [];
  }

  addStudent(student: Student) {
    if (this.students.length < this.maxCapacity) {
      this.students.push(student);
      return student.enroll(this.courseName);
    }
    throw new Error("Course is at full capacity");
  }

  removeStudent(student: Student) {
    if (!student.enrolledCourses.includes(this.courseName)) {
      throw new Error(
        "You can't remove a student who is not enrolled in this course",
      );
    }

    this.students = this.students.filter((s) => s !== student);
    student.drop(this);
  }

  getEnrollmentCount() {
    return this.students.length;
  }

  isFull() {
    return this.students.length >= this.maxCapacity;
  }
}

const student1 = new Student("Alice", "S001");
const student2 = new Student("Bob", "S002");
const student3 = new Student("Charlie", "S003");

const course1 = new Course("TypeScript 101", "Dr. Smith", 2);
const course2 = new Course("JavaScript Basics", "Prof. Johnson", 3);

// Test adding students to course
course1.addStudent(student1);
course1.addStudent(student2);

console.log(course1.getEnrollmentCount()); // 2
console.log(course1.isFull()); // true
console.log(student1.listCourses()); // ["TypeScript 101"]

// Test Student enrollment methods
console.log(student1.isEnrolledIn("TypeScript 101")); // true
console.log(student1.isEnrolledIn("JavaScript Basics")); // false

// Test edge case: adding student to full course
course1.addStudent(student3);
console.log(course1.getEnrollmentCount()); // 2 (should still be 2, add failed)
console.log(student3.listCourses()); // [] (not enrolled in any courses)

// Test student enrolling in multiple courses
course2.addStudent(student1);
course2.addStudent(student2);
console.log(student1.listCourses()); // ["TypeScript 101", "JavaScript Basics"]

// Test removing student from course
course1.removeStudent(student1);
console.log(course1.getEnrollmentCount()); // 1
console.log(course1.isFull()); // false
console.log(student1.listCourses()); // ["JavaScript Basics"]

// Test removing student updates both course and student
course2.removeStudent(student2);
console.log(student2.listCourses()); // ["TypeScript 101"]
console.log(course2.getEnrollmentCount()); // 1 (only student1 now)
