import express from "express";
import {check} from "express-validator"
import {userController} from "../dependencies";
import {SignUpUsersTypes} from "../../app/users/interfaces/auth";
import {authValidator} from "../middlewares/auth";

const userRouter = express.Router();


/**
 * @openapi
 * swagger: '2.0'
 * info:
 *   version: 1.0.0
 *   title: API de Inicio de Sesión de Usuarios
 *   description: API para autenticar usuarios en el sistema
 * host: localhost:3000
 * basePath: /
 * schemes:
 *   - http
 *   - https
 * paths:
 *   /users/sign-in:
 *     post:
 *       summary: Inicio de sesión de usuario
 *       tags:
 *          - Usuarios
 *       description: Autentica un usuario en el sistema.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 correo:
 *                   type: string
 *                 clave:
 *                   type: string
 *               example:
 *                 correo: erik@string.com
 *                 clave: '12312'
 *       responses:
 *         '200':
 *           description: Inicio de sesión exitoso. Devuelve el token de autenticación.
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *         '400':
 *           description: Error en la solicitud.
 *         '401':
 *           description: Credenciales inválidas. El correo o la clave proporcionados son incorrectos.
 *         '500':
 *           description: Error interno del servidor.
 */
userRouter.post("/sign-in",
    check('correo').escape().notEmpty().isEmail(),
    check('clave').escape().notEmpty(),
    userController.signIn.bind(userController));


/**
 * @openapi
 * swagger: '2.0'
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * info:
 *   version: 1.0.0
 *   title: API de Registro de Usuarios
 *   description: API para registrar usuarios en el sistema
 * host: localhost:3000
 * basePath: /
 * schemes:
 *   - http
 *   - https
 * paths:
 *   /users/sign-up:
 *     post:
 *       security:
 *         - bearerAuth:
 *       summary: Registro de usuario
 *       tags:
 *          - Usuarios
 *       description: Registra un nuevo usuario en el sistema.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre:
 *                   type: string
 *                 apellido:
 *                   type: string
 *                 dni:
 *                   type: string
 *                 celular:
 *                   type: string
 *                 correo:
 *                   type: string
 *                 clave:
 *                   type: string
 *                 type:
 *                   type: string
 *               example:
 *                 nombre: asdfasdfa
 *                 apellido: asdfasdf
 *                 dni: '111'
 *                 celular: '+573153226435'
 *                 correo: erik9@string.com
 *                 clave: '12312'
 *                 type: prop
 *       responses:
 *         '200':
 *           description: Usuario registrado exitosamente.
 *         '400':
 *           description: Error en la solicitud.
 *         '401':
 *           description: No autorizado. El token de autenticación es inválido o ha expirado.
 *         '500':
 *           description: Error interno del servidor.
 */
userRouter.post("/sign-up",
    authValidator.verifyAdmin,
    check('nombre').escape().notEmpty().isLength({min: 3}),
    check('apellido').escape().notEmpty().isLength({min: 3}),
    check('dni').escape().notEmpty().isNumeric(),
    check('celular').escape().notEmpty().isString().isLength({max: 13}).custom((value) => {

        const characters = value.split('+')[1]
        const firstChar = value[0]

        if (firstChar !== '+') {
            return false
        }

        if (isNaN(characters)) {
            return false
        }

        return true
    }),
    check('correo').escape().notEmpty().isEmail(),
    check('clave').escape().notEmpty().isLength({min: 5}),
    check('type').escape().notEmpty().custom((value) => {
        return SignUpUsersTypes.hasOwnProperty(value)
    }),
    userController.signUp.bind(userController)
);

export {userRouter};
