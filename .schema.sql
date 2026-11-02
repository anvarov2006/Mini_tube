
-- MiniTube ma'lumotlar bazasi

-- 1. USERS jadvali
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE IF NOT EXISTS videos (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL
        REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    video_url TEXT NOT NULL,
    views INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 3. COMMENTS jadvali
CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    video_id INTEGER NOT NULL
        REFERENCES videos(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL
        REFERENCES users(id) ON DELETE CASCADE,
    text VARCHAR(500) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Demo foydalanuvchi
-- PASSWORD_HASH o'rniga haqiqiy bcrypt hash yozing.
INSERT INTO users (name, email, password)
VALUES (
    'Demo kanal',
    'demo@minitube.uz',
    '$2b$10$aLZOWfpR/I6u.NdG32aqpOhR3CW2v1ILFrUQpk74FMDguJspGdo66'
)
ON CONFLICT (email) DO NOTHING;

-- Namuna videolar
-- Demo kanal ID sini email orqali aniqlaymiz.
INSERT INTO videos (user_id, title, description, video_url)
SELECT
    u.id,
    v.title,
    v.description,
    v.video_url
FROM users u
CROSS JOIN (
    VALUES
    (
        'Tabiat manzaralari',
        'Go''zal tabiat manzaralari.',
        'https://www.youtube.com/watch?v=ScMzIvxBSi4'
    ),
    (
        'Dasturlashni o''rganamiz',
        'Dasturlash haqida video.',
        'https://www.youtube.com/watch?v=PkZNo7MFNFg'
    ),
    (
        'Sayohat olami',
        'Dunyo bo''ylab sayohat.',
        'https://www.youtube.com/watch?v=LXb3EKWsInQ'
    ),
    (
        'Texnologiyalar',
        'Zamonaviy texnologiyalar haqida.',
        'https://www.youtube.com/watch?v=aircAruvnKk'
    ),
    (
        'Musiqa va hordiq',
        'Dam olish uchun video.',
        'https://www.youtube.com/watch?v=jfKfPfyJRdk'
    )
) AS v(title, description, video_url)
WHERE u.email = 'demo@minitube.uz'
  AND NOT EXISTS (
      SELECT 1
      FROM videos existing
      WHERE existing.user_id = u.id
        AND existing.title = v.title
  );
