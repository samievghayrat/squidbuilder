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

## ROOM

### Get room with its Id
```bash
$ curl -v http://localhost:8080/get/664bebc05725fd2aebf804fd
```

### Create a room By User(=kimki)
```bash
$ curl -v -X POST localhost:8080/rooms/create/kimki \
-H 'Content-type:application/json' \
-d '{"event": "tashkili", "activity": "football"}'
```

### Join a User to Room
```bash
$ curl -v -X POST localhost:8080/rooms/join/664bebc05725fd2aebf804fd?username=vazir
```