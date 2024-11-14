const express = require("express");
require("./database/loadDatabase");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const routes = require("./src/routes/index");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
