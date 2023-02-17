const express = require("express");
const router = express.Router();
const db = require("../db/connection");
// const orderController =require('../controllers/orders')
const getOrdersQuery = require("../lib/helpers")

router.get("/order", (req, res) => {
  const userId = req.session.userId || "";

  if (userId) {
    getUserInfo(userId, db)
      .then(userInfo => {
        if (!userInfo.admin) {
          const getOrdersQuery = {
            text: `SELECT * FROM order_details WHERE user_id = $1`,
            values: [userId]
          };

          db.query(getOrdersQuery)
            .then(data => {
              const currentOrder = data.rows;

              const structuredOrders = refactorOrder(currentOrder);

              const user = userInfo;
              const params = { user, structuredOrders };

              console.log(structuredOrders);
              res.render("orders", params);
            })
            .catch(err => {
              res.status(500).json({ error: err.message });
            });
        } else {
          const user = userInfo;
          const params = { user };
          res.render("404", params);
        }
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  } else {
    res.redirect("/");
  }
});

 router.post('/order', (req, res) => {
  const { user_id, order_total_price } = req.body;
  // add a new order to the orders table
  db.query(
    `INSERT INTO orders (user_id,order_total_price) VALUES ($1, $2 ARRAY [${order_total_price}]);`,
    [user_id]
  )
    .then(() => {
      res.json({ success: true });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
 })

router.get("/order", (req, res) => {
  res.render('order', {placedOrders: []});
})
module.exports = router;
