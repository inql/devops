docker run -v host_path:/var/lib/postgresql/data --rm --name=mypostgres --network=my-music-library -e POSTGRES_PASSWORD=1qaz2wsx postgres:alpine &

docker run -v host_path:/var/lib/postgresql/data --rm --name=mypostgres --network=my-music-library -e POSTGRES_PASSWORD=1qaz2wsx postgres:alpine &

docker run --name=mybackend --network=my-music-library -p 8090:9090 --rm inql/music-library &

