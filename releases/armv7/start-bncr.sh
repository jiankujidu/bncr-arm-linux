#!/bin/bash
# Bncr ARMv7 启动脚本

echo "🚀 启动 Bncr ARMv7 版本"
echo "======================"

# 检查环境
ARCH=$(uname -m)
if [[ ! "$ARCH" =~ ^armv7 ]]; then
    echo "⚠️  当前架构: $ARCH (建议在 ARMv7 设备上运行)"
fi

# 检查配置文件
CONFIG_FILE="./config.yaml"
if [ ! -f "$CONFIG_FILE" ]; then
    echo "创建配置文件..."
    cat > "$CONFIG_FILE" << 'CFG'
# Bncr ARMv7 配置文件
botName: "BncrBot-ARMv7"
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
    echo "✅ 配置文件已创建: $CONFIG_FILE"
fi

# 复制简化版本
if [ ! -f "simple-bncr.js" ]; then
    cp "$(dirname "$0")/../source/simple-bncr.js" .
    chmod +x simple-bncr.js
fi

# 启动程序
echo "🤖 启动 Bncr ARMv7 机器人..."
node simple-bncr.js
