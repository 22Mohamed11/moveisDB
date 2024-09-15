const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const compression = require("compression");
const singnupRouter = require("./Routes/userRoute.js");
const DBConnection = require("./Config/DB.js");
const errorHandeling = require("./Middlewares/globalError.js");
const APIerrors = require("./Utils/errors.js");

dotenv.config({});
DBConnection();// connect with DB
const app = express();// express app
app.use(express.json());
app.use(cors());// cors to Access APIs
app.use(compression());// Compress Response
//  middleware
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}
// Mount Routes
app.use("/Register", singnupRouter);
app.all("*", (req, res, next) => {
  next(new APIerrors(`The route ${req.originalUrl} is not found`, 400));
});
app.use(errorHandeling);
const PORT = process.env.PORT || 2024;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});