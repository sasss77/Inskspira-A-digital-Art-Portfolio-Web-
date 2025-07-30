// models/likeModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel');
const Artwork = require('./artworkModel');

const Like = sequelize.define('Like', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  user_id: { type: DataTypes.UUID, allowNull: false },
  artwork_id: { type: DataTypes.UUID, allowNull: false },
}, {
  timestamps: true,
  indexes: [
    { unique: true, fields: ['user_id', 'artwork_id'] }
  ]
});

User.belongsToMany(Artwork, { through: Like, as: 'LikedArtworks', foreignKey: 'user_id' });
Artwork.belongsToMany(User, { through: Like, as: 'LikedBy', foreignKey: 'artwork_id' });

module.exports = Like;
