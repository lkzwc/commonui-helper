## commonui-helper

> 在基于通用组件组件库强大之上，为了满足项目中其他非前端专业人士搭建项目组件框架，于是开发了此脚手架，成员只需按照操作提示即可快速生成自定义的组件

- 定位: 组件层面
- 使用人士: 不限，非前端人士优先使用
- 基架: React > 16.8; UI: techUI
- 使用方式: 目前支持选择模式和参数模式

> 最终愿景:考虑支持 React 和 Vue 下常用组件库快速生成组件，包括 antd、antdpro、element、techui 等

选择模式：执行 npm run create Demo (Demo 为组件名称)
参数方式: 执行 npm run create -- --name=Trand --ui=antd-table-page --type=react

1.0.0
基本框架成型，支持 CI、CD，一键部署

1.0.1
更新框架生成流程，支持两种参数生成组件和脚本生成，主流程已经完善，功能暂未完成
