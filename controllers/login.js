const jwt = require("jsonwebtoken");
const router = require("express").Router();

const { SECRET } = require("../utils/config");
const User = require("../models/user");

router.post("/", async (request, response, next) => {
  try {
    const body = request.body;

    const user = await User.findOne({
      where: {
        username: body.username,
      },
    });

    const passwordCorrect = body.password === "secret";

    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        error: "invalid username or password",
      });
    }

    if (user.disabled) {
      return response.status(401).json({
        error: "account disabled, please contact admin",
      });
    }

    const userForToken = {
      username: user.username,
      id: user.id,
    };

    const token = jwt.sign(userForToken, SECRET);

    await Session.create({
      token: token,
      userId: user.id,
    });

    response
      .status(200)
      .send({ token, username: user.username, name: user.name });
  } catch (error) {
    next(error);
  }
});

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
