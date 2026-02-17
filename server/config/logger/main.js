// config/logger/index.js
import { WinstonConfig } from './WinstonConfig.js';

// Створюємо інстанс логера
const loggerInstance = new WinstonConfig({
  serviceName: process.env.APP_NAME || 'MyApp',
  env: process.env.NODE_ENV
});

// Готовий логер
export const logger = loggerInstance.getLogger();

// Клас для створення нових логерів
export { WinstonConfig };

// Функція для створення логера
export const createLogger = (options = {}) => {
  return new WinstonConfig(options).getLogger();
};

// Спеціалізовані логери
export const createHttpLogger = () => {
  return createLogger({
    serviceName: `${process.env.APP_NAME || 'App'}-HTTP`,
    env: process.env.NODE_ENV
  });
};

export const createDatabaseLogger = () => {
  return createLogger({
    serviceName: `${process.env.APP_NAME || 'App'}-Database`,
    env: process.env.NODE_ENV
  });
};

// Дефолтний експорт
export default logger;