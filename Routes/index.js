import express from 'express'
import auth from './api/auth'
const router = express.Router()

export default () => {
  router.get('/', (req, res) => {
    res.render('index', { title: 'homepage' })
  })

  router.use('/login', auth())

  return router
}
