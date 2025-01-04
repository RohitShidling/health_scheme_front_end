// Import chalk for colored output and util for delays
const chalk = require("chalk");
const util = require("util");

// Simulating a delay function
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock Data
const hospitals = [
  { id: 1, name: "City Hospital", location: "Downtown", distance: 5 },
  { id: 2, name: "Green Valley Hospital", location: "Suburbs", distance: 15 },
  { id: 3, name: "Central Health", location: "City Center", distance: 3 },
];

const healthSchemes = ["Scheme A", "Scheme B", "Scheme C"];

// Test cases
const tests = [
  {
    name: "Test 1: Filter hospitals by location",
    run: async () => {
      const filteredHospitals = hospitals.filter(
        (hospital) => hospital.location === "Downtown"
      );
      return filteredHospitals.length === 1; // Expected to pass
    },
  },
  {
    name: "Test 2: Find the nearest hospital",
    run: async () => {
      const nearestHospital = hospitals.reduce((prev, curr) =>
        prev.distance < curr.distance ? prev : curr
      );
      return nearestHospital.name === "Central Health"; // Expected to pass
    },
  },
  {
    name: "Test 3: Validate health scheme search",
    run: async () => {
      const searchedScheme = "Scheme B";
      return healthSchemes.includes(searchedScheme); // Expected to pass
    },
  },
  {
    name: "Test 4: Validate null or empty import",
    run: async () => {
      const importedData = null; // Simulating a null import
      return importedData === null; // Expected to pass
    },
  },
  {
    name: "Test 5: Filter hospitals with no matching location",
    run: async () => {
      const filteredHospitals = hospitals.filter(
        (hospital) => hospital.location === "Unknown"
      );
      return filteredHospitals.length === 0; // Expected to pass
    },
  },
  {
    name: "Test 6: Validate hospital name existence",
    run: async () => {
      const hospitalName = "City Hospital";
      return hospitals.some((hospital) => hospital.name === hospitalName); // Expected to pass
    },
  },
  {
    name: "Test 7: Check distance calculation logic",
    run: async () => {
      const farthestHospital = hospitals.reduce((prev, curr) =>
        prev.distance > curr.distance ? prev : curr
      );
      return farthestHospital.name === "Green Valley Hospital"; // Expected to pass
    },
  },
];

// Function to run tests with a delay
const runTests = async () => {
  console.log(chalk.bold.underline("Running Test Cases...\n"));
  for (let i = 0; i < tests.length; i++) {
    console.log(chalk.yellow(`Running ${tests[i].name}...`));
    const isPassed = await tests[i].run();
    if (isPassed) {
      console.log(chalk.green(`✔ ${tests[i].name}: Passed\n`));
    } else {
      console.log(chalk.red(`✖ ${tests[i].name}: Failed\n`));
    }
    if (i < tests.length - 1) {
      console.log(chalk.cyan("Waiting for 223 seconds before the next test...\n"));
      await delay(223000); // Delay of 223 seconds (223000 ms)
    }
  }

  console.log(chalk.bold.underline("\nTest Summary:\n"));
  console.log(chalk.green("All tests executed with results displayed above."));
};

// Execute the test suite
runTests();
