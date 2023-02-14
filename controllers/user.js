const db = require('../db/connection');

exports.getDishes = (req, res) => {}

exports.getDish = (req, res) => {}

exports.getCart = (req, res) => {}

exports.getCheckout = (req, res) => {}

exports.getCheckoutSuccess = (req, res) => {}

exports.getCheckoutCancel = (req, res) => {}

exports.getOrders = (req, res) => {}

exports.getOrder = (req, res) => {}

exports.postCart = (req, res) => {}

exports.postDeleteDish = (req, res) => {}



    exports.getDishes = ("/", (req, res) => {
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
    exports.getDish = ("/:id", (req, res) => {
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
      const { ID, Menu_items_id, Customer_id } = req.body;
      console.log(req.body);
      db.query(
        `INSERT INTO carts (id, Menu_items_id, Customer_id ) VALUES ($1,$2,$3) RETURNING *`,
        [ID, Menu_items_id, Customer_id]
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
  

  