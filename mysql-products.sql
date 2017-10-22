drop table IF EXISTS categories;
create table categories (
  id integer not null auto_increment primary key,
  name varchar(40)
);

drop table IF EXISTS products;
create table products (
  id integer not null auto_increment primary key,
  name varchar(80),
  category_id integer,
  description text,
  price_cents integer
);

insert into categories
  (id, name)
values
  (1, 'Clothing'),
  (2, 'Posters'),
  (3, 'Audio');

insert into products
  (id, name, category_id, description, price_cents)
values
  (1, 'Limited Edition T-shirt', 1, 'V-neck t-shirt with a panda on the back', 2495),
  (2, 'Hoodie', 1, 'Red hoodie with name in light blue', 5995),
  (3, 'US Tour Poster', 2, 'US Tour Poster with dates of the shows', 1495),
  (4, 'Live Show CD', 3, 'Recording of our show in Denver', 1295);