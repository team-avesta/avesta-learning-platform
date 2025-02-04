# Chapter 5: Good Design = Flexible Software

## What You'll Learn

-   Understanding what makes a design good
-   Applying OO principles to create flexible software
-   Using encapsulation effectively
-   Implementing delegation
-   Making your software extensible

## Principles of Good Design

Good design isn't about making software work—it's about making software that can adapt and change over time. The key principles that lead to flexible software are:

1. **Encapsulate What Varies**
2. **Code to an Interface**
3. **Each Class, One Task**
4. **Open for Extension, Closed for Modification**

## Encapsulate What Varies

### The Principle

Identify aspects of your application that vary and separate them from what stays the same.

Bad Design:

```typescript
class Guitar {
    private serialNumber: string;
    private price: number;
    private builder: string;
    private model: string;
    private type: string;
    private backWood: string;
    private topWood: string;

    matches(searchGuitar: Guitar): boolean {
        // Complex matching logic with multiple if statements
        if (this.builder !== searchGuitar.builder) return false;
        if (this.model !== searchGuitar.model) return false;
        // ... more comparisons
    }
}
```

Good Design:

```typescript
class Guitar {
    private serialNumber: string;
    private price: number;
    private spec: GuitarSpec;

    matches(searchSpec: GuitarSpec): boolean {
        return this.spec.matches(searchSpec);
    }
}

class GuitarSpec {
    private builder: Builder;
    private model: string;
    private type: Type;
    private backWood: Wood;
    private topWood: Wood;

    matches(otherSpec: GuitarSpec): boolean {
        // Encapsulated matching logic
    }
}
```

## Code to an Interface

### The Principle

Program to an interface, not an implementation. This allows for flexibility in the concrete implementations.

Bad Design:

```typescript
class Inventory {
    private guitars: Guitar[] = [];

    search(searchGuitar: Guitar): Guitar[] {
        // Direct dependency on Guitar class
    }
}
```

Good Design:

```typescript
interface Searchable {
    matches(criteria: SearchCriteria): boolean;
}

class Inventory {
    private instruments: Searchable[] = [];

    search(criteria: SearchCriteria): Searchable[] {
        // Works with any Searchable instrument
    }
}
```

## Each Class, One Task

### The Principle

Each class should have one primary responsibility and one reason to change.

Bad Design:

```typescript
class GuitarApp {
    private inventory: Guitar[];

    addGuitar(): void {
        /* ... */
    }
    removeGuitar(): void {
        /* ... */
    }
    displayGuitars(): void {
        /* ... */
    }
    saveToDatabase(): void {
        /* ... */
    }
    loadFromDatabase(): void {
        /* ... */
    }
    validateGuitar(): void {
        /* ... */
    }
}
```

Good Design:

```typescript
class Inventory {
    addInstrument(): void {
        /* ... */
    }
    removeInstrument(): void {
        /* ... */
    }
}

class InstrumentDisplay {
    display(instruments: Instrument[]): void {
        /* ... */
    }
}

class InstrumentStorage {
    save(): void {
        /* ... */
    }
    load(): void {
        /* ... */
    }
}

class InstrumentValidator {
    validate(instrument: Instrument): boolean {
        /* ... */
    }
}
```

## Open for Extension, Closed for Modification

### The Principle

Software entities should be open for extension but closed for modification.

Bad Design:

```typescript
class InstrumentType {
    type: "GUITAR" | "MANDOLIN" | "BANJO";

    getSound(): string {
        switch (this.type) {
            case "GUITAR":
                return "Guitar sound";
            case "MANDOLIN":
                return "Mandolin sound";
            case "BANJO":
                return "Banjo sound";
            // Need to modify this class for new instruments
        }
    }
}
```

Good Design:

```typescript
interface Instrument {
    getSound(): string;
}

class Guitar implements Instrument {
    getSound(): string {
        return "Guitar sound";
    }
}

class Mandolin implements Instrument {
    getSound(): string {
        return "Mandolin sound";
    }
}

// New instruments can be added without modifying existing code
class Banjo implements Instrument {
    getSound(): string {
        return "Banjo sound";
    }
}
```

## Using Delegation

### The Principle

Use composition over inheritance to achieve code reuse and flexibility.

Example:

```typescript
interface SearchBehavior {
    search(criteria: SearchCriteria): Instrument[];
}

class BasicSearch implements SearchBehavior {
    search(criteria: SearchCriteria): Instrument[] {
        // Basic search implementation
    }
}

class AdvancedSearch implements SearchBehavior {
    search(criteria: SearchCriteria): Instrument[] {
        // Advanced search with more features
    }
}

class Inventory {
    private searchBehavior: SearchBehavior;

    setSearchBehavior(behavior: SearchBehavior): void {
        this.searchBehavior = behavior;
    }

    search(criteria: SearchCriteria): Instrument[] {
        return this.searchBehavior.search(criteria);
    }
}
```

## Making Software Extensible

### Design Patterns for Flexibility

1. **Strategy Pattern**

    - Encapsulate algorithms
    - Make them interchangeable
    - Allow runtime changes

2. **Factory Pattern**
    - Encapsulate object creation
    - Allow for future types
    - Centralize complex creation logic

Example:

```typescript
interface InstrumentFactory {
    createInstrument(specs: any): Instrument;
}

class GuitarFactory implements InstrumentFactory {
    createInstrument(specs: any): Guitar {
        return new Guitar(specs);
    }
}

class MandolinFactory implements InstrumentFactory {
    createInstrument(specs: any): Mandolin {
        return new Mandolin(specs);
    }
}
```

## Key Takeaways

1. Encapsulate what varies
2. Program to interfaces
3. Favor composition over inheritance
4. Keep classes focused
5. Design for extension
6. Hide implementation details

## Best Practices

1. Look for patterns in your code
2. Identify what might change
3. Use interfaces to define contracts
4. Keep classes small and focused
5. Think about future changes
6. Use design patterns appropriately
