import {NextFunction, Request, Response} from "express";

import {Auth} from "../../app/users/auth";
import {validationResult} from "express-validator";

export class UserController {

    constructor(
        public readonly auth: Auth
    ) {
    }

    async signIn(req: Request, res: Response, next: NextFunction) {

        const result = validationResult(req);

        if (!result.isEmpty()) {
            return res.status(400).send({
                msg: `Algunos campos contienen errores`,
                errors: result.mapped()
            });
        }

        try {
            const {correo, clave} = req.body

            const token = await this.auth.signIn(correo, clave)            

            res.setHeader('authorization', token)
            res.status(200).send();
        } catch (e: any) {
            res.status(e.httpCode || 500)
                .send({
                    msg: `Ups, algo paso durante el proceso de inicio de sesion`,
                    error: e.description || e.message || e
                })
            next()
        }


    }

    async signUp(req: Request, res: Response, next: NextFunction) {

        const result = validationResult(req);

        if (!result.isEmpty()) {
            return res.status(400).send({
                msg: `Algunos campos contienen errores`,
                errors: result.mapped()
            });
        }

        const data = {...req.body}

        try {

            const user = await this.auth.signUp(data)
            const token = await this.auth.generateToken({...user})

            res.setHeader('authorization', token)
            res.status(200).send();
        } catch (e: any) {
            res.status(e.httpCode || 500).send({
                msg: `Ups, algo paso durante el proceso de registro`,
                error: e.description || e.message || e
            })
            next(e)
        }

    }
}
