# Chapter 3: Requirements Change

## What You'll Learn

-   How to analyze requirements effectively
-   Using use cases to understand system behavior
-   Creating domain analysis
-   Moving from analysis to design
-   Identifying and handling system features

## From Requirements to Analysis

Requirements tell us WHAT the system should do. Analysis helps us understand HOW we might build it. The key is breaking down requirements into manageable pieces that we can implement.

## Use Cases in Detail

Use cases help bridge requirements and implementation by:

1. Showing system behavior
2. Identifying actors and their goals
3. Describing interactions step by step
4. Revealing edge cases and alternatives

### Anatomy of a Use Case

```typescript
Use Case: Search Inventory
Primary Actor: Store Owner
Goal: Find specific guitars matching customer criteria

Main Flow:
1. Owner enters search criteria
2. System validates input
3. System searches inventory
4. System displays matching guitars
5. Owner views guitar details

Alternative Flows:
- No matches found
- Invalid search criteria
- Multiple exact matches
```

## Domain Analysis

Domain analysis helps us understand the problem space:

1. **Identify Key Concepts**

    - Find nouns in requirements
    - Look for relationships
    - Group related items

2. **Create Feature Lists**

    - Core functionality
    - Optional features
    - Future enhancements

3. **Define Boundaries**
    - What's in scope
    - What's out of scope
    - External dependencies

## Analysis Tools

### 1. Class Diagrams

Basic structure showing:

-   Classes and objects
-   Properties and methods
-   Relationships between classes

Example:

```typescript
class Guitar {
    serialNumber: string;
    price: number;
    spec: GuitarSpec;

    getSerialNumber(): string;
    getPrice(): number;
    getSpec(): GuitarSpec;
}
```

### 2. Sequence Diagrams

Show interactions between:

-   Users and system
-   Objects within system
-   External systems

### 3. State Diagrams

Track object states through:

-   State changes
-   Triggers
-   Conditions

## Moving to Design

Analysis artifacts guide design decisions:

1. Use cases → System behavior
2. Domain model → Class structure
3. State diagrams → Object lifecycle
4. Sequence diagrams → Method calls

## Feature Analysis

Break down features into:

1. **Core Features**

    - Must have
    - Essential functionality
    - MVP requirements

2. **Supporting Features**

    - Nice to have
    - Enhance usability
    - Add value

3. **Future Features**
    - Planned enhancements
    - Scalability needs
    - Market demands

## Common Analysis Patterns

1. **Search Pattern**

    - Input criteria
    - Match logic
    - Result handling
    - Sort/filter options

2. **CRUD Pattern**

    - Create operations
    - Read operations
    - Update operations
    - Delete operations

3. **Validation Pattern**
    - Input validation
    - Business rules
    - Error handling
    - User feedback

## Real-World Example: Guitar Search

Let's analyze the guitar search feature:

1. **Use Case Analysis**

    - Multiple search criteria
    - Partial matches
    - Result sorting
    - Detail views

2. **Domain Objects**

    ```typescript
    // Core domain objects
    Guitar;
    GuitarSpec;
    Inventory;
    SearchCriteria;
    SearchResult;
    ```

3. **Feature Breakdown**
    - Basic search
    - Advanced filters
    - Result management
    - Inventory updates

## Key Takeaways

1. Analysis bridges requirements and design
2. Use cases guide implementation
3. Domain analysis shapes architecture
4. Features need prioritization
5. Patterns help solve common problems

## Best Practices

1. Keep analysis focused on WHAT, not HOW
2. Use diagrams to communicate ideas
3. Validate analysis with stakeholders
4. Document assumptions
5. Plan for change
