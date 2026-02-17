
import logger from "../config/logger/main.js";
import * as todoService from "../services/todo.service.js"
export const AddDo = async (req, res) => {
    try {
        const { title, completed = false , deadline } = req.body;
        const userId = req.user?.id;
        const data = await todoService.AddTodo(userId, title, completed, deadline);
        if (data === 400) res.status(data).json({ error: "невдалось додати завдання" })
        res.status(200).json({
            ...data
        })
    } catch (error) {
         logger.error(error);
         res.status(500).json({ error: "Невдалось виконати запит" });
    }
}
export const getTodoByUser = async (req, res) => {
    try {
        const id = req.user.id;
        const data = await todoService.getTodos(id);
        if (data == null) return res.json({ data });
        if (data === 400) res.status(data).json({ error: "невдалось отримати данні про завдання" })
        res.status(200).json({
            filterItems: data
        })
    } catch (error) {
        logger.error(error);
         res.status(500).json({ error: "Невдалось виконати запит" });
    }
}
export const updateItem = async (req, res) => {
   try {
        const { id, completed } = req.body;
    const data = await todoService.updateItemByCompleted(id, completed);
    if (data === 400) res.status(data).json({ error: "Невдалось оновити завдання" });
    res.status(200).json({
        message:"Оновлено успішно"
    })
   } catch (error) {
    logger.error(error);
         res.status(500).json({ error: "Невдалось виконати запит" });
   }
}
export const deleteOneItem = async (req, res) => {
    try {
        const { id } = req.body;
        const data = await todoService.deleteItem(id);
        if (data === 400) res.status(data).json({ error: "Невдалось видалити користувача з бази" });
        res.status(200).json({ message:"Видалено успішно"})
    } catch (error) {
        logger.error(error);
         res.status(500).json({ error: "Невдалось виконати запит" });
    }
}
export const completed = async(req, res) => {
    try {
        const id = req.user.id;
        const data = await todoService.completedItem(id);
        if (data === 400) res.status(data).json({ error: "Невдалось отримати виконані завдання" });
        res.status(200).json({ completedItems:data });
    } catch (error) {
         logger.error(error);
         res.status(500).json({ error: "Невдалось виконати запит" });
    }
}
export const updateTitle = async (req, res) => {
    try {
        const { id, title } = req.body;
        const data = await todoService.updateItem(id, title);
        if (data === 400) res.status(data).json({ error: "Невдалось оновити назву завдання" });
        res.status(200).json({
            message:"Назву оновлено"
        })
    } catch (error) {
         logger.error(error);
         res.status(500).json({ error: "Невдалось виконати запит" });
    }
}
export const deleteAll = async (req, res) => {
    try {
        const { id, arrayItem } = req.body;
        const data = await todoService.deleteAllItems(id, arrayItem);
        if (data === 400)  res.status(data).json({ error: "Невдалось видалити всі завдання" });
          res.status(200).json({
            message:"Всі завдання"
        })
    } catch (error) {
         logger.error(error);
         res.status(500).json({ error: "Невдалось виконати запит" });
    }
}
export const completedAll = async (req, res) => {
    try {
        const { id, arrayItem, completed } = req.body;
        const data = await todoService.completedAllItems(id, arrayItem, completed);
        if (data === 400) res.status(data).json({ error: "Невдалось оновити всі завдання" });
        res.status(200).json({
            message: "оновлено успішно",
            arr:data
        })
        
    } catch (error) {
         logger.error(error);
        res.status(500).json({ error: "Невдалось виконати запит" });
        
    }
}