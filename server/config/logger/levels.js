
export const levels = {
  error: 0,       
  warn: 1,       
  info: 2,       
  http: 3,       
  verbose: 4,     
  debug: 5,       
  silly: 6        
};

export const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  verbose: 'cyan',
  debug: 'blue',
  silly: 'grey'
};
export default {
  levels,
  colors
};

export const customLevels = {
  levels: {
    critical: 0,
    error: 1,
    warning: 2,
    notice: 3,
    info: 4,
    debug: 5
  },
  colors: {
    critical: 'red bold',
    error: 'red',
    warning: 'yellow',
    notice: 'blue',
    info: 'green',
    debug: 'grey'
  }
};