
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendWelcomeEmail(email, name) {
  return transporter.sendMail({
    from: `"MiniTube" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "MiniTube platformasiga xush kelibsiz!",
    text: `Salom, ${name}! MiniTube platformasida ro'yxatdan o'tganingiz uchun rahmat.`,
    html: `
      <h2>MiniTube platformasiga xush kelibsiz!</h2>
      <p>Salom, <b>${name}</b>!</p>
      <p>Ro'yxatdan o'tganingiz uchun rahmat. Endi MiniTube'dan foydalanishingiz mumkin.</p>
    `,
  });
}



export async function sendCommentEmail(
  authorEmail,
  authorName,
  commenterName,
  videoTitle,
  commentText
) {
  return transporter.sendMail({
    from: `"MiniTube" <${process.env.SMTP_USER}>`,
    to: authorEmail,
    subject: "Videongizga yangi izoh yozildi!",
    text: `
Salom, ${authorName}!

"${videoTitle}" nomli videongizga ${commenterName} izoh yozdi.

Izoh: ${commentText}
    `,
    html: `
      <h2>Videongizga yangi izoh yozildi!</h2>
      <p>Salom, <b>${authorName}</b>!</p>
      <p><b>${videoTitle}</b> nomli videongizga
      <b>${commenterName}</b> izoh yozdi.</p>
      <p>Izoh: ${commentText}</p>
    `,
  });
}
