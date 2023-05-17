import {config as dotEnvConfig} from "dotenv";

dotEnvConfig();

import app from './config/app'

import {config} from "./config";

function boostrap() {

    const {port} = config.server;
    app.listen(port, () => {
        console.log(`[APP] - Starting application on port ${port}`);
    });

    return app
}

boostrap();
