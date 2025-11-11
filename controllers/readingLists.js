const router = require("express").Router();
const { ReadingList, User } = require("../models");
const { tokenExtractor } = require("../utils/middleware");

router.post("/", async (req, res, next) => {
  try {
    const { blogId, userId } = req.body;

    if (!blogId || !userId) {
      return res.status(400).json({ error: "blogId and userId are required" });
    }

    const entry = await ReadingList.create({
      blogId: blogId,
      userId: userId,
    });

    res.status(201).json(entry);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", tokenExtractor, async (req, res, next) => {
  try {
    const reading = await ReadingList.findByPk(req.params.id);

    if (!reading) {
      return res.status(404).json({ error: "reading list item not found" });
    }
    const user = await User.findByPk(req.decodedToken.id);

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
