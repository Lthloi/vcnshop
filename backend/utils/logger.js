import logger from "../configs/winston.js"

class WinstonLogger {
    #logger = logger;

    log(message) {
        this.#logger.log(message)
    }
}

const winstonLogger = new WinstonLogger()

export default winstonLogger 