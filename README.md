[![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/)
[![Nuxtjs](https://img.shields.io/badge/Nuxt-002E3B?style=for-the-badge&logo=nuxtdotjs&logoColor=#00DC82)](https://nuxt.com/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://www.prisma.io/)

<!--
badges from:
- https://github.com/Ileriayo/markdown-badges#readme
-->

# RedBit
The documentation for users can be found at the repositories [wiki page](https://github.com/RedBit-devs/RedBit/wiki)


## [About](https://github.com/RedBit-devs/RedBit/wiki)

This project was made as a project for school.

## Goals

We aim to make a fully open source chat. With minimal data collection, and being fully transparent about that minimal data towards the user.
We believe that everyone who uses a program should be given the opportunity to modify the software they use. (or contribute to the main project)


# Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

# Development
The documentation for the API can be found in the [user documentation on the wiki page](https://github.com/RedBit-devs/RedBit/wiki/API)

## Components
<!--A detailed description of each software module or component, including their responsibilities and operation.-->
### [BasicShowcaseCard](https://github.com/RedBit-devs/RedBit/blob/main/components/BasicShowcaseCard.vue)
It is used for displaying information in a card form on the landingpage.
For the "picture" eather an icon or an image can be provided.
To use an icon you must start it with ``icon:``
<details>
<summary>Picture</summary>
        
![kép](https://github.com/user-attachments/assets/c01e8cab-5e0f-4dcb-a26e-e0fb2b59f03b)
![kép](https://github.com/user-attachments/assets/baec50d0-5c6b-4268-b509-05324c87ff9c)

</details>

#### Props
```js
"cardData": {
        type: Object as PropType<CardData>
    }
```
Types
```js
type CardData = {
  imageUrl?: string;
  headerText?: string;
  bubbles?: Bubble[];
  description?: string;
};
type Bubble = {
  url: string;
  name: string;
  imageUrl: string;
};
```

### [ChatCard](https://github.com/RedBit-devs/RedBit/blob/main/components/ChatCard.vue)
<details>
<summary>Picture</summary>
        
![kép](https://github.com/user-attachments/assets/ed7bb19e-0275-4aa4-8693-edcbfe563b39)
</details>
#### Props
```js
'name': {
    type: String
},
'picture': {
    type: String,
    default: ""
},
'activity': {
    type: String,
    default: ""
}
```

### [ChatMessage](https://github.com/RedBit-devs/RedBit/blob/main/components/ChatMessage.vue)
used for displaying messages sent.
### Props
```js
authorImage: {
    type: String,
    required: true,
    default: ""
},
authorName: {
    type: String,
    required: true
},
message: {
    type: String,
    required: true
},
```

## Database
<!-- A description of the database schema, including tables, columns, relations, and indexes. -->
For the database we use [prisma.io](https://www.prisma.io/) ORM.
The database schema can be found in the projects root folder [/prisma/schema.prisma](https://github.com/RedBit-devs/RedBit/blob/main/prisma/schema.prisma)

## External
<!-- If the system communicates with other systems, a detailed description of these integrations is provided. -->
### [Mailing](https://support.google.com/a/answer/176600)

# Hosting
For production, after building the project successfully the builded files can be found at .output/server/index.mjs.
It can be run with node
```bash
node .output/server/index.mjs
```
## ENV
An [example for the env](https://github.com/RedBit-devs/RedBit/blob/main/.env.example) is found in the projects root directory.
- DATABASE_URL
    - A connection string for the database used
    - Can use connection pooling 
 
- DIRECT_URL
   - Direct connection to the database. Used for migrations.
   - A connection string for the database used
   - Do not use connection pooling
 
- JWT_SECRET
  - JWT token encription key
 

- NUXT_NODEMAILER_FROM
  - Email address used for sending emails to the user
- NUXT_NODEMAILER_AUTH_PASS
  - Mailing secret

[SMTP server provider used](https://support.google.com/a/answer/176600)
