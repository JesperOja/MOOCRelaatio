import jwt from "jsonwebtoken";
import express from 'express';
import { User, Session } from "../models/index.js";
import { SECRET } from "../util/config.js";

const router = express.Router();

const tokenExtractor = (req, res, next) => {
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
    next()
}

router.delete('', tokenExtractor, async (req, res) => {
    const session = await Session.findOne({
        where: {
            token: req.Token
        }
    })

    if(session){
        await session.destroy();
        res.json('Logged out successfully!')
    }else{
        res.status(404).end();
    }
})


export default router;