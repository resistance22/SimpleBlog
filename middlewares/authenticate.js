import { verify } from 'jsonwebtoken'

export default async (req, res, next) => {
  const auth = req.get('Authorization')
  const token = auth && auth.split(' ')[1]
  if (token) {
    try {
      const user = await verify(token, process.env.JWT_SECRET_KEY)
      req.User = {
        username: user
      }
    } catch (e) {
      res.sendStatus(401)
    }
  } else {
    res.sendStatus(401)
  }
  next()
}
