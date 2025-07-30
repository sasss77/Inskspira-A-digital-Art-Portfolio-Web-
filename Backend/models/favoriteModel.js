// models/favoriteModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel');
const Artwork = require('./artworkModel');

const Favorite = sequelize.define('Favorite', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  user_id: { type: DataTypes.UUID, allowNull: false },
  artwork_id: { type: DataTypes.UUID, allowNull: false },
}, {
  timestamps: true,
  indexes: [
    { unique: true, fields: ['user_id', 'artwork_id'] }
  ]
});

// Many-to-many association
User.belongsToMany(Artwork, { through: Favorite, as: 'FavoriteArtworks', foreignKey: 'user_id' });
Artwork.belongsToMany(User, { through: Favorite, as: 'FavoritedBy', foreignKey: 'artwork_id' });

module.exports = Favorite;
