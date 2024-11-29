classDiagram
class Vehicle {
    - modelName: String
    - registrationNumber: String
    - type: String
    - rentalStatus: String
    + rent(): void
    + returnVehicle(): void
}