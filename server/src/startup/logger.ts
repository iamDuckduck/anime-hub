import winston from "winston";

// log unhandled rejection
export const handleRejection = function () {
  process.on("unhandledRejection", (ex) => {
    throw ex;
  });
};

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.prettyPrint()
  ),
  defaultMeta: { service: "user-service" },
  exceptionHandlers: [
    new winston.transports.File({ filename: "exceptions.log" }),
    new winston.transports.Console(),
  ],
  transports: [
    new winston.transports.File({ filename: "logfile.log", level: "error" }),
    new winston.transports.Console(),
  ],
});
