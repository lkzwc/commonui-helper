#!/usr/bin/env node
// const inquirer = require("inquirer");
import inquirer from "inquirer";
import { program } from "commander";
import path, { resolve } from "path";
import fs from "fs";
import { BASE_PATH } from "../commonui.config.js";
import { component_modal, component_page_table, component_procard, component_table } from "../template/react/techui.js";
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
    geneComponentByChoise();
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

function geneComponentByChoise() {
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
        choices: ["Table", "Page_Table", "ProCard", "Modal"],
      },
      {
        name: "template",
        message: "请选择创建模板类型",
        type: "list",
        choices: ["React", "Vue"],
      },
      {
        name: "path",
        message: "生成路径，比如/src/pages,请输入的路径",
        type: "input",
      },
    ])
    .then((answers) => {
      console.log(__dirname,answers,fs.existsSync(`${__dirname}/${answers.path}`));

      if(!fs.existsSync(`${__dirname}/${answers.path}`)){
        fs.mkdirSync(answers.path, { recursive: true }, function(error){
          if(error){
            console.log(chalk.red(`目录创建失败,请手动创建${error}`));
            return false;
          }
          console.log(chalk.green('目录创建成功'));
        })
      }

      fs.writeFile(
        `${__dirname}/${answers.path}/${answers.name}.tsx`,
        geneComponent(answers.type,answers.name),
        () => {
          console.log(chalk.green("生成成功，请查看 "));
        }
      );
     
    }).then(()=>{
      console.log(chalk.green("-----------------Thanks for use---------------- "));
      console.log(chalk.green("---如果项目没有安装techUI或者其他UI库，请手动安装喔--- "));
      console.log(chalk.green("---------------Day   Day   up-----------------  "));
    });
}

function geneComponent(type,name){
  return type === 'Table' && component_table(name) || 
  type === "Page_Table" && component_page_table(name) ||
  type === "ProCard" && component_procard(name) ||
  type === "Modal" && component_modal
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
