const router = require("express").Router
const apiRoutes = require("./api");

router.use("/api", apiRoutes);

// This error message will display as a flushed face with 404 Error!
// https://www.w3schools.com/icons/fontawesome5_icons_emoji.asp
router.use((req, res) => {
    res.status(404).send("<h1> &#xf579 404 Error!</h1>");
});

module.exports = router;