import express from 'express'
import { UserModel } from '../../Models/User'
import { sign } from 'jsonwebtoken'
import authenticate from '../../middlewares/authenticate'

const getToken = async (data) => {
  const token = await sign(data, process.env.JWT_SECRET_KEY)
  return token
}

const router = express.Router()

export default () => {
  // @route /login
  // @type POST
  // @body username,password
  // @desc login functionalities
  // @access public
  router.post('/', async (req, res) => {
    const dataExpected = {
      username: true,
      password: true
    }
    for (const key in dataExpected) {
      if (!(key in req.body)) {
        res.status(422).json({ message: `${key} parameter is required` })
      }
    }
    for (const key in req.body) {
      if (!dataExpected[key]) {
        res.status(422).json({ message: `Wrong body parameters: ${key}` })
      }
    }

    const username = req.body.username
    const results = await UserModel.findOne({ username: username })
    if (results) {
      const checkPass = await results.comparePass(req.body.password)
      checkPass ? res.json({ token: await getToken(results.username) }) : res.sendStatus(401)
    } else {
      res.sendStatus(401)
    }
  })

  router.get('/', authenticate, (req, res) => {
    console.log(req.User)
    res.json({
      testing: 'true'
    })
  })

  return router
}
