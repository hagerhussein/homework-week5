const { Router } = require('express')
const Movie = require('./model')

const router = new Router()

router.post('/movies', (req, res, next) => {
  Movie
    .create(req.body)
    .then(movie => {
      if (!movie) {
        return res.status(406).send({
          message: `Movie can not be created`
        })
      }
      return res.status(201).send(movie)
    })
    .catch(error => next(error))
})

router.get('/movies/:id', (req, res, next) => {
  Movie
    .findByPk(req.params.id)
    .then(movie => {
      if (!movie) {
        return res.status(404).send({
          message: 'Movie does not exist'
        })
      }
      return res.send(movie)
    })
    .catch(error => next(error))
})

router.put('/movies/:id', (req, res, next) => {
  Movie
    .findByPk(req.params.id)
    .then(movie => {
      if (!movie) {
        return res.status(404).send({
          message: `Movie does not exist`
        })
      }
      return movie.update(req.body).then(movie => res.send(movie))
    })
    .catch(error => next(error))
})

router.delete('/movies/:id', (req, res, next) => {
  Movies
    .findByPk(req.params.id)
    .then(movie => {
      if (!movie) {
        return res.status(404).send({
          message: `Movie does not exist`
        })
      }
      return movie.destroy()
        .then(() => res.send({
          message: `Movie was deleted`
        }))
    })
    .catch(error => next(error))
})

router.get('/movies', (req, res, next) => {
  const limit = req.query.limit || 35
  const offset = req.query.offset || 0

  Movie
    .findAll({
      limit, offset
    })
    .then(movies => {
      res.send({ movies })
    })
    .catch(error => next(error))
})

module.exports = router