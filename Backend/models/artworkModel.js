// models/artworkModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel');

const Artwork = sequelize.define('Artwork', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: 'Users', key: 'id' }
  },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  image_url: { type: DataTypes.STRING, allowNull: false },
  tags: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
  is_public: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
}, { timestamps: true });

User.hasMany(Artwork, { foreignKey: 'user_id' });
Artwork.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Artwork;
