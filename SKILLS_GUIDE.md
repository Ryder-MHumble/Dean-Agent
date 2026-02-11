# DeanAgent 开发技能配置指南

## ✅ 已完成配置

项目已配置以下增强功能，无需额外安装即可使用：

### 1. 自动代码质量检查
- **触发时机**: 每次使用 Write 或 Edit 工具后
- **检查内容**: 类型错误、安全问题、最佳实践
- **作用**: 自动提醒潜在问题

### 2. 智能需求分析
- **触发时机**: 每次提交新消息时
- **功能**:
  - 检测复杂功能，建议先规划再编码
  - 提醒使用测试驱动开发 (TDD)
  - 优化开发流程

### 3. Marketplace 集成
已添加两个重要的 skills 市场：
- **Superpowers**: 完整开发工作流框架
- **Awesome Skills**: 社区精选技能集合

## 🚀 如何使用增强功能

### 方式一：通过对话直接使用

只需在对话中提出需求，系统会自动：

```
示例 1: 简单任务
你: "修复登录按钮的样式"
→ 系统自动执行，无需额外步骤

示例 2: 复杂功能
你: "实现一个用户认证系统"
→ 系统建议: 先进行需求分析和技术方案设计
→ 你可以选择先规划或直接实现

示例 3: 编写功能
你: "添加数据导出功能"
→ 系统提醒: 建议先编写测试 (TDD)
→ 确保代码质量
```

### 方式二：显式指定开发模式

在需求描述中添加关键词：

#### TDD 模式
```
使用测试驱动开发方式实现用户注册功能
```
系统会：
1. 先编写失败的测试
2. 实现最小可行代码
3. 重构优化
4. 确保测试通过

#### 代码审查模式
```
审查一下刚才的代码更改
```
系统会检查：
- 代码质量和可读性
- 类型安全
- 性能问题
- 安全漏洞
- React/Next.js 最佳实践

#### 规划模式
```
帮我规划一下如何实现实时通知系统
```
系统会：
1. 分析需求和使用场景
2. 提供多个技术方案
3. 评估优缺点
4. 给出推荐方案和实施步骤

## 📦 安装更多 Skills (可选)

如果你想安装 Superpowers 完整版或其他 skills：

### 通过 VSCode 命令面板

1. 打开命令面板 (`Ctrl+Shift+P` 或 `Cmd+Shift+P`)
2. 输入 "Claude Code: Manage Plugins"
3. 选择要安装的 skills

### 通过配置文件

编辑 `.claude/settings.local.json`，添加到 `enabledPlugins` 字段：

```json
{
  "enabledPlugins": {
    "superpowers@superpowers": true,
    "code-review@awesome-skills": true
  }
}
```

## 🎯 推荐的开发工作流

### 功能开发流程

```
1. 需求描述
   "实现用户个人资料编辑功能"

2. 系统建议规划
   → 接受建议，先进行设计

3. 系统提示 TDD
   → 先编写测试用例

4. 实现功能
   → 逐步实现，保持测试通过

5. 自动代码检查
   → 发现问题及时修正

6. 提交代码
   → git commit with co-authored by Claude
```

### Bug 修复流程

```
1. 描述问题
   "登录后跳转不正确"

2. 定位问题
   → 系统帮助追踪根因

3. 编写测试
   → 复现 bug 的测试用例

4. 修复代码
   → 确保测试通过

5. 回归测试
   → 验证未引入新问题
```

## 💡 最佳实践提示

### 1. 充分利用自动检查
每次代码更改后，注意查看自动检查结果。如果提示问题，及时修复。

### 2. 复杂功能先规划
涉及多个文件或架构设计的功能，花时间规划能避免返工。

### 3. 测试先行
养成先写测试的习惯，能：
- 明确功能需求
- 提高代码质量
- 减少 bug
- 便于重构

### 4. 定期代码审查
重要功能完成后，主动要求代码审查：
```
审查一下用户认证相关的代码
```

### 5. 安全意识
涉及用户输入、数据存储、认证授权时，特别注意安全检查。

## 🔧 自定义配置

如果你想调整自动检查的行为，可以编辑 `.claude/settings.local.json`：

### 禁用自动检查

```json
{
  "hooks": {}
}
```

### 调整检查严格度

修改 `PostToolUse` hook 的 prompt，例如：

```json
{
  "type": "prompt",
  "prompt": "仅检查严重的安全漏洞和类型错误，其他问题忽略。",
  "timeout": 5
}
```

### 添加自定义检查

在 hooks 中添加新的检查规则，例如性能检查：

```json
{
  "matcher": "Write|Edit",
  "hooks": [
    {
      "type": "prompt",
      "prompt": "检查是否有明显的性能问题，如 N+1 查询、大循环等。",
      "statusMessage": "检查性能..."
    }
  ]
}
```

## 📚 相关资源

- [Claude Code 文档](https://code.claude.com/docs)
- [Superpowers GitHub](https://github.com/obra/superpowers)
- [Awesome Claude Skills](https://github.com/travisvn/awesome-claude-skills)
- [Next.js 最佳实践](https://nextjs.org/docs)
- [React Testing Library](https://testing-library.com/react)

## 🆘 常见问题

### Q: 自动检查太频繁怎么办？
A: 可以在 hooks 配置中添加 `once: true`，或调整 matcher 匹配更少的工具。

### Q: 如何临时禁用某个功能？
A: 在配置文件中注释掉相应的 hook，或设置 `"disableAllHooks": true`。

### Q: Skills 安装后没有生效？
A: 重启 VSCode，并确保配置文件格式正确（JSON 有效）。

### Q: 如何查看可用的 skills？
A: 使用命令面板的 "Claude Code: Manage Plugins" 或访问 marketplace 仓库。

---

**提示**: 这些配置会让 Claude Code 更智能、更符合最佳实践，但你始终有完全的控制权。可以随时调整或禁用任何功能。
