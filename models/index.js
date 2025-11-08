const Blog = require("./blog");
const User = require("./user");
const ReadingList = require("./readingList");

User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Blog, { through: ReadingList, as: "read_blog" });
Blog.belongsToMany(User, { through: ReadingList, as: "read_by_user" });

module.exports = {
  Blog,
  User,
  ReadingList,
};
