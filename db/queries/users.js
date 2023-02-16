const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const checkoutItems = (orderId, cb) => {

  client.query(`SELECT * from order_details
  JOIN orders ON order_id = orders.id
  JOIN dishs on dish.id = dish_id
  WHERE orders.id = ${orderId};`)
    .then(data => {

      cb(null, data.rows);
    })
    .catch(err => cb(err));
};

module.exports = { getUsers, checkoutItems};
