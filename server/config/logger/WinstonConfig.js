// config/logger/WinstonConfig.js
import winston from 'winston';
import { levels, colors } from './levels.js';
import * as formats from './formats.js';
import { getTransports } from './transports.js';
import os from 'os';

export class WinstonConfig {
  constructor(options = {}) {
    this.serviceName = options.serviceName || 'App';
    this.env = options.env || process.env.NODE_ENV || 'development';
    
    // Додаємо кольори до Winston
    winston.addColors(colors);
    
    this.logger = this.createLogger();
  }
  
  createLogger() {
    // Вибір формату залежно від середовища
    const format = this.env === 'production' 
      ? formats.fileFormat 
      : formats.consoleFormat;
    
    // Створення логера
    const logger = winston.createLogger({
      level: this.getLogLevel(),
      levels: levels,
      
      format: winston.format.combine(
        formats.sensitiveDataFilter(),
        format
      ),
      
      defaultMeta: {
        service: this.serviceName,
        environment: this.env,
        nodeVersion: process.version,
        pid: process.pid,
        hostname: os.hostname(),
        platform: os.platform()
      },
      
      transports: getTransports(this.env),
      
      exceptionHandlers: [
        new winston.transports.File({
          filename: 'logs/exceptions.log',
          maxsize: 5 * 1024 * 1024
        })
      ],
      
      rejectionHandlers: [
        new winston.transports.File({
          filename: 'logs/rejections.log',
          maxsize: 5 * 1024 * 1024
        })
      ],
      
      exitOnError: false,
      silent: this.env === 'test'
    });
    
    this.enhanceLogger(logger);
    
    return logger;
  }
  
  getLogLevel() {
    if (process.env.LOG_LEVEL) return process.env.LOG_LEVEL;
    
    const envLevels = {
      production: 'info',
      staging: 'verbose',
      development: 'debug',
      test: 'error'
    };
    
    return envLevels[this.env] || 'info';
  }
  
  enhanceLogger(logger) {
    // Дочірній логер
    logger.createChild = (additionalMeta) => {
      const childLogger = winston.createLogger({
        ...logger.options,
        defaultMeta: {
          ...logger.defaultMeta,
          ...additionalMeta
        }
      });
      
      this.enhanceLogger(childLogger);
      return childLogger;
    };
    
    // Таймер
    logger.measureTime = async (label, fn, context = {}) => {
      const startTime = Date.now();
      logger.debug(`${label} - started`, context);
      
      try {
        const result = await fn();
        const duration = Date.now() - startTime;
        
        logger.info(`${label} - completed`, {
          ...context,
          duration: `${duration}ms`,
          status: 'success'
        });
        
        return result;
      } catch (error) {
        const duration = Date.now() - startTime;
        
        logger.error(`${label} - failed`, {
          ...context,
          duration: `${duration}ms`,
          status: 'error',
          error: {
            message: error.message,
            name: error.name,
            stack: error.stack
          }
        });
        
        throw error;
      }
    };
    
    // HTTP логування
    logger.logHttp = (req, res, duration, additionalData = {}) => {
      logger.http('HTTP Request', {
        method: req.method,
        url: req.originalUrl || req.url,
        statusCode: res.statusCode,
        duration: `${duration}ms`,
        userAgent: req.get('user-agent'),
        ip: req.ip || req.connection.remoteAddress,
        ...additionalData
      });
    };
    
    // Бізнес-події
    logger.logEvent = (eventType, data = {}) => {
      logger.info(`EVENT: ${eventType}`, {
        eventType,
        ...data,
        timestamp: new Date().toISOString()
      });
    };
    
    // Безпечне логування помилок
    logger.logError = (error, context = {}) => {
      logger.error('Application Error', {
        error: {
          name: error.name,
          message: error.message,
          code: error.code,
          stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        },
        ...context
      });
    };
  }
  
  getLogger() {
    return this.logger;
  }
  
  // Статичний метод для швидкого створення
  static create(options = {}) {
    return new WinstonConfig(options).getLogger();
  }
}

export default WinstonConfig;