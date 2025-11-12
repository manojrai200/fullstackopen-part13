const router = require("express").Router();
const { Session } = require("../models");

router.delete("/", async (request, response, next) => {
  try {
    const authorization = request.get("authorization");
    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
      const token = authorization.substring(7);
      
      const deleted = await Session.destroy({
        where: {
          token: token,
        },
      });

      if (deleted > 0) {
        response.status(204).end();
      } else {
        response.status(404).json({ error: "session not found" });
      }
    } else {
      response.status(401).json({ error: "token missing" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;