import dotenv from "dotenv"
import mysql2 from "mysql2/promise"
import logger from "../config/logger/main.js";
dotenv.config();
export  class MySQl{
   constructor() {
        this.pool = mysql2.createPool({
            host: process.env.DB_HOST || "localhost",
            user: process.env.DB_USER || "root",
            password: process.env.DB_PASSWORD || "",
            database: process.env.DB_NAME || "todolist",
            port: process.env.DB_PORT || 3306,
            connectionLimit: 10,
            waitForConnections: true,
            queueLimit: 0,
            enableKeepAlive: true,
            keepAliveInitialDelay: 0
        });
        this.initialize();
    }
    
    async initialize() {
        try {
            await this.connection();
        } catch (error) {
            logger.error('Помилка ініціалізації бази даних:', {
                error: error.message,
                stack: error.stack
            });
            process.exit(1);
        }
    }
    
    async connection() {
        try {
            const connection = await this.pool.getConnection();
            logger.info('✅ MySQL підключено успішно', {
                host: process.env.DB_HOST,
                database: process.env.DB_NAME,
                port: process.env.DB_PORT
            });
            connection.release();
            return true;
        } catch (error) {
            logger.error('❌ Помилка підключення до MySQL:', {
                error: error.message,
                code: error.code,
                errno: error.errno
                
            });
            this.CreateDataBase();
            this.CreateTable();
            this.CreateUserTable()
            throw error; 
        }
    }
    async Query(sql,params) {
        const [rows] = await this.pool.execute(sql, params);
        return rows;
    }
    async CreateDataBase() {
            const sql = `CREATE DATABASE IF NOT EXISTS ? 
           CHARACTER SET utf8mb4
           COLLATE utf8mb4_unicode_ci`
        await Query(sql, [process.env.DB_NAME])
        logger.info("✅ База данних створенна")
    }
   async CreateTable() {
        const sql = `CREATE TABLE IF NOT EXISTS todo (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT,
        title VARCHAR(255),
        completed BOOLEAN DEFAULT FALSE
    )
        `
        await Query(sql)
        logger.info("Таблицю todo створено")
    }
    async CreateUserTable() {
        const sql = `CREATE TABLE IF NOT EXISTS user (
        id INT PRIMARY KEY AUTO_INCREMENT,
        userName VARCHAR(255),
        login VARCHAR(255),
        password VARCHAR(255)
    )
        `
        await Query(sql)
        logger.info("Таблицю user створено")
    }

}