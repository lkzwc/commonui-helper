#!/usr/bin/env node
// const inquirer = require("inquirer");
import inquirer from "inquirer";
import { program } from "commander";
import path, { resolve } from "path";
import fs from "fs";
import { BASE_PATH } from "../commonui.config.js";
import { component_modal, component_table } from "../template/techui.js";
import chalk from "chalk";

const __dirname = path.resolve();


// 获取版本;
(async function readFile() {
  return await (() => {
    return new Promise((resolve, reject) => {
      fs.readFile("package.json", "utf-8", (error, data) => {
        error && reject(error) && process.exit();
        resolve(data);
      });
    });
  })();
  // console.log("info1", info);
})().then((res) => {
  if (process.argv.slice(2)?.[0]?.startsWith("--")) {
    geneComponentByStr();
  } else {
    geneComponentByChoise(process.argv.slice(2)?.[0]);
  }
});

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

function geneComponentByChoise(name) {
  inquirer.prompt([
      {
        name: "name",
        message: "请输入创建的组件名称",
        type: "input",
    },
      {
        name: "type",
        message: "请选择节点的类型",
        type: "list",
        choices: ["Table", "Table+TAB", "GraphicsCommon", "EditTable","Modal"],
      },
      {
        name: "template",
        message: "请选择创建模板类型",
        type: "list",
        choices: ["React", "Vue"],
      },
      {
        name: "path",
        message: "位置路径，相对于项目的根目录，需输入/",
        type: "input",
      },
    ])
    .then((answers) => {
      // console.log(answers, __dirname);
      fs.writeFile(
        `${__dirname}/${answers.path}/${answers.name}.tsx`,
        geneComponent(answers.type,answers.name),
        () => {
          console.log(chalk.green("生成成功，请查看 "));
        }
      );
    });
}

function geneComponent(type,name){
  return name === 'Table' && component_table(name) || 
  name=== "Modal" && component_modal(name)
}


// 指令解析
function geneComponentByStr() {
  program
    .usage("<command [option]>")
    .version(info?.version, "-v,--version")
    .description(`${info?.name} : ${info?.version} ${info?.description} `)
  
  program.parse(process.argv);
  console.log("program.opts()", program.opts());
}
