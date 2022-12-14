import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../util/bd.js';

class Readinglist extends Model { }

Readinglist.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
    },
    blogId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'blogs', key: 'id' },
    }
},
    {
        sequelize,
        underscored: true,
        timestamps: false,
        modelName: 'readinglist'
    })

export default Readinglist;