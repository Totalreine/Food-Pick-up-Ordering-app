/*
 * All routes for Orders are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    // check if logged in, otherwise redirect to login
    if (!req.session.customer_id) {
      res.redirect("/login");
      return;
    }
    // database query to get all orders
    db.query(`SELECT * FROM order_details JOIN customers ON order_details.id=customer.id`)
      .then(data => {
        const placedOrders = data.rows;
        res.json({ placedOrders });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/:customer_id", (req, res) => {
    // check if logged in, otherwise redirect to login
    if (!req.session.customer_id) {
      res.redirect("/login");
      return;
    }
    // database query to get time of order
    db.query(
      `SELECT *, to_char((select created_at)::timestamp, 'HH:MI:SSPM') AS start_time
        FROM orders WHERE customer_id = $1 AND finished_at IS NULL
        ORDER BY id DESC;`,
      [req.session.customer_id]
    )
      .then((data) => {
        // convert dishlist array to readable
        const orders = data.rows;
        const orderList = {};
        for (let order of orders) {
          const dishList = {};
          for (let dish of order.name) {
            switch (dish) {
            case 1:
              dishList.cherry_love === undefined
                ? (dishList.cherry_love = 1)
                : (dishList.cherry_love += 1);
              break;
            case 2:
              dishList.sweet_heart === undefined
                ? (dishList.sweet_heart = 1)
                : (dishList.sweet_heart += 1);
              break;
            case 3:
              dishList.chocolate === undefined
                ? (dishList.chocolate = 1)
                : (dishList.chocolate += 1);
              break;
              case 4:
              dishList.chocolate === undefined
                ? (dishList.chocolate = 1)
                : (dishList.chocolate += 1);
              break;
              case 5:
              dishList.red_velvet === undefined
                ? (dishList.red_velvet = 1)
                : (dishList.red_velvet += 1);
              break;
              case 6:
              dishList.coconut === undefined
                ? (dishList.coconut = 1)
                : (dishList.coconut += 1);
              break;
              case 7:
              dishList.chocamal === undefined
                ? (dishList.chocamal = 1)
                : (dishList.chocamal += 1);
              break;
              case 8:
              dishList.lemon === undefined
                ? (dishList.lemon = 1)
                : (dishList.lemon += 1);
              break;
              case 9:
              dishList.coffee === undefined
                ? (dishList.coffee = 1)
                : (dishList.coffee += 1);
              break;

            }
          }
          orderList[order.id] = dishList;
        }
        const user = req.session.customer_id;
        const templateVars = { user, orders, orderList };
        res.render("user_orders", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/", (req, res) => {
    const customer_id = req.session.customer_id || '';
    const processedOrder = req.body.cart;
    if (customer_id && processedOrder) {
      const cart = JSON.parse(processedOrder);
      let totalCost = 0;

      for (let item of cart) {
        let numItem = item.price * item.qty;
        totalCost += numItem;
      }
    const { customer_id, order_total_price } = req.body;

    // add a new order to the orders table
    db.query(
      `INSERT INTO orders (customer_id, order_total_price) VALUES ($1, $2);`,
      [customer_id, order_total_price]
    )
      .then(() => {
        res.json({ success: true });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
};
  }