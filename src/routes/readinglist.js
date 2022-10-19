import express from "express";
import { Readinglist } from '../models/index.js';
import { sequelize } from "../util/bd.js";

const router = express.Router();

router.post('/', async (req, res) => {
    const addToList = req.body;
    const newToList = await Readinglist.create(addToList);
    res.json(newToList);
})

router.put('/:id', async (req,res) => {
    const read = req.body.read;
    const readlist = await Readinglist.findByPk(req.params.id);
    if(readlist){
        readlist.read = read;
        await readlist.save();
        res.json(readlist);
    }else{
        res.status(404).end();
    }
})
export default router;