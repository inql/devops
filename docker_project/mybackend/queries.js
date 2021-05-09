const { Pool } = require('pg');
const redis = require('redis');

const pgClient = new Pool({
    user: "postgres",
    password: "P@ssw0rd123",
    database: "postgres",
    host: "mypostgres",
    port: "5432"
});

// pgClient.on('error', () => {
//     console.log("Postgres not connected");
// });


// Creating and testing redis connection
const redisClient = redis.createClient({
  host: "myredis",
  port: 6379,
  // retry_strategy: () => 1000
});

// redisClient.on('connect', () => {
//   console.log('Connected to Redis server');
// });

function checkOrInstantiateTable(){
    pgClient.query(`CREATE TABLE IF NOT EXISTS albums (
            ID SERIAL PRIMARY KEY      NOT NULL,
            name      TEXT             NOT NULL,
            artist    TEXT             NOT NULL
        );`)
    .catch( (err) => {
        console.log(err);
    });
};

const getAlbums = (request, response) => {
  pgClient.query('SELECT * FROM albums ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

const getAlbumById = (request, response) => {
  const id = parseInt(request.params.id)

  // Check if album with given id exists in Redis and if it does fetch it from there
  // if not then fetch it from postgres
  redisClient.exists(id, (error, result) => {
    if (error) {
      throw error;
    }
    

    if(result == 1) {
      console.log("Found data in Redis cache");
      redisClient.hgetall(id, function(error, object) {
        if(error) {
          throw error;
        }
        response.status(200).header('cache', 'true').json(object);
      })
    } else {
      console.log("Data not found in Redis cache")
      pgClient.query('SELECT * FROM albums WHERE id = $1', [id], (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).json(results.rows[0]);
      })
    }
  });
};

const createAlbum = (request, response) => {
    const { name, artist } = request.body
    
    pgClient.query('INSERT INTO albums (name, artist) VALUES ($1, $2) RETURNING ID', [name, artist], (error, result) => {
      if (error) {
        throw error;
      }

      var record_id = String(result.rows[0].id);

      // Adding album to Redis
      console.log(typeof(record_id));
      redisClient.hmset(record_id,'name', name, 'artist', artist);

      response.status(201).send(`Album added with ID: ${record_id}`)
    })
    
};

const updateAlbum = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, artist } = request.body

  pgClient.query(
    'UPDATE albums SET name = $1, artist = $2 WHERE id = $3',
    [name, artist, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Album modified with ID: ${id}`)
    }
  )
};

const deleteAlbum = (request, response) => {
  const id = parseInt(request.params.id)

  pgClient.query('DELETE FROM albums WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Album deleted with ID: ${id}`)
  })
};

module.exports = {
    checkOrInstantiateTable,
    createAlbum,
    getAlbums,
    getAlbumById,
    updateAlbum,
    deleteAlbum
  }