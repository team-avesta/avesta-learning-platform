Now, I want to implement the course structure for the OOPs course.
In this feature, I want to implement the following things:

1. Course structure for OOPs course will be loaded from the static JSON file.
2. The course structure will be used to render the course navigation in the course structure left sidebar menu.
3. By clicking the course title 'OOP Design in the course structure left sidebar menu, the modules and lessons will be rendered in the menus below.


Here is the JSON file for the course structure:

```json
{
  "course": "OOP Design",
  "modules": [
    {
      "title": "Introduction to Object-Oriented Programming (Beginner)",
      "lessons": [
        {
          "title": "Lesson 1: Encapsulation and Abstraction (Beginner)",
          "filePath": "markdown/oops/lesson-1.md",   
        },
        {
          "title": "Lesson 2: Inheritance (Beginner)",
          "filePath": "markdown/oops/lesson-2.md",   
        },
        {       
          "title": "Lesson 3: Polymorphism (Beginner)",
          "filePath": "markdown/oops/lesson-3.md",   
        },
        {
          "title": "Lesson 4: Classes and Objects (Beginner)",
          "filePath": "markdown/oops/lesson-4.md",   
        },
        {
          "title": "Lesson 5: Class Members (Attributes and Methods) (Beginner)",
          "filePath": "markdown/oops/lesson-5.md",   
        },  
        {
          "title": "Lesson 6: Constructors and Destructors (Beginner)",
          "filePath": "markdown/oops/lesson-6.md",   
        }
      ]
    }   
  ]     
}   
```

