// import request from 'supertest'
// import app from "../src/config/app";
// import { UserController } from '../src/infra/user/user-controller';
// import { Database } from '../src/infra/db/database';
// import { config } from '../src/config';
//
//
//
// const authTest = {
//     db: new Database(config.users_db),
// 	signIn: jest.fn(),
//     signUp: jest.fn(),
//     getUserRepository: jest.fn(),
//     generateToken: jest.fn(),
//     verifyToken: jest.fn(),
//     findUserByEmail: jest.fn(),
//     findRoleByEnum:  jest.fn(),
// }
//
//
// const userControllerTest = new UserController(authTest)
//
// describe('Registro de usuario', () => {
//     test('El endpoint responde con un 200 y un jwt con la informacion del usuario', async () => {
//
//
//         // authTest.signIn.mockResolvedValue('')
//         // userControllerTest.signIn()
//
//         // await request(app)
//         // .post('/users/sign-in')
//         // .send({
//         //     correo: 'erik@string.com',
//         //     clave: '12312'
//         // }).expect(200)
//
//     })
// });