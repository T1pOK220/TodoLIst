import { db } from "../database/index.js";
import { UserModel } from "./UserModels.js";
import { TodoModel } from "./TodoModel.js";
export const userModel = new UserModel(db);
export const todoModel = new TodoModel(db);