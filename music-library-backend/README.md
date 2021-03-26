# music-library app

## Commands

`docker run -v host_path:/var/lib/postgresql/data --rm --name=mypostgres --network=network_name -e POSTGRES_PASSWORD=1qaz2wsx postgres:alpine` -> run postgres
`docker run --name=myredis --network=mymulticont --rm redis:alpine` -> run redis
`docker exec -it ContainerID/name sh` -> run shell
`docker run --name=mybackend --network=my-music-library -p 9090:9090 inql/music-library` -> run app