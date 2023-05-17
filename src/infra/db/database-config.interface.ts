export interface DatabaseConfigInterface {
    type: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    logging?: boolean;
    entities?: never[]
}