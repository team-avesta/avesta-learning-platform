# Chapter 9: Iterating and Testing

## What You'll Learn

-   Understanding iterative development
-   Writing effective tests
-   Test-Driven Development (TDD)
-   Continuous Integration
-   Handling iterations and feedback

## Iterative Development

### The Iterative Process

1. Plan small iterations
2. Implement features
3. Test thoroughly
4. Get feedback
5. Refine and repeat

```typescript
// Iteration 1: Basic Guitar Matching
interface GuitarSpec {
    matches(other: GuitarSpec): boolean;
}

// Iteration 2: Add Property-based Matching
interface GuitarSpec {
    matches(other: GuitarSpec): boolean;
    getProperty(name: string): any;
    setProperty(name: string, value: any): void;
}

// Iteration 3: Add Flexible Matching Strategy
interface GuitarSpec {
    matches(other: GuitarSpec): boolean;
    getProperty(name: string): any;
    setProperty(name: string, value: any): void;
    setMatchingStrategy(strategy: MatchingStrategy): void;
}
```

## Test-Driven Development

### The TDD Cycle

1. Write a failing test
2. Write minimal code to pass
3. Refactor
4. Repeat

### Writing Tests First

```typescript
// Step 1: Write the test
describe("GuitarSpec", () => {
    it("should match identical specs", () => {
        const spec1 = new GuitarSpec();
        spec1.setProperty("builder", "Martin");
        spec1.setProperty("model", "D-18");

        const spec2 = new GuitarSpec();
        spec2.setProperty("builder", "Martin");
        spec2.setProperty("model", "D-18");

        expect(spec1.matches(spec2)).toBe(true);
    });
});

// Step 2: Implement the code
class GuitarSpec {
    private properties: Map<string, any> = new Map();

    setProperty(name: string, value: any): void {
        this.properties.set(name, value);
    }

    matches(other: GuitarSpec): boolean {
        for (const [key, value] of this.properties) {
            if (other.getProperty(key) !== value) {
                return false;
            }
        }
        return true;
    }
}
```

### Testing Different Scenarios

```typescript
describe("Inventory", () => {
    let inventory: Inventory;

    beforeEach(() => {
        inventory = new Inventory();
    });

    it("should find matching guitars", () => {
        // Setup
        const guitar = new Guitar("123", 999.99, createTestSpec());
        inventory.addGuitar(guitar);

        // Test
        const searchSpec = createSearchSpec();
        const results = inventory.search(searchSpec);

        // Verify
        expect(results).toHaveLength(1);
        expect(results[0].getSerialNumber()).toBe("123");
    });

    it("should handle no matches", () => {
        const searchSpec = createSearchSpec();
        const results = inventory.search(searchSpec);
        expect(results).toHaveLength(0);
    });
});
```

## Integration Testing

### Testing Component Interactions

```typescript
describe("Guitar Shop System", () => {
    let inventory: Inventory;
    let searchService: SearchService;
    let notificationService: NotificationService;

    beforeEach(() => {
        inventory = new Inventory();
        searchService = new SearchService(inventory);
        notificationService = new NotificationService();
    });

    it("should notify when matching guitar is added", async () => {
        // Setup
        const searchCriteria = createSearchCriteria();
        searchService.watchFor(searchCriteria, notificationService);

        // Test
        const matchingGuitar = createMatchingGuitar();
        await inventory.addGuitar(matchingGuitar);

        // Verify
        expect(notificationService.wasNotified()).toBe(true);
    });
});
```

## Continuous Integration

### Automated Testing Pipeline

```typescript
// Jest configuration for CI
export default {
    preset: "ts-jest",
    testEnvironment: "node",
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80
        }
    },
    setupFilesAfterEnv: ["./jest.setup.ts"]
};
```

### Test Helpers and Fixtures

```typescript
class TestHelper {
    static createGuitar(props: Partial<GuitarProps> = {}): Guitar {
        return new Guitar({
            serialNumber: props.serialNumber || "12345",
            price: props.price || 999.99,
            spec: props.spec || TestHelper.createDefaultSpec()
        });
    }

    static createDefaultSpec(): GuitarSpec {
        const spec = new GuitarSpec();
        spec.setProperty("builder", "Martin");
        spec.setProperty("model", "D-18");
        spec.setProperty("type", "acoustic");
        return spec;
    }
}
```

## Handling Feedback and Iterations

### Feedback Loop

```typescript
interface FeedbackHandler {
    handleUserFeedback(feedback: UserFeedback): void;
    trackUsagePatterns(usage: UsageData): void;
    generateReport(): FeedbackReport;
}

class IterativeDevelopment {
    private feedback: FeedbackHandler;
    private currentIteration: Iteration;

    startNewIteration(): void {
        this.currentIteration = new Iteration();
        this.feedback.reset();
    }

    implementFeature(feature: Feature): void {
        const tests = this.createTests(feature);
        const implementation = this.implementWithTDD(tests);
        this.currentIteration.addFeature(implementation);
    }

    gatherFeedback(): FeedbackReport {
        return this.feedback.generateReport();
    }

    planNextIteration(report: FeedbackReport): IterationPlan {
        return new IterationPlanner().createPlan(report);
    }
}
```

### Measuring Progress

```typescript
interface ProgressTracker {
    trackTestCoverage(): Coverage;
    trackFeatureCompletion(): FeatureStatus;
    trackUserSatisfaction(): SatisfactionMetrics;
}

class IterationMetrics {
    private tracker: ProgressTracker;

    generateReport(): IterationReport {
        return {
            coverage: this.tracker.trackTestCoverage(),
            features: this.tracker.trackFeatureCompletion(),
            satisfaction: this.tracker.trackUserSatisfaction()
        };
    }
}
```

## Best Practices

### 1. Test Organization

```typescript
// Group related tests
describe("Guitar Matching", () => {
    describe("Exact Matching", () => {
        // Exact matching tests
    });

    describe("Partial Matching", () => {
        // Partial matching tests
    });

    describe("Edge Cases", () => {
        // Edge case tests
    });
});
```

### 2. Test Maintainability

```typescript
// Use test helpers
class TestFactory {
    static createTestData(): TestData {
        return {
            guitars: TestFactory.createGuitars(),
            specs: TestFactory.createSpecs(),
            inventory: TestFactory.createInventory()
        };
    }
}
```

## Key Takeaways

1. Write tests before code
2. Keep iterations small
3. Gather and respond to feedback
4. Maintain test coverage
5. Automate testing process
6. Use continuous integration

## Best Practices

1. Write clear test descriptions
2. Test edge cases
3. Keep tests independent
4. Use test helpers and fixtures
5. Monitor test coverage
6. Automate where possible
