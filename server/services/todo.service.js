import { todoModel } from "../models/index.js";
import logger from "../config/logger/main.js";
import { ThrowError } from "../utiltes/error.js";
export const AddTodo = async (userId,title,completed,deadline) => {
    try {
         if (!userId) {
              logger.info("Користувача не знайдено (немає ID в токені)");
             ThrowError("Користувача не знайдено", 400);
            }
            if (!title || title.trim() === '') {
              logger.info("Заголовок пустий");
               ThrowError("Користувача не знайдено", 400);
            }
            
            logger.info("Дані для збереження:", {
              title,
                userId,
                completed,
              deadline
            });
        const isAdd = await todoModel.AddDo(title, userId, deadline);
        if (!isAdd) ThrowError("Невдалось виконати запит до бд", 400);
            logger.info("Завдання успішно додано");
        return {
            success: true,
            todo: {
                title,
                userId
              },message: "Завдання успішно додано"}
            
          } catch (error) {
            logger.error(error.message, {
                        type: error.name,
                        statusCode: error.statusCode,
                        code: error.code,
                        endPoint: "/api/addtodo"
                    });
                    return error.statusCode;
          }
}
export const getTodos = async (id) => {
    try {
        if (id == null) ThrowError("ід незнайдено", 400);
        const itmes = await todoModel.getAll();
        if (itmes == null) ThrowError("Невдалось виконати запт до бд", 400);
      const filteritems = itmes.filter(itmes => (itmes.user_id == id))
        return filteritems;
    } catch (error) {
        logger.error(error.message, {
                        type: error.name,
                        statusCode: error.statusCode,
                        code: error.code,
                        endPoint: "/api/todos"
                    });
                    return error.statusCode; 
    }
}
export const updateItemByCompleted = async (id,completed) => {
    try {
        if (id == null || completed == null) ThrowError("Поля пусті", 400);
     logger.info(completed)
    const isUpdated = await todoModel.updateItem(id, completed);
    if(!isUpdated)ThrowError("невдалось оновити завданя",400)
    return true;
    } catch (error) {
          logger.error(error.message, {
                        type: error.name,
                        statusCode: error.statusCode,
                        code: error.code,
                        endPoint: "/api/update-item"
                    });
                    return error.statusCode; 
    }
}
export const deleteItem = async (id) => {
    try {
        if (id == null) ThrowError("Айді пусте", 400);
        const isDeleted = await todoModel.deleteOne(id);
        if (!isDeleted) ThrowError("Невдалось видалити користувача з бази", 400)
        return true;
    } catch (error) {
           logger.error(error.message, {
                        type: error.name,
                        statusCode: error.statusCode,
                        code: error.code,
                        endPoint: "/api/delete-item"
                    });
                    return error.statusCode; 
    }
}
export const completedItem = async (id) => {
     try {
          if (id == null) ThrowError("Айді пусте", 400);
         const completedItems = await todoModel.getAllCompleted(id);
         if (completedItems == null) ThrowError("Невдалось виконати запит до бд",400)
         logger.info("Виконані", { completedItems })
         console.log("Виконані",completedItems)
    return completedItems;
     } catch (error) {
        logger.error(error.message, {
                        type: error.name,
                        statusCode: error.statusCode,
                        code: error.code,
                        endPoint: "/api/completed"
                    });
                    return error.statusCode; 
     }
}
export const updateItem = async(id, title) => {
      try {
        if (!id || !title)ThrowError("Поля не можуть бути пустими", 400); 
        logger.info("UPDATE:", { id, title });
        const isUpdate =  await todoModel.updateTitle(id, title);
          if (!isUpdate) ThrowError("Невдалось виконати запит до бд");
      } catch (err) {
          logger.error(error.message, {
                        type: error.name,
                        statusCode: error.statusCode,
                        code: error.code,
                        endPoint: "/api/update"
                    });
                    return error.statusCode; 
      }
}
export const deleteAllItems = async (id,arrayItem) => {
    try {
          if (id == null || arrayItem == null)ThrowError("Поля не можуть бути пустими", 400); 
          const IdArrays = [];
          arrayItem.forEach(element => {
            IdArrays.push(element.id);
          });
          logger.info("Масив з ід",IdArrays)
        const areDeleted = await todoModel.DeleteAll(id, IdArrays);
        if (!areDeleted) ThrowError("Невдалось виконати запит до бд");
        return true;
    } catch (error) {
          logger.error(error.message, {
                        type: error.name,
                        statusCode: error.statusCode,
                        code: error.code,
                        endPoint: "/api/deleteAll"
                    });
                    return error.statusCode; 
    }
}
export const completedAllItems = async (id, arrayItem,completed) => {
     try {
         if (id == null || arrayItem == null) ThrowError("Поля не можуть бути пустими", 400); 
      const IdArrays = [];
      arrayItem.forEach(element => {
        IdArrays.push(element.id);
      });
      logger.info("Масив з ід",IdArrays)
    const areCompleted = await todoModel.CompletedAll(id, IdArrays, completed);
    if(!areCompleted)ThrowError("Невдалось виконати запит до бд");
         const arr = await todoModel.GetById(id, IdArrays);
         if (arr == null) ThrowError("невдалось отримати данні ",400)
         logger.info("arr",{arr})
    return arr;
     } catch (error) {
         logger.error(error.message, {
                        type: error.name,
                        statusCode: error.statusCode,
                        code: error.code,
                        endPoint: "/api/completedAll"
                    });
                    return error.statusCode; 
     }
}
