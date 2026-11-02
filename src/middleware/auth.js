
import jwt from "jsonwebtoken";

export function auth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Token kiritilmagan",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.id,
      email: decoded.email,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Token noto'g'ri yoki muddati tugagan",
    });
  }
}
