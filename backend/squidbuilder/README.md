## USER 

### Register new User
```bash
$ curl -v -X POST localhost:8080/users/register \
-H 'Content-type:application/json' \
-d '{"username": "kimki", "password": "chimchi"}'
```

### Login User(=kimki)
```bash
$ curl -v -X POST localhost:8080/users/register \
-H 'Content-type:application/json' \
-d '{"username": "kimki", "password": "chimchi"}'
```