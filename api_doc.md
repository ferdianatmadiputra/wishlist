# hacktiv-wishlist

List of available endpoints:
​
- `POST /register`
- `POST /login`
- `GET /wishlists`
- `POST /wishLists`
- `DELETE /wishlists/:id`

### POST /register

Request:

- data:

```json
{
  "email": "string",
  "password": "string"
}
```

Response:

- status: 201
- body:

```json
{
  "id": "integer",
  "email": "string",
  "saldo": 5000000
}
```

### POST /login

Request:

- data:

```json
{
  "email": "string",
  "password": "string"
}
```

Response:

- status: 200
- body:
  ​

```json
{
    "id": "integer",
    "email": "string",
    "access_token": "jwt string",
    "saldo":5000000
}
```

### POST /wishlists

description: 
  add user's wishlist

Request:

- headers: access_token (string)
- body: 
```json
{
    "id": 1,
    "name": "MirrorLess camera",
    "image_url":"https://asset.kompas.com/crops/mcMptWeiOQIwUEiY6gV0O_2yaTQ=/0x0:0x0/780x390/data/photo/2014/03/08/0215393a6000-1780x390.jpg",
    "price": 50000,
    "description": "kamera keren",
}
```

Response:

- status: 201
- body:

```json
{ 
    "name": "MirrorLess camera",
    "price": 50000,
    "image_url":"https://asset.kompas.com/crops/mcMptWeiOQIwUEiY6gV0O_2yaTQ=/0x0:0x0/780x390/data/photo/2014/03/08/0215393a6000-1780x390.jpg",
    "UserId":1,
    "description": "kamera keren",
    "saldo": 700000
}
```

### GET /wishlists

description: 
  show all user wishlists

Request:

- headers: access_token (string)

Response:

- status: 200
- body:

```json
[
    { 
        "id": 1,
        "name": "Lock n Lock bottle", 
        "price": 150000,
        "image_url": "https://www.londondrugs.com/on/demandware.static/-/Sites-londondrugs-master/default/dw3fe0bd48/products/L0441258/large/L0441258.JPG",
        "UserId":1,
        "description": "Botol lama sudah rusak"
    },
    { 
        "id": 2,
        "name": "Mirror Less Camera", 
        "price": 150000,
        "image_url":"https://asset.kompas.com/crops/mcMptWeiOQIwUEiY6gV0O_2yaTQ=/0x0:0x0/780x390/data/photo/2014/03/08/0215393a6000-1780x390.jpg",
        "UserId":1,
        "description": "kamera untuk jalan2"
    }
]
```
### DELETE /wishlists/:id

description: 
  delete wishlist by wishListId

Request:

- headers: access_token (string)
- params: 
  - id: "integer" required

Response:

- status: 200
- body:

```json
{
    "message": "Successfully delete Wishlist",
    "saldo": 100000
}
```

