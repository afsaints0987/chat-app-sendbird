const express = require('express')
const { createUser } = require('../controllers/UserController')
const router = express.Router()

router.post('/create-user', createUser)

module.exports = router