# DevOps - UG

This project covers exercises done on DevOps lectures on University of Gdańsk.

## Description

Simple fullstack application created to present how docker, docker-compose, kubernetes works.

## Getting Started

### Dependencies

* minikube (or other kubernetes provider, but startup script was created for minikube)
* docker

### Docker repos

* [Frontend](https://hub.docker.com/repository/docker/inql/music-library-myfrontend)
* [Backend](https://hub.docker.com/repository/docker/inql/music-library-mybackend)
* [Custom nginx](https://hub.docker.com/repository/docker/inql/music-library-mynginx)
### Executing program

In order to run the project:

```
cd kubernetes
./startup.sh
```

For cleaning up all the kubernetes entities run:
```
./cleanup.sh
```
## Extra

Notes used during project development are available under `notes` directory.

## Authors

[@inql](https://github.com/inql)

## License

This project is licensed under the MIT License - see the LICENSE.md file for details