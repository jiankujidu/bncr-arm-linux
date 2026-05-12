"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigManager = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const js_yaml_1 = __importDefault(require("js-yaml"));
const Logger_1 = require("../utils/Logger");
const logger = new Logger_1.Logger('Config');
class ConfigManager {
    constructor(configPath) {
        this.defaultConfig = {
            botName: 'BncrBot',
            dataDir: './data',
            plugins: [
                { name: 'echo', enabled: true },
                { name: 'help', enabled: true }
            ],
            adapters: [
                {
                    type: 'console',
                    enabled: true,
                    config: {}
                }
            ],
            webServer: {
                enabled: false,
                port: 9090,
                host: '0.0.0.0'
            }
        };
        this.configPath = path_1.default.resolve(configPath);
    }
    async load() {
        try {
            // 检查配置文件是否存在
            if (!fs_1.default.existsSync(this.configPath)) {
                logger.warn(`配置文件不存在: ${this.configPath}，使用默认配置`);
                await this.save(this.defaultConfig);
                return this.defaultConfig;
            }
            // 读取配置文件
            const content = fs_1.default.readFileSync(this.configPath, 'utf8');
            let config;
            if (this.configPath.endsWith('.yaml') || this.configPath.endsWith('.yml')) {
                config = js_yaml_1.default.load(content);
            }
            else if (this.configPath.endsWith('.json')) {
                config = JSON.parse(content);
            }
            else {
                throw new Error('不支持的配置文件格式，请使用 .yaml, .yml 或 .json 格式');
            }
            // 合并默认配置
            const mergedConfig = {
                ...this.defaultConfig,
                ...config,
                webServer: {
                    ...this.defaultConfig.webServer,
                    ...config.webServer
                }
            };
            logger.info(`配置文件加载成功: ${this.configPath}`);
            return mergedConfig;
        }
        catch (error) {
            logger.error('加载配置文件失败:', error);
            logger.info('使用默认配置');
            return this.defaultConfig;
        }
    }
    async save(config) {
        try {
            // 确保目录存在
            const dir = path_1.default.dirname(this.configPath);
            if (!fs_1.default.existsSync(dir)) {
                fs_1.default.mkdirSync(dir, { recursive: true });
            }
            let content;
            if (this.configPath.endsWith('.yaml') || this.configPath.endsWith('.yml')) {
                content = js_yaml_1.default.dump(config, {
                    indent: 2,
                    lineWidth: -1 // 不限制行宽
                });
            }
            else if (this.configPath.endsWith('.json')) {
                content = JSON.stringify(config, null, 2);
            }
            else {
                throw new Error('不支持的配置文件格式');
            }
            fs_1.default.writeFileSync(this.configPath, content, 'utf8');
            logger.info(`配置文件已保存: ${this.configPath}`);
        }
        catch (error) {
            logger.error('保存配置文件失败:', error);
            throw error;
        }
    }
    async ensureDataDir(config) {
        const dataDir = path_1.default.resolve(config.dataDir);
        if (!fs_1.default.existsSync(dataDir)) {
            logger.info(`创建数据目录: ${dataDir}`);
            fs_1.default.mkdirSync(dataDir, { recursive: true });
            // 创建子目录
            const subDirs = ['plugins', 'adapters', 'logs', 'cache'];
            subDirs.forEach(subDir => {
                const dirPath = path_1.default.join(dataDir, subDir);
                if (!fs_1.default.existsSync(dirPath)) {
                    fs_1.default.mkdirSync(dirPath, { recursive: true });
                }
            });
        }
    }
}
exports.ConfigManager = ConfigManager;
//# sourceMappingURL=ConfigManager.js.map