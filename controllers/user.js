const db = require('../db/connection');


exports.getDishes = (req, res) => {

    db.query(`SELECT * FROM dishes`)
      .then(data => {
        const name = data.rows;
        res.json({ name });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
}

exports.getDish = (req, res) => {

  const id = parseInt(req.params.id);
    db.query(`SELECT * FROM dishes WHERE id = $1`,[id])
      .then(data => {
        const customers = data.rows;
        res.json({ customers });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
      
};

exports.getCarts = (req, res) => {

  db.query(`SELECT * FROM carts`)
      .then(data => {
        const carts = data.rows;
        res.json({ carts });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
}

exports.getCart = (req, res) => {
  const id = parseInt(req.params.id);
  db.query(`SELECT * FROM cart_details WHERE id = $1`, [id])
    .then(data => {
      const cart = data.rows;
      res.json({ cart });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
}
exports.addItemsToCart = (req, res) => {
  const id = parseInt(req.params.id);
  db.query(`INSERT INTO cart_details (cart_id, dish_id, quantity)
    VALUES ($1, $2, $3);`, [id]).then(data => {
    const cart = data.rows;
    res.json({ cart });
  })
  .catch(err => {
    res.status(500).json({ error: err.message });
  });
}
exports.deletecart = (req, res) => {
  const id = parseInt(req.params.id);
    db.query(`DELETE  FROM carts WHERE id = $1 RETURNING *`, [id])
      .then(data => {
        const cart = data.rows;
        res.json({ cart });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  };

exports.getCheckout = (req, res) => {}

exports.getCheckoutSuccess = (req, res) => {}

exports.getCheckoutCancel = (req, res) => {}

exports.getOrders = (req, res) => {

  db.query(`SELECT * FROM order_details JOIN customers ON order_details.id=customer.id`)
      .then(data => {
        const placedOrders = data.rows;
        res.json({ placedOrders });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
}

exports.getOrder = (req, res) => {

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
}

exports.postCart = (req, res) => {
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
}

exports.postOrders = (req, res) => {
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
  };
}

