import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../util/bd.js';

class User extends Model{};

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
            isEmail: {
                msg: "Validation isEmail on username failed"
            }
        }
    },
    disable: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
},{
    sequelize,
    underscored: true,
    modelName: 'user'
});

export default User;