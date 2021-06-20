# Start mypostgres
kubectl apply -f ./mypostgres/postgres-pvc.yml

kubectl apply -f ./mypostgres/pv-local.yml

kubectl apply -f ./mypostgres/postgres-secret.yml

kubectl apply -f ./mypostgres/postgres-clusterip.yml

kubectl apply -f ./mypostgres/postgres-configMap.yml

kubectl apply -f ./mypostgres/postgres-deployment.yml

# Start myredis
kubectl apply -f ./myredis/myredis-deployment.yml

kubectl apply -f ./myredis/myredis-configMap.yml

kubectl apply -f ./myredis/myredis-clusterip.yml

sleep 30

# Start mybackend
kubectl apply -f ./mybackendlb/mybackendlb-clusterip.yml

kubectl apply -f ./mybackendlb/mybackendlb-deploy.yml

kubectl apply -f ./mybackendlb/mybackendlb-node-port.yml


# Start myfrontend
kubectl apply -f ./myfrontend/myfrontend-clusterip.yml

kubectl apply -f ./myfrontend/myfrontend-deployment.yml

kubectl apply -f ./myfrontend/myfrontend-node-port.yml


# Start Ingress
minikube addons enable ingress

sleep 10

kubectl apply -f myapp-ingress.yml