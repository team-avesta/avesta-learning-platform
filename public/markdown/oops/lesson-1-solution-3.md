classDiagram
class Patient {
    - name: String
    - age: Int
    - medicalRecordNumber: String
    - status: String
    + admit(): void
    + discharge(): void
}