import pkg from "sequelize";
const { DataTypes, Model, Sequelize } = pkg;
import db from './model.js'


class User extends Model { }

User.init({
    // Model attributes are defined here
    oid: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    weekly_emissions: {
        type: DataTypes.INTEGER
    },
    email_address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    eco_score: {
        type: DataTypes.INTEGER,
        default: 0
    },
    is_registered: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: false,
    }
}, {
    // Other model options go here
    sequelize: db.sequelize, // We need to pass the connection instance
    modelName: 'User' // We need to choose the model name
});

export default User;