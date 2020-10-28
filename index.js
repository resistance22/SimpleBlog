import express from 'express'
import morgan from 'morgan'
import path from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import routes from './Routes'
import { seedUserDB } from './Models/User'
import dotenv from 'dotenv'
import { red, green, yellow, bold, blue } from 'chalk'

dotenv.config()
const PORT = process.env.PORT || 3000
const app = express()
app.set('views', path.resolve(__dirname, './views'))
app.set('view engine', 'ejs')

mongoose.connect('mongodb://172.17.0.2/amin_foroutan', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
const db = mongoose.connection
db.on('error', () => {
  console.log(red('connection error'))
})

db.once('open', () => {
  console.log(blue('connected to the mongoose server'))
  seedUserDB()
})

app.use(morgan('dev'))
app.use(express.static(path.relative(__dirname, './public')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser('very random key'))

app.use('/', routes())

app.use((req, res) => {
  res.status(404).render('404', {
    title: '404 not found!',
    bundle: 'home'
  })
})

app.listen(PORT, () => {
  console.log(`${yellow(`The app is running in ${bold(blue(app.get('env')))} on port`)} ${bold(green(PORT))}`)
})
