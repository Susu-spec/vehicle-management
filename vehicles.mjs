import * as readline from 'node:readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Vehicle {
    constructor(brand, speed = 0, fuel = 100) {
        this.brand = brand;
        this.speed = speed;
        this.fuel = fuel;
    }

    accelerate(amount) {
        if (this.fuel > 0) {
            this.speed += amount;
            this.fuel = Math.max(0, this.fuel - 5);
            console.log(`${this.brand} accelerating... Speed: ${this.speed} km/h | Fuel: ${this.fuel}%`);
        }
        else {
            console.log("Out of fuel! Refuel to continue.");
        }

        askAction();
    }

    brake(amount) {
        this.speed = Math.max(0, this.speed - amount);
        console.log(`${this.brand} braking... Speed: ${this.speed} km/h`);
        askAction();
    }

    honk() {
        console.log(`${this.brand} goes Honk! Honk!`);
        askAction();
    }

    refuel() {
        this.fuel = 100;
        console.log(`${this.brand} refueled to 100%!`);
        askAction();
    }

    stats() {
        console.log(`${this.brand} | Speed: ${this.speed} km/h | Fuel: ${this.fuel}%`);
        askAction();
    }
}


let vehicles = [];
let activeVehicle = null;


function createVehicle() {
    rl.question("Enter the brand of the new car: ", (brand) => {
        const newCar = new Vehicle(brand);

        vehicles.push(newCar);
        activeVehicle = newCar;

        console.log(`New car ${brand} created and selected.`);
        askAction();
    });
}

function switchVehicle() {

    showAllAvailableCars();

    rl.question("Select a car number: ", (num) => {
        const index = Number(num) - 1;
        if (index >= 0 && index < vehicles.length) {
            activeVehicle = vehicles[index];
            console.log(`Switched to ${activeVehicle.brand}.`);
        }
        else {
            console.log("Invalid selection.");
        }
        askAction();
    });
}

function showAllAvailableCars() {
    if (vehicles.length === 0) {
        console.log("No cars available. Create one first.");
    } else {
        console.log("\nAvailable cars:");
        vehicles.forEach((car, index) => console.log(`${index + 1}. ${car.brand}`));
    }
    return askAction();
}


function askAction() {
  if (!activeVehicle) {
    return rl.question("\nNo active car. Create one? (yes/no)\n> ", (response) => {
      if (response.toLowerCase() === "yes" || response.toLowerCase() === "y") {
        createVehicle();
      } else {
        console.log("Exiting...");
        rl.close();
      }
    });
  }

  rl.question(
    "\nChoose an action: accelerate, brake, honk, stats, refuel, switch, new, list, exit\n> ",
    (action) => {
        switch (action.toLowerCase()) {
        case "accelerate":
          rl.question("Increase speed by: ", (input) => activeVehicle.accelerate(Number(input)));
          break;
        case "brake":
          rl.question("Decrease speed by: ", (input) => activeVehicle.brake(Number(input)));
          break;
        case "honk":
          activeVehicle.honk();
          break;
        case "stats":
          activeVehicle.stats();
          break;
        case "refuel":
          activeVehicle.refuel();
          break;
        case "new":
          createVehicle();
          break;
        case "list":
          showAllAvailableCars();
            break;
        case "switch":
          switchVehicle();
          break;
        case "exit":
          console.log("Exiting...");
          rl.close();
          break;
        default:
          console.log("Invalid action. Try again.");
          askAction();
      }
    }
  );
}

console.log("\n Welcome to the Vehicle Management System!");
askAction();
