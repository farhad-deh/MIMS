const express = require("express");
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const materialsRouter = require("./routes/materials");
const path = require("path");
const sql = require("mssql");
const config = require("./dbConfig");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const Url = process.env.URL || `http://localhost:${PORT}`;

app.use(express.json());

// Serve static HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Connect to the database
sql
  .connect(config)
  .then((pool) => {
    console.log("Connected to SQL Server");

    app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
    app.use("/materials", materialsRouter);

    app.listen(PORT, () => {
      console.log(`Server is running on port : ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed: ", err);
    process.exit(1);
  });
