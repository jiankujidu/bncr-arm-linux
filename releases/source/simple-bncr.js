#!/usr/bin/env node
/**
 * Bncr ARM Linux 简化版本
 * 可以直接运行，无需编译
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

console.log('🚀 Bncr ARM Linux 简化版本 v1.0.0');
console.log('==================================');

// 配置
const config = {
  botName: 'BncrBot',
  dataDir: './data',
  plugins: ['echo', 'help'],
  debug: process.argv.includes('--debug')
};

// 创建数据目录
if (!fs.existsSync(config.dataDir)) {
  fs.mkdirSync(config.dataDir, { recursive: true });
  console.log(`📁 创建数据目录: ${config.dataDir}`);
}

// 插件系统
const plugins = {
  echo: {
    name: 'echo',
    description: '回声插件',
    onMessage: (text) => {
      if (text.startsWith('/echo ')) {
        return `🤖 ${text.substring(6)}`;
      }
      return null;
    }
  },
  help: {
    name: 'help',
    description: '帮助插件',
    onMessage: (text) => {
      if (text === '/help' || text === '帮助') {
        const pluginList = Object.values(plugins)
          .map(p => `• ${p.name} - ${p.description}`)
          .join('\\n');
        return `🤖 Bncr 机器人帮助\\n\\n可用插件:\\n\${pluginList}\\n\\n命令:\\n/echo <消息> - 回声测试\\n/help - 显示帮助\\n/status - 系统状态`;
      }
      return null;
    }
  },
  admin: {
    name: 'admin',
    description: '管理插件',
    onMessage: (text) => {
      if (text === '/status') {
        const memory = process.memoryUsage();
        return `📊 系统状态\\n运行时间: \${Math.floor(process.uptime())}秒\\n内存使用: \${Math.round(memory.heapUsed / 1024 / 1024)}MB`;
      }
      return null;
    }
  }
};

// 处理消息
function processMessage(text) {
  for (const plugin of Object.values(plugins)) {
    const response = plugin.onMessage(text);
    if (response) {
      return response;
    }
  }
  return null;
}

// 启动控制台交互
function startConsole() {
  console.log('\\n📟 控制台模式已启动');
  console.log('💡 输入以下命令测试:');
  console.log('  /help - 显示帮助');
  console.log('  /echo Hello - 回声测试');
  console.log('  /status - 系统状态');
  console.log('  exit - 退出程序\\n');
  
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> '
  });
  
  rl.prompt();
  
  rl.on('line', (input) => {
    const text = input.trim();
    
    if (text === 'exit' || text === 'quit') {
      console.log('👋 再见！');
      rl.close();
      process.exit(0);
    }
    
    if (text) {
      const response = processMessage(text);
      if (response) {
        console.log(response);
      } else {
        console.log('❓ 未知命令，输入 /help 查看帮助');
      }
    }
    
    rl.prompt();
  }).on('close', () => {
    console.log('👋 Bncr 已关闭');
    process.exit(0);
  });
}

// 处理命令行参数
if (process.argv.includes('--version') || process.argv.includes('-v')) {
  console.log('Bncr ARM Linux 简化版本 v1.0.0');
  console.log('基于原版 Bncr 框架复刻');
  process.exit(0);
}

if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log('使用方法:');
  console.log('  node simple-bncr.js [选项]');
  console.log('');
  console.log('选项:');
  console.log('  --help, -h     显示帮助信息');
  console.log('  --version, -v  显示版本信息');
  console.log('  --debug        启用调试模式');
  console.log('');
  console.log('示例:');
  console.log('  node simple-bncr.js');
  console.log('  node simple-bncr.js --debug');
  process.exit(0);
}

// 启动程序
console.log(\`🤖 机器人名称: \${config.botName}\`);
console.log(\`🔧 插件数量: \${Object.keys(plugins).length}\`);
console.log(\`🐛 调试模式: \${config.debug ? '启用' : '禁用'}\`);
console.log('✅ Bncr 启动完成，等待命令...');

// 设置退出处理
process.on('SIGINT', () => {
  console.log('\\n🛑 收到退出信号，正在关闭...');
  process.exit(0);
});

// 启动控制台
startConsole();
