"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdapterManager = void 0;
const Logger_1 = require("../utils/Logger");
const logger = new Logger_1.Logger('Adapter');
class AdapterManager {
    constructor(config) {
        this.adapters = new Map();
        this.config = config;
    }
    async initAdapters() {
        logger.info('初始化适配器...');
        for (const adapterConfig of this.config.adapters) {
            if (!adapterConfig.enabled) {
                logger.debug(`跳过禁用适配器: ${adapterConfig.type}`);
                continue;
            }
            try {
                let adapter;
                switch (adapterConfig.type.toLowerCase()) {
                    case 'console':
                        adapter = await this.createConsoleAdapter(adapterConfig.config);
                        break;
                    case 'websocket':
                        adapter = await this.createWebSocketAdapter(adapterConfig.config);
                        break;
                    case 'http':
                        adapter = await this.createHttpAdapter(adapterConfig.config);
                        break;
                    default:
                        logger.warn(`未知的适配器类型: ${adapterConfig.type}`);
                        continue;
                }
                adapter.name = `${adapterConfig.type}-${Date.now()}`;
                adapter.type = adapterConfig.type;
                adapter.enabled = adapterConfig.enabled;
                adapter.config = adapterConfig.config;
                // 初始化适配器
                if (adapter.init) {
                    await adapter.init();
                }
                this.adapters.set(adapter.name, adapter);
                logger.info(`✅ 初始化适配器: ${adapter.type}`);
            }
            catch (error) {
                logger.error(`初始化适配器失败 ${adapterConfig.type}:`, error);
            }
        }
    }
    async createConsoleAdapter(config) {
        return {
            name: 'console',
            type: 'console',
            enabled: true,
            config,
            start: async () => {
                logger.info('📟 控制台适配器已启动');
                logger.info('输入消息进行测试，格式: /echo <消息> 或 /help');
                // 设置标准输入监听
                process.stdin.setEncoding('utf8');
                process.stdin.on('data', async (data) => {
                    const text = data.toString().trim();
                    if (text) {
                        const message = {
                            text,
                            sender: 'console-user',
                            timestamp: Date.now(),
                            adapter: 'console'
                        };
                        if (this.messageCallback) {
                            await this.messageCallback(message, 'console');
                        }
                    }
                });
                // 提示用户
                console.log('\n> ');
            },
            stop: async () => {
                process.stdin.removeAllListeners('data');
                logger.info('控制台适配器已停止');
            },
            sendMessage: async (target, message) => {
                console.log(`🤖 ${message.text || JSON.stringify(message)}`);
                console.log('\n> ');
            }
        };
    }
    async createWebSocketAdapter(config) {
        return {
            name: 'websocket',
            type: 'websocket',
            enabled: true,
            config,
            init: async () => {
                // 这里可以实现 WebSocket 连接初始化
                logger.debug('WebSocket 适配器初始化');
            },
            start: async () => {
                logger.info('🔌 WebSocket 适配器启动中...');
                // 实际实现需要连接 WebSocket 服务器
            },
            stop: async () => {
                logger.info('WebSocket 适配器已停止');
            },
            sendMessage: async (_target, _message) => {
                // WebSocket 发送消息实现
                logger.debug('WebSocket sendMessage called');
            }
        };
    }
    async createHttpAdapter(config) {
        return {
            name: 'http',
            type: 'http',
            enabled: true,
            config,
            init: async () => {
                logger.debug('HTTP 适配器初始化');
            },
            start: async () => {
                logger.info('🌐 HTTP 适配器启动中...');
                // 启动 HTTP 服务器
            },
            stop: async () => {
                logger.info('HTTP 适配器已停止');
            },
            sendMessage: async (_target, _message) => {
                // HTTP 发送消息实现
                logger.debug('HTTP sendMessage called');
            }
        };
    }
    async startAll() {
        logger.info('启动所有适配器...');
        for (const adapter of this.adapters.values()) {
            if (!adapter.enabled)
                continue;
            try {
                await adapter.start();
                logger.success(`✅ 适配器 ${adapter.type} 启动成功`);
            }
            catch (error) {
                logger.error(`适配器 ${adapter.type} 启动失败:`, error);
            }
        }
    }
    async stopAll() {
        logger.info('停止所有适配器...');
        for (const adapter of this.adapters.values()) {
            if (!adapter.enabled)
                continue;
            try {
                await adapter.stop();
                logger.info(`适配器 ${adapter.type} 已停止`);
            }
            catch (error) {
                logger.error(`适配器 ${adapter.type} 停止失败:`, error);
            }
        }
    }
    async sendMessage(adapterName, target, message) {
        const adapter = this.adapters.get(adapterName);
        if (!adapter || !adapter.enabled) {
            throw new Error(`适配器 ${adapterName} 不存在或已禁用`);
        }
        if (!adapter.sendMessage) {
            throw new Error(`适配器 ${adapterName} 不支持发送消息`);
        }
        await adapter.sendMessage(target, message);
    }
    setMessageCallback(callback) {
        this.messageCallback = callback;
    }
    getAdapter(name) {
        return this.adapters.get(name);
    }
    getAllAdapters() {
        return Array.from(this.adapters.values());
    }
}
exports.AdapterManager = AdapterManager;
//# sourceMappingURL=AdapterManager.js.map