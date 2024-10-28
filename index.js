const express = require("express");
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const Url = process.env.URL || `http://localhost:${PORT}`;

const materialsRouter = require("./routes/materials");

app.use(express.json());
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use("/materials", materialsRouter);

app.get("/", (req, res) => {
  res.send(`
      <!DOCTYPE html>
      <html lang="fa" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>MIMS</title>
        <style>
          body { font-family: Arial, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background-color: #f4f4f9; }
          .container { text-align: center; padding: 20px; border-radius: 8px; background-color: #fff; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }
          h1 { color: #333; }
          p { color: #666; font-size: 1.1em; }
          a { color: #007bff; text-decoration: none; }
          span { color: #78909C; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Material Inventory Management System</h1>
          <h1>به سیستم مدیریت موجودی مواد خوش آمدید</h1>
          <p>برای بررسی API ها از ابزار Swagger در   <a href="${Url}/docs" >این صفحه</a> استفاده کنید.</p>
          <span>قدرت گرفته از Express + Node Js</span>
        </div>
      </body>
      </html>
    `);
});

app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});
