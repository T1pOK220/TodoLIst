// config/logger/transports.js
import winston from 'winston';
import 'winston-daily-rotate-file';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Основний експорт - функція, яка повертає транспорти
export const getTransports = (env) => {
  const transports = [];
  const logDir = join(process.cwd(), 'logs');
  
  // 1. Консольний транспорт
  if (env !== 'test') {
    transports.push(
      new winston.transports.Console({
        level: env === 'production' ? 'info' : 'debug',
        handleExceptions: true,
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple()
        )
      })
    );
  }
  
  // 2. Файлові транспорти для продакшн
  if (env === 'production') {
    // Основний лог-файл з ротацією
    transports.push(
      new winston.transports.DailyRotateFile({
        filename: join(logDir, 'application-%DATE%.log'),
        datePattern: 'YYYY-MM-DD',
        maxSize: '20m',
        maxFiles: '30d',
        level: 'info',
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json()
        )
      })
    );
    
    // Файл помилок
    transports.push(
      new winston.transports.File({
        filename: join(logDir, 'errors.log'),
        level: 'error',
        maxsize: 10 * 1024 * 1024,
        maxFiles: 10,
        tailable: true
      })
    );
  }
  
  // 3. Для розробки
  if (env === 'development') {
    transports.push(
      new winston.transports.File({
        filename: join(logDir, 'combined.log'),
        maxsize: 5 * 1024 * 1024,
        maxFiles: 3,
        level: 'debug'
      })
    );
  }
  
  return transports;
};

// Додаткові спеціалізовані транспорти
export const createMongoTransport = (connectionString) => {
  const { MongoDB } = winston.transports;
  return new MongoDB({
    db: connectionString,
    collection: 'logs',
    level: 'error',
    capped: true,
    cappedSize: 10000000
  });
};

export const createSlackTransport = (webhookUrl) => {
  // Потрібно встановити: npm install winston-slack-webhook-transport
  import('winston-slack-webhook-transport').then(({ default: SlackHook }) => {
    return new SlackHook({
      webhookUrl,
      channel: '#errors',
      username: 'Logger Bot',
      level: 'error',
      format: winston.format.combine(
        winston.format.printf((info) => `🚨 ${info.message}`)
      )
    });
  });
};

// Експорт за замовчуванням
export default getTransports;