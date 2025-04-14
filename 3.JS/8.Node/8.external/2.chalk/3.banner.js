import chalk from 'chalk';
import figlet from 'figlet';

figlet('Hello world!', (err, data) => {
    if(err){
        console.error('error', err);
        return;
    }
    console.log(chalk.cyan(data));
    console.log();
    console.log(chalk.bgYellow.greenBright(data));
});