import logger from "../config/logger/main.js";

export class UserModel{
    constructor(db) {
        this.db = db;
    }
    async AddUser(userName, email, password) {
        try {
            const sql = `INSERT INTO user (userName,login,password) VALUES(?,?,?)`
            await this.db.Query(sql, [userName, email, password])
            logger.info("Користувача додано")
              return true;
        } catch (error) {
            logger.error(error);
            return false;
        }
      
    }
    async FindUser(email) {
        try {
             const sql = `SELECT * FROM user WHERE login = ?`;
            const result = await this.db.Query(sql, [email]);
            console.log("resa",result)
            return result[0];
        } catch (error) {
            logger.info(error);
            return null;
        }
    }
    async UpdateEmail(id,NewEmail) {
        const sql = `UPDATE user SET login = ? WHERE id = ?`;
        const params = [NewEmail, id];
        try {   this.db.Query(sql, params);   return true; }
        catch (err) {
            logger.info(err);
            return false;
            
        }
    }
    async UpdateUserName(id,NewUserName) {
        const sql = `UPDATE user SET userName = ? WHERE id = ?`;
        const params = [NewUserName,id];
        try {   await this.db.Query(sql, params);   return true; }
        catch (err) {
            logger.info(err);
            return false;
            
        }
    }
    async UpdatePassword(id,NewPassword) {
        const sql = `UPDATE user SET password = ? WHERE id = ?`;
        const params = [NewPassword,id];
        try {   await this.db.Query(sql, params);   return true; }
        catch (err) {
            logger.info(err);
            return false;
            
        }
    }
    async FindUserById(id) {
        try {
            const sql = `SELECT * FROM user WHERE id = ?`;
        const result = await this.db.Query(sql, [id]);
            return result[0];
        } catch (error) {
            logger.info(err);
            return null;
        }
    }
    async deleteUser(id) {
         const sql = "DELETE FROM user WHERE id = ?";
       try {
           await this.db.Query(sql, [id]);
           logger.info("Користувача видалено видалено");
           return true;
       } catch (error) {
           logger.error(error);
           return false;
       } 
        
    }
}