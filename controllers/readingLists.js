const router = require('express').Router();
const { ReadingList } = require('../models');

router.post('/', async (req, res, next) => {
  try {
    const { blogId, userId } = req.body;

    if (!blogId || !userId) {
      return res.status(400).json({ error: 'blogId and userId are required' });
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

module.exports = router;
