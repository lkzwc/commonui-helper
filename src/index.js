// const inquirer = require("inquirer");
import inquirer from "inquirer";
import { program } from "commander";
import path from "path";
import fs from "fs";
import { component_table } from "../template/template.js";
const __dirname = path.resolve();
program.version("V1.0.0", "-v,--version");

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
      choices: ["Table", "Table+TAB", "GraphicsCommon"],
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
