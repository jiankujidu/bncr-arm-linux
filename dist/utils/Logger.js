"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const chalk_1 = __importDefault(require("chalk"));
class Logger {
    constructor(name = 'App') {
        this.debugMode = false;
        this.name = name;
        this.debugMode = process.env.DEBUG === 'true' || false;
    }
    getTimestamp() {
        return new Date().toISOString().replace('T', ' ').substring(0, 19);
    }
    formatMessage(level, message, ...args) {
        const timestamp = this.getTimestamp();
        const prefix = chalk_1.default.gray(`[${timestamp}]`) + ' ' + chalk_1.default.blue(`[${this.name}]`) + ' ';
        let levelColor;
        switch (level) {
            case 'INFO':
                levelColor = chalk_1.default.cyan;
                break;
            case 'SUCCESS':
                levelColor = chalk_1.default.green;
                break;
            case 'WARN':
                levelColor = chalk_1.default.yellow;
                break;
            case 'ERROR':
                levelColor = chalk_1.default.red;
                break;
            case 'DEBUG':
                levelColor = chalk_1.default.magenta;
                break;
            default:
                levelColor = chalk_1.default.white;
        }
        const levelStr = levelColor(`[${level}]`);
        const formattedMessage = typeof message === 'string' ? message : JSON.stringify(message, null, 2);
        let result = `${prefix}${levelStr} ${formattedMessage}`;
        if (args.length > 0) {
            const formattedArgs = args.map(arg => typeof arg === 'string' ? arg : JSON.stringify(arg, null, 2)).join(' ');
            result += ' ' + formattedArgs;
        }
        return result;
    }
    info(message, ...args) {
        console.log(this.formatMessage('INFO', message, ...args));
    }
    success(message, ...args) {
        console.log(this.formatMessage('SUCCESS', message, ...args));
    }
    warn(message, ...args) {
        console.warn(this.formatMessage('WARN', message, ...args));
    }
    error(message, ...args) {
        console.error(this.formatMessage('ERROR', message, ...args));
    }
    debug(message, ...args) {
        if (this.debugMode) {
            console.log(this.formatMessage('DEBUG', message, ...args));
        }
    }
    setDebugMode(enabled) {
        this.debugMode = enabled;
    }
}
exports.Logger = Logger;
//# sourceMappingURL=Logger.js.map