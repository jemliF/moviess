const Router = require("express").Router();
const Movie = require("../models/Movie").model;
const Joi = require('joi');
const MovieValidation = require('../../validation').Movie;

Router.get("/movies", (req, res) => {
  Movie.find({})
  .populate("actors")
  .exec((err, result) => {
    if (err) {
      console.error(err);
      res.boom.badImplementation("Unable to find movies");
    } else {
      console.log(JSON.stringify(result));
      res.json(result);
    }
  });
});

Router.post("/movies", (req, res) => {
  Joi.validate(req.body, MovieValidation, (err, value) => {
    if(err){
      res.boom.badData("Invalid data", err);
    } else {
      let newMovie = new Movie(req.body);
      newMovie.save(err => {
      if (err) {
        console.error(err);
        res.boom.badImplementation("Cannot save movie");
      } else {
        res.status(201).json("Movie saved successfully");
      }
  });
    }
  });
});

Router.put("/movies/:id", (req, res) => {
  Movie.findOne({ _id: req.params.id }).exec((err, movie) => {
    if (movie) {
      Joi.validate(req.body, MovieValidation, (err, value) => {
        if(err){
          res.boom.badData("Invalid data", err);
        } else {
          const update = value;
          Movie.findByIdAndUpdate(
            req.params.id,
            { $set: update },
            { new: true },
            (err, updatedMovie) => {
              if (err) {
                res.boom.badImplementation("Error occured while updating movie");
              } else {
                res.json(updatedMovie);
              }
            }
          );
        }
      });
    } else {
      res.boom.notFound("Unable to find movie");
    }
  });
});

Router.get("/movies/:id", (req, res) => {
  Movie.findOne({ _id: req.params.id })
    .populate("actors")
    .exec((err, movie) => {
      if (err) {
        console.error(err);
        res.boom.badImplementation("Unable to find movie");
      } else {
        if (movie) {
          res.json(movie);
        } else {
          res.boom.notFound("Unable to find movie");
        }
      }
    });
});

Router.delete("/movies/:id", (req, res) => {
  Movie.findOne({ _id: req.params.id }).exec((err, movie) => {
    if (movie) {
      if (err) {
        res.boom.badImplementation("Error occured while retreiving movie");
      } else {
        Movie.remove({ _id: req.params.id }, err => {
          if (err) {
            res.boom.badImplementation("Error occured while deleting movie");
          } else {
            res.json("Movie deleted successfully");
          }
        });
      }
    } else {
      res.boom.notFound("Unable to find movie");
    }
  });
});

module.exports = Router;
