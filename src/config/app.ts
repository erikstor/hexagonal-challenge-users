import express from "express";
import bodyParser from "body-parser";
import {routerIndex} from "../infra/router-index";
import swaggerJsdoc from "swagger-jsdoc";
import {swaggerOptions} from "../swaggerOptions";
import swaggerUI from "swagger-ui-express";

const app = express();

app.use(bodyParser.json());

for (const router of routerIndex) {
    app.use(router.prefix, router.router);
}

//Swagger
const openapiSpecification = swaggerJsdoc(swaggerOptions);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(openapiSpecification))

export default app