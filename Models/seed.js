import { Schema, model } from 'mongoose'
import { hash, compare } from 'bcrypt'

const SALT_ROUNDS = 12
const userSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true }
})

// eslint-disable-next-line prefer-arrow-callback
userSchema.pre('save', async function (next) {
  const user = this
  if (!user.isModified('password')) return next()

  try {
    const hashedPass = await hash(this.password, SALT_ROUNDS)
    user.password = hashedPass
  } catch (err) {
    return next(err)
  }

  return next()
})

async function comparePass (candidate) {
  const result = await compare(candidate, this.password)
  return result
}

userSchema.methods.comparePass = comparePass

const UserModel = model('User', userSchema)

const seedUserDB = async () => {
  const resluts = await UserModel.findOne()
  if (!resluts) {
    const user = new UserModel({
      username: process.env.USER,
      password: process.env.PASS
    })
    user.save()
  }
  return resluts
}

export default seedUserDB
