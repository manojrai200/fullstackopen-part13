require("dotenv").config();
const express = require('express')
const app = express()

const { Sequelize, QueryTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: { require: true, rejectUnauthorized: false },
  },
});

const main = async () => {
  try {
    await sequelize.authenticate();
    const blogs = await sequelize.query("SELECT * FROM blogs", { type: QueryTypes.SELECT })
    blogs.forEach((blog) => {
      console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`);
    });
    await sequelize.close();
  } catch (error) {
    console.log('Unable to connect to the database:', error);
  }
};

main();