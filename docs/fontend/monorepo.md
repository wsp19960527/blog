---
title: monorepo
date: 2024/03/03
tags:
  - 模块化
  - monorepo
categories:
  - fontend
---

## 概念

Monorepo（单仓库）是指在一个Git仓库中管理多个相关项目的开发方式。这种方式的优点在于：


- 集中式管理：所有项目都在一个仓库中，方便代码共享、版本同步和协同开发。
- 模块化：可以创建独立的模块，方便复用和维护。
- 统一的CI/CD：一次配置，全仓库生效，简化持续集成和部署流程。
- 更好的依赖管理：可以更容易地管理项目间的依赖关系。

缺点：

- 复杂性: Monorepo 方式可能会增加代码仓库的复杂性，难以维护。
- 性能: Monorepo 方式可能会影响代码仓库的性能，特别是当代码仓库很大时。
- 安全性: Monorepo 方式可能会增加安全风险，特别是当代码仓库中有敏感信息时。
- 协作: Monorepo 方式可能会影响团队协作，特别是当团队成员很多时。
- 工具支持: Monorepo 方式可能需要特定的工具支持，才能正常工作。

### Lerna
Lerna是一个命令行工具，用于在Monorepo中管理多包项目。它提供了版本管理和发布功能，使得在单个仓库中管理多个npm包变得简单。

Lerna的核心概念有：
- Packages：Monorepo中的独立npm包。
- Versions：每个包可以有自己的版本，可以是固定的或共享的。
- Bootstrapping：初始化所有包的依赖关系，确保每个包都能正常工作。
- Publishing：发布包到npm，可以是逐个包发布，也可以是批量发布。

#### 安装

```bash
npm install --save-dev lerna
# 或
yarn add --dev lerna
```


