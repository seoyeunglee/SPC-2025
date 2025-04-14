// const chalk = require('chalk');

import chalk from 'chalk';

console.log(chalk.green('성공메세지색상을초록색으로...'));
console.log(chalk.red('error'));
console.log(chalk.red.bold('bold error'));
console.log(chalk.bgBlue.white('information'));
console.log(chalk.yellow.underline('emergency message'));