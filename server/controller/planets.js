const Planet = require('../models/Planet')


const index = async (req, res) => {
  const planets = await Planet.all
  res.send(planets)
}

const show = async (req, res) => {
  try {
    const planetId = parseInt(req.params.id)
    const planet = await Planet.findById(planetId)
    res.send(planet)
  } catch (error) {
    res.status(404).send({ error: error.message })
  }
}

const create = async (req, res) => {
  try {
    const newPlanet = await Planet.create(req.body)
    res.status(201).send(newPlanet)
  } catch (error) {
    res.status(422).json({ error })
  }
}

const update = async (req, res) => {
  if (!req.body.name && !req.body.description) {
    return res.status(422).send({ error: 'You need at least update name and description'})
  }

  try {
    const planetId = parseInt(req.params.id)
    const data = req.body
    const updatedPlanet = await Planet.update(data, planetId)
    res.status(200).json(updatedPlanet)
  } catch (error) {
    res.status(404).send({ error: error.message })
  }



}

const destroy = async (req, res) => {
  try {
    const planetId = parseInt(req.params.id)
    const planet = await Planet.findById(planetId)
    const result = await planet.destroy()
    res.sendStatus(204)
  } catch (error) {
    res.status(404).send({ error: error.message })
  }
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy
}
