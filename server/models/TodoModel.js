import logger from "../config/logger/main.js";

export class TodoModel{
    constructor(db) {
        this.db = db;
    }
    async AddDo(title,user_id,deadline) {
        const sql = `INSERT INTO todo (title,user_id,deadline) VALUES(?,?,?)`;
        try {
            await this.db.Query(sql, [title,user_id,deadline])
            logger.info("Завдання додано")
            return true;
        } catch (error) {
            logger.error(error);
            return false;
        }
    }
    async getAll() {
        try {
              const sql = "SELECT * FROM todo"
            const result = await this.db.Query(sql);
            return result;
        } catch (error) {
             logger.error(error);
            return null;
        }
    }
    async getAllCompleted(id) {
        try {
              const sql = "SELECT * FROM todo WHERE completed = 1 AND user_id = ?";
        const rows =  await this.db.Query(sql,[id]);
            return rows;
        } catch (error) {
             logger.error(error);
            return null;
        }
    }
    async updateItem(id, completed) {
       try {
         const sql = "UPDATE todo SET completed = ? WHERE id = ?";
         await this.db.Query(sql, [completed,id]);
           logger.info("Завдання оновлено")
           return true;
       } catch (error) {
           logger.error(error);
            return null;
       }
       
   }
   async deleteOne(id) {
       const sql = "DELETE FROM todo WHERE id = ?";
       try {
        await this.db.Query(sql, [id]);
           logger.info("Завдання видалено")
           return true;
       } catch (error) {
           logger.error("Проблеми при запиті до бази даних", err)
           return false;
       }
       
   }
  async updateTitle(id, title) {
      const sql = "UPDATE todo SET title = ? WHERE id = ?";
      try {
        logger.info("SQL DATA:", id, title);
       await this.db.Query(sql,[title,id])
          logger.info("Назву оновлено");
           return true;
      } catch (error) {
         logger.error("Проблеми при запиті до бази даних", err)
           return false;
      }
   }
   async DeleteAll(id, IdArrays) {
       try {
        const placeholders = IdArrays.map(() => '?').join(',');
       const sql = `DELETE FROM todo WHERE user_id = ? AND id IN (${placeholders})`
       const params = [id, ...IdArrays];
       await this.db.Query(sql,params)
           logger.info("Видалено всі записи")
           return true;
       } catch (error) {
        logger.error("Проблеми при запиті до бази даних", err)
           return false;
       }
   }
   async CompletedAll(id, IdArrays,completed) {
       const placeholders = IdArrays.map(() => '?').join(',');
       const sql = `UPDATE todo SET completed = ? WHERE user_id = ? AND id IN (${placeholders})`
       const params = [completed, id, ...IdArrays];
       try {
           await this.db.Query(sql, params) 
           logger.info("Oновлено всі записи")
           return true;
       }
       catch (err) {
           logger.error("Проблеми при запиті до бази даних", err)
           return false;
       }
    }
    async GetById(id, IdArrays) {
       try {
        const placeholders = IdArrays.map(() => '?').join(',');
        const sql = `SELECT * FROM todo WHERE user_id = ? AND id IN (${placeholders})`;
        const params = [id, ...IdArrays];
        const result = this.db.Query(sql, params);
           return result;
       } catch (error) {
         logger.error("Проблеми при запиті до бази даних", error)
           return null;
       }
    }
}