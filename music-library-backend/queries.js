const { Pool } = require('pg');
const redis = require('redis');
const pgClient = new Pool({
    user: "postgres",
    password: "1qaz2wsx",
    database: "postgres",
    host: "mypostgres",
    port: "5432"
});

pgClient.on('error', () => {
    console.log("Postgres not connected");
});

// Redis connection
const redisClient = redis.createClient({
    host: "myredis",
    port: 6379,
    // retry_strategy: () => 1000
});

redisClient.on('connect', () => {
    console.log('Connected to Redis server');
});

function checkOrCreateTable(){
    pgClient.query(`CREATE TABLE IF NOT EXISTS albums (
            ID SERIAL PRIMARY KEY     NOT NULL,
            name           VARCHAR(30)    NOT NULL,
            releaseDate            VARCHAR(30)     NOT NULL
        );`)
    .catch( (err) => {
        console.log(err);
    });
};

const getAlbums = (request, response) => {
  pgClient.query('SELECT * FROM albums ORDER BY id ASC', (error, results) => {
    if (error) {
        console.log(error);
    }
    response.status(200).json(results.rows)
  })
};

const getAlbumById = (request, response) => {
  const id = parseInt(request.params.id)

  redisClient.exists(id, (err, ok) => {
      if (err) throw err;

      if(ok == 1){
          redisClient.hgetall(id, function(err, object) {
              if(err) throw err;

              response
                .status(200)
                .header('cache', 'true')
                .json(object);
          })
          console.log(`Get entry from redis with ID = ${id}`);
      } else {
        pgClient.query('SELECT * FROM albums WHERE id = $1', [id], (error, results) => {
            if (error) {
                console.log(error);
            }
            response.status(200).json(results.rows)
          })
          console.log(`Get entry from postgres with ID = ${id}`);
      }
  });
};

const createAlbum = (request, response) => {
    const { name, releaseDate } = request.body
    pgClient.query('INSERT INTO albums (name, releaseDate) VALUES ($1, $2) RETURNING id', [name, releaseDate], (error, result) => {
      if (error) {
        console.log(error);
      } else {
        var id = result.rows[0].id;
        response.status(201).send(`Album added with ID: ${id}`)
        redisClient.hmset(id, 'name', name, 'releaseDate', releaseDate);
    }
    })
};

module.exports = {
    checkOrCreateTable,
    createAlbum,
    getAlbums,
    getAlbumById
  }