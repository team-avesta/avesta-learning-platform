classDiagram
class Device {
    - name: String
    - type: String
    - status: String
    - room: String
    + turnOn(): void
    + turnOff(): void
}