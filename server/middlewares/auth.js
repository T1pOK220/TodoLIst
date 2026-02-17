import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const AuthorizationMiddleware = (req, res, next) => {
  console.log("🔐 AuthorizationMiddleware: ПОЧАТОК");
  console.log("URL:", req.originalUrl);
  console.log("Method:", req.method);
  console.log("Authorization header:", req.headers.authorization);
  
  try {
    const JWT_SECRET = process.env.JWT_SECRET;
    
    if (!JWT_SECRET) {
      console.error("❌ JWT_SECRET не налаштовано в .env файлі");
      return res.status(500).json({ error: "Помилка конфігурації сервера" });
    }
    
    const authHeader = req.headers.authorization;
    console.log("Заголовок отримано:", authHeader);
    
    if (!authHeader) {
      console.log("❌ Заголовок Authorization відсутній");
      return res.status(401).json({ error: "Токен не надано" });
    }
    
    const parts = authHeader.split(" ");
    console.log("Розділені частини:", parts);
    console.log("Кількість частин:", parts.length);
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      console.log("❌ Неправильний формат токена");
      console.log("Очікується: 'Bearer <token>'");
      console.log("Отримано:", authHeader);
      return res.status(401).json({ error: "Неправильний формат токена" });
    }
    
    const token = parts[1];
    console.log("Токен отримано (перші 20 символів):", token.substring(0, 20) + "...");
    console.log("Довжина токена:", token.length);
    
    // Перевірка на пустий токен
    if (!token.trim()) {
      console.log("❌ Токен порожній");
      return res.status(401).json({ error: "Токен порожній" });
    }
    
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("✅ Токен валідний. Дані:", decoded);
    req.user = decoded;
    req.token = token;
    req.user_id = req.user.id;
    
    console.log("🔐 AuthorizationMiddleware: ВИКОНАНО УСПІШНО");
    next(); // Викликаємо після всіх логів
    
  } catch (error) { // ВИПРАВЛЕНО: error, не err
    console.error('❌ Помилка авторизації:', error.message);
    console.error('Тип помилки:', error.name);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Невалідний токен' });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Токен прострочено' });
    }
    
    if (error.name === 'SyntaxError') {
      return res.status(401).json({ error: 'Неправильний формат токена' });
    }
    
    return res.status(500).json({ error: 'Помилка сервера при авторизації' });
  }
};