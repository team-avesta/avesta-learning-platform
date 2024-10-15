Course: OOP Design
Module 1: Introduction to Object-Oriented Programming (Beginner)

Lesson 1: What is OOP?
Topic 1: History of OOP and Its Importance
Exercise 1: Identify programming paradigms that existed before OOP and list their limitations.
Exercise 2: Research the key contributors to OOP and their contributions.
Topic 2: Comparing OOP with Procedural Programming
Exercise 1: Compare the code structure of a procedural program vs. an object-oriented program that solves the same problem.
Exercise 2: Analyze the advantages of modularity in OOP through a simple task like creating a Calculator class.

Lesson 2: The Four Pillars of OOP
Topic 1: Encapsulation and Abstraction
Exercise 1: Write a Person class with private fields and implement getter/setter methods to encapsulate data.
Exercise 2: Abstract the internal details of an Account class where only the balance is exposed, not the transactions.
Topic 2: Inheritance
Exercise 1: Create a Shape class with subclasses Circle and Square. Implement method overriding in the subclasses.
Exercise 2: Demonstrate multi-level inheritance by extending a class hierarchy with LivingBeing -> Animal -> Mammal.
Topic 3: Polymorphism
Exercise 1: Use compile-time polymorphism by overloading methods in a MathOperations class.
Exercise 2: Demonstrate run-time polymorphism by overriding a speak() method in Animal and Dog classes.

Lesson 3: Classes and Objects
Topic 1: Defining Classes and Objects
Exercise 1: Define a Book class with properties like title, author, and pages, and create objects of this class.
Exercise 2: Write a program to demonstrate the interaction between objects by creating multiple Student objects and comparing their grades.
Topic 2: Class Members (Attributes and Methods)
Exercise 1: Write a BankAccount class with attributes like account number, balance, and methods for deposit() and withdraw().
Exercise 2: Create a Library class where addBook() and removeBook() methods modify the collection of Book objects.

Lesson 4: Constructors and Destructors
Topic 1: Constructors
Exercise 1: Write a Car class with overloaded constructors for different types of vehicles (e.g., sports car, sedan).
Exercise 2: Design a Product class where one constructor takes only name and price, while another constructor takes name, price, and discount.
Topic 2: Destructors
Exercise 1: Implement destructors in a FileHandler class to automatically close a file when the object is destroyed.
Exercise 2: Simulate object cleanup in a DatabaseConnection class that closes the connection once the object is no longer needed.


Module 2: Intermediate Concepts of OOP Design (Intermediate)

Lesson 5: Inheritance
Topic 1: Superclass and Subclass
Exercise 1: Write a Vehicle superclass and create subclasses like Car and Bike. Override a method like move().
Exercise 2: Create a Job class and extend it to subclasses like Engineer and Doctor with unique methods.

Lesson 6: Polymorphism
Topic 1: Method Overloading
Exercise 1: Create a Calculator class with overloaded methods add() for adding integers, doubles, and arrays.
Exercise 2: Demonstrate method overloading in a Logger class where different log levels have varying numbers of parameters.
Topic 2: Method Overriding
Exercise 1: Override the draw() method in subclasses of Shape to print unique messages for Circle and Square.
Exercise 2: Implement method overriding in a Printer class where print() is overridden in LaserPrinter and InkjetPrinter.

Lesson 7: Abstract Classes and Interfaces
Topic 1: Abstract Classes
Exercise 1: Define an abstract class Appliance with abstract methods like turnOn() and turnOff(). Implement these in subclasses.
Exercise 2: Write an abstract class PaymentMethod and extend it with subclasses CreditCard and PayPal, implementing specific logic for each.
Topic 2: Interfaces
Exercise 1: Create an interface Playable with a method play(). Implement this interface in classes Video and Music.
Exercise 2: Design an interface Drawable and implement it in Rectangle, Circle, and Triangle classes to demonstrate polymorphism.

Lesson 8: Relationships in OOP
Topic 1: Association
Exercise 1: Model a Teacher class associated with a Student class, where the teacher can manage multiple students.
Exercise 2: Write a Customer class that has an association with an Order class, showcasing a real-world relationship.
Topic 2: Aggregation
Exercise 1: Design a Library that aggregates multiple Book objects, allowing for books to exist independently of the library.
Exercise 2: Model a Company class where Employees are aggregated into the company.
Topic 3: Composition
Exercise 1: Create a House class that composes Room objects where the rooms cannot exist without the house.
Exercise 2: Design a Computer class where Processor and RAM objects are composed within the computer.


Module 3: Advanced OOP Design Patterns and Principles (Advanced)
Lesson 9: SOLID Principles
Topic 1: Single Responsibility Principle
Exercise 1: Refactor a User class with multiple responsibilities to follow the SRP by splitting its methods into separate classes.
Topic 2: Open-Closed Principle
Exercise 1: Refactor a Shape class so that new shapes (like Triangle, Polygon) can be added without modifying the existing code.

Lesson 10: Design Patterns
Topic 1: Factory Pattern
Exercise 1: Implement a factory for creating different types of BankAccount (e.g., Savings, Checking).
Topic 2: Observer Pattern
Exercise 1: Create a WeatherStation class that notifies multiple Display devices whenever the weather changes.
