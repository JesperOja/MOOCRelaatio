import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../util/bd.js';

class Blog extends Model {}
const year = new Date
Blog.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    author: {
        type: DataTypes.STRING
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    year: {
        type: DataTypes.INTEGER,
        validate:{
            min: 1991,
            max: year.getFullYear()
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {model:'users', key: 'id'}
    }
}, {
    sequelize,
    underscored: true,
    modelName: 'blog'
})

export default Blog;