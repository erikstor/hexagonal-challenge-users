export interface SignUp {
    nombre: string
    apellido: string
    dni: number
    celular: string
    correo: string
    clave: string
    type: string
}

export const SignUpUsersTypes = {
    'prop': 'Propietario',
}

export interface ISignUpUsersTypes {
    'prop': 'Propietario',
}