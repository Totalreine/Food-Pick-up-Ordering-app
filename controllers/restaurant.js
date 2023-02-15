const db = require('../db/connection');

exports.getRestLogin = (req, res) => {

    // check for restuarents email, otherwise redirect to login
    if (!req.session.user_id || req.session.user_id !== 1) {
      res.redirect("/login");
      return;
    }

    // display restuarent page
    const user = req.session.user_id;
    const templateVars = { user };
    res.render("restuarent", templateVars);
  };

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
}

exports.getAddDish = (req, res) => {
  const id = parseInt(req.params.id);
    db.query(`INSERT INTO dishes (restaurant_id, name, description, price, food_category, vegan, gluten_free, picture_url, rating)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9
    `,[id])
      .then(data => {
        const customers = data.rows;
        res.json({ customers });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
        });
}

exports.getEditDish = (req, res) => {
  const id = parseInt(req.params.id);
    db.query(`UPDATE dishes
    SET name = $1, description = $2, food_category = $3, vegan = $4, gluten_free = $, picture_url = $6, 
    price = $7, rating = $8, 
    WHERE id = $9;`,[id])
      .then(data => {
        const customers = data.rows;
        res.json({ customers });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
        });

}

exports.postAddDish = (req, res) => {
  const { restaurant_id, name, description, price, food_category, vegan, gluten_free, picture_url, rating} = req.body;
    console.log(req.body);
    db.query(
             `INSERT INTO dishes (restaurant_id, name, description, price, food_category, vegan, gluten_free, picture_url, rating ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [restaurant_id, name, description, price, food_category, vegan, gluten_free, picture_url, rating]
    )
      .then(data => {
        const carts = data;
        res.json({ carts });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
}

exports.postEditDish = (req, res) => {

  const { restaurant_id, name, description, price, food_category, vegan, gluten_free, picture_url, rating} = req.body;
    console.log(req.body);
       db.query(
          `UPDATE dishes SET restaurant_id = $1, name = $2, description = $3, price = $4, food_category = $5, vegan = $6, gluten_free = $7, picture_url = $8, rating = $9 WHERE id = $10 RETURNING *`,
         [ restaurant_id, name, description, price, food_category, vegan, gluten_free, picture_url, rating]
    )
      .then(data => {
        const carts = data;
        res.json({ carts });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
}

exports.deleteDish = (req, res) => {

    const { id } = req.params;
    console.log(req.params);
    db.query(
      `DELETE FROM dishes WHERE id = $1 RETURNING *`,
      [id]
    )
      .then(data => {
        if (data.rowCount > 0) {
          const deletedDish = data.rows[0];
          res.json({ message: `Dish ${deletedDish.name} has been deleted.` });
        } else {
          res.status(404).json({ error: `Dish with ID ${id} not found.` });
        }
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  };

  
  
  
  
  