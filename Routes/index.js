import express from 'express'
import auth from './api/auth'
import profile from './profile'
const router = express.Router()

export default () => {
  router.get('/', (req, res) => {
    res.render('index', { title: 'homepage', bundle: 'home' })
  })

  router.use('/profile*', profile())
  router.use('/login', auth())

  return router
}
