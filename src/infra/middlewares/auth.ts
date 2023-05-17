import {CustomError} from "../error/custom-error";
import {Auth} from "../../app/users/auth";
import {NextFunction, Request, Response} from "express";
import {RolesEntity} from "../../domain/entities";
import {Database} from "../db/database";
import {config} from "../../config";

class AuthMiddleware {

    constructor() {
    }

    async verifyAdmin(req: Request, res: Response, next: NextFunction) {

        try {
            const authorization = req.headers?.authorization || null

            if (!authorization) {
                throw new CustomError({httpCode: 401, description: 'Debe iniciar sesion'})
            }

            const _token = authorization.replace('Bearer ', '')

            const usersDatabase = new Database(config.users_db)
            const auth = new Auth(usersDatabase)

            const userInfo = await auth.verifyToken(_token!)

            const user = await auth.findUserByEmail(userInfo.correo)

            if (!user || !(user.role instanceof RolesEntity) || user.role.nombre !== 'Administrador') {
                throw new CustomError({httpCode: 403, description: 'Usted no tiene acceso a esta funcionalidad'})
            }

            next()

        } catch (e: any) {
            res.status(e.httpCode || 500).send({
                msg: e.description || e.message || e || `Ocurrio un error durante el proceso de validacion de autenticacion`,
            })
            next(e)
        }

    }
}


export const authValidator = new AuthMiddleware()

