# Bncr ARM Linux

[![ARM Compatible](https://img.shields.io/badge/ARM-Linux-blue)](https://www.arm.com)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

复刻的Bncr机器人框架，专门为ARM Linux设备优化，支持二进制文件分发。

## ✨ 特性

- ✅ **ARM原生支持** - 支持ARM64和ARMv7架构
- ✅ **二进制分发** - 可打包为独立的二进制文件
- ✅ **开箱即用** - `simple-bncr.js` 可直接运行
- ✅ **插件系统** - 模块化插件架构
- ✅ **完整TypeScript** - 完整的源码支持二次开发
- ✅ **一键构建** - 支持多平台打包

## 🚀 快速开始

### 方法1：直接运行（最简单）
```bash
# 克隆仓库
git clone https://github.com/jiankujidu/bncr-arm-linux.git

# 进入目录
cd bncr-arm-linux

# 立即运行
node simple-bncr.js
```

### 方法2：使用构建版本
```bash
# 构建所有平台
./build-all.sh

# 查看生成的二进制包
ls releases/
```

## 📦 安装指南

详细安装说明请查看：
- [RUNNING.md](RUNNING.md) - 运行指南
- [QUICKSTART.md](QUICKSTART.md) - 快速开始
- [COMPLETION.md](COMPLETION.md) - 项目总结

## 🛠️ 开发

### 项目结构
```
bncr-arm-linux/
├── simple-bncr.js          # 简化版（开箱即用）
├── src/                    # TypeScript源码
│   ├── core/              # 核心模块
│   ├── plugins/           # 插件系统
│   ├── adapters/          # 适配器管理
│   └── utils/             # 工具类
├── releases/              # 构建输出目录
├── scripts/               # 构建脚本
└── docs/                  # 文档
```

### 构建项目
```bash
# 安装依赖
npm install

# 构建TypeScript
npm run build

# 打包二进制
./build-all.sh
```

## 🤖 插件系统

项目包含示例插件：
- `echo` - 回声插件
- `help` - 帮助插件
- `admin` - 管理插件

创建新插件请参考 `src/plugins/` 目录下的示例。

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件。

## 📞 支持

- **GitHub Issues**: [报告问题](https://github.com/jiankujidu/bncr-arm-linux/issues)
- **项目状态**: 完整可用，持续维护

---

**🎯 目标**: 让Bncr框架在ARM Linux设备上运行得更好！
