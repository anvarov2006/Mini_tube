
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { query } from "../db.js";
import { sendWelcomeEmail } from "../utils/mailer.js";

export async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    const existingUser = await query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        message: "Bu email allaqachon ro'yxatdan o'tgan",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await query(
      `INSERT INTO users (name, email, password)
       VALUES ($1, $2, $3)
       RETURNING id, name, email`,
      [name, email, hashedPassword]
    );

    const user = result.rows[0];

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    try {
      await sendWelcomeEmail(user.email, user.name);
    } catch (emailError) {
      console.error("Welcome email yuborilmadi:", emailError.message);
    }

    return res.status(201).json({
      message: "Ro'yxatdan muvaffaqiyatli o'tdingiz",
      user,
      token,
    });
  } catch (error) {
    console.error("Register xatosi:", error.message);

    return res.status(500).json({
      message: "Serverda xatolik",
    });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const result = await query(
      "SELECT id, name, email, password FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        message: "Email yoki parol noto'g'ri",
      });
    }

    const userFromDb = result.rows[0];

    const isPasswordCorrect = await bcrypt.compare(
      password,
      userFromDb.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Email yoki parol noto'g'ri",
      });
    }

    const user = {
      id: userFromDb.id,
      name: userFromDb.name,
      email: userFromDb.email,
    };

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Login muvaffaqiyatli",
      user,
      token,
    });
  } catch (error) {
    console.error("Login xatosi:", error.message);

    return res.status(500).json({
      message: "Serverda xatolik",
    });
  }
}
