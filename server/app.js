const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

const MONGODB_URI = '';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to database!');
    })
    .catch(err => {
        console.log(err);
        console.log('Connection failed!');
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers", 
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods", 
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
})

app.post('/api/posts', (req, res, next) => {
    const post = new Post({
        title: req.body.title, 
        content: req.body.content
    });
    post.save();
    res.status(201).json("Post added successfully");
});

app.get('/api/posts', (req, res, next) => {
    const posts = [
        { 
            id: "1", 
            title: "First server-side post", 
            content: "This is coming from the server"
        }, 
        { 
            id: "2", 
            title: "Second server-side post", 
            content: "This is coming from the server"
        }, 
        { 
            id: "3", 
            title: "Third server-side post", 
            content: "This is coming from the server"
        }
    ]
    res.status(200).json(posts);
})

module.exports = app;