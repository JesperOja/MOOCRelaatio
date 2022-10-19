CREATE TABLE blogs (id SERIAL PRIMARY KEY, author TEXT, url TEXT NOT NULL, title TEXT NOT NULL, likes INTEGER);
insert into blogs( author, title, url, likes) values ('Jepsu', 'First Blog', 'jepsu.com', 0);
insert into blogs( author, title, url, likes) values ('Justus', 'Awesome Blog', 'justus.com', 0);