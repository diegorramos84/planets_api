const express = require('express')
const router = express.Router()
const planetsController = require('../controller/planets')

router.get('/', planetsController.index)

router.get('/:id', planetsController.show)

router.post('/', planetsController.create)

router.patch('/:id', planetsController.update)

router.delete('/:id', planetsController.destroy)
// app.delete('/planets/:name', (req, res) => {
//   const name = req.params.name.toLowerCase()

//   const planetIndex = planets.findIndex(planet => planet.name.toLowerCase() === name)

//   if(!planetIndex) {
//     res.status(404).send({ error: `planet ${name} does not exist in the database`})
//   } else {
//     planets.splice(planetIndex, -1)

//     res.status(204).send()
//   }
// })

module.exports = router
