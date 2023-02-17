-- Users table seeds here (Example)
INSERT INTO users (first_name , last_name , phone_number , email ,
  password , address , city , postal_code) VALUES (
   'Colton', 'Hughes', '(405) 486-4240', 'orci.adipiscing@google.com',
   '124323', 'P.O. Box 429, 6977 Consequat Ave', 'Coquitlam', 'VP3G 1JE');
INSERT INTO users (first_name , last_name , phone_number , email ,
  password , address , city , postal_code) VALUES (
   'Juan', 'Peres', '(405) 654-8445', 'oscing111@google.com',
   '0876ef', '43 fera Ave', 'Port Coquitlam', 'V3B 1H5');
INSERT INTO users (first_name , last_name , phone_number , email ,
  password , address , city , postal_code) VALUES (
   'Danny', 'Smith', '(405) 094-0482', 'dsmith@google.com',
   '432kjdfn', '432 histor Ave', 'Vancouver', 'V8P 4D9');

INSERT INTO restaurants (name, first_name , last_name , phone_number , email ,
  password , address , city , postal_code) VALUES ( 'The Cupcake Shop',
   'Melissa', 'Becker', '(604) 123-4567', 'melbeck@example.com',
   '1234', '4012  Nootka Street', 'Vancouver', 'V5M 3M5');

INSERT INTO dishes (name, description, price, food_category, vegan, gluten_free, picture_url, rating ) VALUES
( 'Cherry Love', 'Chocolate cake filled with cherry jam and topped with pink buttercream frosting and a cherry', '5.99', 'Flavour of the Month', 'false', 'false', '/images/CherryLoveCupcake.jpeg', '4'),
( 'Sweet Heart', 'Vanilla cake with pink vanilla buttercream frosting topped with sprinkles', '5.99', 'Flavour of the Month', 'false', 'false', '/images/SweetHeartCupcake.jpeg', '4.5'),
( 'Chocolate', 'Chocolate cake with chocolate buttercream frosting', '4.99', 'Classic', 'false', 'false', '/images/ChocolateCupcake.jpeg', '4.8'),
( 'Red Velvet', 'Red velvet cake topped with cream cheese frosting', '4.99', 'Classic', 'false', 'false', '/images/RedVelvetCupcake.jpeg', '5'),
( 'Coconut', 'Coconut cake with cream cheese frosting topped with coconut shavings', '5.99', 'Vegan', 'true', 'false', '/images/CoconutCupcake.jpeg', '4.5'),
( 'Chocamel', 'Chocolate cake filled with a caramel centre and topped with a caramel buttercream and caramel sauce', '5.99', 'Vegan', 'true', 'false', '/images/ChocamelCupcake.jpeg', '5'),
( 'Coffee', 'Coffee cake topped with mocha buttercream frosting and a chocolate covered coffee bean', '6.99', 'gluten_free', 'false', 'true', '/images/CoffeeCupcake.jpeg', '4.5'),
( 'Lemon', 'Lemon cupcake with cream cheese frosting and lemon zest on top', '6.99', 'gluten_free', 'false', 'true', '/images/LemonCupcake.jpeg', '5');

