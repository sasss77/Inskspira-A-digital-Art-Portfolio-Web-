import { DataTypes } from 'sequelize';
import sequelize from '../config/database.connection.js';

const Comment = sequelize.define('Comment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      len: [1, 1000],
      notEmpty: true
    }
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
  },
  parentId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'comments',
      key: 'id'
    }
  },
  isEdited: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  status: {
    type: DataTypes.ENUM('active', 'reported', 'hidden', 'deleted'),
    defaultValue: 'active'
  }
}, {
  tableName: 'comments',
  timestamps: true,
  indexes: [
    {
      fields: ['artworkId']
    },
    {
      fields: ['userId']
    },
    {
      fields: ['parentId']
    },
    {
      fields: ['status']
    }
  ]
});

export default Comment;