import sequelize from '../config/database.connection.js';
import User from './User.js';
import Artwork from './Artwork.js';
import Comment from './Comment.js';
import Like from './Like.js';
import Favorite from './Favorite.js';
import Follow from './Follow.js';
import Report from './Report.js';

User.hasMany(Artwork, {
  foreignKey: 'artistId',
  as: 'artworks',
  onDelete: 'CASCADE'
});
Artwork.belongsTo(User, {
  foreignKey: 'artistId',
  as: 'artist'
});

User.hasMany(Comment, {
  foreignKey: 'userId',
  as: 'comments',
  onDelete: 'CASCADE'
});
Comment.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

Artwork.hasMany(Comment, {
  foreignKey: 'artworkId',
  as: 'comments',
  onDelete: 'CASCADE'
});
Comment.belongsTo(Artwork, {
  foreignKey: 'artworkId',
  as: 'artwork'
});

Comment.hasMany(Comment, {
  foreignKey: 'parentId',
  as: 'replies',
  onDelete: 'CASCADE'
});
Comment.belongsTo(Comment, {
  foreignKey: 'parentId',
  as: 'parent'
});

User.hasMany(Like, {
  foreignKey: 'userId',
  as: 'likes',
  onDelete: 'CASCADE'
});
Like.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

Artwork.hasMany(Like, {
  foreignKey: 'artworkId',
  as: 'likes',
  onDelete: 'CASCADE'
});
Like.belongsTo(Artwork, {
  foreignKey: 'artworkId',
  as: 'artwork'
});

User.hasMany(Favorite, {
  foreignKey: 'userId',
  as: 'favorites',
  onDelete: 'CASCADE'
});
Favorite.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

Artwork.hasMany(Favorite, {
  foreignKey: 'artworkId',
  as: 'favorites',
  onDelete: 'CASCADE'
});
Favorite.belongsTo(Artwork, {
  foreignKey: 'artworkId',
  as: 'artwork'
});

User.hasMany(Follow, {
  foreignKey: 'followerId',
  as: 'following',
  onDelete: 'CASCADE'
});
User.hasMany(Follow, {
  foreignKey: 'followingId',
  as: 'followers',
  onDelete: 'CASCADE'
});
Follow.belongsTo(User, {
  foreignKey: 'followerId',
  as: 'follower'
});
Follow.belongsTo(User, {
  foreignKey: 'followingId',
  as: 'following'
});

User.hasMany(Report, {
  foreignKey: 'reporterId',
  as: 'reportsMade',
  onDelete: 'CASCADE'
});
User.hasMany(Report, {
  foreignKey: 'reportedUserId',
  as: 'reportsReceived',
  onDelete: 'CASCADE'
});
User.hasMany(Report, {
  foreignKey: 'reviewedBy',
  as: 'reportsReviewed'
});
Report.belongsTo(User, {
  foreignKey: 'reporterId',
  as: 'reporter'
});
Report.belongsTo(User, {
  foreignKey: 'reportedUserId',
  as: 'reportedUser'
});
Report.belongsTo(User, {
  foreignKey: 'reviewedBy',
  as: 'reviewer'
});

Artwork.hasMany(Report, {
  foreignKey: 'artworkId',
  as: 'reports',
  onDelete: 'CASCADE'
});
Report.belongsTo(Artwork, {
  foreignKey: 'artworkId',
  as: 'artwork'
});

Comment.hasMany(Report, {
  foreignKey: 'commentId',
  as: 'reports',
  onDelete: 'CASCADE'
});
Report.belongsTo(Comment, {
  foreignKey: 'commentId',
  as: 'comment'
});

User.belongsToMany(Artwork, {
  through: Like,
  foreignKey: 'userId',
  otherKey: 'artworkId',
  as: 'likedArtworks'
});
Artwork.belongsToMany(User, {
  through: Like,
  foreignKey: 'artworkId',
  otherKey: 'userId',
  as: 'likedByUsers'
});

User.belongsToMany(Artwork, {
  through: Favorite,
  foreignKey: 'userId',
  otherKey: 'artworkId',
  as: 'favoritedArtworks'
});
Artwork.belongsToMany(User, {
  through: Favorite,
  foreignKey: 'artworkId',
  otherKey: 'userId',
  as: 'favoritedByUsers'
});

User.belongsToMany(User, {
  through: Follow,
  foreignKey: 'followerId',
  otherKey: 'followingId',
  as: 'followingUsers'
});
User.belongsToMany(User, {
  through: Follow,
  foreignKey: 'followingId',
  otherKey: 'followerId',
  as: 'followerUsers'
});

export {
  sequelize,
  User,
  Artwork,
  Comment,
  Like,
  Favorite,
  Follow,
  Report
};