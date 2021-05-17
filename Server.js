const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// db
const connectDB = require("./config/db");
connectDB();

// swagger
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

router.get("/", (req, res) => {
  res.json({ error: false, message: "Hello World!" });
});

// User router
const userRouter = require("./routes/User");

app.use("/users", userRouter);

app.listen(3000);
console.log("Listening to port 3000");
