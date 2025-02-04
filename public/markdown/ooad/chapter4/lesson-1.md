# Chapter 4: Analysis

## What You'll Learn

-   Understanding what analysis really means
-   Using textual analysis to find objects and operations
-   Creating class diagrams
-   Applying object-oriented principles to analysis
-   Moving from analysis to design

## What is Analysis?

Analysis is about understanding the problem deeply before jumping into solutions. It's the bridge between requirements and design, helping us break down complex problems into manageable pieces.

## Textual Analysis

### Finding Objects and Operations

1. **Noun Phrases → Potential Objects**

    - Look for nouns in requirements
    - Identify things that have properties
    - Find items that need to be tracked

2. **Verb Phrases → Potential Operations**
    - Actions that objects perform
    - Behaviors in the system
    - Interactions between objects

Example from Guitar Shop:

```typescript
// Nouns: Guitar, Builder, Type, Wood
// Verbs: search, match, add, remove

interface Guitar {
    getBuilder(): Builder;
    getType(): Type;
    getBackWood(): Wood;
    getTopWood(): Wood;
}
```

## Class Diagrams in Analysis

### Basic Elements

1. **Classes**

    - Name
    - Attributes
    - Operations

2. **Relationships**
    - Association
    - Aggregation
    - Composition
    - Inheritance

Example:

```typescript
class Inventory {
    private guitars: Guitar[];

    addGuitar(guitar: Guitar): void;
    getGuitar(serialNumber: string): Guitar;
    search(searchSpec: GuitarSpec): Guitar[];
}
```

### UML Class Notation

```
+------------------------+
|       Inventory        |  // Class name
+------------------------+
| - guitars: Guitar[]    |  // Attributes
+------------------------+
| + addGuitar()         |  // Operations
| + getGuitar()         |
| + search()            |
+------------------------+
```

## Object-Oriented Analysis

### 1. Encapsulation

-   Group related data and behavior
-   Hide implementation details
-   Provide clear interfaces

Example:

```typescript
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

### 2. Delegation

-   Distribute responsibilities
-   Avoid monolithic classes
-   Enable flexibility

Example:

```typescript
class Guitar {
    private spec: GuitarSpec;

    matches(searchSpec: GuitarSpec): boolean {
        return this.spec.matches(searchSpec);
    }
}
```

### 3. Abstraction

-   Focus on essential features
-   Hide unnecessary details
-   Create clear contracts

```typescript
interface Searchable {
    matches(criteria: SearchCriteria): boolean;
}

class Guitar implements Searchable {
    matches(criteria: SearchCriteria): boolean {
        // Implementation
    }
}
```

## Analysis Workflow

1. **Initial Analysis**

    - Review requirements
    - Identify main objects
    - List key operations

2. **Refinement**

    - Group related items
    - Find patterns
    - Identify relationships

3. **Validation**
    - Check against requirements
    - Verify completeness
    - Review with stakeholders

## Common Analysis Patterns

### 1. Information Holder

Objects that store data:

```typescript
class GuitarSpec {
    private properties: Map<string, any>;

    getProperty(name: string): any {
        return this.properties.get(name);
    }
}
```

### 2. Service Provider

Objects that perform operations:

```typescript
class InventoryManager {
    search(criteria: SearchCriteria): Guitar[] {
        // Search logic
    }

    update(guitar: Guitar): void {
        // Update logic
    }
}
```

### 3. Controller

Objects that coordinate activities:

```typescript
class SearchController {
    private inventory: Inventory;
    private display: SearchDisplay;

    handleSearchRequest(criteria: SearchCriteria): void {
        const results = this.inventory.search(criteria);
        this.display.showResults(results);
    }
}
```

## Moving Toward Design

### Analysis Deliverables

1. Class diagrams
2. Object relationships
3. Operation specifications
4. Interaction scenarios

### Design Considerations

1. Performance requirements
2. Scalability needs
3. Technical constraints
4. Implementation patterns

## Key Takeaways

1. Analysis focuses on understanding the problem
2. Use textual analysis to find objects and operations
3. Create clear, focused class diagrams
4. Apply OO principles during analysis
5. Keep implementation details out of analysis

## Best Practices

1. Focus on the problem domain
2. Keep classes focused and cohesive
3. Identify clear relationships
4. Document assumptions
5. Validate with stakeholders
