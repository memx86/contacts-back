const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const { swaggerRouter } = require("./routes/swagger");
const { contactsRouter } = require("./routes/api/contacts-route");
const { usersRouter } = require("./routes/api/users-route");
const { errorHandler } = require("./helpers/errorHandler");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use(express.static("public"));
app.use("/", swaggerRouter);
app.use("/api/users", usersRouter);
app.use("/api/contacts", contactsRouter);

app.use(errorHandler);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

module.exports = app;
