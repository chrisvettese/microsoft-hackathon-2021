import pkg from 'sequelize';
const { DataTypes, Model, Sequelize } = pkg;
import db from './model.js'

class Province extends Model {}

Province.init({
    name: {
        type: DataTypes.STRING,
    },
    emissions_per_watt: {
        type: DataTypes.INTEGER,
    }
}, {
    // Other model options go here
    sequelize: db.sequelize, // We need to pass the connection instance
});

export default Province;
