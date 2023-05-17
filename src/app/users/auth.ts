import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

import {config} from "../../config";

import {RolesEntity, UsuariosEntity} from "../../domain/entities";
import {ISignUpUsersTypes, SignUp, SignUpUsersTypes} from "./interfaces/auth";

import {Database} from "../../infra/db/database";
import {CustomError} from "../../infra/error/custom-error";

export class Auth {


    constructor(
        public readonly db: Database
    ) {
    }

    public async getUserRepository() {
        const userDataSource = await this.db.getConnectionUsersDb()
        return userDataSource.getRepository(UsuariosEntity);
    }

    async signIn(email: string, password: string): Promise<string> {
        const user = await this.findUserByEmail(email)

        if (!user) {
            throw new CustomError({
                httpCode: 400,
                description: 'Las credenciales son invalidas ' + user,
            })
        }

        const compare = await bcrypt.compare(password, user.clave!);

        if (!compare) {
            throw new CustomError({
                httpCode: 400,
                description: 'Las credenciales son invalidas, compare'
            })
        }

        const payload = {...user}

        delete payload['id']
        delete payload['clave']

        return await this.generateToken(payload)

    }

    async generateToken(payload: any): Promise<string> {
        return jwt.sign(payload, config.server.SECRET_JWT, {expiresIn: '1d'});
    }

    async verifyToken(token: string): Promise<any> {
        return jwt.verify(token, config.server.SECRET_JWT, function (err: any, decoded: any) {
            if (err) throw new Error(`Ocurrio un error decodificando el token, ${err}`)

            return decoded
        });
    }


    async signUp(data: SignUp): Promise<UsuariosEntity> {

        const userRepository = await this.getUserRepository()

        let user = await this.findUserByEmail(data.correo)

        if (user) {
            throw new CustomError({
                httpCode: 400,
                description: 'El correo ya esta ocupado'
            })
        }

        const role = await this.findRoleByEnum(data.type)

        if (!role) throw new CustomError({httpCode: 400, description: 'El rol no fue encontrado'})

        user = new UsuariosEntity()
        user.role = role.id
        user.correo = data.correo
        user.clave = await bcrypt.hash(data.clave, 10)
        user.celular = data.celular
        user.apellido = data.apellido
        user.nombre = data.nombre
        user.dni = data.dni

        await userRepository.save(user)

        return user

    }

    async findUserByEmail(email: string) {
        const userRepository = await this.getUserRepository()

        return await userRepository.findOneBy({
            correo: email
        })


    }

    async findRoleByEnum(name: string) {
        const userDataSource = await this.db.getConnectionUsersDb()
        const rolesRepository = await userDataSource.getRepository(RolesEntity)

        return await rolesRepository.findOneBy({
            nombre: SignUpUsersTypes[name as keyof ISignUpUsersTypes]
        })
    }

}