#!/usr/bin/env node

'use strict';

var axios = require('axios');
var chalk = require('chalk');
var program = require('commander');
var functions = require('./commandFunctions');

program
    .version('1.0.0')
    .description('Node-CLI Dictionary...');

program
    .command('wordOfTheDay', {isDefault: true})
    .alias('')
    .description('Getting the Word of the Day!')
    .action(()=>{
        functions.wordOfTheDay();
    });

program
    .command('synonym <word>')
    .alias('syn')
    .description('Getting the Synonyms of the Given Word!')
    .action((word)=>{
        functions.getSynonyms(word);
    });

program
    .command('antonyms <word>')
    .alias('ant')
    .description('Getting the Antonyms of the Given Word!')
    .action((word)=>{
        functions.getAntonyms(word);
    });

program
    .command('definition <word>')
    .alias('def')
    .description('Getting the Definitions of the Given Word!')
    .action((word)=>{
        functions.getDefinition(word);
    });

program
    .command('examples <word>')
    .alias('ex')
    .description('Getting the Examples of the Given Word!')
    .action((word)=>{
        functions.getExamples(word);
    });

program
    .command('dict <word>')
    .alias('d')
    .description('Getting the Complete Details of the Given Word!')
    .action((word)=>{
        functions.getCompleteDetails(word);
    });


program
    .command('play')
    .alias('p')
    .description('A Simple Word Game to Test You :)')
    .action(() => {
        functions.playWordGame();
    });
    

program
    .on('command:*', function(command) {
        console.error(chalk.bold.red('Invalid command: %s\nSee --help for a list of available commands.'), program.args.join(' '));
        process.exit(1);
    })


if (process.argv.length === 2) {
    functions.wordOfTheDay();
}

program.parse(process.argv);