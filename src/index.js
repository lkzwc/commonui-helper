#!/usr/bin/env node
// const inquirer = require("inquirer");
import inquirer from "inquirer";
import { program } from "commander";
import path, { resolve } from "path";
import fs from "fs";
import { BASE_PATH } from "../commonui.config.js";
import { component_table } from "../template/techui.js";
import chalk from "chalk";

const __dirname = path.resolve();

console.log("process.argv.", BASE_PATH, process.argv);

// 获取版本;
let info = undefined;
(async function readFile() {
  info = await (() => {
    return new Promise((resolve, reject) => {
      fs.readFile("package.json", "utf-8", (error, data) => {
        error && reject(error) && process.exit();
        resolve(data);
      });
    });
  })();
  console.log("info1", info);
})();

program.addHelpText(
  "beforeAll",
  `欢迎你的使用,如果你有更好意见，请及时给我们提交DISCUSS`
);
program.addHelpText(
  "after",
  `
 About:
   https://github.com/lkzwc/commonui-helper
`
);

console.log("info2", info);

program
  .usage("<command [option]>")
  // .version(info?.version, "-v,--version")
  // .description(`${info?.name} : ${info?.version} ${info?.description} `)
  // .command("create", "create a 组件")
  .option("-N,--name <name>", "【指定组件名称】:Name")
  .option("-U,--ui <ui>", "【指定生成的组件类型】:antd-table-page")
  .option("-T,--type <type>", "【组件模板二选一】:react/vue");

program.parse(process.argv);
console.log(chalk.bold.red(program.opts().name));
const options = program.opts();

// inquirer
//   .prompt([
//     {
//       name: "projectName",
//       message: "请输入创建的组件名称",
//       type: "input",
//     },
//     {
//       name: "type",
//       message: "请选择创建的类型",
//       type: "list",
//       choices: ["Table", "Table+TAB", "GraphicsCommon", "EditTable"],
//     },
//   ])
//   .then((answers) => {
//     console.log(answers, __dirname);
//     fs.writeFile(
//       `${__dirname}/${answers.projectName}.tsx`,
//       component_table(answers.projectName),
//       (res) => {
//         console.log("gene...");
//       }
//     );
//   });
