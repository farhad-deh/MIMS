require("dotenv").config();

const cors = require("cors");
const express = require("express");
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const materialsRouter = require("./routes/materials");
const suplliersRouter = require("./routes/suppliers");
const path = require("path");
const db = require("./dbConfig");

const app = express();
const PORT = process.env.PORT || 3000;
const Url = process.env.URL || `http://localhost:${PORT}`;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

db.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed: ", err);
    process.exit(1);
  } else {
    console.log("Connected to MySQL");
    connection.release();

    app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
    app.use("/materials", materialsRouter);
    app.use("/suppliers", suplliersRouter);

    app.listen(PORT, () => {
      console.log(`Server is running on port : ${PORT}`);
    });
  }
});
