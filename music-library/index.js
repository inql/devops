const express = require("express");

const app = express();

app.get('/hello', (req, res) => {
    res.send("Hello World from Music Library app");
});

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Music Library API listening on port ${PORT}`);
});