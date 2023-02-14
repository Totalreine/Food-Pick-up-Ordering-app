// load .env data into process.env
require('dotenv').config();

/*
* Helper functions
*/

// Create an empty user objects will all need properties.
const generateEmptyUser = () => {
  const emptyUser = {id: '', first_name: '',last_name: '', phone_number: '', email: '', admin: ''};
  return emptyUser;
};

// Generate a price list (id, price) FROM a DB Query
const getPriceList = function(db) {

  let priceListQuery = `SELECT id, price FROM dishes`;

  return db.query(priceListQuery)
    .then(data => data.rows)
    .catch(err => err);
};

// Takes a userId and returns the: id, names, phone_number, email and admin status, or an empty object.
const getUserInfo = function(userId, db) {
  return new Promise((resolve, reject) => {
    if (userId) {

      const userInfoQuery = {
        text: `SELECT id, first_name, last_name, phone_number, email, picture_url FROM users WHERE id = $1`,
        values: [userId],
      };

      return db.query(userInfoQuery)
        .then(data => resolve(data.rows[0]))
        .catch(err => reject(err));
    } else {
      const user = generateEmptyUser();
      return resolve(user);
    }
  });
};



  


module.exports = {
  
  generateEmptyUser,
  getPhoneNumber,
  getPriceList,
  getUserInfo,
};