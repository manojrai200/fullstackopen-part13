const router = require("express").Router();
const { Session } = require("../models");

router.delete("/", async (req, res, next) => {
  try {
    const authorization = req.get("authorization");
    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
      const token = authorization.substring(7);
      
      const deleted = await Session.destroy({
        where: {
          token: token,
        },
      });

      if (deleted > 0) {
        res.status(204).end();
      } else {
        res.status(404).json({ error: "session not found" });
      }
    } else {
      res.status(401).json({ error: "token missing" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;