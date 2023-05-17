export const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Hexagonal Challenge",
      version: "1.0.0",
      description: "A simple example for hexagonal architecture - API",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: [
      "./src/infra/user/user-router.ts"
  ],
};