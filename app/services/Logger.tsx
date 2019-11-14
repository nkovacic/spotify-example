import { UtilityHelper } from "./UtilityHelper";

enum LogLevel {
    debug = 'debug',
    error = 'error',
    info = 'info',
    log = 'log',
    warn = 'warn'
}

class Logger {
    private static printToConsole(message: string, logLevel: LogLevel, ...optionalParams: any[]) {
        if (__DEV__) {
            if (UtilityHelper.isEmpty(optionalParams)) {
                console[logLevel](message);
            }
            else {
                console[logLevel](message, optionalParams);
            }
        }
    }

    static debug(message: string, ...optionalParams: any[]) {
        this.printToConsole(message, LogLevel.debug, optionalParams);
    }

    static error(err: Error, message?: string) {
        if (err && err.message) {
            message = err.message;
        }

        this.printToConsole(message!, LogLevel.error, [err]);
    }

    static info(message: string, ...optionalParams: any[]) {
        this.printToConsole(message, LogLevel.info, optionalParams);
    }

    static log(message: string, ...optionalParams: any[]) {
        this.printToConsole(message, LogLevel.log, optionalParams);
    }

    static warn(message: string, ...optionalParams: any[]) {
        this.printToConsole(message, LogLevel.warn, optionalParams);
    }
}

export default Logger;
