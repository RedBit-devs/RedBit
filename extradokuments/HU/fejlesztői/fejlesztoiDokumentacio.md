[![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/)
[![Nuxtjs](https://img.shields.io/badge/Nuxt-002E3B?style=for-the-badge&logo=nuxtdotjs&logoColor=#00DC82)](https://nuxt.com/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://www.prisma.io/)

<!--
jelvények innen:
- https://github.com/Ileriayo/markdown-badges#readme
-->

# RedBit
A felhasználói dokumentáció megtalálható a tároló [wiki oldalán](https://github.com/RedBit-devs/RedBit/wiki)

## [Rólunk](https://github.com/RedBit-devs/RedBit/wiki)

Ez a projekt iskolai feladatként készült.

## Célok

Célunk egy teljesen nyílt forráskódú chat alkalmazás létrehozása. Minimális adatgyűjtéssel, és teljes átláthatósággal ezen minimális adatkezelés iránt a felhasználók felé.
Hisszük, hogy minden felhasználónak joga van módosítani a használt szoftvert (vagy hozzájárulni a fő projekthez).

# Kezdeti lépések

További információért nézd meg a [Nuxt dokumentációját](https://nuxt.com/docs/getting-started/introduction).

## Telepítés

Győződj meg róla, hogy telepítetted a függőségeket:

```bash
npm install
```

## Fejlesztői szerver

Indítsd el a fejlesztői szervert a `http://localhost:3000` címen:

```bash
npm run dev
```

## Éles verzió

Az alkalmazás buildelése éles környezetre:

**Figyelem:** ***A fájlútvonalban ne legyenek szóközök buildeléskor***
```bash
npm run build
```

A buildelt éles verzió helyi előnézete:

```bash
npm run preview
```

További részletekért nézd meg a [telepítési dokumentációt](https://nuxt.com/docs/getting-started/deployment).

# Fejlesztés
Az API dokumentáció megtalálható a [felhasználói dokumentációban, a wiki oldalon](https://github.com/RedBit-devs/RedBit/wiki/API)

## Komponensek
<!-- Részletes leírás minden szoftvermodulról vagy komponensről, azok feladatairól és működéséről. -->
### [BasicShowcaseCard](https://github.com/RedBit-devs/RedBit/blob/main/components/BasicShowcaseCard.vue)
Kártya formában jelenít meg információkat a nyitóoldalon.
A "kép" mező lehet egy ikon vagy egy kép is.
Ikon használatához a megadást `icon:` előtaggal kell kezdeni.
<details>
<summary>Kép</summary>
        
![kép](https://github.com/user-attachments/assets/c01e8cab-5e0f-4dcb-a26e-e0fb2b59f03b)
![kép](https://github.com/user-attachments/assets/baec50d0-5c6b-4268-b509-05324c87ff9c)

</details>

#### Props
```js
"cardData": {
        type: Object as PropType<CardData>
    }
```
Típusok
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
<summary>Kép</summary>
        
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
Üzenetek megjelenítésére használjuk.
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
    required: true,
},
```

### [ChatInputField](https://github.com/RedBit-devs/RedBit/blob/main/components/ChatInputFiled.vue)
A beviteli mező, ahol a felhasználó beírhatja az üzenetét és elküldheti más felhasználóknak vagy egy chat szobába.
### Props
```js
  "send": {
    type: Function,
    default: () => { }
  },
  "route": {
    type: String,
    default: ""
  }
```

### [CheckFriendProfileCard](https://github.com/RedBit-devs/RedBit/blob/main/components/CheckFriendProfileCard.vue)
Egy párbeszédablak, amit a felhasználó a barátja nevére kattintva nyithat meg. Megjeleníti az adott profilról az információkat. A felhasználó négy oldal között navigálhat, ahol megtekintheti a közös szervereket, barátokat vagy kezelheti a barátságot.

### Props
```js
    closeDialogFunc: {
        type: Function,
        default: () => { }
    },

    isDialogOpen: {
        type: Boolean,
        default: ref(false)
    }
```

### [CreateServer](https://github.com/RedBit-devs/RedBit/blob/main/components/CreateServer.vue)
Egy felugró ablak, ahol a felhasználó saját szervert hozhat létre, miután a "Szerver létrehozása" gombra kattintott.

### Props
```js
 isShown: {
    type: Boolean,
    default: false,
  },
  closeDialogFunc: {
    type: Function,
    default: () => { },
  }
```

## Adatbázis
<!-- Az adatbázis séma leírása, beleértve a táblákat, oszlopokat, kapcsolatokat és indexeket. -->
Az adatbázishoz a [prisma.io](https://www.prisma.io/) ORM-et használjuk.
Az adatbázis séma a projekt gyökérkönyvtárában található: [/prisma/schema.prisma](https://github.com/RedBit-devs/RedBit/blob/main/prisma/schema.prisma)

## Külső rendszerek
<!-- Ha a rendszer más rendszerekkel kommunikál, akkor ezek integrációinak részletes leírása. -->
### [Emailküldés](https://support.google.com/a/answer/176600)

# Hosztolás
Éles környezetre történő buildelés után a build fájlok a `.output/server/index.mjs` alatt találhatók.
Node-dal futtatható:

```bash
node .output/server/index.mjs
```

## Környezeti változók (ENV)
Egy [példa .env fájlra](https://github.com/RedBit-devs/RedBit/blob/main/.env.example) megtalálható a projekt gyökerében.

- DATABASE_URL  
    - Adatbázis kapcsolat string  
    - Használható kapcsolat pooling

- DIRECT_URL  
   - Közvetlen kapcsolat az adatbázissal, migrációkhoz.  
   - Ne használj poolingot.

- JWT_SECRET  
  - JWT token titkosítási kulcs

- NUXT_NODEMAILER_FROM  
  - Az az email cím, amiről a rendszer levelet küld a felhasználónak

- NUXT_NODEMAILER_AUTH_PASS  
  - Emailküldési jelszó

[Használt SMTP szolgáltató](https://support.google.com/a/answer/176600)
