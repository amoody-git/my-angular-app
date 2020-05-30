const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const clubRoutes = require('./routes/club');
const clubsRoutes = require('./routes/clubs');
const nationsRoutes = require('./routes/nations');
const playerRoutes = require('./routes/player');
const playersRoutes = require('./routes/players');
const positionsRoutes = require('./routes/positions');
const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

const app = express();

mongoose.connect(
    "mongodb+srv://" + process.env.MONGO_ATLAS_UN + ":" + process.env.MONGO_ATLAS_PW + "@cluster0-voko8.mongodb.net/test?retryWrites=true&w=majority", 
    { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => { 
            console.log('Connected to database!'); 
        })
        .catch(() => { 
            console.log('Connection failed!'); 
        });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("server/images")));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers", 
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods", 
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

app.use('/api/club', clubRoutes);
app.use('/api/clubs', clubsRoutes);
app.use('/api/nations', nationsRoutes);
app.use('/api/player', playerRoutes);
app.use('/api/players', playersRoutes);
app.use('/api/positions', positionsRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/user', userRoutes);


module.exports = app;