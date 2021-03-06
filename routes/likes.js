"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.post('/', (req, res) => {
    const resourceId = req.body.resourceId;
    const userId = req.session.id;
    knex('likes')
      .first('*')
      .where({'likes.user_id': userId, 'likes.resource_id': resourceId})
      .then((results) => {
        if (results) {
          knex('likes')
            .first('*')
            .where({'likes.user_id': userId, 'likes.resource_id': resourceId})
            .del()
            .then((del) => {
              res.json(results);
            })
            .catch((err) => {
              console.error(err);
            });
        } else {
          knex('likes')
            .insert({user_id: userId, resource_id: resourceId})
            .then((del) => {
              res.json(results);
            })
            .catch((err) => {
              console.error(err);
            });
        }
      })
      .catch((err) => {
              console.error(err);
            });
  });

  router.get('/', (req, res) => {
    const resourceId = req.query.resourceId;
    const userId = req.session['id'];
    if(userId) {
      knex('likes')
        .first('*')
        .where({'likes.user_id': userId, 'likes.resource_id': resourceId})
        .then((results) => {
          res.json({results, userId});
        })
        .catch((err) => {
          console.error(err);
        })
    } else {
      res.json({});
    }
  });
  return router;
}
