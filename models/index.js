const Posts = require('../../models/Post');
const User = require('../../models/User');
const Comment = require('../../models/Comment');

User.belongsToMany(Posts, {
    through: {
        model: Comment,
        unique: false
    },
    foreignKey: 'user_id'
});

Posts.belongsToMany(User, {
    through: {
        model: Comment,
        unique: false
    },
    foreignKey: 'post_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Posts, {
    foreignKey: 'post_id'
});

module.exports = { User, Posts, Comment };

