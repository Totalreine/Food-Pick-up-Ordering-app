
const { dirname } = require('path');
const db = require('../db/connection');
const { checkoutItems, created_at, finished_at } = require('../db/queries/users');
const { timeConfirmed, orderCompleted } = require('../routes/twilo');

exports.getDishes = (req, res) => {

  db.query(`SELECT * FROM dishes`)
  .then(data => {
    const dishes = data.rows;
    res.render('dishes', { dishes });
    res.send(dishes)
  })
  .catch(err => {
    console.log(err)
    /*res
      .status(500)
      .json({ error: err.message }); */
  });
}

exports.getDish = (req, res) => {
  const id = req.params.dishId

    db.query(`SELECT * FROM dishes WHERE id = $1`,[id])
      .then(data => {
        const dish = data.rows[0].name;

        res.json({ dish });
        res.send(dish)
      })
      .catch(err => {
        console.log(err)
      /*  res
          .status(500)
          .json({ error: err.message }); */
      });
}

exports.getAddDish = (req, res) => {
  res.render("addDishtest")
}

exports.getRestConfirm = ('/restaurant_confirm/:id', (req, res) => {
  let order_id = req.params.id;
  let totals = { subtotal: 0, tax: 0, total: 0 };
  checkoutItems(order_id, (err, checkoutStuff) => {
    if (err) {
      return res.render('error', { err });
    }
    let subtotal = 0;
    for (let i = 0; i < checkoutStuff.length; i++) {
      subtotal += (checkoutStuff[i].price * checkoutStuff[i].quantity);
    }
    totals.subtotal = (Math.round(subtotal * 100) / 100).toFixed(2);
    totals.tax = (Math.round(subtotal * 0.12 * 100) / 100).toFixed(2);
    totals.total = (Math.round((subtotal + subtotal * 0.12) * 100) / 100).toFixed(2);

    res.render('restaurant', { checkoutStuff, order_id, totals});
  });
});

exports.postRestConfirm = ('/confirm_order',(req,res) => {
  timeConfirmed(req.body.time_est);
  created_at(req.body.order_id, true, req.body.time_est);
  res.send(req.body.time_est)
});

exports.postRestCompleted =('/completed', (req, res) => {
  finished_at(req.body.order_id, true);
  orderCompleted();
  res.send(req.body.order_id)
});


exports.getEditDish = (req, res) => {
  const id = parseInt(req.params.id);
    db.query(`UPDATE dishes
    SET name = $1, description = $2, food_category = $3, vegan = $4, gluten_free = $, picture_url = $6,
    price = $7, rating = $8,
    WHERE id = $9;`,[id])
      .then(data => {
        const dish = data.rows[0];

        res.render("editDishtest", {dish})
      })
      .catch(err => {
        console.log(err)
        /*es
          .status(500)
          .json({ error: err.message }); */
      });

}

exports.postAddDish = (req, res) => {
  const {name, description, price, food_category, vegan, gluten_free, picture_url, rating} = req.body;

    db.query(
             `INSERT INTO dishes ( name, description, price,
              food_category, vegan, gluten_free, picture_url, rating )
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [name, description, price, food_category, vegan, gluten_free, picture_url, rating]
    )
      .then(data => {
        const dish = data.rows[0];
        //res.json({ dish });
        const id = dish.id
        res.redirect(`/dishes/${id}`)
      })
      .catch(err => {
        res.status(500).json({ ERROR: err.message });
      });
}

exports.postEditDish = (req, res) => {

  const {id, name, description, price, food_category, vegan, gluten_free, picture_url, rating} = req.body;

       db.query(
          `UPDATE dishes SET name = $1, description = $2, price = $3, food_category = $4, vegan = $5, gluten_free = $6, picture_url = $7, rating = $8 WHERE id = $9 RETURNING *`,
         [name, description, price, food_category, vegan, gluten_free, picture_url, rating, id]
    )
      .then(data => {
        const dish = data.rows[0];
        res.json({ data });
        res.send(dish)
      })
      .catch(err => {
        console.log(err)
        //res.status(500).json({ error: err.message });
      });
}

exports.deleteDish = (req, res) => {
    const id = req.body.id;

    db.query(
      `DELETE FROM dishes WHERE id = $1 RETURNING *`,
      [id]
    )
      .then(data => {
          const deletedDish = data.rows[0];
          res.redirect("/dishes")
      })
      .catch(err => {
        console.log(err)
        //res.status(500).json({ error: err.message });
      });
  };



