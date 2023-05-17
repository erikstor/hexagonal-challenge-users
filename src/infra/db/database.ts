import {DataSource} from "typeorm";

import {DatabaseConfigInterface} from "./database-config.interface";
import {GetConnection} from "./get-connection";
import {
    CategoriaEntity,
    PedidosEntity,
    PedidosPlatosEntity,
    PlatosEntity,
    RestauranteEmpleadoEntity,
    RestaurantesEntity,
    RolesEntity,
    UsuariosEntity,
} from "../../domain/entities";

export class Database implements GetConnection {

    private host: string
    private port: number
    private database: string
    private password: string
    private username: string

    constructor(config: DatabaseConfigInterface) {
        const {host, port, database, username, password} = config

        this.port = port
        this.host = host
        this.database = database
        this.password = password
        this.username = username
    }

    async getConnectionUsersDb(): Promise<DataSource> {
        return new DataSource({
            type: "postgres",
            host: this.host,
            port: this.port,
            username: this.username,
            password: this.password,
            database: this.database,
            logging: true,
            // synchronize: true,
            entities: [
                UsuariosEntity,
                RolesEntity
            ],
        }).initialize()
    }

    getConnectionSmallSquareDb(): Promise<DataSource> {
        return new DataSource({
            type: "postgres",
            host: this.host,
            port: this.port,
            username: this.username,
            password: this.password,
            database: this.database,
            // logging: true,
            // synchronize: true,
            entities: [
                CategoriaEntity,
                PedidosEntity,
                PedidosPlatosEntity,
                PlatosEntity,
                RestauranteEmpleadoEntity,
                RestaurantesEntity
            ],
        }).initialize()
    }

}

