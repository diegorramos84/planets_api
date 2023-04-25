const planets = require('../data/planets')

class Planet {
  constructor(data) {
    this.name = data.name,
    this.description = data.description,
    this.id = data.id
  }

  static get all() {
    return planets.map(planetData => new Planet(planetData))
  }

  static findById(planetId) {
    try {
      const planet = planets.find(planet => planet.id === planetId)
      return new Planet(planet)
    } catch (error) {
      throw new Error(error)
    }
  }

  static create(data) {
    try {
      let nextId
      planets.length
        ? nextId = planets.reduce((b1, b2) => b1.id > b2.id ? b1 : b2).id + 1
        : nextId =  1

      if (!data) {
        throw new Error('You need both a planet name and description')
      }

      const newPlanet = new Planet({ id: nextId, ...data})
      planets.push(newPlanet)

    } catch (error) {
      throw (error.message)
    }
  }

  static update(data, planetId) {
    try {
       const planet = planets.find(planetData => planetData.id === planetId)
       console.log(planet, "model l45")
       if (planet) {
        if (data.name) {
          planet.name = data.name
        }
        if (data.description) {
          planet.description = data.description
        }
        console.log(planet, "model l53")
        return new Planet(planet)
       }
    } catch (error) {
      throw new Error('planet not found')
    }
  }

  async destroy() {
    const planet = planets.find(p => p.id === this.id)

    if (planet) {
      const planetIdx = planets.indexOf(planet)
      planets.splice(planetIdx, 1)
    } else {
      throw new Error('Planet not found')
    }
  }
}


module.exports = Planet
