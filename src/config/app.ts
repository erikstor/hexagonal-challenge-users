import bodyParser from "body-parser";
import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

import {routerIndex} from "../infra/router-index";
import {swaggerOptions} from "../swaggerOptions";

const app = express();

app.use(bodyParser.json());

for (const router of routerIndex) {
    app.use(router.prefix, router.router);
}

//Swagger
const openapiSpecification = swaggerJsdoc(swaggerOptions);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(openapiSpecification))

export default app