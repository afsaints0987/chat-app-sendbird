const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 3000
const sequelize = require('./db')
const UserRoute = require('./routes/UserRoute')
const ChannelRoute = require('./routes/ChannelRoute')
const app = express()

app.use(cors({
    origin: true,
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.send('Server started running for the chat application')
})

app.use('/', UserRoute)
app.use('/', ChannelRoute)

app.listen(port, async () => {
    console.log(`Server is listening on ${port}`)

    try {
        await sequelize.authenticate();
        console.log("Connection to the database successful!")
    } catch (error) {
        console.log("Unable to connect to the database", error)
    }
})

