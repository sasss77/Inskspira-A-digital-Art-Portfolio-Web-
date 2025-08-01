import { DataTypes } from 'sequelize';
import sequelize from '../config/database.connection.js';

const Artwork = sequelize.define('Artwork', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(200),
    allowNull: false,
    validate: {
      len: [1, 200],
      notEmpty: true
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  imageUrl: {
    type: DataTypes.STRING(500),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
    defaultValue: []
  },
  artistId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  likeCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  commentCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  viewCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  isPublic: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  isFeatured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  status: {
    type: DataTypes.ENUM('active', 'reported', 'hidden', 'deleted'),
    defaultValue: 'active'
  }
}, {
  tableName: 'artworks',
  timestamps: true,
  indexes: [
    {
      fields: ['artistId']
    },
    {
      fields: ['status']
    },
    {
      fields: ['isFeatured']
    },
    {
      fields: ['createdAt']
    }
  ]
});

export default Artwork;