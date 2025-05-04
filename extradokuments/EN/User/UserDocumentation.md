# Navigating the RedBit Website

RedBit is a free and open-source communication platform that facilitates seamless connections through direct messaging and group chats. To explore and utilize the features of RedBit, follow this guide to navigate through the website effectively.

Accessing the Website


# HomePage

Homepage: Visit the RedBit homepage at [Homepage](https://redbit.netlify.app/).
Main Navigation Menu

The main navigation menu is located at the top of the page and includes the following sections:

* Home: Returns you to the homepage.
* About: Provides information about RedBit's mission and features.
* Contacts: Offers contact details for inquiries and support.
* Chat: Navigato to the register page if the user is loged out or navigato to the chat page if the user is loged in

Homepage Overview

The homepage presents key information about RedBit:

* Slogan Section: Features the platform's tagline, emphasizing its core value.
* Features Highlights: Showcases RedBit's primary features, such as fast communication, direct messaging, and group chats.
* Developer Team: Introduces the development team,, with brief descriptions and images.
* Key Packages: Lists the technologies and services powering RedBit, including Prisma, Nuxt.js, and Supabase.


# Chat page

## Navigation panel

The panel is found on the left side of the page.
On the panel everything is dinamicly generated for the current user logged in.

- The most left side has the server selector where the user can choose between the avalible servers or create its own.
- The right side of that panel has the chat selector, if a server is selected it will list the avalible chatrooms that the user can join.
- On the bottom, there is the user information and the button to navigate to the user settings. 


# The documentation for the api

### Some information
- 🔒 Before the api route means it requires the Authorization header with a valid access token of the user
- The base URL is not there but every endpoint is accesed like: `http://localhost:3000/api/XYZ`
- The word before the API route means the type of the request

---

# User
## PUT /api/user
This request is used to create new users.
For example a user registers

The password is sent in plain text but its stored hashed and salted🧂

### Header
```http
Content-Type: application/json
```

### Body
```http
{
    "username": "MyUsername",
    "email": "example@example.com",
    "birthdate": "1999-01-01",
    "first_name": "Jhon",
    "last_name": "Doe",
    "password": "Pass123@"
}

```
Field validation
```js
// RegExp
email: /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/                              //valid email format
password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/    //has to contain at least a capital and a lowercase letter a number and a special character [@$!%*#?&] with the minimum length of 8 characters
username: /^[a-zA-Z0-9_]{3,32}/                                                       // Between 3 and 32 characters can contain underscores _
name: /^[a-zA-Z]{3,35}/                                                               // Between 3 and 32 characters. Its applied to the first and last name


```
### Returns
```json
{
  "context": "User/Create",
  "method": "PUT",
  "params": {
    "username": "MyUsername",
    "email": "example@example.com",
    "birthdate": "1999-01-01",
    "first_name": "Jhon",
    "last_name": "Doe"
  },
  "data": {
    "id": "<userId>",
    "username": "MyUsername",
    "email": "example@example.com",
    "profile_picture": null,
    "birthdate": "1999-01-01T00:00:00.000Z",
    "first_name": "Jhon",
    "last_name": "Doe",
    "description": null,
    "created_at": "<Current date ISO format>",
    "password": "🧂hash🧂",
    "email_verified": false
  }
}
```

## POST /api/user/login

### Header
```http
Content-Type: application/json
```

### Body
```http
{
    "email":"example@example.com",
    "password":"Pass123@"
}
```

Field validation
```js
// RegExp
email: /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/                              //valid email format
password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/    //has to contain at least a capital and a lowercase letter a number and a special character [@$!%*#?&] with the minimum length of 8 characters

```
### Returns
```json
{
  "context": "UserLogin",
  "method": "POST",
  "params": {
    "email": "example@example.com",
    "password": "Pass123@"
  },
  "data": {
    "totalItems": 1,
    "items": [
      {
        "token": "Bearer <JWT refreshToken>"
      }
    ]
  }
}
```

## 🔒 GET /api/user/
Get data about the authorized user

### Returns
```json
{
  "context": "User/Get",
  "method": "GET",
  "data": {
    "id": "<userId>",
    "username": "MyUsername",
    "email": "example@example.com",
    "profile_picture": "<URL of profile picture>",
    "birthdate": "1990-01-01T00:00:00.000Z",
    "first_name": "Jhon",
    "last_name": "Doe",
    "description": "<Description of user>",
    "created_at": "<Creation date ISO format>",
    "password": "🧂hsh🧂",
    "email_verified": false
  }
}
```

## GET  /api/user/verifyEmail
Supposed to be sent to the user on the provided email to verify that it is owned by them
### Querry parameters
```
id     <userId>
email  example@example.com
```
### Returns
```json

{
  "context": "user/verifyEmail",
  "method": "GET",
  "params": {
    "id": "<userid>",
    "email": "example@example.com"
  },
  "data": {
    "totalItems": 1,
    "items": [
      {
        "email_verified": true
      }
    ]
  }
}
```
---
# Server
## 🔒 PUT /api/server/
This endpoint is used to create new servers
### Headers
```http
Content-Type: application/json
```
### Body
```http
{
    "name":"Example servername",
    "picture": "https://i.pinimg.com/736x/71/e7/d4/71e7d4042683fbca02c8ad85666b0e33.jpg",
    "visibility":"<public or private>"
}
```
### Response
```json
{
  "context": "Server/Create",
  "method": "PUT",
  "params": {
    "name": "Example servername",
    "picture": "https://i.pinimg.com/736x/71/e7/d4/71e7d4042683fbca02c8ad85666b0e33.jpg",
    "visibility": "<public or private>"
  },
  "data": {
    "totalItems": 1,
    "fields": {
      "id": {
        "modelName": "Server",
        "name": "id",
        "typeName": "String",
        "isList": false,
        "isEnum": false
      },
      "name": {
        "modelName": "Server",
        "name": "name",
        "typeName": "String",
        "isList": false,
        "isEnum": false
      },
      "picture": {
        "modelName": "Server",
        "name": "picture",
        "typeName": "String",
        "isList": false,
        "isEnum": false
      },
      "description": {
        "modelName": "Server",
        "name": "description",
        "typeName": "String",
        "isList": false,
        "isEnum": false
      },
      "visibility": {
        "modelName": "Server",
        "name": "visibility",
        "typeName": "Visibility",
        "isList": false,
        "isEnum": true
      },
      "owner_id": {
        "modelName": "Server",
        "name": "owner_id",
        "typeName": "String",
        "isList": false,
        "isEnum": false
      }
    },
    "items": [
      {
        "id": "<Server id>",
        "name": "Example servername",
        "picture": "https://i.pinimg.com/736x/71/e7/d4/71e7d4042683fbca02c8ad85666b0e33.jpg",
        "description": "<Description of the server>",
        "visibility": "<public or private>",
        "owner_id": "<Id of the owner>"
      }
    ]
  }
}
```
## 🔒 GET /api/server/:serverId
Get information about the server if the authorized user is connected

### Params
```
:serverId    The id of the server
```
### Returns
```json
{
  "context": "Server/Get",
  "method": "GET",
  "params": {
    "serverId": "<serverId>",
    "userId": "<userId>"
  },
...
}
```

## 🔒 PUT /api/server/invite/
To create an invite link to a server the user is connected to
### Header
```http
Content-Type: application/json
```
### Body
```http
{
    "lifetime": "<A number, represents the lifetime of an invite in miliseconds>",
    "server_id":"<serverId>"
}
```
### Returns
```json
{
  "context": "Server/Invite/Create",
  "method": "PUT",
  "params": {
    "lifetime": "<lifetime of request in miliseconds>",
    "server_id": "<server id>"
  },
  "data": {
    "totalItems": 1,
    "fields": {
      "id": {
        "modelName": "Invite",
        "name": "id",
        "typeName": "String",
        "isList": false,
        "isEnum": false
      },
      "created_at": {
        "modelName": "Invite",
        "name": "created_at",
        "typeName": "DateTime",
        "isList": false,
        "isEnum": false
      },
      "lifetime": {
        "modelName": "Invite",
        "name": "lifetime",
        "typeName": "Int",
        "isList": false,
        "isEnum": false
      },
      "server_id": {
        "modelName": "Invite",
        "name": "server_id",
        "typeName": "String",
        "isList": false,
        "isEnum": false
      }
    },
    "items": [
      {
        "id": "<id if invite>",
        "created_at": "2025-03-06T21:42:20.592Z",
        "lifetime": "<lifetime of id in miliseconds>",
        "server_id": "<server id>"
      }
    ]
  }
}
```

## 🔒 GET /api/server/invite/:id
To accept an invite
### Params
```
:id   The id of the invite
```
### Returns
```json
{
  "context": "Server/Invite/",
  "method": "GET",
  "params": {
    "inviteId": "<inviteId>"
  },
  "data": {
    "totalItems": 1,
    "fields": {
      "created_at": {
        "modelName": "Server_User_Connect",
        "name": "created_at",
        "typeName": "DateTime",
        "isList": false,
        "isEnum": false
      },
      "server_id": {
        "modelName": "Server_User_Connect",
        "name": "server_id",
        "typeName": "String",
        "isList": false,
        "isEnum": false
      },
      "user_id": {
        "modelName": "Server_User_Connect",
        "name": "user_id",
        "typeName": "String",
        "isList": false,
        "isEnum": false
      }
    },
    "items": [
      {
        "created_at": "<Date of creation ISO format>",
        "server_id": "<serverId>",
        "user_id": "<userId>"
      }
    ]
  }
}
```
## 🔒 PUT /api/token/refresh
To get an access token by sending the refresh token.
The acces token has a shorter lifetime so if it leaks is not as big of a problem.

### Returns
```json
{
  "context": "Token/Refresh",
  "method": "GET",
  "data": {
    "totalItems": 1,
    "items": [
      {
        "token": "Bearer <JWT access token>"
      }
    ]
  }
}
```

---

# Error responses
The error responses follow the same format everywhere

```json
{
  "url": "<The URL wich from the error originates>",
  "statusCode": "<error status code>",
  "statusMessage": "<error status message>",
  "message": "<error message>",
  "stack": "",
  "data": [
    {
      "domain": "",
      "reason": "",
      "message": ""
    }
  ]
}
```

