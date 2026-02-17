import app from "./app.js";
import logger from "./config/logger/main.js";
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
   logger.info(`Node сервер запущено http://localhost:${PORT}`);
  logger.info("`CORS дозволено для: http://localhost:5173`")
});