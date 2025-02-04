# Chapter 8: Design Principles

## What You'll Learn

-   Understanding SOLID principles
-   Applying design principles in practice
-   Recognizing design smells
-   Refactoring to patterns
-   Creating maintainable code

## SOLID Principles

### Single Responsibility Principle (SRP)

A class should have only one reason to change.

Bad Example:

```typescript
class Guitar {
    private specs: GuitarSpec;
    private price: number;

    // Guitar responsibilities
    getSpecs(): GuitarSpec {
        return this.specs;
    }
    setPrice(price: number): void {
        this.price = price;
    }

    // Persistence responsibilities
    saveToDatabase(): void {
        /* ... */
    }
    loadFromDatabase(): void {
        /* ... */
    }

    // Validation responsibilities
    validatePrice(): boolean {
        /* ... */
    }
    validateSpecs(): boolean {
        /* ... */
    }

    // UI responsibilities
    display(): void {
        /* ... */
    }
    printDetails(): void {
        /* ... */
    }
}
```

Good Example:

```typescript
class Guitar {
    private specs: GuitarSpec;
    private price: number;

    getSpecs(): GuitarSpec {
        return this.specs;
    }
    setPrice(price: number): void {
        this.price = price;
    }
}

class GuitarRepository {
    save(guitar: Guitar): void {
        /* ... */
    }
    load(id: string): Guitar {
        /* ... */
    }
}

class GuitarValidator {
    validateGuitar(guitar: Guitar): boolean {
        /* ... */
    }
}

class GuitarDisplay {
    show(guitar: Guitar): void {
        /* ... */
    }
    print(guitar: Guitar): void {
        /* ... */
    }
}
```

### Open/Closed Principle (OCP)

Software entities should be open for extension but closed for modification.

Bad Example:

```typescript
class InstrumentFinder {
    findInstrument(type: string): Instrument {
        if (type === "guitar") {
            return new Guitar();
        } else if (type === "mandolin") {
            return new Mandolin();
        } else if (type === "banjo") {
            return new Banjo();
        }
        // Need to modify this class for new instruments
    }
}
```

Good Example:

```typescript
interface InstrumentFactory {
    createInstrument(): Instrument;
}

class GuitarFactory implements InstrumentFactory {
    createInstrument(): Guitar {
        return new Guitar();
    }
}

class MandolinFactory implements InstrumentFactory {
    createInstrument(): Mandolin {
        return new Mandolin();
    }
}

// New instruments can be added without modifying existing code
class BanjoFactory implements InstrumentFactory {
    createInstrument(): Banjo {
        return new Banjo();
    }
}
```

### Liskov Substitution Principle (LSP)

Subtypes must be substitutable for their base types.

Bad Example:

```typescript
class Bird {
    fly(): void {
        // Base flying behavior
    }
}

class Penguin extends Bird {
    fly(): void {
        throw new Error("Penguins can't fly!"); // Violates LSP
    }
}
```

Good Example:

```typescript
interface Movable {
    move(): void;
}

class FlyingBird implements Movable {
    move(): void {
        this.fly();
    }

    private fly(): void {
        // Flying implementation
    }
}

class Penguin implements Movable {
    move(): void {
        this.waddle();
    }

    private waddle(): void {
        // Waddling implementation
    }
}
```

### Interface Segregation Principle (ISP)

Clients should not be forced to depend on interfaces they don't use.

Bad Example:

```typescript
interface Instrument {
    play(): void;
    tune(): void;
    record(): void;
    stream(): void;
    amplify(): void;
}

// Acoustic guitar forced to implement unnecessary methods
class AcousticGuitar implements Instrument {
    play(): void {
        /* ... */
    }
    tune(): void {
        /* ... */
    }
    record(): void {
        /* ... */
    }
    stream(): void {
        throw new Error("Not supported");
    }
    amplify(): void {
        throw new Error("Not supported");
    }
}
```

Good Example:

```typescript
interface Playable {
    play(): void;
}

interface Tunable {
    tune(): void;
}

interface Recordable {
    record(): void;
}

interface Amplifiable {
    amplify(): void;
}

class AcousticGuitar implements Playable, Tunable, Recordable {
    play(): void {
        /* ... */
    }
    tune(): void {
        /* ... */
    }
    record(): void {
        /* ... */
    }
}

class ElectricGuitar implements Playable, Tunable, Recordable, Amplifiable {
    play(): void {
        /* ... */
    }
    tune(): void {
        /* ... */
    }
    record(): void {
        /* ... */
    }
    amplify(): void {
        /* ... */
    }
}
```

### Dependency Inversion Principle (DIP)

High-level modules should not depend on low-level modules. Both should depend on abstractions.

Bad Example:

```typescript
class GuitarInventory {
    private sqlDatabase: SQLDatabase; // Direct dependency on concrete class

    constructor() {
        this.sqlDatabase = new SQLDatabase();
    }

    saveGuitar(guitar: Guitar): void {
        this.sqlDatabase.save(guitar);
    }
}
```

Good Example:

```typescript
interface Storage {
    save(item: any): void;
    load(id: string): any;
}

class GuitarInventory {
    private storage: Storage; // Depends on abstraction

    constructor(storage: Storage) {
        this.storage = storage;
    }

    saveGuitar(guitar: Guitar): void {
        this.storage.save(guitar);
    }
}
```

## Design Smells and Refactoring

### Common Design Smells

1. **Rigidity**: Hard to change because every change affects too many parts
2. **Fragility**: Changes cause unexpected problems
3. **Immobility**: Hard to reuse because it can't be disentangled
4. **Viscosity**: Doing things right is harder than doing things wrong

### Refactoring Patterns

```typescript
// Before refactoring
class GuitarSpec {
    private properties: Map<string, any> = new Map();

    addProperty(name: string, value: any): void {
        this.properties.set(name, value);
    }

    matches(other: GuitarSpec): boolean {
        // Complex matching logic
        for (const [key, value] of this.properties) {
            if (other.properties.get(key) !== value) return false;
        }
        return true;
    }
}

// After refactoring with Strategy Pattern
interface MatchingStrategy {
    matches(spec1: GuitarSpec, spec2: GuitarSpec): boolean;
}

class ExactMatchStrategy implements MatchingStrategy {
    matches(spec1: GuitarSpec, spec2: GuitarSpec): boolean {
        // Exact matching implementation
    }
}

class PartialMatchStrategy implements MatchingStrategy {
    matches(spec1: GuitarSpec, spec2: GuitarSpec): boolean {
        // Partial matching implementation
    }
}
```

## Best Practices

### 1. Composition Over Inheritance

```typescript
// Prefer this
class Guitar {
    private specs: GuitarSpec;

    matches(searchSpec: GuitarSpec): boolean {
        return this.specs.matches(searchSpec);
    }
}

// Over this
class Guitar extends Instrument {
    matches(searchSpec: GuitarSpec): boolean {
        return super.matches(searchSpec);
    }
}
```

### 2. Program to Interfaces

```typescript
interface Searchable {
    matches(criteria: SearchCriteria): boolean;
}

class Inventory {
    private items: Searchable[] = [];

    search(criteria: SearchCriteria): Searchable[] {
        return this.items.filter((item) => item.matches(criteria));
    }
}
```

### 3. Encapsulate What Varies

```typescript
class InstrumentSpec {
    private matcher: SpecMatcher;

    matches(other: InstrumentSpec): boolean {
        return this.matcher.matches(this, other);
    }

    setMatcher(matcher: SpecMatcher): void {
        this.matcher = matcher;
    }
}
```

## Key Takeaways

1. Follow SOLID principles
2. Identify and fix design smells
3. Use composition over inheritance
4. Program to interfaces
5. Encapsulate what varies
6. Keep classes focused and cohesive

## Best Practices

1. Review code for SOLID violations
2. Refactor when you spot design smells
3. Write tests before refactoring
4. Keep interfaces small and focused
5. Use dependency injection
6. Document design decisions
