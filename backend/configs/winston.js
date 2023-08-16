import winston, { format } from 'winston'
import { Loggly } from 'winston-loggly-bulk'

const logging_levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6
}

const custom_format = format.printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`
})

const logging_format = format.combine(
    format.timestamp(),
    format.json(),
    custom_format
)

// the final configuration
const logger = winston.createLogger({
    transports: [],
    format: logging_format,
    levels: logging_levels,
})

// add Loggly as a transport
logger.add(new Loggly({
    token: "9f7a2348-ae95-45b0-9f1f-f82d0be477f0",
    subdomain: "codevcn",
    tags: ["Winston-NodeJS"],
    json: true
}))

export default logger