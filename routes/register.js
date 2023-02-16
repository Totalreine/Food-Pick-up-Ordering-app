/*
 * All routes for Register are defined here
 * Since this file is loaded in server.js into /register,
 *   these routes are mounted onto /register
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

// Secure authentication
const bcrypt = require('bcrypt');

const { generateEmptyUser } = require('../lib/helpers');

module.exports = (db) => {

  // GET of /register
  router.get("/", (req, res) => {
    const userId = req.session.userId || '';
    if (userId) {
      res.redirect('/');
    } else {
      const user = generateEmptyUser();
      const {statusCode} = 200;
      const errorMessage = '';
      const params = {user, statusCode, errorMessage};
      res.render('register', params);
    }
  });

  // POST of /register
  router.post("/", (req, res) => {
    const userId = req.session.userId || '';

    if (userId) {
      res.redirect('/');
    }

    const { first_name, last_name, phoneNumber, email, password, city, address, postal_code} = req.body;

   

    if (!first_name || !last_name || !phoneNumber || !email || !password || !city || !address || !postal_code) {
      const user = generateEmptyUser();
      const {statusCode} = 400;
      const errorMessage = 'all fields must have a value';
      const params = {user, statusCode, errorMessage};
      res.render('register', params);
    }

    const getUserIdQuery = {
      text: `SELECT id FROM customers WHERE email = $1`,
      values: [email],
    };

    db.query(getUserIdQuery)
      .then(data => {
        const existUser = data.rows[0];

        if (!existUser) {

          const insertUserQuery = {
            text: `INSERT INTO customers (first_name, last_name, email, phone_number, password, city, address, postal_code)
              VALUES ($1, $2, $3, $4, $5, $6, $7)
              RETURNING id;`,
            values: [first_name, last_name, email, phoneNumber, password, city, address, postal_code],
          };

          db.query(insertUserQuery)
            .then(userInfo => {
              const newUserId = userInfo.rows[0].id;

              req.session.userId = newUserId;
              res.redirect('/'); // Could redirect to user page instead!!!
            })
            .catch(err => {
              res
                .status(500)
                .json({ error: err.message });
            });
        } else {
          const user = generateEmptyUser();
          const {statusCode} = 400;
          const errorMessage = 'you seem to already exit in our systems';
          const params = {user, statusCode, errorMessage};
          res.render('register', params);
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};