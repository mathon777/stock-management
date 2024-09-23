# Startup
To run this application we would need a replica set of mongo instances, to do this we will spin up 3 MongoDB docker containers.
We can run `start-containers.sh` or do the fallowing:

`docker-compose up -d`

Wait some time - around 30 sec to make sure MongoDB instances are running correctly

and then we need to ini replica set: `docker exec mongo1 ./scripts/init-replica.sh`

# CONFIG
By default, App uses mongo db repositories, by applying NODE_ENV=test mock InMemory Repositories will be applied

# Routes
## Product
POST http://localhost:3000/api/products 
```json 
{
  "name": "Super product",
  "description": "Very nice product",
  "price": 55.43,
  "stock": 2
}
```


GET  http://localhost:3000/api/products

POST http://localhost:3000/api/products/{:productId}/restock - adds 1 unit of product
POST http://localhost:3000/api/products/{:productId}/sell - decreases 1 unit of the product

## Order
POST http://localhost:3000/api/orders

example body:
```json 
{
  "customerId": "randomCustomerId",
  "products": ["{:productId1}","{:productId2}"]
}
```
## Further actions
Due to lack of time I did not implement couple of things like swagger, tests and logger.


# Troubleshoot
In case of file with no permissions:
chmod u+x start-containers.sh