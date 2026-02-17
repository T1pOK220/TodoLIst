// config/logger/formats.js
import winston from 'winston';
const { format } = winston;
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Для ES модулів потрібно отримати __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 1. ФОРМАТ для РОЗРОБКИ (консоль з кольорами)
export const consoleFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.colorize({ all: true }),
  format.printf((info) => {
    const { timestamp, level, message, ...meta } = info;
    return `[${timestamp}] ${level}: ${message} ${
      Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''
    }`;
  })
);

// 2. ФОРМАТ для ПРОДАКШН (JSON для файлів)
export const fileFormat = format.combine(
  format.timestamp(),
  format.errors({ stack: true }),
  format.json(),
  format.uncolorize()
);

// 3. ФІЛЬТР чутливих даних
export const sensitiveDataFilter = format((info) => {
  const sensitiveFields = [
    'password', 'token', 'secret', 
    'apiKey', 'creditCard', 'ssn',
    'authorization', 'cookie'
  ];
  
  const maskSensitiveData = (obj) => {
    if (!obj || typeof obj !== 'object') return obj;
    
    const masked = { ...obj };
    sensitiveFields.forEach(field => {
      if (masked[field]) {
        masked[field] = '***HIDDEN***';
      }
    });
    
    Object.keys(masked).forEach(key => {
      if (typeof masked[key] === 'object') {
        masked[key] = maskSensitiveData(masked[key]);
      }
    });
    
    return masked;
  };
  
  return {
    ...info,
    ...maskSensitiveData(info)
  };
});

// 4. Додаткові формати
export const httpFormat = format.combine(
  format.timestamp(),
  format.printf(({ timestamp, message, meta }) => {
    const { method, url, status, responseTime } = meta;
    return `${timestamp} ${method} ${url} ${status} ${responseTime}ms`;
  })
);

export const auditFormat = format.combine(
  format.timestamp(),
  format.metadata(),
  format.json()
);

// Експорт за замовчуванням
export default {
  consoleFormat,
  fileFormat,
  sensitiveDataFilter,
  httpFormat,
  auditFormat
};