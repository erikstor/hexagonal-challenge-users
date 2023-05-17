import request from 'supertest'

import { getManager } from "typeorm";

import app from "../src/config/app";

import { UsuariosEntity } from '../src/domain/entities';

// import { auth } from '../src/infra/dependencies'; 

const user: UsuariosEntity = new UsuariosEntity();
user.id = 0;
user.nombre = "John";
user.correo = "johndoe@gmail.com";
user.apellido = "Perez"
user.clave = '1123'
user.dni = 12312
user.role = 1

jest.mock("typeorm", () => {

    const doNothing = () => {
        //Empty function that mocks typeorm annotations
    };

    return {
        getManager: jest.fn(),
        PrimaryGeneratedColumn: doNothing,
        PrimaryColumn: doNothing,
        OneToMany: doNothing,
        ManyToOne: doNothing,
        OneToOne: doNothing,
        JoinColumn: doNothing,
        Column: doNothing,
        Entity: doNothing,
        DataSource: jest.fn(),
        initialize: doNothing
    };

});

beforeAll(async () => {
    const userRepository = {findUserByEmail: jest.fn().mockReturnValue([user])};
    (getManager as jest.Mock).mockReturnValue({ getUserRepository: () => userRepository , signIn: () => 'cosa'});
})


describe('Registro de usuario', () => {
    test('El endpoint responde con un 200 y un jwt con la informacion del usuario', async () => {

        await request(app)
        .post('/users/sign-in')
        .send({
            correo: 'erik@string.com',
            clave: '12312'
        }).expect(200)

    })
});