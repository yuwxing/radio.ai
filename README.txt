Radio AI Healing Theme - 治愈系电台主题
========================================

项目概述：
--------
这是一个基于AI的治愈系音乐电台主题，集成了AI语音生成、音乐播放和现代化界面设计。

文件说明：
--------
- index.html          : 主界面，包含治愈系设计和完整功能
- ai-voice-generator.js : AI语音生成器功能模块
- audio-manager.js    : 音频播放管理器
- login.html          : 用户登录页面
- README.txt          : 项目说明文件（本文件）

功能特点：
--------
1. 🎵 AI驱动的语音生成
   - 支持中文语音合成
   - 可配置不同音色
   - 实时语音播放

2. 🎧 治愈系音乐播放
   - 精选治愈系音乐列表
   - 播放控制（播放/暂停/下一首）
   - 音量控制和进度管理

3. 🎨 现代化界面设计
   - 渐变背景和毛玻璃效果
   - 响应式布局设计
   - 流畅的动画过渡

4. 👤 用户系统
   - 登录/注册功能
   - 社交媒体登录支持
   - 记住登录状态

技术栈：
--------
- HTML5 语义化标签
- CSS3 现代样式和动画
- JavaScript ES6+ 模块化开发
- Web Audio API 音频处理
- LocalStorage 本地存储

使用方法：
--------
1. 环境准备：
   - 现代浏览器（Chrome/Firefox/Safari/Edge）
   - Web服务器（如：nginx、Apache、或Node.js）

2. 部署步骤：
   - 将所有文件复制到Web服务器目录
   - 配置AI语音API密钥（在ai-voice-generator.js中）
   - 确保音频文件可访问

3. 访问方式：
   - 主页：http://your-domain.com/index.html
   - 登录：http://your-domain.com/login.html

4. 测试账号：
   - 管理员：admin / admin123
   - 演示账号：demo / demo123

配置说明：
--------
1. AI语音API配置：
   在 ai-voice-generator.js 文件中修改：
   ```javascript
   this.apiKey = 'YOUR-ACTUAL-API-KEY';
   ```

2. 音频文件配置：
   在 audio-manager.js 中更新播放列表：
   ```javascript
   this.playlist = [
       {
           title: '歌曲名称',
           artist: '艺术家',
           url: '实际音频文件URL',
           duration: '时长'
       }
   ];
   ```

3. 服务器配置：
   - 确保支持HTTPS（某些API需要）
   - 配置CORS策略
   - 设置适当的缓存策略

浏览器兼容性：
--------
- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

性能优化：
--------
1. 音频文件压缩和流式播放
2. 图片懒加载和WebP格式支持
3. CSS和JavaScript文件压缩
4. CDN加速静态资源

安全考虑：
--------
1. API密钥安全存储
2. 用户输入验证和过滤
3. HTTPS强制使用
4. XSS和CSRF防护

故障排除：
--------
1. 音频无法播放：
   - 检查音频文件URL
   - 确认浏览器支持音频格式
   - 检查网络连接

2. AI语音生成失败：
   - 验证API密钥配置
   - 检查网络连接和API服务状态
   - 确认请求格式正确

3. 登录问题：
   - 检查用户名和密码
   - 确认表单验证逻辑
   - 查看浏览器控制台错误信息

更新日志：
--------
v1.0.0 (2026-02-01)
- 初始版本发布
- 基础功能实现
- 界面设计完成

支持与反馈：
--------
如有问题或建议，请联系：
- 邮箱：support@radioaihealing.com
- GitHub：https://github.com/radioaihealing/theme

版权信息：
--------
© 2026 Radio AI Healing. All rights reserved.
本主题采用MIT许可证开源。

作者：AI Assistant
版本：1.0.0
更新日期：2026-02-01