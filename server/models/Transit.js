import pkg from 'sequelize';
const { DataTypes, Model, Sequelize } = pkg;
import db from './model.js'

class TransitMethod extends Model { };

TransitMethod.init({
    gas_emissions: {
        type: DataTypes.INTEGER // not sure of units
    },
    electricity_usage: {
        type: DataTypes.INTEGER // not sure of units
    }
}, {
    sequelize: db.sequelize, // We need to pass the connection instance
})

class Frequency extends Model { };

Frequency.init({
    value: {
        type: DataTypes.INTEGER
    },
    per: {
        type: DataTypes.ENUM(['day', 'week', 'month', 'year'])
    },
}, {
    sequelize: db.sequelize, // We need to pass the connection instance
});

class Transit extends Model { }

Transit.init({
    distance: {
        type: DataTypes.INTEGER // meters
    },
    type: {
        type: DataTypes.JSON
    }
}, {
    // Other model options go here
    sequelize: db.sequelize, // We need to pass the connection instance
});

Transit.hasOne(Frequency);
TransitMethod.hasMany(Transit);
export {TransitMethod};
export default Transit;
