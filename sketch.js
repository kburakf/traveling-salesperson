// *** ALL  EXPLANATION HAVE BEEN ADDED  AS COMMENTS IN THE CODE.***

// First of all absolutely variables..

let cities = []
// All random location will add to cities array.
let totalCities = 15
// Random location count
let populationSize = 10
// Array will be randomly mixed up to population width
let population = []
// Mixed locations are added to the population array
let fitness = []
// The fitness results of the produced chromosomes are added here
let recordDistance = Infinity
// The best result will be transferred to this value
let bestEver = []
// The locations of the shortest path found are transferred to this series and their vectors are drawn.
let currentBest
// Instant best scores based on fitness result are kept at this value

// And then setup() function..

function setup() {
  createCanvas(800, 800)
  // Window is created for drawing vectors
  let order = []
  // Locations are transferred to the order array for mixing
  for (let i = 0; i < totalCities; i++) {
    let v = createVector(Math.floor(Math.random() * width - 5), Math.floor(Math.random() * height - 5))
    // Vectors are drawn by generating random locations as many as the number of cities entered
    cities[i] = v
    // Current locations added to cities array
    order[i] = i
    // Locations are transferred to the order array for mixing
  }

  for (let i = 0; i < populationSize; i++) {
    population[i] = shuffle(order, 100)
    // A new population is produced by mixing the locations of the cities
  }
}

// Results after all calculations and operations are drawn in the draw() function.

// Genetic algorithm functions are called in draw() function.

function draw() {
  background(0)
  // Background color: black
  fill(255)
  // Background color of text
  noStroke()

  textSize(15)
  // OUTPUT
  text(`The shortest path: ${floor(recordDistance)}`, 10, 20);
  // These 3 functions are called from genetic-algorithm.js file
  calculateFitness()
  // Calculating the score of the result with fitness
  normalizeFitness()
  // Number is normalized to improve performance
  nextGeneration()
  // A new generation is produced by chromosomes crossovering and mutating
  stroke(255)

  strokeWeight(4);

  noFill()

  beginShape()
  // Vectors are drawn between the locations of the best result we have
  for (let i = 0; i < bestEver.length; i++) {
    let n = bestEver[i]
    // Direction line between two cities
    vertex(cities[n].x, cities[n].y)
    // Drawing of the point indicating the city
    ellipse(cities[n].x, cities[n].y, 12, 12)
  }

  endShape()
}

// The locations we have are mixed randomly among themselves.

function shuffle(arr, num) {
  for (let i = 0; i < num; i++) {
    let indexA = Math.floor(random(arr.length))

    let indexB = Math.floor(random(arr.length))

    swap(arr, indexA, indexB)
  }
}

// We use the swap function to change locations

function swap(a, i, j) {
  let temp = a[i]

  a[i] = a[j]
  // i and j arrays swapped between each other
  a[j] = temp
}

// We use this function to measure the distance between locations

function calculateDistance(cities, order) {
  let sum = 0

  for (let i = 0; i < order.length - 1; i++) {
    // Calculating the distance between all cities one by one
    let cityAIndex = order[i]

    let cityA = cities[cityAIndex]

    let cityBIndex = order[i + 1]

    let cityB = cities[cityBIndex]

    let d = Math.hypot(cityA.x - cityB.x, cityA.y - cityB.y)
    // Distance between to locations
    sum += d
  }

  return sum
}