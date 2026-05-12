# Bncr ARM Linux

🚀 **ARM Linux设备专用的机器人框架**

[![GitHub](https://img.shields.io/github/license/jiankujidu/bncr-arm-linux)](https://github.com/jiankujidu/bncr-arm-linux)
[![GitHub last commit](https://img.shields.io/github/last-commit/jiankujidu/bncr-arm-linux)](https://github.com/jiankujidu/bncr-arm-linux)
[![GitHub issues](https://img.shields.io/github/issues/jiankujidu/bncr-arm-linux)](https://github.com/jiankujidu/bncr-arm-linux/issues)

🎯 **基于原版Bncr框架，专门为ARM架构的Linux设备优化**

## ✨ 特性

- ✅ **完整的Bncr框架复刻** - 保持原版核心功能
- ✅ **ARM架构优化** - 支持ARM64和ARMv7架构
- ✅ **二进制分发** - 预编译的二进制包，开箱即用
- ✅ **TypeScript源码** - 完整的TypeScript源代码
- ✅ **插件系统** - 可扩展的插件架构
- ✅ **适配器支持** - 多种通信适配器

## 🚀 快速开始

### 方法1：直接运行预编译版本（最简单）
```bash
# 下载并解压
curl -L https://github.com/jiankujidu/bncr-arm-linux/releases/download/latest/bncr-arm64.tar.gz | tar xz
cd bncr-arm64

# 立即运行
./simple-bncr.js
```

### 方法2：从源码构建
```bash
# 克隆仓库
git clone https://github.com/jiankujidu/bncr-arm-linux.git
cd bncr-arm-linux

# 安装依赖
npm install

# 构建项目
npm run build

# 运行
node dist/index.js
```

## 📁 项目结构

```
bncr-arm-linux/
├── src/                    # TypeScript源代码
│   ├── core/              # 核心模块
│   ├── plugins/           # 插件系统
│   ├── adapters/          # 适配器管理
│   └── utils/             # 工具类
├── dist/                  # 编译后的JavaScript代码
├── releases/              # 预编译的二进制包
│   ├── arm64/            # ARM64架构版本
│   ├── armv7/            # ARMv7架构版本
│   └── source/           # 源代码包
├── scripts/              # 构建脚本
└── docs/                 # 项目文档
```

## 🔧 构建指南

### 构建所有平台
```bash
# 运行构建脚本
./scripts/build-all.sh

# 生成的包在 releases/ 目录下
ls releases/
# bncr-arm64.tar.gz     # ARM64专用包
# bncr-armv7.tar.gz     # ARMv7专用包
# bncr-source.tar.gz    # 源代码包
```

### 自定义构建
```bash
# 只构建ARM64版本
npm run build:arm64

# 只构建ARMv7版本
npm run build:armv7

# 开发模式
npm run dev
```

## 🎯 支持的设备

- **树莓派系列**
  - Raspberry Pi 4 (ARM64)
  - Raspberry Pi 3 (ARM64)
  - Raspberry Pi 2 (ARMv7)
  - Raspberry Pi Zero (ARMv7)

- **其他ARM设备**
  - Orange Pi
  - NanoPi
  - Rock Pi
  - AWS Graviton处理器
  - 华为鲲鹏处理器

## 📚 使用示例

### 基本命令
```
> /help           # 查看帮助
> /echo Hello     # 回声测试
> /status         # 查看状态
> /admin version  # 查看版本
> exit            # 退出程序
```

### 创建自定义插件
```typescript
// src/plugins/custom.ts
import { Plugin } from '../core/Plugin';

export class CustomPlugin implements Plugin {
  name = 'custom';
  
  commands = {
    '/greet': (args: string[]) => {
      const name = args[0] || '朋友';
      return `你好，${name}！欢迎使用Bncr ARM Linux！`;
    }
  };
}
```

## 🐛 问题反馈

如果您遇到任何问题，请：
1. 查看 [GitHub Issues](https://github.com/jiankujidu/bncr-arm-linux/issues)
2. 提交新的 Issue
3. 或者通过 Pull Request 贡献代码

## 🤝 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 📄 许可证

本项目基于 MIT 许可证开源 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- 感谢原版 [Bncr](https://github.com/Anmours/Bncr) 项目的作者 Anmours
- 感谢所有为 ARM Linux 生态做出贡献的开发者

---

**让机器人框架在ARM设备上飞起来！** 🚀

> 📧 联系维护者: jiankujidu@github.com  
> 🌐 项目主页: https://github.com/jiankujidu/bncr-arm-linux