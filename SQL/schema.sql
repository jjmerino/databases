CREATE DATABASE IF NOT EXISTS chat;

USE chat;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS rooms;
DROP TABLE IF EXISTS users;
CREATE TABLE messages (
  /* Describe your table here.*/
  id int(11) NOT NULL auto_increment,
  message varchar(254) NOT NULL,
  user_id int(11) NOT NULL,
  roomname VARCHAR(254) NOT NULL,
  PRIMARY KEY (id)
);


CREATE TABLE users (
  id int(11) NOT NULL auto_increment,
  name varchar(254) NOT NULL,
  username varchar(254) NOT NULL,
  PRIMARY KEY (id)
);

ALTER TABLE messages ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id);




/*  Execute this file from the command line by typing:
 *    mysql < schema.sql
 *  to create the database and the tables.*/




