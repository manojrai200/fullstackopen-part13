const router = require('express').Router()
const { Blog } = require('../models')

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  console.log(JSON.stringify(blogs, null, 2))
  res.json(blogs)
})

// Works fine without express-async-errors in Express 5
router.get('/test', async (req, res) => {
  throw new Error('Oops!')
})


router.post("/", async (req, res) => {
  console.log(req.body);
  const blog = await Blog.create(req.body);
  res.json(blog);
});

router.delete("/:id", async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  if (blog) {
    await blog.destroy()
    console.log(blog)
    res.json(blog)
  } else {
    res.status(404).end();
  }
});

router.put('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)
  if (!blog) {
    return res.status(404).json({ error: 'blog not found' })
  }
  blog.likes = req.body.likes
  await blog.save()
  res.json(blog)
})

module.exports = router