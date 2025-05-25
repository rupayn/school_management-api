# School Management API

This project is a lightweight Node.js backend built with Express.js and Prisma ORM, designed to manage school data efficiently. It provides RESTful APIs to add new schools and retrieve a list of nearby schools sorted by geographic proximity using the Haversine formula. The data is stored in a MySQL database, and the system is optimized for deployment on serverless platforms like AWS Lambda for cost-effective usage.

## Features

*   Add new schools with name, address, latitude, and longitude
*   Retrieve a list of nearby schools sorted by geographic proximity

## Technologies Used

*   Node.js
*   Express.js
*   Prisma ORM
*   MySQL
*   TypeScript
*   Zod for request validation
*   eslint for code linting
*   prettier for code formatting

## Getting Started

1.  Clone the repository: `git clone https://github.com/rupayn/school_management_api.git`
2.  Install the dependencies: `npm install`
3.  Copy the `.env.sample` file to `.env` and update the `DATABASE_URL` and `PORT` variables accordingly
4.  Run the migrations to create the database tables: `npx prisma migrate dev`
5.  Start the server: `npm run start`

## API Documentation

### Add New School

*   Endpoint: `/api/v1/add-school`
*   Method: `POST`
*   Request Body: `name, address, latitude, and longitude`

    
    *   Response:
        *   Success: `201 Created` with a JSON response containing the newly added school
        *   Error: `400 Bad Request` with a JSON response containing the error message

### Retrieve Nearby Schools

*   Endpoint: `/api/v1/list-schools`
*   Method: `GET`
*   Request Query: `latitude` and `longitude`
    *   Response:
        *   Success: `200 OK` with a JSON response containing the list of nearby schools sorted by geographic proximity
        *   Error: `400 Bad Request` with a JSON response containing the error message

## SAMPLE OUTPUT AND INPUT OF BOTH ENDPOINT:

*   For api:  `list-schools/`
### Input
```json
 {
    "latitude":22.5645,
    "longatude":88.3639
 }

```
### Output
```json
{
    "statusCode": 200,
    "data": [
        {
            "id": 2,
            "name": "Modern High School",
            "address": "25 AJC Bose Road, Kolkata",
            "latitude": 22.5746,
            "longitude": 88.3631,
            "distance": 1.1260687995670575
        },
        {
            "id": 1,
            "name": "St. Xavier's School",
            "address": "12 Park Street, Kolkata",
            "latitude": 22.5522,
            "longitude": 88.3639,
            "distance": 1.3676975977280452
        },
        {
            "id": 3,
            "name": "Sunrise Public School",
            "address": "78 Vivekananda Road, Kolkata",
            "latitude": 22.5893,
            "longitude": 88.3756,
            "distance": 3.007926212771185
        },
        {
            "id": 4,
            "name": "Durgapur Iswar Chandra Vidyasagar Public High School",
            "address": "School Road, A-Zone, Durgapur, West Bengal 713205",
            "latitude": 23.5204,
            "longitude": 87.3119,
            "distance": 151.27658433948284
        }
    ],
    "message": "Success",
    "success": true
}
```

* For POST Api `add-school`

### input

```json

{
    "name": "La Martiniere College",
    "address": "Hazratganj, Lucknow",
    "latitude": 26.8467,
    "longitude": 80.9462
}


```

### Output

```json

{
    "statusCode": 200,
    "data": {
        "name": "La Martiniere College",
        "address": "Hazratganj, Lucknow",
        "latitude": 26.8467,
        "longitude": 80.9462
    },
    "message": "School added successfully",
    "success": true
}

```




### The postman Collection.json:

```json

{
  "collection": {
    "info": {
      "_postman_id": "094f2c21-18bc-4408-b903-a9d9011fcb0c",
      "name": "School-Management-Api-Collection",
      "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
      "updatedAt": "2025-05-25T09:39:38.000Z",
      "createdAt": "2025-05-24T09:58:41.000Z",
      "lastUpdatedBy": "33021369",
      "uid": "33021369-094f2c21-18bc-4408-b903-a9d9011fcb0c"
    },
    "item": [
      {
        "name": "list-schools",
        "id": "c48efa66-dd93-4cdd-aac0-a4bebf4f685e",
        "protocolProfileBehavior": {
          "disableBodyPruning": true
        },
        "request": {
          "auth": {
            "type": "noauth"
          },
          "method": "GET",
          "header": [],
          "url": {
            "raw": "{{internet-uri}}/list-schools?latitude=22.5755&longitude=88.3632",
            "host": [
              "{{internet-uri}}"
            ],
            "path": [
              "list-schools"
            ],
            "query": [
              {
                "key": "latitude",
                "value": "22.5755"
              },
              {
                "key": "longitude",
                "value": "88.3632"
              }
            ]
          }
        },
        "response": [],
        "uid": "33021369-c48efa66-dd93-4cdd-aac0-a4bebf4f685e"
      },
      {
        "name": "add-school",
        "id": "fe29e8e8-4313-4ee7-89ac-d7ec9faf6eb1",
        "protocolProfileBehavior": {
          "disableBodyPruning": true
        },
        "request": {
          "method": "POST",
          "header": [],
          "body": {
            "mode": "raw",
            "raw": "{\r\n    \"name\": \"DAV Public School\",\r\n    \"address\": \"Sector 14, Gurgaon\",\r\n    \"latitude\": 28.4595,\r\n    \"longitude\": 77.0266\r\n}\r\n\r\n",
            "options": {
              "raw": {
                "language": "json"
              }
            }
          },
          "url": {
            "raw": "{{uri}}add-school",
            "host": [
              "{{uri}}add-school"
            ]
          }
        },
        "response": [],
        "uid": "33021369-fe29e8e8-4313-4ee7-89ac-d7ec9faf6eb1"
      }
    ],
    "event": [
      {
        "listen": "prerequest",
        "script": {
          "id": "4524c49f-f874-4c9d-a41e-911060966c76",
          "type": "text/javascript",
          "packages": {},
          "exec": [
            ""
          ]
        }
      },
      {
        "listen": "test",
        "script": {
          "id": "e9f0cc0c-4081-4ee4-89b3-7d81c59d59b1",
          "type": "text/javascript",
          "packages": {},
          "exec": [
            ""
          ]
        }
      }
    ],
    "variable": [
      {
        "key": "local-uri",
        "value": "localhost:3000/api/v1",
        "type": "string"
      },
      {
        "key": "internet-uri",
        "value": "https://school-management-api-y0su.onrender.com/api/v1",
        "type": "string"
      }
    ]
  }
}

```