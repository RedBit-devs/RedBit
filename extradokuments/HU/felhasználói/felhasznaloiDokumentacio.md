# A RedBit weboldal navigációja

A RedBit egy ingyenes és nyílt forráskódú kommunikációs platform, amely zökkenőmentes kapcsolatokat tesz lehetővé közvetlen üzenetküldés és csoportos csevegések révén. A RedBit funkcióinak felfedezéséhez és használatához kövesd ezt az útmutatót, hogy hatékonyan navigálj az oldalon.

## A weboldal elérése

# Főoldal

Főoldal: Látogasd meg a RedBit főoldalát itt: [Főoldal](https://redbit.netlify.app/).

### Fő navigációs menü

A fő navigációs menü az oldal tetején található, és a következő szakaszokat tartalmazza:

* Főoldal: Visszairányít a kezdőlapra.
* Rólunk: Információkat nyújt a RedBit küldetéséről és funkcióiról.
* Kapcsolat: Kapcsolati adatokat kínál kérdések és támogatás esetére.
* Chat: Ha a felhasználó nincs bejelentkezve, a regisztrációs oldalra irányít, ha be van jelentkezve, a chat oldalra.

### Főoldal áttekintése

A főoldal a RedBit legfontosabb információit mutatja be:

* Szlogen szekció: Bemutatja a platform szlogenjét, hangsúlyozva annak alapvető értékeit.
* Funkciókiemelések: Ismerteti a RedBit főbb jellemzőit, mint például a gyors kommunikáció, közvetlen üzenetküldés és csoportos csevegések.
* Fejlesztői csapat: Bemutatja a fejlesztőcsapatot rövid leírásokkal és képekkel.
* Fő technológiák: Felsorolja azokat a technológiákat és szolgáltatásokat, amelyek a RedBit működését biztosítják, például Prisma, Nuxt.js és Supabase.

# Chat oldal

## Navigációs panel

A panel az oldal bal oldalán található.
A panel tartalma dinamikusan generálódik a bejelentkezett felhasználó számára.

- A bal szélső rész tartalmazza a szerverválasztót, ahol a felhasználó kiválaszthatja az elérhető szerverek egyikét vagy létrehozhat sajátot.
- A panel jobb oldalán található a chatszoba-választó; ha egy szerver ki van választva, akkor felsorolja azokat a csevegőszobákat, amelyekhez a felhasználó csatlakozhat.
- Az alján található a felhasználói információ és a gomb a felhasználói beállításokhoz való navigáláshoz.

# Az API dokumentációja

### Néhány információ
- 🔒 Az API útvonal előtti lakat azt jelenti, hogy az `Authorization` fejlécet meg kell adni érvényes hozzáférési tokennel rendelkező felhasználóként
- Az alap URL nincs megadva, de minden végpont elérhető így: `http://localhost:3000/api/XYZ`
- Az API útvonal előtti szó jelenti a kérés típusát

---

# Felhasználó
## PUT /api/user
Ez a kérés új felhasználók létrehozására szolgál.
Például egy felhasználó regisztrál

A jelszó egyszerű szövegként kerül elküldésre, de sózott 🧂 és hashelt formában tárolódik

### Fejléc
```http
Content-Type: application/json
```

### Törzs
```http
{
    "username": "FelhasznaloNevem",
    "email": "pelda@pelda.hu",
    "birthdate": "1999-01-01",
    "first_name": "János",
    "last_name": "Kovács",
    "password": "Jelszo123@"
}
```

Mező validálás
```js
// RegExp
email: /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/                              // érvényes email formátum
password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/    // legalább egy nagy- és kisbetű, szám és speciális karakter [@$!%*#?&], legalább 8 karakter
username: /^[a-zA-Z0-9_]{3,32}/                                                       // 3 és 32 karakter, aláhúzás megengedett
name: /^[a-zA-Z]{3,35}/                                                               // 3 és 35 karakter, névre alkalmazva
```

### Válasz
```json
{
  "context": "User/Create",
  "method": "PUT",
  "params": {
    "username": "FelhasznaloNevem",
    "email": "pelda@pelda.hu",
    "birthdate": "1999-01-01",
    "first_name": "János",
    "last_name": "Kovács"
  },
  "data": {
    "id": "<felhasználóId>",
    "username": "FelhasznaloNevem",
    "email": "pelda@pelda.hu",
    "profile_picture": null,
    "birthdate": "1999-01-01T00:00:00.000Z",
    "first_name": "János",
    "last_name": "Kovács",
    "description": null,
    "created_at": "<aktuális dátum ISO formátumban>",
    "password": "🧂hash🧂",
    "email_verified": false
  }
}
```

## POST /api/user/login

### Fejléc
```http
Content-Type: application/json
```

### Törzs
```http
{
    "email":"pelda@pelda.hu",
    "password":"Jelszo123@"
}
```

Mező validálás
```js
// RegExp
email: /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/                              // érvényes email
password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/    // legalább egy nagybetű, kisbetű, szám, speciális karakter, min. 8 karakter
```

### Válasz
```json
{
  "context": "UserLogin",
  "method": "POST",
  "params": {
    "email": "pelda@pelda.hu",
    "password": "Jelszo123@"
  },
  "data": {
    "totalItems": 1,
    "items": [
      {
        "token": "Bearer <JWT frissítőToken>"
      }
    ]
  }
}
```

## 🔒 GET /api/user/
Az aktuálisan bejelentkezett felhasználó adatai

### Válasz
```json
{
  "context": "User/Get",
  "method": "GET",
  "data": {
    "id": "<felhasználóId>",
    "username": "FelhasznaloNevem",
    "email": "pelda@pelda.hu",
    "profile_picture": "<profilkép URL>",
    "birthdate": "1990-01-01T00:00:00.000Z",
    "first_name": "János",
    "last_name": "Kovács",
    "description": "<felhasználó leírása>",
    "created_at": "<létrehozás dátuma ISO formátumban>",
    "password": "🧂hash🧂",
    "email_verified": false
  }
}
```

## GET  /api/user/verifyEmail
Ezt kell elküldeni a felhasználónak az email cím igazolásához

### Lekérdezési paraméterek
```
id     <felhasználóId>
email  pelda@pelda.hu
```

### Válasz
```json
{
  "context": "user/verifyEmail",
  "method": "GET",
  "params": {
    "id": "<felhasználóId>",
    "email": "pelda@pelda.hu"
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
# Szerver
## 🔒 PUT /api/server/
Új szerver létrehozása

### Fejlécek
```http
Content-Type: application/json
```

### Törzs
```http
{
    "name":"Példa szervernév",
    "picture": "https://i.pinimg.com/736x/71/e7/d4/71e7d4042683fbca02c8ad85666b0e33.jpg",
    "visibility":"<public vagy private>"
}
```

### Válasz
```json
{
  "context": "Server/Create",
  ...
}
```

## 🔒 GET /api/server/:serverId
A szerver adatai, ha a felhasználó csatlakoztatva van

### Paraméterek
```
:serverId    A szerver azonosítója
```

### Válasz
```json
{
  "context": "Server/Get",
  ...
}
```

## 🔒 PUT /api/server/invite/
Meghívó létrehozása egy csatlakozott szerverhez

### Fejléc
```http
Content-Type: application/json
```

### Törzs
```http
{
    "lifetime": "<meghívó élettartama ezredmásodpercben>",
    "server_id":"<szerverId>"
}
```

### Válasz
```json
{
  "context": "Server/Invite/Create",
  ...
}
```

## 🔒 GET /api/server/invite/:id
Meghívó elfogadása

### Paraméterek
```
:id   A meghívó azonosítója
```

### Válasz
```json
{
  "context": "Server/Invite/",
  ...
}
```

## 🔒 PUT /api/token/refresh
Hozzáférési token lekérése frissítő token használatával.  
A hozzáférési token rövidebb élettartamú, így kevésbé veszélyes, ha kiszivárog.

### Válasz
```json
{
  "context": "Token/Refresh",
  ...
}
```

---

# Hiba válaszok
A hibaüzenetek formátuma mindenhol egységes:

```json
{
  "url": "<A hiba forrásául szolgáló URL>",
  "statusCode": "<hiba státuszkód>",
  "statusMessage": "<hiba státusz üzenet>",
  "message": "<hibaüzenet>",
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
