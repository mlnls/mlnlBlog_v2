const express = require("express");
const cors = require("cors");

//내부 모듈 호출
const indexRouter = require("./src/routes/index");
const connectDB = require("./src/config/database");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

connectDB();
app.use("/", indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
