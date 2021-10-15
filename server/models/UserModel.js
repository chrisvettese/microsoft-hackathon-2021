import pkg from "sequelize";
const { DataTypes, Model, Sequelize } = pkg;
import db from './model.js'


class User extends Model { }

User.init({
    // Model attributes are defined here
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    EmissionsPerWeek: {
        type: DataTypes.INTEGER,
    },
    EmailAddress: {
        type: DataTypes.STRING,
        allowNull: false
    },
    EcoScore: {
        type: DataTypes.INTEGER,
        default: 0
    },
    IsRegistered: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: false,
    },
}, {
    // Other model options go here
    sequelize: db.sequelize, // We need to pass the connection instance
    modelName: 'User' // We need to choose the model name
});

export default User;