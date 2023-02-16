
const { dirname } = require('path');
const db = require('../db/connection');

exports.getDishes = (req, res) => {

  db.query(`SELECT * FROM dishes`)
  .then(data => {
    const dishes = data.rows;
    res.json({ dishes });
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

exports.getEditDish = (req, res) => {
  const id = req.params.dishId
    db.query(`SELECT * FROM dishes WHERE id = $1`,[id])
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

  
  
  
  