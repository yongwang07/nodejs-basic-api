import * as fs from "fs";
import * as winston from "winston";

if (!fs.existsSync("logs")) {
  fs.mkdirSync("logs");
}

export const logger = new winston.Logger({
  transports: [
    new winston.transports.File({
      level: "info",
      filename: "logs/app.log",
      maxsize: 1048576,
      maxFiles: 10,
      colorize: false
    })
  ]
});