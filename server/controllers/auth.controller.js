
import logger from "../config/logger/main.js";

export const verifyToken = (req, res) => {
    try {
        const user = req.user; 
        if (user == null) res.status(400).json({ error:"користувача не знайдено"})
    res.status(200).json({
        user
    })
    } catch (error) {
        logger.error(error);
        res.status(400).json({error:"Невалідний токен"})
    }
}