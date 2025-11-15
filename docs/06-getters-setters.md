# Getters and Setters

## What Are Getters and Setters?

- **Getters** (`get`): Compute or retrieve values with validation/logic
- **Setters** (`set`): Control how values are assigned with validation
- Look like properties but behave like methods
- Part of encapsulation - control access to internal state

## Syntax

```typescript
class Example {
  private _property: string;

  // Getter - no parentheses when calling
  get property(): string {
    return this._property;
  }

  // Setter - no parentheses when assigning
  set property(value: string) {
    this._property = value;
  }
}

const obj = new Example();
obj.property = "hello";    // Calls setter
console.log(obj.property); // Calls getter
```

## Validation in Setters

```typescript
class Person {
  private _age: number = 0;

  get age(): number {
    return this._age;
  }

  set age(value: number) {
    if (value < 0) {
      throw new Error("Age cannot be negative");
    }
    if (value > 150) {
      throw new Error("Age seems unrealistic");
    }
    this._age = value;
  }
}

const person = new Person();
person.age = 25;     // ✅ OK
person.age = -5;     // ❌ Throws error
person.age = 200;    // ❌ Throws error
```

## Computed Properties (Read-Only Getters)

```typescript
class Rectangle {
  constructor(
    private _width: number,
    private _height: number
  ) {}

  get width(): number {
    return this._width;
  }

  set width(value: number) {
    if (value <= 0) throw new Error("Width must be positive");
    this._width = value;
  }

  get height(): number {
    return this._height;
  }

  set height(value: number) {
    if (value <= 0) throw new Error("Height must be positive");
    this._height = value;
  }

  // Computed property - no setter, calculated on demand
  get area(): number {
    return this._width * this._height;
  }

  get perimeter(): number {
    return 2 * (this._width + this._height);
  }

  get isSquare(): boolean {
    return this._width === this._height;
  }
}

const rect = new Rectangle(5, 10);
console.log(rect.area);      // 50 (computed)
console.log(rect.perimeter); // 30 (computed)
console.log(rect.isSquare);  // false
rect.width = 10;
console.log(rect.isSquare);  // true
```

## Format Conversion with Getters/Setters

```typescript
class Temperature {
  private _celsius: number = 0;

  get celsius(): number {
    return this._celsius;
  }

  set celsius(value: number) {
    if (value < -273.15) {
      throw new Error("Below absolute zero!");
    }
    this._celsius = value;
  }

  get fahrenheit(): number {
    return (this._celsius * 9/5) + 32;
  }

  set fahrenheit(value: number) {
    this.celsius = (value - 32) * 5/9; // Uses celsius setter for validation
  }

  get kelvin(): number {
    return this._celsius + 273.15;
  }

  set kelvin(value: number) {
    this.celsius = value - 273.15;
  }
}

const temp = new Temperature();
temp.celsius = 100;
console.log(temp.fahrenheit); // 212
console.log(temp.kelvin);     // 373.15

temp.fahrenheit = 32;
console.log(temp.celsius);    // 0
```

## Lazy Initialization with Getters

```typescript
class DataManager {
  private _data: any[] | null = null;

  get data(): any[] {
    // Load data only when first accessed
    if (this._data === null) {
      console.log("Loading data...");
      this._data = this.loadDataFromDatabase();
    }
    return this._data;
  }

  private loadDataFromDatabase(): any[] {
    // Expensive operation
    return [1, 2, 3, 4, 5];
  }
}

const manager = new DataManager();
// Data not loaded yet
console.log(manager.data); // "Loading data..." then [1, 2, 3, 4, 5]
console.log(manager.data); // [1, 2, 3, 4, 5] (cached)
```
