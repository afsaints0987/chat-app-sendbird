const {DataTypes, STRING, BOOLEAN, DATE, UUID, Sequelize} = require('sequelize')
const sequelize = require('../db')

const User = sequelize.define('User', {
    user_identifier: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: true
    },
    user_nickname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_profile_url: {
        type: DataTypes.STRING
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
})

sequelize.sync({force: false})

module.exports = User