
const db = require('../db/connection');

exports.getOrder = (req, res) => {
  router.get("/", (req, res) => {
    db.query(  db.query(`SELECT * FROM order_details JOIN customers ON order_details.id=customer.id`)
    )
      .then(data => {
        const placedOrders = data.rows;
        res.json({ placedOrders });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
    })
  };

// exports.getOrders = (req, res) => {
// const id = parseInt(req.params.id);
//     db.query(`SELECT * FROM order_details WHERE id = $1`, [id])
//       .then(data => {
//         const order = data.rows;
//         res.json({ order });
//       })
//       .catch(err => {
//         res.status(500).json({ error: err.message });
//       });
//     };

exports.postOrders = (req, res) => {
 
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
};
