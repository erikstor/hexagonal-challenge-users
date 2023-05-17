import {config} from "../config";
import {Database} from "./db/database";
import {UserController} from "./user/user-controller";

import {Auth} from "../app/users/auth";

const usersDatabase = new Database(config.users_db)

export const auth = new Auth(usersDatabase)
export const userController = new UserController(auth)