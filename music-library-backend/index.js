const express = require("express")
const cors = require('cors');

const app = express()

const queries = require('./queries')

app.use(cors());
app.use(express.json());

// Connection to psql & table creation

queries.checkOrCreateTable();

app.get('/hello',(req, res) => {
    res.send("Hello from albums project")
  });

// Mapping operations to endpoints
app.get('/albums', queries.getAlbums);
app.get('/albums/:id', queries.getAlbumById);
app.post('/albums', queries.createAlbum);

const PORT = 9090;

app.listen(PORT, () => {
    console.log(`API is listening of port ${PORT}`);
});