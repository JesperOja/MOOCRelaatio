import express from "express";
import { Op } from "sequelize";
import { Blog, User } from '../models/index.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const users = await User.findAll({
        include: {
            model: Blog,
            attributes: { exclude: ['userId'] }
        }
    });
    res.json(users);
})

router.post('/', async (req, res) => {
    const user = req.body;
    const newUser = await User.create(user);
    res.json(newUser);
})

router.put('/:username', async (req, res) => {
    const user = await User.findOne({
        where: {
            username: req.params.username
        }
    })
    if (user) {
        user.name = req.body.name;
        if(req.body.disable){
            user.disable = req.body.disable
        }
        await user.save();
        res.json(user);
    } else {
        res.status(404).end()
    }
})

router.get('/:id', async (req, res) =>{

    const where = {};

    if(req.query.read){
        where.read = {
            [Op.eq]: req.query.read
        }
    }

    console.log(req.query.read);

    const user = await User.findByPk(req.params.id, {
        attributes: {exclude: ['id', 'blogs']},
        include: [{
            model: Blog,
            as: 'readings',
            attributes: { exclude: ['userId']},
            through: {
                attributes: {exclude: ['userId', 'blogId']},
                where
            }
            
        }]
    })

    if(user){
        res.json(user);
    }else{
        res.status(404).end();
    }
})

export default router;