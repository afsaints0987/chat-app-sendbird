const express = require('express')
const { createUser, updateUser } = require('../controllers/UserController')
const router = express.Router()

router.post('/create-user', createUser)
router.put('/update-user', updateUser)

module.exports = router