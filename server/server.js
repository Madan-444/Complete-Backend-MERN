const express = require('express');

const app = express()

// import router
const authRoutes = require('./routes/auth');

//apply middlewarees
app.use('/api',authRoutes)

const port = process.env.port || 8000

app.listen(port, ()=> {
    console.log(`The app is running at localhost:${port}`)
}) 