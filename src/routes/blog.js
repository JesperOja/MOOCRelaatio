import express from "express";
import { Blog, Session, User } from '../models/index.js';
import jwt from 'jsonwebtoken';
import { SECRET } from "../util/config.js";
import { Op } from "sequelize";
import { sequelize } from "../util/bd.js";

const router = express.Router();

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        try {
            console.log(authorization.substring(7))
            req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
        } catch (error) {
            console.log(error)
            return res.status(401).json({ error: 'token invalid' })
        }
    } else {
        return res.status(401).json({ error: 'token missing' })
    }
    next()
}

const activeSession = async (req,res,next)=> {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        try {
            console.log(authorization.substring(7))
            req.Token = authorization.substring(7)
        } catch (error) {
            console.log(error)
            return res.status(401).json({ error: 'token invalid' })
        }
    } else {
        return res.status(401).json({ error: 'token missing' })
    }

    const active = await Session.findOne({
        where:{
            token: req.Token
        }
    })

    if(active){
        next()
    }else{
        return res.status(401).json({error: 'You are using old token, please login again!'})
    }

    
}

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id);
    next();
}

router.get('/',activeSession, async (req, res) => {
    const where = {};

    if (req.query.search) {
        where.title = {
            [Op.substring]: req.query.search
        }
        where.author = {
            [Op.substring]: req.query.search
        }
    }


    const blogs = await Blog.findAll({
        attributes: { exclude: ['userId'] },
        include: {
            model: User,
            attributes: ['name']
        },
        where,
        order:
            sequelize.literal('likes DESC')

    });

    console.log(JSON.stringify(blogs));
    res.json(blogs);
})

router.post('/', tokenExtractor,activeSession, async (req, res) => {
    try {
        const user = await User.findByPk(req.decodedToken.id);
        if (!user.disable) {
            const blog = await Blog.create({ ...req.body, userId: user.id });
            res.json(blog);
        } else {
            res.json('Your account has been disabled, contact admin!');
        }

    } catch (error) {
        return res.status(400).json({ error })
    }

})

router.delete('/:id', blogFinder, tokenExtractor,activeSession, async (req, res) => {

    if (req.blog.userId == req.decodedToken.id) {
        const user = await User.findByPk(req.decodedToken.id);
        if (!user.disable) {
            await req.blog.destroy();
            res.json("Removed succefully!");
        } else {
            res.json('Your account has been disabled, contact admin!');
        }
    } else {
        res.status(204).end();
    }
})

router.put('/:id', blogFinder,activeSession, async (req, res) => {
    if (req.blog) {
        const user = await User.findByPk(req.decodedToken.id);
        if (!user.disable) {
            req.blog.likes = req.body.likes;
            await req.blog.save();
            res.json(req.blog);
        } else {
            res.json('Your account has been disabled, contact admin!');
        }
    } else {
        res.status(404).end()
    }
})

export default router;