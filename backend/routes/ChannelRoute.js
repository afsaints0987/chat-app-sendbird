const express = require('express')
const router = express.Router()
const {createChannel} = require('../controllers/ChannelController')

router.post('/create-channel', createChannel)

module.exports = router