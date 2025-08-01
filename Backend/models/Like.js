import { DataTypes } from 'sequelize';
import sequelize from '../config/database.connection.js';

const Like = sequelize.define('Like', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  artworkId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'artworks',
      key: 'id'
    }
  }
}, {
  tableName: 'likes',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['userId', 'artworkId']
    },
    {
      fields: ['artworkId']
    },
    {
      fields: ['userId']
    }
  ]
});

export default Like;