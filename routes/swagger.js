const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../db/swagger.json");

const router = express.Router();

router.use("/", swaggerUi.serve);
router.get("/", swaggerUi.setup(swaggerDocument));

module.exports = {
  swaggerRouter: router,
};
