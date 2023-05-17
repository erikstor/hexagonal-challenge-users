import {config} from "../config";
import {Database} from "./db/database";
import {UserController} from "./user/user-controller";

import {Auth} from "../app/users/auth";

const usersDatabase = new Database(config.users_db)
// usersDatabase.getConnectionUsersDb().then()

// const smallSquareDatabase = new Database(config.small_square_db)
// const smallSquareDataSource = smallSquareDatabase.getConnectionSmallSquareDb()
//
// smallSquareDataSource.then((resp) => {
//     console.log(`Conexion establecida con la base de datos ${resp.options.database}`)
// }).catch((error) => console.log(error))


export const auth = new Auth(usersDatabase)
export const userController = new UserController(auth)