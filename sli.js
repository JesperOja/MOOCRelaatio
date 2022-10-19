require('dotenv').config()
const { Sequelize, QueryTypes } = require('sequelize')
const express = require('express')
const app = express()

const sequelize = new Sequelize(process.env.DATABASE_URL)


  const notes = sequelize.query("SELECT * FROM blogs", { type: QueryTypes.SELECT })
  notes.then(blogs => {
    blogs.map(blog => {
        console.log(blog.author+ ": " + blog.title + ", " + blog.likes + " likes");
    })
  })
