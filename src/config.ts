export const config = {
    server: {
        port: process.env.PORT || 3000,
        SECRET_JWT: process.env.SECRET_JWT || ''
    },
    users_db: {
        host: process.env.USER_DB_HOST || 'localhost',
        port: +process.env.USERS_DB_PORT! || 5432,
        database: process.env.USER_DB_NAME || 'postgres',
        password: process.env.USER_DB_PASSWORD || 'admin',
        username: process.env.USER_DB_USER || 'postgres',
        type: 'postgres'
    },
    small_square_db: {
        host: process.env.SMALL_SQUARE_DB_HOST || 'localhost',
        port: +process.env.SMALL_SQUARE_DB_PASSWORD_PORT! || 5432,
        database: process.env.SMALL_SQUARE_DB_NAME || 'postgres',
        password: process.env.SMALL_SQUARE_DB_PASSWORD || 'admin',
        username: process.env.USER_DB_USER || 'postgres',
        type: 'postgres'
    }
};
