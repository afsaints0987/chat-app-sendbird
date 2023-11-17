const {Sequelize, DataTypes, STRING, BOOLEAN, DATE} = require('sequelize')
const sequelize = require('../db')

const User = sequelize.define('User', {
    user_identifier: {
        DataTypes: STRING,
        allowNull: false,
        unique: true
    },
    user_nickname: {
        DataTypes: STRING,
        allowNull: false
    },
    user_profile_url: {
        DataTypes: STRING
    },
    deleted: {
        DataTypes: BOOLEAN,
        defaultValue: false
    },
    created_at: {
        DataTypes: DATE,
        defaultValue: Sequelize.fn()
    }
})