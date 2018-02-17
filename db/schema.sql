SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

DROP DATABASE IF EXISTS resCallDB;

CREATE DATABASE resCallDB;

USE resCallDB;

CREATE TABLE scenarios (
  id INT AUTO_INCREMENT NOT NULL,
  body_part VARCHAR(100),
  body_part_specific VARCHAR(200),
  plan TEXT,
  createdAt TIMESTAMP NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE patients (
 id INT AUTO_INCREMENT NOT NULL,
  patient_name VARCHAR(100),
  MRN VARCHAR(100),
  HPI TEXT,
  injury VARCHAR(200),
  plan TEXT,
  createdAt TIMESTAMP NOT NULL,
  PRIMARY KEY (id)
);