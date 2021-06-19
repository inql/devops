const express = require("express")
const cors = require('cors');

const app = express()
const queries = require('./queries')


app.use(cors());
app.use(express.json());



// Creating connection to postgresql and creating table if it doesn't exists
queries.checkOrInstantiateTable();

app.get('/hello',(req, res) => {
    res.send("Hello from albums project")
  });

// Mapping operations to endpoints
app.get('/albums', queries.getAlbums);
app.get('/albums/:id', queries.getAlbumById);
app.post('/albums', queries.createAlbum);
app.put('/albums/:id', queries.updateAlbum);
app.delete('/albums/:id', queries.deleteAlbum);



const PORT = 5000;

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
});