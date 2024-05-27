export default function(sequelize, DataTypes) {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING(250),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(500),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(250),
            allowNull: false,
            unique: true 
        },
        registrationDate: {
            type: DataTypes.DATE,
            allowNull: true, 
            defaultValue: DataTypes.NOW 
        },
        lastLoginDate: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null 
        },
        status: {
            type: DataTypes.STRING(1),
            allowNull: true,
            defaultValue: null  
        },
    }, {
        tableName: 'users'
    });

    User.associate = function(models) {
        User.hasMany(models.Photo, {
            foreignKey: 'userId',
            as: 'photos'
        });
    };
    
    return User;
}
