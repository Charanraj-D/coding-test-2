const express = require('express');
const Joi = require('@hapi/joi');

const Pet = require('../models/pets');
const { validateBody } = require('../middlewares/route');

const router = express.Router();

router.post('/', validateBody(Joi.object().keys({
    name: Joi.string().required().description('Pet name'),
    age: Joi.number().required().description('Pet age'),
    colour: Joi.string().required().description('Pet colour')
 }),
 {
     stripUnknown: true,
 }),
 async (req, res, next) => {
     try {
         const pet = new Pet(req.body);
         await pet.save();
         res.status(201).json(pet);
     } catch (e) {
         next(e);
     }
 }
);

router.get('/:id', async (req, res, next) => {
    try {
        const pet = await Pet.findOne(req.params.id);
        res.json(pet);
    } catch (e) {
        next(e);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const pet = await Pet.deleteOne({_id:req.params.id});
        res.send('Deleted successfully');
    } catch (e) {
        next(e);
    }
});

module.exports = router;