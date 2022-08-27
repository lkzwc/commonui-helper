// const inquirer = require("inquirer");
import inquirer from "inquirer";
import { program } from "commander";
import path from "path";
import fs from "fs";
import { component_table } from "../template/techui.js";

const __dirname = path.resolve();

// 获取版本
fs.readFile("package.jso1n", "utf-8", (error, data) => {
  if (error) {
    console.log(error);
    return process.exit();
  } else {
    program.version(JSON.parse(data).version, "-v,--version");
  }
});

if (process.argv.slice(3).length > 1) {
  // 解析脚本生成
}

program.usage("<command [option]>").command("create", "create a 组件");
inquirer
  .prompt([
    {
      name: "projectName",
      message: "请输入创建的组件名称",
      type: "input",
    },
    {
      name: "type",
      message: "请选择创建的类型",
      type: "list",
      choices: ["Table", "Table+TAB", "GraphicsCommon", "EditTable"],
    },
  ])
  .then((answers) => {
    console.log(answers, __dirname);
    fs.writeFile(
      `${__dirname}/${answers.projectName}.tsx`,
      component_table(answers.projectName),
      (res) => {
        console.log("gene...");
      }
    );
  });
