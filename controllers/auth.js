const db = require('../db/connection');

exports.getLogin = (req, res) => {
    
        const userId = req.session.userId || "";
        if (userId) {
          res.redirect("/");
        } else {
          const user = generateEmptyUser();
          const { statusCode } = 200;
          const errorMessage = "";
          const params = { user, statusCode, errorMessage };
          res.render("login", params);
        }
      
}

exports.postLogin = (req, res) => {}

exports.getSignup = (req, res) => {}

exports.postSignup = (req, res) => {}

exports.getReset = (req, res) => {}

exports.postReset = (req, res) => {}

exports.postLogout = (req, res) => {}


// Secure authentication
const bcrypt = require("bcrypt");

const { generateEmptyUser } = require("../lib/helpers");

module.exports = (db) => {

  // GET of /login
  router.get("/", (req, res) => {
    const userId = req.session.userId || "";
    if (userId) {
      res.redirect("/");
    } else {
      const user = generateEmptyUser();
      const { statusCode } = 200;
      const errorMessage = "";
      const params = { user, statusCode, errorMessage };
      res.render("login", params);
    }
  });


  // POST of /login
  router.post("/", (req, res) => {
    const userId = req.session.userId || "";

    if (userId) {
      res.redirect("/");
    }

    const formEmail = req.body.email;
    const formPassword = req.body.password;

    if (!formEmail || !formPassword) {
      res.status(403);
      const user = generateEmptyUser();
      const errorMessage = "Please enter an email and a password";
      const params = { user, errorMessage };

      res.render("login", params);
    } else {
      const getPasswordQuery = {
        text: `SELECT id, password FROM users WHERE email = $1`,
        values: [formEmail]
      };

      db.query(getPasswordQuery)
        .then(data => {
          const userInfo = data.rows[0];

          if (bcrypt.compareSync(formPassword, userInfo.password)) {
            req.session.userId = userInfo.id;
            if (userInfo.admin) {
              res.redirect(`/owners/${userInfo.id}/orders`);
            } else {
              res.redirect("/");
            }
          } else {
            res.status(403);
            const user = generateEmptyUser();
            const errorMessage = "Password and email doesn't match";
            const params = { user, errorMessage };

            res.render("login", params);
          }
        })
        .catch(err => {
          res.status(500).json({ error: err.message });
        });
    }
  });
  return router;
};

//LOGOUT

const express = require('express');
const router  = express.Router();

module.exports = () => {

  // POST of /logout
  router.post("/", (req, res) => {
    req.session = null;
    res.redirect('/');
  });
  return router;
};