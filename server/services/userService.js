import logger from "../config/logger/main.js";
import { userModel } from "../models/index.js"
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ThrowError } from "../utiltes/error.js";
import bcryptjs from "bcryptjs"
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
export const login = async (email, password) => {
    try {
        if (email == null || password == null) ThrowError("Eмайл або пароль пусті", 400);
        const user = await userModel.FindUser(email);
        if (user == null) ThrowError("Користувача з таким емейлом незнайдено", 400)
        const isValid = await bcryptjs.compare(password, user.password);
        if (!isValid)ThrowError("Пароль не вірний",400);
        const token = jwt.sign({...user},JWT_SECRET, { expiresIn: '30min' })
        return {token,user};
    } catch (error) {
        logger.error(error.message, {
            type: error.name,
            statusCode: error.statusCode,
            code: error.code,
            endPoint: "/api/login"
        });
        return error;
    }
}
export const registration = async (email, password, userName) => {
    try {
        if (email == "" || password == "" || userName == "")ThrowError("Поля пусті",400);
        const salt = bcryptjs.genSaltSync(10);
        const hashPassword = bcryptjs.hashSync(password, salt);
        const isRegistred = await userModel.FindUser(email);
        console.log("IsReg",isRegistred)
        if (isRegistred == null)  ThrowError("Користувач з таким емейлом вже існує",400);
        const AddUser = await userModel.AddUser(userName, email, hashPassword);
        if (!AddUser) ThrowError("Невдалось виконати запит до бд",400);
        return true;
             
    } catch (error) {
        logger.error(error.message, {
            type: error.name,
            statusCode: error.statusCode,
            code: error.code,
            endPoint: "/api/registration"
        });
        return error.statusCode;
    }
}
export const updateUserEmail = async (id, email,authHeader) => {
    try {
        if (email == "" || id == "") ThrowError("Поля пусті", 400);
        logger.info("id", { id })
        const isUpdate = await userModel.UpdateEmail(id, email);
        if (!isUpdate) ThrowError("Невдалось виконати запит до бд", 400);
           const parts = authHeader.split(" ");
           logger.info("Розділені частини:", parts);
           logger.info("Кількість частин:", parts.length);
            if (parts.length !== 2 || parts[0] !== "Bearer") {
              logger.info("❌ Неправильний формат токена");
            logger.info("Очікується: 'Bearer <token>'");
                logger.info("Отримано:", authHeader);
                ThrowError("Неправильний формат токена", 400);
            }   
            const token = parts[1];
            logger.info("Токен отримано (перші 20 символів):", token.substring(0, 20) + "...");
            logger.info("Довжина токена:", token.length);
            if (!token.trim()) {
                logger.info("❌ Токен порожній");
                  ThrowError("токен прожній", 400);
          }
          const user = await userModel.FindUserById(id)
        if (user == null)ThrowError("Користувача не знайдено", 404);
          const decoded = jwt.verify(token, JWT_SECRET);
           logger.info("Decoded:",decoded)
        const newToken = jwt.sign({ ...user }, JWT_SECRET, { expiresIn: '30min' });
        return {user,newToken}
    } catch (error) {
        logger.error(error.message, {
            type: error.name,
            statusCode: error.statusCode,
            code: error.code,
            endPoint: "/api/updateEmail"
        });
        return error.statusCode;
    }
}
export const updateUserName = async (id, name,authHeader) => {
    try {
        if (name == "" || id == "") ThrowError("Поля пусті",400);
        const isUpdate = await userModel.UpdateUserName(id, name);
        if (!isUpdate) ThrowError("Невдалось виконати запит до бд", 400);
           const parts = authHeader.split(" ");
           logger.info("Розділені частини:", parts);
           logger.info("Кількість частин:", parts.length);
            if (parts.length !== 2 || parts[0] !== "Bearer") {
              logger.info("❌ Неправильний формат токена");
            logger.info("Очікується: 'Bearer <token>'");
                logger.info("Отримано:", authHeader);
                ThrowError("Неправильний формат токена", 400);
            }   
            const token = parts[1];
            logger.info("Токен отримано (перші 20 символів):", token.substring(0, 20) + "...");
            logger.info("Довжина токена:", token.length);
            if (!token.trim()) {
                logger.info("❌ Токен порожній");
                  ThrowError("токен прожній", 400);
          }
          const user = await userModel.FindUserById(id)
        if (user == null)ThrowError("Користувача не знайдено", 404);
          const decoded = jwt.verify(token, JWT_SECRET);
           logger.info("Decoded:",decoded)
        const newToken = jwt.sign({ ...user }, JWT_SECRET, { expiresIn: '30min' });
        return {user,newToken}
    } catch (error) {
        logger.error(error.message, {
            type: error.name,
            statusCode: error.statusCode,
            code: error.code,
            endPoint: "/api/updateUserName"
        });
        return error.statusCode;
    }
}
export const updateUserPassword = async(id, NewPassword, OldPassword, oldUser,authHeader) => {
     try {
         if (NewPassword == "" || OldPassword == "") ThrowError("Поля пусті", 400);
         console.log("OldPassword:", `"${OldPassword}"`);
         console.log("Length:", OldPassword.length);
         const user = await userModel.FindUserById(id);
          console.log("TYPE:", typeof user.password);
console.log("VALUE:", user.password);
     const isValid = await bcryptjs.compare(OldPassword.trim(), user.password);
     if (!isValid) ThrowError("Ви ввели не вірний пароль спробуйте ще раз", 400);
     const salt = bcryptjs.genSaltSync(10);
     const hashPassword = bcryptjs.hashSync(NewPassword, salt);
     const isUpdate = await userModel.UpdatePassword(id, hashPassword);
     if (!isUpdate)ThrowError("невдалось виконати запит до бази данних",400);
     const parts = authHeader.split(" ");
     logger.info("Розділені частини:", parts);
     logger.info("Кількість частин:", parts.length);
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        logger.info("❌ Неправильний формат токена");
        logger.info("Очікується: 'Bearer <token>'");
        logger.info("Отримано:", authHeader);
        ThrowError("Неправильний формат токена", 400);
    }
        const token = parts[1];
        logger.info("Токен отримано (перші 20 символів):", token.substring(0, 20) + "...");
        logger.info("Довжина токена:", token.length);
        
    if (!token.trim()) {
        logger.info("❌ Токен порожній");
        ThrowError("Токен порожній", 400);
    }
      const decoded = jwt.verify(token, JWT_SECRET);
     logger.info(decoded);
      const newToken = jwt.sign({ ...user  }, JWT_SECRET, { expiresIn: '30min' })
      return {user,newToken}
     } catch (error) {
        logger.error(error.message, {
            type: error.name,
            statusCode: error.statusCode,
            code: error.code,
            endPoint: "/api/updateUserPassword"
        });
        return error.statusCode;
     }
    
}
export const removeUser = async (user) => {
    try {
        if (user == null) ThrowError("Користувача не знайдено", 400);
        const isDelete = await userModel.deleteUser(user.id);
        if (!isDelete) ThrowError("Невдалось виконати запит до бд", 400);
        return true;
    } catch (error) {
         logger.error(error.message, {
            type: error.name,
            statusCode: error.statusCode,
            code: error.code,
            endPoint: "/api/deleteUser"
        });
        return error.statusCode;
    }
}