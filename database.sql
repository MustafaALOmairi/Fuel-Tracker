CREATE DATABASE IF NOT EXISTS fuel_tracker;
USE fuel_tracker;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100),
  username VARCHAR(50) UNIQUE,
  password_hash VARCHAR(255),
  role ENUM('admin','user') DEFAULT 'user'
);

CREATE TABLE equipment (
  id INT AUTO_INCREMENT PRIMARY KEY,
  eq_code VARCHAR(50) UNIQUE,
  eq_name VARCHAR(100),
  tank_capacity DECIMAL(10,2)
);

CREATE TABLE fuel_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  equipment_id INT,
  log_date DATE,
  shift ENUM('Day','Night'),
  liters DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (equipment_id) REFERENCES equipment(id)
);
