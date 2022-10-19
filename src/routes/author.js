import express from "express";
import { Blog } from '../models/index.js';
import { sequelize } from "../util/bd.js";

const router = express.Router();

router.get('/', async (req, res) => {
    await Blog.findAll({
        attributes: ['author', [sequelize.fn('sum', sequelize.col('likes')), 'total_likes'], 
        [sequelize.fn('count', sequelize.col('author')), 'blogs'] 
            ],
        group: 'author',
        order: 
            sequelize.literal('total_likes DESC')
    }).then(author => {
        console.log(JSON.stringify(author));
        res.json(author);
    });

    
})

export default router;