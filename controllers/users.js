const router = require("express").Router();

const { User, Blog, ReadingList } = require("../models");

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: {
        model: Blog,
        attributes: { exclude: ["userId"] },
      },
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const includeOptions = {
      model: Blog,
      as: "readings",
      attributes: ["id", "url", "title", "author", "likes", "year"],
      through: {
        as: "readinglists",
        attributes: ["read", "id"],
      },
    };

    // Filter by read status if query parameter is provided
    if (req.query.read !== undefined) {
      const readValue = req.query.read === "true";
      includeOptions.through.where = {
        read: readValue,
      };
    }

    const user = await User.findByPk(req.params.id, {
      attributes: ["name", "username"],
      include: includeOptions,
    });

    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.put("/:username", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.params.username,
      },
    });
    if (user) {
      user.username = req.body.username;
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ error: "user not found" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
