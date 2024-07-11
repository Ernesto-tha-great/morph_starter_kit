const inquirer = require("inquirer");
const shell = require("shelljs");
const chalk = require("chalk");
const ora = require("ora");
const { join } = require("path");
const fs = require("fs");
const { ensureDir, readdir } = require("fs-extra");

const BASE_URL = "https://github.com/morph-l2/morph_starter_kit.git";

const createAsync = async (command) => {
  let { projectName } = await inquirer.prompt({
    type: "input",
    name: "projectName",
    message: "Project name: ",
  });

  const pwd = process.cwd();
  shell.cd(pwd);
  shell.exec(`git clone ${BASE_URL} ${projectName}`);
  shell.cd(projectName);

  // const packageJsonPath = join(pwd, projectName, "package.json");
  // fs.readFile(packageJsonPath, "utf8", (err, data) => {
  //   if (err) {
  //     console.error("Error reading the file:", err);
  //     return;
  //   }

  //   // Parse the JSON data
  //   const packageData = JSON.parse(data);

  //   // Modify the "name" field
  //   packageData.name = projectName;

  //   // Convert the JSON data back to a string
  //   const updatedData = JSON.stringify(packageData, null, 2);

  //   // Write the updated data back to the package.json file
  //   fs.writeFile(packageJsonPath, updatedData, "utf8", (err) => {
  //     if (err) {
  //       console.error("Error writing to the file:", err);
  //       return;
  //     }
  //   });
  // });

  shell.exec("rm -rf .git");
  shell.exec("git init --quiet --initial-branch=main");
  shell.exec("git add .");

  console.log(
    chalk.green("\n\n🚀 Your starter project has been successfully created!\n")
  );

  console.log("Before you start the project, please follow these steps:\n");

  console.log(chalk.cyan("1.") + " Rename the file:");
  console.log(chalk.yellow("   .env.template"));
  console.log("   to");
  console.log(chalk.yellow("   .env.local\n"));

  console.log(
    chalk.cyan("2.") +
      " Open the newly renamed " +
      chalk.yellow(".env.local") +
      " file and add all the required environment variables.\n"
  );

  console.log("Once you've done that, you're all set to start your project!\n");
  console.log(
    chalk.green(
      "Run `npm install` and `npm run dev` from the project folder to start the project\n"
    )
  );

  console.log(
    chalk.green("Thank you for using the Starter Kit!") +
      " If you have any questions or need further assistance, please refer to the README or reach out to our team.\n"
  );

  console.log(chalk.blue("Happy coding! 🎉\n\n"));
};

async function isOutputDirectoryEmpty(outputFolder, force = false) {
  const files = await readdir(outputFolder);
  // TODO: Add  --force option to overwrite existing files
  if (files.length > 0 && !force) {
    const { value } = await inquirer.prompt({
      name: "value",
      type: "confirm",
      message:
        "Output directory is not empty. Are you sure you want to continue?",
    });
    if (!value) {
      process.exit(1);
    }
  }
}

const loading = (message) => {
  return ora(message).start();
};

module.exports = {
  createAsync,
};
