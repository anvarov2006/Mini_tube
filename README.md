# MiniTube — Backend API

MiniTube — YouTube uslubidagi video platforma uchun REST API.

## Texnologiyalar

- Node.js
- Express.js
- PostgreSQL
- JWT Authentication
- Bcrypt
- Joi Validation
- Nodemailer

## Loyihani ishga tushirish

### 1. Database — PostgreSQL

PostgreSQL o‘rnatilgan bo‘lishi kerak.

Avval `mini_tube` nomli database yarating:

```sql
CREATE DATABASE mini_tube;
```

Backend papkasida terminalni ochib, database sxemasini ishga tushiring:

```bash
psql -d mini_tube -f schema.sql
```

### 2. Backend

Backend papkasiga kiring:

```bash
cd backend
```

Kerakli paketlarni o‘rnating:

```bash
npm install
```

`.env.example` faylidan nusxa olib, `.env` nomli fayl yarating va PostgreSQL, JWT hamda Gmail App Password ma'lumotlarini kiriting.

Serverni ishga tushiring:

```bash
npm run dev
```

Backend manzili:

`http://localhost:4000`

### 3. Frontend

Frontend papkasiga kiring:

```bash
cd frontend
```

Kerakli paketlarni o‘rnating:

```bash
npm install
```

Frontendni ishga tushiring:

```bash
npm run dev
```

Frontend manzili:

`http://localhost:5173`

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Ro‘yxatdan o‘tish |
| POST | `/api/auth/login` | Tizimga kirish |
| GET | `/api/videos` | Barcha videolar |
| GET | `/api/videos/:id` | Bitta videoni olish |
| POST | `/api/videos` | Video qo‘shish |
| GET | `/api/videos/:id/comments` | Izohlarni olish |
| POST | `/api/videos/:id/comments` | Izoh qo‘shish |

## Authentication

Himoyalangan endpointlar uchun JWT token talab qilinadi.

Authorization header:

```text
Authorization: Bearer YOUR_TOKEN
```

## Database

Loyihada PostgreSQL ishlatiladi. Ma'lumotlar `users`, `videos` va `comments` jadvallarida saqlanadi.

## Eslatma

`.env` va `node_modules` GitHub repository'ga yuklanmaydi. `.env.example` fayli loyiha sozlamalarini ko‘rsatish uchun taqdim etiladi.
