import  Blog  from './blog.js';
import User from './user.js';
import Readinglist from './readinglist.js'
import Session from './session.js'


User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Blog, {through: Readinglist, as: 'readings'});
Blog.belongsToMany(User, {through: Readinglist});


export { Blog, User, Readinglist, Session };