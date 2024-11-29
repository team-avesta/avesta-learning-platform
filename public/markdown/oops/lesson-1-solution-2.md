classDiagram
class Dish {
    - name: String
    - price: Float
    - category: String
    - availabilityStatus: String
    + markAvailable(): void
    + markUnavailable(): void
}