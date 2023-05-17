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
    'admin': 'Administrador',
    'prop': 'Propietario',
    'employe': 'Empleado',
    'client': 'Cliente'
}

export interface ISignUpUsersTypes {
    'admin': 'Administrador',
    'prop': 'Propietario',
    'employe': 'Empleado',
    'client': 'Cliente'
}