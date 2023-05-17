import {DataSource} from "typeorm";

export interface GetConnection {
    getConnectionSmallSquareDb(): DataSource

    getConnectionUsersDb(): Promise<DataSource>
}