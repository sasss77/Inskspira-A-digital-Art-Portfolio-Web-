import { DataTypes } from 'sequelize';
import sequelize from '../config/database.connection.js';

const Follow = sequelize.define('Follow', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  followerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  followingId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  }
}, {
  tableName: 'follows',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['followerId', 'followingId']
    },
    {
      fields: ['followerId']
    },
    {
      fields: ['followingId']
    }
  ],
  validate: {
    cannotFollowSelf() {
      if (this.followerId === this.followingId) {
        throw new Error('Users cannot follow themselves');
      }
    }
  }
});

export default Follow;