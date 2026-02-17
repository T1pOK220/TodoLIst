import logger from "../config/logger/main.js";
import * as userService from "../services/userService.js";
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        logger.info("Email:",...email)
        const data = await userService.login(email, password);
        if(data.statusCode === 400)return res.status(data.statusCode).json({error:data.message})
      res.status(200).json({
        ...data,
        message: "Користувача авторизовано"
      })
    } catch (error) {
        logger.error("Невдалось виконати авторизацію",error)
    }
}
export const registrationUser = async (req, res) => {
    try {
        const { email, password, userName } = req.body;
        const IsRegistred = await userService.registration(email, password, userName);
        if (IsRegistred===400) return res.status(400).json({ error: "невдалось зареєструвати користувача" });
        res.status(200).json({ message: "Користувача успішно зареєстровано" });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ error: "Невдалось виконати запит" });
    }
}
export const updateEmail = async (req, res) => {
    try {
        const { id, NewEmali } = req.body;
        const authHeader = req.headers.authorization;
        const data = await userService.updateUserEmail(id, NewEmali, authHeader);
        if(data === 400 || data === 404)res.status(data).json({error:"Невдалось оновити Email"})
       res.status(200).json({
        ...data,
        message:"Користувача оновлено"
        })
    } catch (error) {
         logger.error(error);
        res.status(500).json({ error: "Невдалось виконати запит" });
    }
}
export const updateUserName = async (req, res) => {
    try {
        const { id, NewUserName } = req.body;
        const authHeader = req.headers.authorization;
        const data = await userService.updateUserName(id, NewUserName, authHeader);
        if(data === 400 || data === 404)res.status(data).json({error:"Невдалось оновити user name"})
        res.status(200).json({
        ...data,
        message:"Користувача оновлено"
        })
    } catch (error) {
        logger.error(error);
        res.status(500).json({ error: "Невдалось виконати запит" });
    }
}
export const updatePassword = async (req, res) => {
    try {
         const { id, NewPassword,OldPassword } = req.body;
         const authHeader = req.headers.authorization;
        const oldUser = req.user;
        const data = await userService.updateUserPassword(id, NewPassword, OldPassword, oldUser, authHeader);
        if(data === 400 || data === 404)res.status(data).json({error:"Невдалось змінити пароль"})
        res.status(200).json({
        ...data,
        message:"Користувача оновлено"
        })
    } catch (error) {
        logger.error(error);
        res.status(500).json({ error: "Невдалось виконати запит" });
    }
}
export const deleteUser = async (req, res) => {
    try {
        const user = req.user;
        const data = await userService.removeUser(user);
        if (data === 400) res.status(data).json({ error: "Невдалось видалити користувача" })
        res.status(200).json({
        ...data,
        message:"Користувача оновлено"
        })
    } catch (error) {
        logger.error(error);
        res.status(500).json({ error: "Невдалось виконати запит" });
    }
} 