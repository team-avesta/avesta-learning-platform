classDiagram
class Course {
    - title: String
    - instructor: String
    - duration: Int
    - enrollmentStatus: String
    + openEnrollment(): void
    + closeEnrollment(): void
}