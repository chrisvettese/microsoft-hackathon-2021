import pkg from 'sequelize';
const { DataTypes, Model, Sequelize } = pkg;
import db from './model.js'

class TransitMethod extends Model { };


TransitMethod.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gas_consumption: {
        type: DataTypes.INTEGER, 
        allowNull: false,
        set(value) {
            this.setDataValue('gas_consumption', Math.round(value*100));
        },
        get() {
            return value/100;
        }
    },
    electricity_usage: {
        type: DataTypes.INTEGER, 
        allowNull: false,
        set(value) {
            this.setDataValue('electricity_usage', Math.round(value*100));
        },
        get() {
            return this.getDataValue('electricity_usage', value/100);
        }
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
