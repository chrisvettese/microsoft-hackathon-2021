import pkg from 'sequelize';
const { DataTypes, Model, Sequelize } = pkg;
import db from './model.js'

class Emission extends Model {
}

Emission.init({
    version: {
        type: DataTypes.INTEGER
    },
    emissions_per_week: {
        type: DataTypes.INTEGER // We'll keep these in integers and scale the number up or down for the actual value
        // maybe use a getter or setter
    },
    eco_score: {
        type: DataTypes.INTEGER
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.fn('now')
    }
}, {
    // Other model options go here
    sequelize: db.sequelize, // We need to pass the connection instance
});

export default Emission;