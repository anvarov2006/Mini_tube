# MiniTube Backend API

MiniTube — YouTube uslubidagi video platforma uchun REST API backend loyihasi.

## Texnologiyalar

- Node.js
- Express.js
- PostgreSQL
- JWT
- bcrypt
- Joi
- Nodemailer

## Loyihani ishga tushirish

### 1. Database

PostgreSQL’da `mini_tube` nomli database yarating va loyiha papkasida quyidagi buyruqni bajaring:

```bash
psql -d mini_tube -f schema.sql
```

### 2. Backend

Kerakli paketlarni o‘rnating:

```bash
npm install
```

`.env.example` faylidan `.env` yarating va kerakli qiymatlarni kiriting.

Serverni ishga tushiring:

```bash
npm run dev
```

Backend manzili: `http://localhost:4000`

### 3. Frontend

Ushbu topshiriqda frontend talab qilinmaydi. API endpointlarini Postman orqali tekshirish mumkin.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Ro‘yxatdan o‘tish |
| POST | `/api/auth/login` | Tizimga kirish |
| GET | `/api/videos` | Videolar ro‘yxati |
| GET | `/api/videos/:id` | Bitta video |
| POST | `/api/videos` | Video qo‘shish |
| GET | `/api/videos/:id/comments` | Izohlar ro‘yxati |
| POST | `/api/videos/:id/comments` | Izoh qoldirish |

## Eslatma

`.env` va `node_modules` GitHub’ga yuklanmaydi. `.env.example` repozitoriyada mavjud bo‘lishi kerak.
