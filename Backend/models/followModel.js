// models/followModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel');

const Follow = sequelize.define('Follow', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  follower_id: { type: DataTypes.UUID, allowNull: false },
  following_id: { type: DataTypes.UUID, allowNull: false }
}, {
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['follower_id', 'following_id']
    }
  ]
});

// Self-referential many-to-many
User.belongsToMany(User, {
  through: Follow,
  as: 'Followers',
  foreignKey: 'following_id',
  otherKey: 'follower_id'
});
User.belongsToMany(User, {
  through: Follow,
  as: 'Following',
  foreignKey: 'follower_id',
  otherKey: 'following_id'
});

module.exports = Follow;
