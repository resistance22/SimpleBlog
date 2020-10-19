import express from 'express'
import morgan from 'morgan'
import path from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import routes from './Routes'

const app = express()
app.set('views',path.resolve(__dirname,'./views'))
app.set('view engine','ejs')


app.use( morgan('dev') )
app.use(express.static( path.relative(__dirname,'./public') ))
app.use(bodyParser.urlencoded({ extended:false }))
app.use(cookieParser('very random key'))

app.use('/',routes())

app.get('/complex/:who',(req,res)=> {
    let result = req.params.who || 'no name specified'
    res.send( result )
})

app.use((req,res)=>{
    res.status(404).render('404',{
        title:'404 not found!'
    })
})


app.listen('3000')