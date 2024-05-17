import { Sequelize, DataTypes } from 'sequelize';
import userFactory from './User.js'; 

const sequelize = new Sequelize('photo_stock', 'root', 'root', {
  dialect: 'postgres',
  host: 'localhost'
});

const User = userFactory(sequelize, DataTypes);

export { sequelize, User };
