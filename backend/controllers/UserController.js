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

const updateUser = async (req, res) => {

    try {
        const userId = req.params.id;
        const { updateNickname, updateProfileUrl } = req.body;

        const updateUserId = await User.findByPk(userId);

        if (!updateUserId) {
          return res.status(400).json({ message: "User not found" });
        }
        updateUserId.user_nickname = updateNickname || updateUserId.user_nickname;
        updateUserId.user_profile_url = updateProfileUrl || updateUserId.user_profile_url;

        await updateUserId.save()

        return res.status(200).json({message: "User updated", updateUserId})
    } catch(err){
        console.log("Error updating user", err)
        return res.status(500).send({message: "Server error"})
    }
    

}

module.exports = {createUser, updateUser}