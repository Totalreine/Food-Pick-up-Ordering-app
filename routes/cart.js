const express = require('express');
const router  = express.Router();


module.exports = db => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM carts`)
      .then(data => {
        const carts = data.rows;
        res.json({ carts });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  //Get specific cart by id
  router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    db.query(`SELECT * FROM carts WHERE id = $1`, [id])
      .then(data => {
        const cart = data.rows;
        res.json({ cart });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  //Post to cart
  router.post("/", (req, res) => {
    const { cart_total_price, customer_id, created_at} = req.body;
    console.log(req.body);
    db.query(
      `INSERT INTO carts (customer_id, cart_total_price, created_at ) VALUES ($1,$2,$3) RETURNING *`,
      [cart_total_price, customer_id, created_at]
    )
      .then(data => {
        const carts = data;
        res.json({ carts });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  //Delete specific cart by id
  router.delete("/delete/:id", (req, res) => {
    const id = parseInt(req.params.id);
    db.query(`DELETE  FROM carts WHERE id = $1 RETURNING *`, [id])
      .then(data => {
        const cart = data.rows;
        res.json({ cart });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};