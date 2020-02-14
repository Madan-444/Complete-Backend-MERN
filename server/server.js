const express = require('express');
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config();

const app = express()
// connect to the database
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser : true,
    useFindAndModify: true,
    useUnifiedTopology: false,
    useCreateIndex: true
})
.then (()=> {
    console.log('db connected successfully')
})
.catch(err=> console.log('DB connecton error',err))

// import router
const authRoutes = require('./routes/auth');


//app middlewares
app.use(morgan('dev'))
app.use(bodyParser.json());
if(process.env.NODE_ENV= 'development'){
    app.use(cors({origin:`http://localhost:3000`}))
}
//apply middlewarees
app.use('/api',authRoutes)


const port = process.env.PORT  || 8000

app.listen(port, ()=> {
    console.log(`The app is running at localhost:${port}`)
}) 