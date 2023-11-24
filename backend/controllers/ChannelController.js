const Channel = require('../models/ChannelModel')

const createChannel = async (req, res) => {
    const {channel_url, chatmate_identifier, created_by_identifier } = req.body
    
    try {
        const existingChannel = await Channel.findOne({where: {channel_url}})
        if(existingChannel){
            return res.status(400).json({message: "Channel already exist"})
        }

        const newChannel = await Channel.create({
            channel_url,
            chatmate_identifier,
            created_by_identifier
        })

        return res.status(201).json({channel: newChannel, message: "Channel created successfully!"})
        
    } catch(err){
        console.log("Error occured on creating channel", err)
        return res.status(500).json({message: 'Internal Server Error'})
    }
}

module.exports = {createChannel}