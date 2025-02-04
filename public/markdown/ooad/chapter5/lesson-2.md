# Chapter 5: Design Principles in Action

## What You'll Learn

-   How to apply OO principles in real-world scenarios
-   Handling changing requirements with good design
-   Using inheritance and interfaces effectively
-   Implementing flexible object-oriented systems
-   Practical design patterns in action

## The Problem: Expanding Instrument Types

When our guitar shop starts selling other instruments, poor design makes changes difficult:

```typescript
// Poor Design - Hard to extend
class Guitar {
    private serialNumber: string;
    private builder: string;
    private model: string;
    private type: string;
    private numStrings: number; // Guitar-specific
    private backWood: string;
    private topWood: string;
}

class Inventory {
    private guitars: Guitar[] = [];
    // Need to add new arrays for each instrument type
}
```

## The Solution: Flexible Design

### Step 1: Create Base Types

```typescript
interface Instrument {
    getSerialNumber(): string;
    getPrice(): number;
    getSpec(): InstrumentSpec;
}

interface InstrumentSpec {
    matches(otherSpec: InstrumentSpec): boolean;
    getProperties(): Map<string, any>;
}
```

### Step 2: Implement Properties Pattern

```typescript
class InstrumentSpec implements InstrumentSpec {
    private properties: Map<string, any>;

    constructor(properties: Map<string, any>) {
        this.properties = properties;
    }

    getProperty(propertyName: string): any {
        return this.properties.get(propertyName);
    }

    matches(otherSpec: InstrumentSpec): boolean {
        for (const [key, value] of this.properties) {
            if (otherSpec.getProperty(key) !== value) {
                return false;
            }
        }
        return true;
    }
}
```

### Step 3: Flexible Instrument Implementation

```typescript
class Instrument implements Instrument {
    private serialNumber: string;
    private price: number;
    private spec: InstrumentSpec;

    constructor(serialNumber: string, price: number, spec: InstrumentSpec) {
        this.serialNumber = serialNumber;
        this.price = price;
        this.spec = spec;
    }

    getSerialNumber(): string {
        return this.serialNumber;
    }
    getPrice(): number {
        return this.price;
    }
    getSpec(): InstrumentSpec {
        return this.spec;
    }
}
```

## Handling Different Instrument Types

### Using Properties for Flexibility

```typescript
enum InstrumentType {
    GUITAR = "Guitar",
    MANDOLIN = "Mandolin",
    BANJO = "Banjo",
    DOBRO = "Dobro",
    FIDDLE = "Fiddle",
    BASS = "Bass"
}

enum Style {
    ACOUSTIC = "Acoustic",
    ELECTRIC = "Electric"
}

// Creating a new instrument is now flexible
const properties = new Map<string, any>();
properties.set("instrumentType", InstrumentType.MANDOLIN);
properties.set("builder", "Gibson");
properties.set("model", "F5-G");
properties.set("style", Style.ACOUSTIC);
properties.set("backWood", "Maple");
properties.set("topWood", "Maple");

const mandolinSpec = new InstrumentSpec(properties);
const mandolin = new Instrument("9019920", 5495.95, mandolinSpec);
```

## Improved Search Functionality

```typescript
class Inventory {
    private instruments: Instrument[] = [];

    search(searchSpec: InstrumentSpec): Instrument[] {
        return this.instruments.filter((instrument) => instrument.getSpec().matches(searchSpec));
    }

    // Example search
    searchExample(): void {
        const properties = new Map<string, any>();
        properties.set("builder", "Gibson");
        properties.set("backWood", "Maple");

        const searchSpec = new InstrumentSpec(properties);
        const matchingInstruments = this.search(searchSpec);
    }
}
```

## Benefits of the New Design

1. **Easy to Add New Instruments**

    ```typescript
    // Adding a new instrument type requires no code changes
    const banjoProps = new Map<string, any>();
    banjoProps.set("instrumentType", InstrumentType.BANJO);
    banjoProps.set("numStrings", 5);
    // ... other properties
    ```

2. **Flexible Property Handling**

    ```typescript
    // Can add new properties without changing classes
    properties.set("customFeature", "Custom Value");
    ```

3. **Type-Safe Enums**
    ```typescript
    enum Builder {
        FENDER = "Fender",
        MARTIN = "Martin",
        GIBSON = "Gibson",
        COLLINGS = "Collings",
        OLSON = "Olson",
        RYAN = "Ryan"
    }
    ```

## Real-World Implementation

### Factory for Creating Instruments

```typescript
class InstrumentFactory {
    createInstrument(properties: Map<string, any>): Instrument {
        const spec = new InstrumentSpec(properties);
        const serialNumber = this.generateSerialNumber();
        const price = this.calculatePrice(properties);

        return new Instrument(serialNumber, price, spec);
    }

    private generateSerialNumber(): string {
        // Implementation
    }

    private calculatePrice(properties: Map<string, any>): number {
        // Implementation
    }
}
```

### Inventory Management

```typescript
class EnhancedInventory {
    private instruments: Instrument[] = [];
    private factory: InstrumentFactory;

    addInstrument(properties: Map<string, any>): void {
        const instrument = this.factory.createInstrument(properties);
        this.instruments.push(instrument);
    }

    removeInstrument(serialNumber: string): void {
        const index = this.instruments.findIndex((instrument) => instrument.getSerialNumber() === serialNumber);
        if (index !== -1) {
            this.instruments.splice(index, 1);
        }
    }
}
```

## Key Takeaways

1. Use properties pattern for flexibility
2. Design for future instrument types
3. Keep implementation details hidden
4. Use factories for object creation
5. Make search functionality generic

## Best Practices

1. Think about future changes
2. Use enums for fixed values
3. Keep property names consistent
4. Document property requirements
5. Validate property values
6. Use type-safe implementations
