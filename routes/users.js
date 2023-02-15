/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

// Please note for example purposes the user is always set to user 2. This page serves as the base for adding full login and user functionality


module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM CUSTOMERS`)
      .then((data) => {
        const users = data.rows;
        res.json({ users });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //Get specific user by id
  router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    db.query(`SELECT * FROM CUSTOMERS WHERE id = $1`,[id])
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
