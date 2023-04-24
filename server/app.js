const express = require('express')
const cors = require('cors')
const logger = require("./logger")

const app = express()
app.use(cors())
app.use(express.json())

app.use(logger)

const planets = require('./planets.json')


app.get('/planets', (req, res) => {
  res.send(planets)
})

app.get('/planets/:name', (req, res) => {
  const name = req.params.name.toLowerCase()

  const planet = planets.find(planet => planet.name.toLowerCase() === name)

  res.send(planet)
})

app.post('/planets/', (req, res) => {
  const name = req.body.name

  const ids = planets.map(planet => planet.id)
  const maxId = Math.max(...ids)

  const planet = planets.find(planet => planet.name === name)

  if (planet) {
    res.status(409).send({ error: `planet ${planet.name} already exists in the database` })
  } else {
    const newPlanet = {
      name: name,
      id: maxId + 1
    }

    planets.push(newPlanet)

    res.status(201).send(newPlanet)
  }
})

app.patch('/planets/:name', (req, res) => {
  const name = req.params.name.toLowerCase()

  const planet = planets.find(planet => planet.name.toLowerCase() === name)

  if (!planet) {
    return res.status(404).send({ error: `planet ${name} does not exist in the database`})
  }
  try {
    const idx = planets.findIndex(p => p.id === planet.id)

    const updatedPlanet = {
      ...req.body,
      name: req.body.name,
      id: planet.id
    }
    planets[idx] = updatedPlanet
    console.log(planet[8])
    console.log(planets)
    res.send(updatedPlanet)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

app.delete('/planets/:name', (req, res) => {
  const name = req.params.name.toLowerCase()

  const planetIndex = planets.findIndex(planet => planet.name.toLowerCase() === name)

  if(!planetIndex) {
    res.status(404).send({ error: `planet ${name} does not exist in the database`})
  } else {
    planets.splice(planetIndex, -1)

    res.status(204).send()
  }
})



module.exports = app
