"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
const yargs_1 = __importDefault(require("yargs"));
const helpers_1 = require("yargs/helpers");
class Command {
    constructor() {
        this.argv = (0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
            .scriptName('bncr')
            .usage('$0 [选项]')
            .option('config', {
            alias: 'c',
            type: 'string',
            description: '配置文件路径',
            default: './config.yaml'
        })
            .option('data-dir', {
            alias: 'd',
            type: 'string',
            description: '数据目录路径',
            default: './data'
        })
            .option('debug', {
            type: 'boolean',
            description: '启用调试模式',
            default: false
        })
            .option('version', {
            alias: 'v',
            type: 'boolean',
            description: '显示版本信息'
        })
            .option('help', {
            alias: 'h',
            type: 'boolean',
            description: '显示帮助信息'
        })
            .example('$0 -c ./my-config.yaml', '使用自定义配置文件启动')
            .example('$0 --debug', '启用调试模式启动')
            .example('$0 --version', '显示版本信息')
            .wrap(Math.min(100, yargs_1.default.terminalWidth()))
            .epilogue('更多信息请参考: https://github.com/Anmours/Bncr')
            .help();
    }
    parse() {
        const args = this.argv.argv;
        if (args.version) {
            const pkg = require('../../package.json');
            console.log(`Bncr ARM Linux 版本 v${pkg.version}`);
            console.log('基于原版 Bncr 框架，针对 ARM 架构优化');
            process.exit(0);
        }
        if (args.help) {
            this.argv.showHelp();
            process.exit(0);
        }
        return {
            config: args.config,
            dataDir: args['data-dir'],
            debug: args.debug,
            version: args.version,
            help: args.help
        };
    }
}
exports.Command = Command;
//# sourceMappingURL=Command.js.map