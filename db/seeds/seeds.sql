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
  password , address , city , postal_code) VALUES ( 'chinese palace',
   'Peter', 'Matts', '(604) 534-4232', 'pmst@google.com', 
   '124323', '32 lomas Ave', 'Burnaby', 'V0E 1L5');
INSERT INTO restaurants (name, first_name , last_name , phone_number , email ,
  password , address , city , postal_code) VALUES ( 'korean grill',
   'Sara', 'Polst', '(604) 111-9559', 'sara1432@google.com', 
   '0876ef', '85 crest Ave', 'Port Moody', 'V3B 2S5');
INSERT INTO restaurants (name, first_name , last_name , phone_number , email ,
  password , address , city , postal_code) VALUES ( 'sushi place',
   'Rod', 'Kiles', '(604) 947-2380', 'rod54354@google.com', 
   '432kjdfn', '89 homers Ave', 'Northvan', 'V5C 1A4');

INSERT INTO dishes (name, description, price, food_category, vegan, gluten_free, 
picture_url, rating ) VALUES ( 'soup', 'delicious vegetables soup', '20000', 'vegetarian', 'true', 'false', 'imageurl', '3');
INSERT INTO dishes (name, description, price, food_category, vegan, gluten_free, 
picture_url, rating ) VALUES ('steak', 'steak very tender and juicy', '15000', 'grilled', 'false', 'false','imageurl2', '5' );
INSERT INTO dishes (name, description, price, food_category, vegan, gluten_free, 
picture_url, rating ) VALUES ('sandwich', 'tuna sandwich with salad', '50000', 'fastFood', 'false', 'true', 'imageurl3', '4' );

