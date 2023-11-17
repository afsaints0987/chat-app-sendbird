const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const port = process.env.PORT || 3000
const sequelize = require('./db')
const app = express()

dotenv.config()

app.use(cors({
    origin: true,
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.send('Server started running for the chat application')
})

app.listen(port, async () => {
    console.log(`Server is listening on ${port}`)

    try {
        await sequelize.authenticate();
        console.log("Connection to the database successful!")
    } catch (error) {
        console.log("Unable to connect to the database", error)
    }
})

