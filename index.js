// const router = require("express").Router();
// const apiRoutes = require("./api");

// router.use("/api", apiRoutes);

// This error message will display as a flushed face with 404 Error!
// https://www.w3schools.com/icons/fontawesome5_icons_emoji.asp
// router.use((req, res) => {
//     res.status(404).send("<h1> 😭 404 Error!</h1>");
// });

// module.exports = router;

const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const cwd = process.cwd();

const PORT = 3001;
const app = express();



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server for running on port ${PORT}!`);
    });
});