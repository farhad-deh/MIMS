const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "سیستم مدیریت موجودی مواد (MIMS)",
      version: "1.0.0",
      description: "Application API documentation",
    },
  },
  apis: ["./routes/*.js"],
};
const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
