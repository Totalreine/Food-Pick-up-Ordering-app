const express = require("express");
const router = express.Router();
const db = require("../db/connection");
// const orderController =require('../controllers/orders')

router.get("/order/:id", (req, res) => {
  const id = parseInt(req.params.id);
  db.query(`SELECT * FROM order_details WHERE id = $1`, [id])
    .then((data) => {
      const order = data.rows;
      res.json({ order });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
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
  res.render('order')
})
module.exports = router;
