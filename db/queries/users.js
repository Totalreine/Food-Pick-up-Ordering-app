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

const created_at = (id, bool, time) => {
  const sql = 'UPDATE orders SET created_at = $2, time_est = $3 WHERE id = $1;';
  const args = [id, bool, time];
  client.query(sql, args);
};

const finished_at = (id, bool) => {
  const sql = 'UPDATE orders SET finished_at = $2 WHERE id = $1;';
  const args = [id, bool];
  client.query(sql, args);
};


module.exports = { getUsers, checkoutItems, created_at, finished_at};
