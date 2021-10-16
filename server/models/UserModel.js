import pkg from 'sequelize';
const {DataTypes, Model} = pkg;
import db from './model.js'
import Emission from './Emission.js'
import Transit from './Transit.js'
import Province from './Province.js'
import LeaderboardEntry from './LeaderboardEntry.js'

class User extends Model {
}

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

User.hasMany(Emission);
User.hasMany(Transit);
Province.hasMany(User);
User.belongsTo(LeaderboardEntry);

export default User;