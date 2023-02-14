const db = require('../db/connection');

exports.getDishes = (req, res) => {}

exports.getDish = (req, res) => {}

exports.getAddDish = (req, res) => {}

exports.getEditDish = (req, res) => {}

exports.postAddDish = (req, res) => {}

exports.postEditDish = (req, res) => {}

exports.deleteDish = (req, res) => {}



module.exports = (db) => {
    router.get("/dishes", (req, res) => {
      db.query(`SELECT * FROM dishes`)
        .then(data => {
          const menuItems = data.rows;
          res.json({ menuItems });
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    });
  
    //Get specific user by id
    router.get("/dishes/:id", (req, res) => {
      const id = parseInt(req.params.id);
      db.query(`SELECT * FROM dishes WHERE id = $1`,[id])
        .then(data => {
          const users = data.rows;
          res.json({ users });
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    });
  
  
  
  
    return router;
  };