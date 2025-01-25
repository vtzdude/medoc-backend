import pino from 'pino';
import dotenv from 'dotenv';
dotenv.config();
const l = pino({
  name: process.env.PROJECT_NAME,
  level: process.env.LOG_LEVEL,
  transport: {
    target: 'pino-pretty', //discussion on logger file
    options: {
      colorize: true,
      levelKey: 'level', // --levelKey
      translateTime: 'yyyy-dd-mm, h:MM:ss TT',
      customColors: 'err:red,info:blue', // --customColors
      customLevels: 'err:99,info:1', // --customLevels
    },
  },
});

export default l;
