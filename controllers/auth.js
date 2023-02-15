const { generateEmptyUser } = require('../lib/helpers');
const db = require('../db/connection');
const router = require('../routes/users-api');

exports.getLogin = (req, res) => {
    
        const userId = req.session.userId || "";
        if (userId) {
          res.redirect("/");
        } else {
          const user = generateEmptyUser();
          const { statusCode } = 200;
          const errorMessage = "";
          const params = { user, statusCode, errorMessage };
          res.render("login", params);
        }
      
}

exports.postLogin = (req, res) => {
  const userId = req.session.userId || "";

    if (userId) {
      res.redirect("/");
    }

    const formEmail = req.body.email;
    const formPassword = req.body.password;

    if (!formEmail || !formPassword) {
      res.status(403);
      const user = generateEmptyUser();
      const errorMessage = "Please enter an email and a password";
      const params = { user, errorMessage };

      res.render("login", params);
    } else {
      const getPasswordQuery = {
        text: `SELECT id, password FROM customers WHERE email = $1`,
        values: [formEmail]
      };

      db.query(getPasswordQuery)
        .then(data => {
          const userInfo = data.rows[0];

          if (bcrypt.compareSync(formPassword, userInfo.password)) {
            req.session.userId = userInfo.id;
            if (userInfo.admin) {
              res.redirect(`/dishes/${userInfo.id}/orders`);
            } else {
              res.redirect("/");
            }
          } else {
            res.status(403);
            const user = generateEmptyUser();
            const errorMessage = "Password and email doesn't match";
            const params = { user, errorMessage };

            res.render("login", params);
          }
        })
        .catch(err => {
          res.status(500).json({ error: err.message });
        });
    } 
    return router;
  };

exports.getSignup = (req, res) => {
  const userId = req.session.userId || '';
    if (userId) {
      res.redirect('/');
    } else {
      const user = generateEmptyUser();
      const {statusCode} = 200;
      const errorMessage = '';
      const params = {user, statusCode, errorMessage};
      res.render('signup', params);
    }
}

exports.postSignup = (req, res) => {
  const userId = req.session.userId || '';

    if (userId) {
      res.redirect('/');
    }

    const { first_name, last_name, phone_number, email, password, city, address, postal_code} = req.body;

   

    if (!first_name || !last_name || !phone_number || !email || !password || !city || !address || !postal_code) {
      const user = generateEmptyUser();
      const {statusCode} = 400;
      const errorMessage = 'all fields must have a value';
      const params = {user, statusCode, errorMessage};
      res.render('signup', params);
    }

    const getUserIdQuery = {
      text: `SELECT id FROM customers WHERE email = $1`,
      values: [email],
    };

    db.query(getUserIdQuery)
      .then(data => {
        const existUser = data.rows[0];

        if (!existUser) {

          const insertUserQuery = {
            text: `INSERT INTO customers (first_name, last_name, email, phone_number, password, city, address, postal_code)
              VALUES ($1, $2, $3, $4, $5, $6, $7)
              RETURNING id;`,
            values: [first_name, last_name, email, phone_number, password, city, address, postal_code],
          };

          db.query(insertUserQuery)
            .then(userInfo => {
              const newUserId = userInfo.rows[0].id;

              req.session.userId = newUserId;
              res.redirect('/'); // Could redirect to user page instead!!!
            })
            .catch(err => {
              res
                .status(500)
                .json({ error: err.message });
            });
        } else {
          const user = generateEmptyUser();
          const {statusCode} = 400;
          const errorMessage = 'you seem to already exit in our systems';
          const params = {user, statusCode, errorMessage};
          res.render('signup', params);
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
      return router;
  };

exports.postLogout = (req, res) => {
  req.session = null;
    res.redirect('/');
  return router;
};


