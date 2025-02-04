# Chapter 2: Gathering Requirements

## What You'll Learn

-   Why requirements matter
-   Common requirements gathering mistakes
-   How to talk to users effectively
-   Writing good user stories
-   Creating use cases
-   Analyzing the problem domain

## Why Requirements Matter

Bad requirements = bad software. It's that simple. You can write the most elegant code, but if it doesn't solve the right problem, it's useless.

## Common Mistakes

1. **Assuming You Know What Users Want**

    - Users often don't know what they want until they see what they don't want
    - Your assumptions are probably wrong
    - Always verify requirements with actual users

2. **Not Asking "Why?"**

    - When a user says "I want a button here", ask why
    - Understanding the underlying need often leads to better solutions
    - The first solution proposed is rarely the best one

3. **Jumping to Solutions**
    - Don't start coding immediately
    - Take time to understand the problem space
    - Explore different approaches

## How to Talk to Users

### The Art of the Interview

1. Ask open-ended questions

    - Bad: "Do you need a search feature?"
    - Good: "How do you find items right now?"

2. Listen more than you talk

    - Let users tell their story
    - Pay attention to pain points
    - Note recurring themes

3. Observe their current process
    - Watch how they work
    - Note workarounds they've created
    - Identify inefficiencies

## Writing User Stories

User stories capture requirements from the user's perspective:

```
As a [type of user]
I want to [do something]
So that [benefit]
```

Example:

```
As a guitar shop owner
I want to search guitars by style
So that I can quickly find matches for customers
```

### Good User Stories Are:

-   Independent
-   Negotiable
-   Valuable
-   Estimable
-   Small
-   Testable

## Creating Use Cases

Use cases describe interactions between users and the system:

1. **Actor**: Who's using the system?
2. **Scenario**: What are they trying to do?
3. **Steps**: How do they do it?
4. **Alternatives**: What could go wrong?

Example:

```typescript
// Search for a guitar
Actor: Shop Owner
Main Scenario:
1. Owner enters search criteria
2. System displays matching guitars
3. Owner selects a guitar
4. System shows detailed information

Alternatives:
4a. No matches found
  1. System displays "No matches" message
  2. Suggests broadening search criteria
```

## Analyzing the Problem Domain

1. **Break Down the Problem**

    - Identify the main concepts
    - Look for relationships
    - Find patterns

2. **Find the Objects**

    - Look for nouns in requirements
    - Identify properties and behaviors
    - Group related concepts

3. **Spot the Patterns**
    - Common operations (CRUD)
    - User interactions
    - Business rules

## Real-World Example: Rick's Guitar Shop

Let's see how requirements gathering helped improve Rick's inventory system:

Initial Requirement:

> "I need a system to track guitars"

After Proper Requirements Gathering:

> "I need to match guitars to customer preferences based on specific properties like wood type, style, and manufacturer, so customers can find their perfect guitar quickly"

The difference led to:

-   Better search functionality
-   Proper guitar property modeling
-   Improved customer satisfaction

## Key Takeaways

1. Talk to users before coding
2. Document requirements clearly
3. Verify your understanding
4. Stay flexible - requirements will change
5. Focus on the problem, not the solution

## Practice Tips

1. Interview friends about their software needs
2. Write user stories for apps you use
3. Create use cases for common tasks
4. Look for patterns in similar systems
5. Always ask "Why?" at least three times
