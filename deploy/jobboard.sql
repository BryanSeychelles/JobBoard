CREATE DATABASE IF NOT EXISTS JobBoard;
USE JobBoard;
CREATE TABLE IF NOT EXISTS Offers (
       id INT AUTO_INCREMENT,
       companyId INT NOT NULL,
       title VARCHAR(256) NOT NULL,
       description LONGTEXT NOT NULL,
       type VARCHAR(16) NOT NULL,
       length VARCHAR(16),
       country VARCHAR(256) NOT NULL,
       city VARCHAR(256),
       updatedAt DATETIME,
       salary VARCHAR(32),
       PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS Companies (
       id INT AUTO_INCREMENT,
       name VARCHAR(256) NOT NULL,
       logoURL VARCHAR(256),
       description LONGTEXT,
       creationYear YEAR,
       numberEmployees INT,
       PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS People (
       id INT AUTO_INCREMENT,
       firstName VARCHAR(64) NOT NULL,
       lastName VARCHAR(64) NOT NULL,
       pictureURL VARCHAR(256),
       phone VARCHAR(16),
       resumeURL VARCHAR(256),
       letterURL VARCHAR(256),
       filters JSON,
       description LONGTEXT,
       PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS Applications (
       id INT AUTO_INCREMENT,
       offerId INT NOT NULL,
       applicantId INT NOT NULL,
       appliedAt DATETIME NOT NULL,
       PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS Users (
       id INT AUTO_INCREMENT,
       typeName VARCHAR(16),
       typeId INT,
       email VARCHAR(128) NOT NULL,
       password VARCHAR(256) NOT NULL,
       adminFlag BOOL,
       PRIMARY KEY (id)
);
