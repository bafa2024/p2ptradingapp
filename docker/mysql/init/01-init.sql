-- Initialize P2P Platform Database
-- This script runs when the MySQL container starts for the first time

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS p2p_platform CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Use the database
USE p2p_platform;

-- Create user if it doesn't exist
CREATE USER IF NOT EXISTS 'p2p_user'@'%' IDENTIFIED BY 'p2p_password';

-- Grant privileges to the user
GRANT ALL PRIVILEGES ON p2p_platform.* TO 'p2p_user'@'%';

-- Grant additional privileges for development
GRANT CREATE, DROP, ALTER, INDEX, CREATE TEMPORARY TABLES, LOCK TABLES, EXECUTE, CREATE VIEW, SHOW VIEW, CREATE ROUTINE, ALTER ROUTINE, EVENT, TRIGGER ON p2p_platform.* TO 'p2p_user'@'%';

-- Flush privileges
FLUSH PRIVILEGES;

-- Create basic tables structure (these will be replaced by Sequelize migrations)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(20),
    is_email_verified BOOLEAN DEFAULT FALSE,
    is_phone_verified BOOLEAN DEFAULT FALSE,
    kyc_status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    status ENUM('active', 'suspended', 'banned') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS wallets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    currency VARCHAR(10) NOT NULL,
    balance DECIMAL(20,8) DEFAULT 0.00000000,
    locked_balance DECIMAL(20,8) DEFAULT 0.00000000,
    address VARCHAR(255),
    status ENUM('active', 'suspended') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_currency (user_id, currency)
);

CREATE TABLE IF NOT EXISTS trades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    seller_id INT NOT NULL,
    buyer_id INT,
    currency VARCHAR(10) NOT NULL,
    amount DECIMAL(20,8) NOT NULL,
    price_per_unit DECIMAL(20,8) NOT NULL,
    total_price DECIMAL(20,8) NOT NULL,
    status ENUM('pending', 'active', 'completed', 'cancelled', 'disputed') DEFAULT 'pending',
    payment_method VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (seller_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (buyer_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Insert default admin user
INSERT IGNORE INTO users (email, password_hash, first_name, last_name, is_email_verified, kyc_status, status) 
VALUES ('admin@p2p-platform.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/vHhHqKq', 'Admin', 'User', TRUE, 'approved', 'active');

-- Insert default admin wallet
INSERT IGNORE INTO wallets (user_id, currency, balance, address) 
VALUES (1, 'USDT', 10000.00000000, 'admin-wallet-address');

-- Show created tables
SHOW TABLES;

-- Show user privileges
SHOW GRANTS FOR 'p2p_user'@'%';


