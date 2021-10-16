import pkg from 'sequelize';
const { DataTypes, Model, Sequelize } = pkg;
import db from './model.js'

class LeaderboardEntry extends Model {}

LeaderboardEntry.init({
    name: { //username?
        type: DataTypes.STRING,
    },
    eco_Score: {
        type: DataTypes.INTEGER,
    },
    emissions_per_week: {
        type: DataTypes.INTEGER, //units undetermined
    }
}, {
    // Other model options go here
    sequelize: db.sequelize, // We need to pass the connection instance
});

export default LeaderboardEntry;
