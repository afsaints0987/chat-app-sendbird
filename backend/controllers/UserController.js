const User = require('../models/UserModel')
// const fetch = require('node-fetch')


const createUser = async (req, res) => {
    const {nickname, profile_url} = req.body
    const user_identifier = uuidv4()

    if(!nickname) {
        res.status(400).json({message: "Please write your nickname"})
    }

    const userData = await User.create({
        user_identifier,
        user_nickname: nickname,
        user_profile_url: profile_url
    })

    if(userData) {
        return res.status(201).json({userData, message: 'Successfully created'})
    } else {
        console.log(error)
        return res.status(400).json({message: 'Unable to create user'})
    }
} 

module.exports = {createUser}