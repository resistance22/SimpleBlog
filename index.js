import express from 'express'
import morgan from 'morgan'
import path from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import routes from './Routes'
import seedDB from './Models/seed'
import dotenv from 'dotenv'
import { bgGreen, yellow, bold, blue } from 'chalk'

dotenv.config()
const PORT = process.env.PORT || 3000
const app = express()
app.set('views', path.resolve(__dirname, './views'))
app.set('view engine', 'ejs')

mongoose.connect('mongodb://localhost/amin_foroutan', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log(blue('connected to the mongoose server'))
  seedDB()
})

app.use(morgan('dev'))
app.use(express.static(path.relative(__dirname, './public')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser('very random key'))

app.use('/', routes())

app.get('/complex/:who', (req, res) => {
  const result = req.params.who || 'no name specified'
  res.send(result)
})

app.use((req, res) => {
  res.status(404).render('404', {
    title: '404 not found!'
  })
})

app.listen(PORT, () => {
  console.log(`${yellow('The app is running on port:')} ${bold(bgGreen(PORT))}`)
})
