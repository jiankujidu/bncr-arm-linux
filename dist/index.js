#!/usr/bin/env node
"use strict";
/**
 * Bncr ARM Linux 版本 - 主入口文件
 * 基于原版 Bncr 框架，针对 ARM Linux 优化
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = main;
const Command_1 = require("./core/Command");
const Logger_1 = require("./utils/Logger");
const ConfigManager_1 = require("./core/ConfigManager");
const PluginManager_1 = require("./core/PluginManager");
const AdapterManager_1 = require("./core/AdapterManager");
const logger = new Logger_1.Logger('Bncr');
async function main() {
    try {
        logger.info('🚀 Bncr ARM Linux 版本启动中...');
        // 解析命令行参数
        const command = new Command_1.Command();
        const options = command.parse();
        // 设置调试模式
        if (options.debug) {
            logger.setDebugMode(true);
            logger.debug('调试模式已启用');
        }
        // 初始化配置管理器
        const configManager = new ConfigManager_1.ConfigManager(options.config);
        const config = await configManager.load();
        // 确保数据目录存在
        await configManager.ensureDataDir(config);
        logger.info(`📁 配置文件: ${configManager.configPath}`);
        logger.info(`🏠 数据目录: ${config.dataDir || './data'}`);
        logger.info(`🤖 机器人名称: ${config.botName}`);
        // 初始化插件管理器
        const pluginManager = new PluginManager_1.PluginManager(config);
        await pluginManager.loadPlugins();
        // 初始化适配器管理器
        const adapterManager = new AdapterManager_1.AdapterManager(config);
        await adapterManager.initAdapters();
        // 设置消息处理回调
        adapterManager.setMessageCallback(async (message, adapterName) => {
            logger.debug(`收到来自 ${adapterName} 的消息:`, message.text);
            // 处理消息并获取响应
            const responses = await pluginManager.processMessage(message, {
                adapter: adapterName,
                timestamp: Date.now(),
                botName: config.botName
            });
            // 发送响应
            if (responses) {
                for (const response of Array.isArray(responses) ? responses : [responses]) {
                    try {
                        await adapterManager.sendMessage(adapterName, message.sender || 'unknown', response);
                        logger.debug(`发送响应到 ${adapterName}:`, response.text);
                    }
                    catch (error) {
                        logger.error(`发送响应失败:`, error);
                    }
                }
            }
        });
        // 启动所有适配器
        await adapterManager.startAll();
        // 广播启动事件
        await pluginManager.broadcastEvent('start', { timestamp: Date.now() });
        logger.success('✅ Bncr 启动完成！');
        logger.info('📡 机器人已就绪，等待消息...');
        logger.info('💡 输入 /help 查看帮助，/echo <消息> 测试回声功能');
        // 处理退出信号
        process.on('SIGINT', async () => {
            logger.info('🛑 收到退出信号，正在关闭...');
            await pluginManager.broadcastEvent('shutdown', { timestamp: Date.now() });
            await adapterManager.stopAll();
            logger.info('👋 Bncr 已安全关闭');
            process.exit(0);
        });
        process.on('SIGTERM', async () => {
            logger.info('🛑 收到终止信号，正在关闭...');
            await pluginManager.broadcastEvent('shutdown', { timestamp: Date.now() });
            await adapterManager.stopAll();
            logger.info('👋 Bncr 已安全关闭');
            process.exit(0);
        });
    }
    catch (error) {
        logger.error('启动失败:', error);
        process.exit(1);
    }
}
// 启动应用
if (require.main === module) {
    main().catch(error => {
        console.error('致命错误:', error);
        process.exit(1);
    });
}
//# sourceMappingURL=index.js.map