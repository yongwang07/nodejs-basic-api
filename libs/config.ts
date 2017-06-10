import {logger} from './logger';

export const config = {
database: "ntask",
  username: "",
  password: "",
  params: {
    logging: (sql) => {
      logger.info(`[${new Date()}] ${sql}`);
    },
    define: {
      underscored: true
    }
  },
  jwtSecret: "Nta$K-AP1",
  jwtSession: {session: false}
}