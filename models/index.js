import { Sequelize } from 'sequelize';
import userModel from './User.js';
import photoModel from './Photo.js';

const sequelize = new Sequelize('photo_stock', 'root', 'root', {
    host: 'localhost',
    dialect: 'postgres'
});

const User = userModel(sequelize, Sequelize.DataTypes);
const Photo = photoModel(sequelize, Sequelize.DataTypes);

const db = {
    User,
    Photo,
    sequelize,
    Sequelize
};

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

sequelize.sync({ force: false }).then(() => {
    console.log('Database & tables created!');
}).catch(err => {
    console.error('Unable to sync database:', err);
});

export default db;
export { User, Photo, sequelize };

