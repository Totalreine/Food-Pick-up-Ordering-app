const express = require("express");
const router = express.Router();
const cookieSession = require("cookie-session");

router.use(
  cookieSession({
    name: "user_id",
    keys: ["super secret 1", "super secret 2"],
  })
);

module.exports = (db) => {
  router.get("/", (req, res) => {
    // check for owners email, otherwise redirect to login
    if (!req.session.user_id || req.session.user_id !== 1) {
      res.redirect("/login");
      return;
    }
    // display owner page
    const user = req.session.user_id;
    const templateVars = { user };
    res.render("owner", templateVars);
  });

  router.get("/new-orders", (req, res) => {
    // database query to see new orders
    db.query(
      `SELECT
      FROM
      JOIN
      WHERE 
    `
    )
      .then((response) => {
        res.json(response.rows);
      })
      .catch((err) => res.json(err.message));
  });

  router.get("/responded-orders", (req, res) => {
    // database query to see responded orders
    db.query(
      `SELECT
      FROM
      WHERE 
      ORDER BY created_at DESC
     
    `
    )
      .then((response) => {
        res.json(response.rows);
      })
      .catch((err) => res.json(err.message));
  });

  router.get("/user/:order_id", (req, res) => {
    // get info for SMS text

    db.query(
      `SELECT 
      FROM  
      JOIN 
      WHERE   
    `,
      [req.params.order_id]
    )
      .then((response) => {
        res.json(response.rows[0]);
      })
      .catch((err) => res.json(err.message));
  });

  router.put("/", (req, res) => {
    const { orderId, finishedAt, createdAt} = req.body;
    // updating the duration in database
    db.query(
      `
      // UPDATE orders SET(finishedAt - createdAt) = $1
      // WHERE id = $2
      // RETURNING *
      ;
    `,
      [createdAt, finishedAt, orderId]
    )
      .then((response) => {
        res.json(response.rows[0]);
      })
      .catch((err) => res.json(err.message));
  });

  router.patch("/", (req, res) => {
    const { orderId } = req.body;
    // complete the order in the database
    db.query(
      `
      UPDATE orders SET finished_at = to_timestamp(${Date.now()} / 1000.0)
      WHERE id = $1
      RETURNING *
      ;
    `,
      [orderId]
    )
      .then((response) => {
        res.json(response.rows[0]);
      })
      .catch((err) => res.json(err.message));
  });
  router

  return router;
};






