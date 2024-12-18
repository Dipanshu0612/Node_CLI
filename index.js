#!/usr/bin/env node

import { program } from "commander";
import chalk from "chalk";
import inquirer from "inquirer";
import ora from "ora";
import figlet from "figlet";
import { compressFile, decompressFile } from "./utils/compressor.js";
import { convertCase } from "./utils/case_conversion.js";
import { isPalindrome } from "./utils/isPalindrome.js";
import { wordCount } from "./utils/countWords.js";
import { fetchJoke } from "./utils/fetchJoke.js"

console.log();
console.log(chalk.cyanBright("Welcome to"));
console.log(
  chalk.cyanBright(
    figlet.textSync("D's Node CLI", { horizontalLayout: "full", font: "Doom" })
  )
);
console.log(
  chalk.cyan(
    "D's Node CLI is a handy command-line tool for everyday tasks like file compression, string manipulation, and API integration."
  )
);
console.log();

program
  .name("D's Node CLI")
  .description(
    "D's Node CLI is a handy command-line tool for everyday tasks like file compression, string manipulation, and API integration."
  )
  .version("1.0.0");

program.action(() => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Hello! What's your name? :",
      },
    ])
    .then((answer) => {
      const userName = answer.name;
      console.log(chalk.italic.magentaBright(`Hello, ${userName}! 🙋🏻‍♂️`));

      function menu() {
        console.log();
        inquirer
          .prompt([
            {
              type: "list",
              name: "task",
              message: "What would you like to do?",
              choices: [
                "Compress a file",
                "Decompress a file",
                "Convert case of text",
                "Count words in a text",
                "Check if text is a palindrome",
                "Get a Random Joke",
                "Exit",
              ],
            },
          ])
          .then(async (answers) => {
            switch (answers.task) {
              case "Compress a file":
                const compressAnswers = await inquirer.prompt([
                  {
                    type: "input",
                    name: "input",
                    message: "Enter the input file path:",
                  },
                ]);
                let spinner = ora(`Comporessing the file...`).start();
                if (compressFile(compressAnswers.input)) {
                  setTimeout(() => {
                    spinner.succeed(
                      chalk.green("Your file was compressed successfully!")
                    );
                    menu();
                  }, 2000);
                }
                else {
                  spinner.fail(
                    console.log(
                      chalk.red("Error compressing file! Please try again.")
                    )
                  );
                }
                break;

              case "Decompress a file":
                const decompressAnswers = await inquirer.prompt([
                  {
                    type: "input",
                    name: "input",
                    message: "Enter the input file path:",
                  },
                ]);
                let spinner2 = ora(`Decomporessing the file...`).start();
                if (decompressFile(decompressAnswers.input))
                  setTimeout(() => {
                    spinner2.succeed(
                      chalk.green("Your file was decompressed successfully!")
                    );
                    menu();
                  }, 2000);
                else
                  spinner2.fail(
                    console.log(
                      chalk.red("Error decompressing file! Please try again.")
                    )
                  );
                break;

              case "Convert case of text":
                const caseAnswer = await inquirer.prompt([
                  {
                    type: "input",
                    name: "text",
                    message: "Enter the text to convert:",
                  },
                  {
                    type: "confirm",
                    name: "upper",
                    message: "Convert to upper case?",
                    default: true,
                  },
                ]);
                console.log(
                  chalk.italic.greenBright(
                    `The converted text is: ${chalk.italic.whiteBright(
                      convertCase(caseAnswer.text, caseAnswer.upper)
                    )}`
                  )
                );
                menu();
                break;

              case "Count words in a text":
                const wordCountAnswer = await inquirer.prompt([
                  {
                    type: "input",
                    name: "text",
                    message: "Enter the text to count words:",
                  },
                ]);
                console.log(`Word count: ${wordCount(wordCountAnswer.text)}`);
                menu();
                break;

              case "Check if text is a palindrome":
                const palindromeAnswer = await inquirer.prompt([
                  {
                    type: "input",
                    name: "text",
                    message: "Enter the text to check for palindrome:",
                  },
                ]);
                console.log(
                  isPalindrome(palindromeAnswer.text)
                    ? chalk.greenBright(
                      `'${palindromeAnswer.text}' is a palindrome!`
                    )
                    : chalk.redBright(
                      `'${palindromeAnswer.text}' is not a palindrome!`
                    )
                );
                menu();
                break;
              
              case 'Get a Random Joke':
                const spinner3 = ora("Getting a funny joke for you...😂").start();
                const res = await fetchJoke();
                spinner3.succeed(chalk.italic.yellow(res));
                menu();
                break;

              case "Exit":
                inquirer
                  .prompt([
                    {
                      type: "confirm",
                      name: "exit",
                      message: "Are you sure you want to exit?",
                    },
                  ])
                  .then((answer) => {
                    if (answer.exit) {
                      console.log(chalk.magenta(`Goodbye! ${userName} 🙋🏻‍♂️`));
                      process.exit(0);
                    }
                    menu();
                  });
            }
          });
      }
      menu();
    });
});

program.parse(process.argv);
