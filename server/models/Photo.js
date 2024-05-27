export default function(sequelize, DataTypes) {
    const Photo = sequelize.define('Photo', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users', 
                key: 'id'
            },
            required: true
        },
        title: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        text: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        category: {
            type: DataTypes.ENUM('Свадебное', 
                                'Природа', 
                                'Портретное', 
                                'Природные и погодные явления', 
                                'Животные',
                                'Авто и мото',
                                'Разное'), 
            allowNull: false
        },
        image: {
            type: DataTypes.BLOB,
            allowNull: false
        },
        viewCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
    }, {
        tableName: 'photo_album'
    });

    Photo.associate = function(models) {
        Photo.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'users'
        });
    };
    
    return Photo;
}
