# Bncr ARM Linux 版本

基于原版 Bncr 框架的 ARM Linux 优化版本，支持 ARM64 和 ARMv7 架构。

## 🚀 快速开始

### 方法一：使用简化版本（推荐）

1. 下载对应架构的文件：
   ```bash
   # ARM64
   wget <下载地址>/arm64/start-bncr.sh
   wget <下载地址>/source/simple-bncr.js
   
   # ARMv7
   wget <下载地址>/armv7/start-bncr.sh
   wget <下载地址>/source/simple-bncr.js
   ```

2. 添加执行权限：
   ```bash
   chmod +x start-bncr.sh simple-bncr.js
   ```

3. 运行：
   ```bash
   ./start-bncr.sh
   ```

### 方法二：使用原生版本

1. 确保已安装 Node.js：
   ```bash
   node --version  # 需要 Node.js 12+
   ```

2. 运行简化版本：
   ```bash
   node simple-bncr.js
   ```

## ⚙️ 配置

首次运行会自动创建配置文件 `config.yaml`，或手动创建：

```yaml
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
```

## 🔌 功能特性

### 内置插件
- **echo** - 回声插件 (`/echo <消息>`)
- **help** - 帮助插件 (`/help`)
- **admin** - 管理插件 (`/status`)

### 命令行参数
```bash
node simple-bncr.js --help      # 显示帮助
node simple-bncr.js --version   # 显示版本
node simple-bncr.js --debug     # 调试模式
```

## 📁 文件说明

### releases/ 目录
- `arm64/` - ARM64 相关文件
- `armv7/` - ARMv7 相关文件  
- `source/` - 源代码文件
- `examples/` - 示例配置

### 重要文件
- `simple-bncr.js` - 主程序文件
- `start-bncr.sh` - 启动脚本
- `config.yaml` - 配置文件
- `data/` - 数据目录（运行时创建）

## 🔧 系统要求

### ARM64 设备
- Raspberry Pi 3/4/5 (64位模式)
- AWS Graviton 实例
- 其他 ARM64 服务器

### ARMv7 设备  
- Raspberry Pi 2/3 (32位模式)
- 旧款 ARM 设备
- ARMv7 开发板

### 软件要求
- Node.js 12+ (简化版本需要)
- Bash shell
- 基本 Linux 工具

## 🐛 故障排除

### 1. 无法运行脚本
```bash
chmod +x start-bncr.sh
```

### 2. Node.js 未安装
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nodejs npm

# CentOS/RHEL
sudo yum install nodejs
```

### 3. 权限问题
```bash
mkdir -p data
chmod 755 data
```

### 4. 配置文件错误
```bash
rm config.yaml
./start-bncr.sh  # 会自动重新创建
```

## 📞 支持

如有问题，请查看原项目文档：
- 原版 Bncr: https://github.com/Anmours/Bncr
- 文档: https://anmours.github.io/Bncr

## 📄 许可证

MIT License

## 🙏 致谢

基于 [Anmours/Bncr](https://github.com/Anmours/Bncr) 项目复刻，针对 ARM Linux 优化。

