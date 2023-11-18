const {DataTypes} = require('sequelize')
const sequelize = require('../db')

const Channel = sequelize.define(
  "Channel",
  {
    channel_url: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    created_by_identifier: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    chatmate_identifier: { type: DataTypes.STRING, allowNull: false },
    deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    total_messages: { type: DataTypes.INTEGER, defaultValue: 0 },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);

sequelize.sync({force: false});

module.exports = Channel