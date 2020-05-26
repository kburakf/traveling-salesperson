// We use the fitness function to determine the best result we have.

function calculateFitness() {
  for (let i = 0; i < population.length; i++) {
    let resultDistance = calculateDistance(cities, population[i])
    // The distance between all points is calculated. If it's less than the previous one, 
    // our shortest path changes.
    if (resultDistance < recordDistance) {
      recordDistance = resultDistance

      bestEver = population[i]

      console.log("The shortest path: ", Math.floor(recordDistance));
    }
    fitness[i] = 1 / (pow(resultDistance, 8) + 1);
  }
}

// Children are chosen for the new generation to be produced

function normalizeFitness() {
  let sum = 0
  // All numbers are summed, then normalized to 0-1 in the function below
  for (let i = 0; i < fitness.length; i++) {
    sum += fitness[i]
  }
  // Normalized between 0-1
  for (let i = 0; i < fitness.length; i++) {
    fitness[i] = fitness[i] / sum
  }
}

// The next generation will be produced by crossover and a little mutated.

function nextGeneration() {
  let newPopulation = []

  for (let i = 0; i < population.length; i++) {
    let orderA = pickOne(population, fitness)

    let orderB = pickOne(population, fitness)

    let order = crossOver(orderA, orderB)

    mutate(order, 0.01)
    // Mutation rate was chosen 1% in order not to disturb the genetics
    newPopulation[i] = order
  }

  population = newPopulation
}

// The chromosome part to be made by crossover replaces the parts with another chromosome by selecting randomly with the pick one function.

function pickOne(population, fitness) {
  let index = 0

  let r = random(1)

  while (r > 0) {
    r = r - fitness[index]

    index++
  }

  index--

  return population[index].slice()
}

// Two random points are selected from the locations, random parts are replaced by crossover

function crossOver(orderA, orderB) {
  // The starting point of the series to be crossover is selected randomly
  let start = Math.floor(random(orderA.length))
  // The ending point of the series to be crossover is selected randomly
  let end = Math.floor(random(start + 1, orderA.length))
  // Combine arrays
  let newOrder = orderA.slice(start, end)

  for (let i = 0; i < orderB.length; i++) {
    let city = orderB[i]
    // The created network is not added to the order array if it is already set up
    if (!newOrder.includes(city)) {
      newOrder.push(city)
    }
  }

  return newOrder
}

// We produce a new chromosome by mutating a very small part, 1%, of the existing generation.

function mutate(order, mutationRate) {
  for (let i = 0; i < totalCities; i++) {

    if (random(1) < mutationRate) {
      let indexA = Math.floor(random(order.length))

      let indexB = (indexA + 1) % totalCities

      swap(order, indexA, indexB)
    }
  }
}