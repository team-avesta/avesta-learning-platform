classDiagram
    class Animal {
        +String name
        +int age
        +makeSound()
    }
    class Dog {
        +String breed
        +bark()
    }
    class Cats {
        +String color
        +meow()
    }
    Animal <|-- Dog
    Animal <|-- Cat