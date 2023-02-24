const express = require('express');
const app = express();
const buis_mk_Route = express.Router();

// BUIS MK Model
let BuisMK = require('../model/BuisMK');

// Add Buis MK
buis_mk_Route.route('/buis/mk/add-buis-mk').post((req, res, next) => {
    BuisMK.create(req.body, (error, data) => {
        if(error) {
            return next(error)
        } else {
            res.json(data)
            console.log(req.body.name + ' MK successfully added');
            console.log(req.body);
        }
    })
})

// BUIS MK by name
buis_mk_Route.route('/buis/mk/get-buis-mk/:name').get((req, res) => {
    BuisMK.findOne({name: req.params.name}, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })

// Delete Buis MK by name
buis_mk_Route.route('/buis/mk/delete-buis-mk/:name').delete((req, res, next) => {
    BuisMK.findOneAndRemove({name: req.params.name}, (error, data) => {
      console.log(req.params.name);
      if (error) {
        return next(error);
      } else {
        console.log(req.params.name + " MK successfully removed");
        res.status(200).json({
          msg: data
        })
      }
    })
  })

//Update BUIS mk by name
buis_mk_Route.route('/buis/mk/update-buis-mk/:name').put((req, res, next) => {
  BuisMK.findOneAndUpdate({name: req.params.name}, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data);
      console.log(req.params.name + ' MK successfully updated!');
      console.log(req.body);
    }
  })
})
// get all buis
buis_mk_Route.route('/buis/mk/').get((req, res) => {
    BuisMK.find((error, data) => {
        if(error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

module.exports = buis_mk_Route;