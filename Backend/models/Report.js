import { DataTypes } from 'sequelize';
import sequelize from '../config/database.connection.js';

const Report = sequelize.define('Report', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  reporterId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  reportedUserId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  artworkId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'artworks',
      key: 'id'
    }
  },
  commentId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'comments',
      key: 'id'
    }
  },
  reason: {
    type: DataTypes.ENUM(
      'inappropriate_content',
      'spam',
      'harassment',
      'copyright_violation',
      'fake_account',
      'other'
    ),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('pending', 'reviewed', 'resolved', 'dismissed'),
    defaultValue: 'pending'
  },
  adminNotes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  reviewedBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  reviewedAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'reports',
  timestamps: true,
  indexes: [
    {
      fields: ['reporterId']
    },
    {
      fields: ['status']
    },
    {
      fields: ['artworkId']
    },
    {
      fields: ['commentId']
    },
    {
      fields: ['reportedUserId']
    }
  ],
  validate: {
    mustHaveTarget() {
      if (!this.reportedUserId && !this.artworkId && !this.commentId) {
        throw new Error('Report must target a user, artwork, or comment');
      }
    }
  }
});

export default Report;