import Sequelize from 'sequelize';
import configObj from '../config/config.js';
import User from './user.js';
import Post from './post.js';
import Hashtag from './hashtag.js';
import Alarm from './alarm.js';
import Bookmark from './bookmark.js';
import Box from './Box.js';

const env = process.env.NODE_ENV as 'production' | 'test' || 'development';
const config = configObj[env];

export const sequelize = new Sequelize.Sequelize(
  config.database, config.username, config.password, config,
);

Alarm.initiate(sequelize);
Bookmark.initiate(sequelize);
Box.initiate(sequelize);
Hashtag.initiate(sequelize);
Post.initiate(sequelize);
User.initiate(sequelize);

Alarm.associate();
Bookmark.associate();
Box.associate();
Hashtag.associate();
Post.associate();
User.associate();