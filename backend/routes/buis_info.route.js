const express = require('express');
const app = express();
const buis_info_Route = express.Router();

// User Model
let BuisInfo = require('../model/BuisInfo');

// Add User
buis_info_Route.route('/buis/info/add-buis').post((req, res, next) => {
    BuisInfo.create(req.body, (error, data) => {
        if(error) {
            return next(error)
        } else {
            res.json(data)
            console.log(req.body.name + ' Buis successfully added!');
            console.log(req.body);
        }
    })
})

// Get Buis by Name
buis_info_Route.route('/buis/info/:name').get((req, res) => {
    BuisInfo.findOne({name: req.params.name}, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })

// Delete Buis
buis_info_Route.route('/buis/info/delete-buis/:name').delete((req, res, next) => {
    BuisInfo.findOneAndRemove({name: req.params.name}, (error, data) => {
      if (error) {
        return next(error);
      } else {
        console.log(req.params.name + ' Buis successfully deleted!');
        res.status(200).json({
          msg: data
        })
      }
    })
  })

// Update Buis
buis_info_Route.route('/buis/info/update-buis/:name').put((req, res, next) => {
  BuisInfo.findOneAndUpdate({name: req.params.name}, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data);
      console.log(req.body.name + ' Buis successfully updated!');
      console.log(req.body);
    }
  })
})
// get all buis
buis_info_Route.route('/buis/info').get((req, res) => {
    BuisInfo.find((error, data) => {
        if(error) {
           // return next(error)
        } else {
            res.json(data)
        }
    })
})

module.exports = buis_info_Route;