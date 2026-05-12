"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginManager = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const Logger_1 = require("../utils/Logger");
const logger = new Logger_1.Logger('Plugin');
class PluginManager {
    constructor(config) {
        this.plugins = new Map();
        this.config = config;
    }
    async loadPlugins() {
        logger.info('开始加载插件...');
        // 加载内置插件
        await this.loadBuiltinPlugins();
        // 加载外部插件目录
        const pluginDir = path_1.default.join(this.config.dataDir, 'plugins');
        if (fs_1.default.existsSync(pluginDir)) {
            await this.loadExternalPlugins(pluginDir);
        }
        logger.success(`插件加载完成，共 ${this.plugins.size} 个插件`);
    }
    async loadBuiltinPlugins() {
        // 根据配置加载插件
        for (const pluginConfig of this.config.plugins) {
            if (!pluginConfig.enabled) {
                logger.debug(`跳过禁用插件: ${pluginConfig.name}`);
                continue;
            }
            try {
                let plugin;
                switch (pluginConfig.name.toLowerCase()) {
                    case 'echo':
                        plugin = await this.createEchoPlugin();
                        break;
                    case 'help':
                        plugin = await this.createHelpPlugin();
                        break;
                    case 'admin':
                        plugin = await this.createAdminPlugin();
                        break;
                    default:
                        logger.warn(`未知的内置插件: ${pluginConfig.name}`);
                        continue;
                }
                plugin.config = pluginConfig.config || {};
                this.plugins.set(plugin.name, plugin);
                // 初始化插件
                if (plugin.init) {
                    await plugin.init();
                }
                logger.info(`✅ 加载插件: ${plugin.name}`);
            }
            catch (error) {
                logger.error(`加载插件失败 ${pluginConfig.name}:`, error);
            }
        }
    }
    async loadExternalPlugins(pluginDir) {
        try {
            const entries = fs_1.default.readdirSync(pluginDir, { withFileTypes: true });
            for (const entry of entries) {
                if (!entry.isDirectory())
                    continue;
                const pluginPath = path_1.default.join(pluginDir, entry.name);
                const packageJsonPath = path_1.default.join(pluginPath, 'package.json');
                if (!fs_1.default.existsSync(packageJsonPath)) {
                    logger.debug(`跳过非插件目录: ${entry.name}`);
                    continue;
                }
                try {
                    const pkg = JSON.parse(fs_1.default.readFileSync(packageJsonPath, 'utf8'));
                    // 检查是否为 Bncr 插件
                    if (!pkg.keywords || !pkg.keywords.includes('bncr-plugin')) {
                        logger.debug(`跳过非 Bncr 插件: ${entry.name}`);
                        continue;
                    }
                    // 动态导入插件
                    const pluginModule = require(pluginPath);
                    const plugin = {
                        name: pkg.name || entry.name,
                        version: pkg.version,
                        description: pkg.description,
                        enabled: true,
                        ...pluginModule
                    };
                    this.plugins.set(plugin.name, plugin);
                    // 初始化插件
                    if (plugin.init) {
                        await plugin.init();
                    }
                    logger.info(`✅ 加载外部插件: ${plugin.name} v${plugin.version}`);
                }
                catch (error) {
                    logger.error(`加载外部插件失败 ${entry.name}:`, error);
                }
            }
        }
        catch (error) {
            logger.error('扫描插件目录失败:', error);
        }
    }
    async createEchoPlugin() {
        return {
            name: 'echo',
            description: '简单的回声插件',
            enabled: true,
            onMessage: async (message, _context) => {
                if (message.text && message.text.startsWith('/echo ')) {
                    const reply = message.text.substring(6);
                    return { text: `回声: ${reply}` };
                }
                return null;
            }
        };
    }
    async createHelpPlugin() {
        return {
            name: 'help',
            description: '帮助插件',
            enabled: true,
            onMessage: async (message, _context) => {
                if (message.text === '/help' || message.text === '帮助') {
                    const pluginList = Array.from(this.plugins.values())
                        .filter(p => p.enabled)
                        .map(p => `• ${p.name}${p.description ? ` - ${p.description}` : ''}`)
                        .join('\n');
                    return {
                        text: `🤖 Bncr 机器人帮助\n\n可用插件:\n${pluginList}\n\n输入 /echo <消息> 测试回声功能`
                    };
                }
                return null;
            }
        };
    }
    async createAdminPlugin() {
        return {
            name: 'admin',
            description: '管理插件',
            enabled: true,
            onMessage: async (message, _context) => {
                if (message.text === '/status') {
                    return {
                        text: `📊 系统状态\n插件数: ${this.plugins.size}\n运行时间: ${Math.floor(process.uptime())}秒\n内存使用: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`
                    };
                }
                return null;
            }
        };
    }
    async processMessage(message, context) {
        const results = [];
        for (const plugin of this.plugins.values()) {
            if (!plugin.enabled || !plugin.onMessage)
                continue;
            try {
                const result = await plugin.onMessage(message, context);
                if (result) {
                    results.push(result);
                }
            }
            catch (error) {
                logger.error(`插件 ${plugin.name} 处理消息失败:`, error);
            }
        }
        return results.length > 0 ? results : null;
    }
    async broadcastEvent(event, data) {
        for (const plugin of this.plugins.values()) {
            if (!plugin.enabled || !plugin.onEvent)
                continue;
            try {
                await plugin.onEvent(event, data);
            }
            catch (error) {
                logger.error(`插件 ${plugin.name} 处理事件失败:`, error);
            }
        }
    }
    getPlugin(name) {
        return this.plugins.get(name);
    }
    getAllPlugins() {
        return Array.from(this.plugins.values());
    }
}
exports.PluginManager = PluginManager;
//# sourceMappingURL=PluginManager.js.map