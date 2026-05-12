#!/bin/bash
# Bncr ARM64 启动脚本

echo "🚀 启动 Bncr ARM64 版本"
echo "======================"

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装"
    echo "💡 请先安装 Node.js:"
    echo "  Ubuntu/Debian: sudo apt install nodejs"
    echo "  CentOS/RHEL: sudo yum install nodejs"
    echo "  或从官网下载: https://nodejs.org/"
    exit 1
fi

# 检查配置文件
CONFIG_FILE="./config.yaml"
if [ ! -f "$CONFIG_FILE" ]; then
    echo "⚠️  配置文件不存在，创建示例配置..."
    cat > "$CONFIG_FILE" << 'CFG'
# Bncr 配置文件
botName: "BncrBot"
dataDir: "./data"

plugins:
  - name: echo
    enabled: true
  - name: help
    enabled: true
  - name: admin
    enabled: true

adapters:
  - type: console
    enabled: true
    config: {}

webServer:
  enabled: false
  port: 9090
  host: "0.0.0.0"
CFG
    echo "✅ 示例配置文件已创建: $CONFIG_FILE"
fi

# 启动程序
echo "🤖 启动 Bncr 机器人..."
echo "📁 配置文件: $CONFIG_FILE"
echo "🏠 数据目录: ./data"
echo ""
echo "💡 测试命令:"
echo "  /help     - 显示帮助"
echo "  /echo Hi  - 回声测试"
echo "  /status   - 系统状态"
echo "  exit      - 退出程序"
echo ""

node "$(dirname "$0")/simple-bncr.js"
