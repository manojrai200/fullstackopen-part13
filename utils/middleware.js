// utils/middleware.js
const logger = require("./logger");

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, req, res, next) => {
  logger.error(error.message);
  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "SequelizeValidationError") {
    return res.status(400).json({ error: error.errors.map((e) => e.message) });
  } else if (error.name === "SequelizeDatabaseError") {
    return res.status(400).json({ error: error.message });
  } else if (err.name === "SequelizeUniqueConstraintError") {
    return res.status(400).json({ error: "Unique constraint violation" });
  }

  next(error);
};

module.exports = {
  unknownEndpoint,
  errorHandler,
};
