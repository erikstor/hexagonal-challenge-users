import {DataSource} from "typeorm";

export interface GetConnection {
    getConnectionSmallSquareDb(): Promise<DataSource>

    getConnectionUsersDb(): Promise<DataSource>
}