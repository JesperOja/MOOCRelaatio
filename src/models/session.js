import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../util/bd.js';

class Session extends Model{}

Session.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'session'
})

export default Session;