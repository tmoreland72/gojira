# Project Manager API

## Examples

```http request
GET {{baseUrl}}/projects
Accept: application/json
Cache-Control: no-cache
```

```http request
POST {{baseUrl}}/projects
Accept: application/json
Content-Type: application/json
Cache-Control: no-cache

{
   "category": "34 Fame",
   "name": "Documentation Site",
   "icon": "fas fa-book",
   "status": "On-Hold"
}
```

```http request
PUT {{baseUrl}}/projects/lpstt3v
Accept: application/json
Content-Type: application/json
Cache-Control: no-cache

{
   "status": "Open"
}

```

```http request
DELETE {{baseUrl}}/projects/lpstt3v
Accept: */*
Cache-Control: no-cache

```
