"use strict";

const express = require('express');
const router  = express.Router();

// const bodyParser  = require('body-parser');
// router.use(bodyParser.urlencoded({ extended: true }));

module.exports = (knex) => {
  router.get("/", (req, res) => {
    const searchPhrase = decodeURI(req._parsedOriginalUrl.query).toLowerCase();

    knex('resources')
      .join("topics", "resources.topic_id", "=", "topics.id")
      .select(
       'resources.id as resource_id',
       'resources.title as resource_title',
       'resources.description as resource_description',
       'resources.url as resource_url',
       'resources.topic_id as resource_topic_id',
       'topics.topic',
       )
      .whereRaw('LOWER(title) LIKE ?', `%${[searchPhrase]}%`)
      .orWhereRaw('LOWER(description) LIKE ?', `%${[searchPhrase]}%`)
      .orWhereRaw('LOWER(url) LIKE ?', `%${[searchPhrase]}%`)
      .then((results) => {
        res.json({results, userId: req.session.id});
      })
      .catch((err) => {
              console.error(err);
            });
  });

  return router;
}
