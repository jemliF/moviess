const Router = require('express').Router();
const Actor = require('../models/Actor').model;

Router.get('/actors', (req, res) => {
    Actor.find({})
        .exec((err, actors) => {
            if (err) {
                res.boom.badImplementation('Cannot get actors');
            } else {
                res.json(actors);
            }
        });
});

Router.post('/actors', (req, res) => {
    let newActor = new Actor(req.body);
    newActor.save(err => {
        if (err) {
            res.boom.badImplementation('Cannot get actors');
        } else {
            res.status(201).json('Actor saved successfully');
        }
    });
});

Router.put('/actors/:id', (req, res) => {
    Actor.findOne({ _id: req.params.id })
        .exec((err, actor) => {
            if (actor) {
                const update = req.body;
                update.updatedAt = Date.now();
                Actor.findByIdAndUpdate(req.params.id, { $set: update }, { new: true }, (err, updatedActor) => {
                    if (err) {
                        res.boom.badImplementation('Error occured while updating actor');
                    } else {
                        res.json(updatedActor);
                    }
                });
            } else {
                res.boom.notFound('Unable to find actor');
            }
        });
});

Router.get('/actors/:id', (req, res) => {
    Actor.findOne({ _id: req.params.id })
        .exec((err, actor) => {
            if (actor) {
                if (err) {
                    res.boom.badImplementation('Error occured while retreiving actor');
                } else {
                    res.json(actor);
                }
            } else {
                res.boom.notFound('Unable to find actor');
            }
        });
});

Router.delete('/actors/:id', (req, res) => {
    Actor.findOne({ _id: req.params.id })
        .exec((err, actor) => {
            if (actor) {
                if (err) {
                    res.boom.badImplementation('Error occured while retreiving actor');
                } else {
                    Actor.remove({ _id: req.params.id }, (err) => {
                        if (err) {
                            res.boom.badImplementation('Error occured while deleting actor');
                        } else {
                            res.json('Actor deleted successfully');
                        }
                    });
                }
            } else {
                res.boom.notFound('Unable to find actor');
            }
        });
});

module.exports = Router;