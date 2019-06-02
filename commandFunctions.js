var axios = require('axios');
var chalk = require('chalk');
var clear = require('clear');
var inquirer = require('inquirer');
var url = 'https://fourtytwowords.herokuapp.com';
var functionUrl;
var apiKey = '99ad131a80e839f334f1a4812c7c7e02d2cd4cd405672dd0ec29d43ad192393abbf3d767f89472cb0c4121940e76ef2ce55a63a10928693f7ad83f22e1ed1c04a7df54e2bc5b3cebe7c78a0e8bcfe624';


function wordOfTheDay(){  
    functionUrl = '/words/randomWord';
    axios({
        method: 'get',
        url: url +  functionUrl,
        params: {
            api_key: apiKey
        }
    })
    .then( res => {
        console.log('Word Of The Day is ' + chalk.green(res.data.word));
        getCompleteDetails(res.data.word);
    })
    .catch( error => {
        console.log(chalk.red(error));
    })
}

// searchArray(arr,){

// }

function getSynonyms(word){
    functionUrl = '/word/' + word + '/relatedWords';
    axios({
        method: 'get',
        url: url +  functionUrl,
        params: {
            api_key: apiKey
        }
    })
    .then( res => {
        var resp = res.data;
        var synonym = resp.find((data) => {
            return data.relationshipType == 'synonym';
        });
        if( synonym != undefined ){
            console.log(chalk.bold('Synonyms') + ' of the word \"' + chalk.bold.green(word) + '\" are: ');
            synonym.words.forEach((word, index) => {
                if(index % 2 == 0) {
                    console.log('     ' + chalk.bold.yellow(word));
                } else {
                    console.log('     ' + chalk.bold.blue(word));
                }    
            });
        } else {
            console.log(chalk.red('Couldn\'t find Synonyms of the word \"' + chalk.bold(word) + '\"'));
        }
    })
    .catch( error => {
        console.log(chalk.red('Oops! Word Not Found! Try Again!!'));
    })
}

function getAntonyms(word){
    functionUrl = '/word/' + word + '/relatedWords';
    axios({
        method: 'get',
        url: url +  functionUrl,
        params: {
            api_key: apiKey
        }
    })
    .then( res => {
        var resp = res.data;
        var antonyms = resp.find((data) => {
            return data.relationshipType == 'antonym';
        });
        if( antonyms != undefined ){
            console.log(chalk.bold('Antonyms') + ' of the word \"' + chalk.bold.green(word) + '\" are: ');
            antonyms.words.forEach((word, index) => {
                if(index % 2 == 0){
                    console.log('     ' + chalk.bold.yellow(word));
                } else {
                    console.log('     ' + chalk.bold.blue(word));
                }
            });
        } else {
            console.log(chalk.red('Couldn\'t find Antonyms of the word \"' + chalk.bold(word) + '\"'));
        }
    })
    .catch( error => {
        console.log(chalk.red('Oops! Word Not Found! Try Again!!'));
    })
}

function getDefinition(word){
    functionUrl = '/word/' + word + '/definitions';
    axios({
        method: 'get',
        url: url +  functionUrl,
        params: {
            api_key: apiKey
        }
    })
    .then( res => {
        var resp = res.data;
        loaded = true;
        // console.log(JSON.stringify(resp));
        console.log(chalk.bold('Definitions') + ' of the word \"' + chalk.green.bold(word) + '\" are: ');
        resp.forEach((data,index) => {
            if(index % 2 == 0){
                console.log('     ' + chalk.yellow(data.text));
            } else {
                console.log('     ' + chalk.blue(data.text));
            }
        });
    })
    .catch( error => {
        console.log(chalk.red('Oops! Word Not Found! Try Again!!'));
    });
}

function getExamples(word){
    functionUrl = '/word/' + word + '/examples';
    axios({
        method: 'get',
        url: url +  functionUrl,
        params: {
            api_key: apiKey
        }
    })
    .then( res => {
        var examples = res.data.examples;
        loaded = true;
        // console.log(examples);
        console.log(chalk.bold('Examples') + ' of the word \"' + chalk.bold.green(word) + '\" are: ');
        examples.forEach((data, index) => {
            if(index % 2 == 0){
                console.log('     ' + chalk.yellow(data.text));
            } else {
                console.log('     ' + chalk.blue(data.text));
            }
        });
    })
    .catch( error => {
        console.log(chalk.red('Oops! Word Not Found! Try Again!!'));
    });
}

function getCompleteDetails(word){
    // getting the definition ..
    functionUrl = '/word/' + word + '/definitions';
    axios({
        method: 'get',
        url: url +  functionUrl,
        params: {
            api_key: apiKey
        }
    })
    .then( res => {
        var resp = res.data;
        console.log(chalk.bold('Definitions') + ' of the word \"' + chalk.green.bold(word) + '\" are: ');
        resp.forEach((data,index) => {
            if(index % 2 == 0){
                console.log('     ' + chalk.yellow(data.text));
            } else {
                console.log('     ' + chalk.blue(data.text));
            }
        });
        console.log();
        // getting the synonyms

        functionUrl = '/word/' + word + '/relatedWords';
        axios({
            method: 'get',
            url: url +  functionUrl,
            params: {
                api_key: apiKey
            }
        })
        .then( res => {
            var resp = res.data;
            var synonym = resp.find((data) => {
                return data.relationshipType == 'synonym';
            });
            if( synonym != undefined ){
                console.log(chalk.bold('Synonyms') + ' of the word \"' + chalk.bold.green(word) + '\" are: ');
                synonym.words.forEach((word, index) => {
                    if(index % 2 == 0) {
                        console.log('     ' + chalk.bold.yellow(word));
                    } else {
                        console.log('     ' + chalk.bold.blue(word));
                    }    
                });
            } else {
                console.log(chalk.red('Couldn\'t find Synonyms of the word \"' + chalk.bold(word) + '\"'));
            }
    
            // getting the antonyms
            console.log();

            var antonyms = resp.find((data) => {
                return data.relationshipType == 'antonym';
            });
            if( antonyms != undefined ){
                console.log(chalk.bold('Antonyms') + ' of the word \"' + chalk.bold.green(word) + '\" are: ');
                antonyms.words.forEach((word, index) => {
                    if(index % 2 == 0) {
                        console.log('     ' + chalk.bold.yellow(word));
                    } else {
                        console.log('     ' + chalk.bold.blue(word));
                    }    
                });
            } else {
                console.log(chalk.red('Couldn\'t find Antonyms of the word \"' + chalk.bold(word) + '\"'));
            }

            // Getting the examples
            console.log();
            
            functionUrl = '/word/' + word + '/examples';
            axios({
                method: 'get',
                url: url +  functionUrl,
                params: {
                    api_key: apiKey
                }
            })
            .then( res => {
                var examples = res.data.examples;
                loaded = true;
                // console.log(examples);
                console.log(chalk.bold('Examples') + ' of the word \"' + chalk.bold.green(word) + '\" are: ');
                examples.forEach((data, index) => {
                    if(index % 2 == 0){
                        console.log('     ' + chalk.yellow(data.text));
                    } else {
                        console.log('     ' + chalk.blue(data.text));
                    }
                });
            });
            console.log();

        });
    })
    .catch( error => {
        console.log(chalk.red('Oops! Word Not Found! Try Again!!'));
    });
}

function randomNumberGenerator(min, max){
    return Math.floor(Math.random() * max) + min;
}

function selectObj(object){
    var index = randomNumberGenerator(0,object.length);
    return object[index];
}

function promptMsg(msg) {
    return inquirer
        .prompt([{
            message: msg,
            name: 'answer'
        }])
}

function switchFunc(definitions, synonyms, antonyms){
    var num, obj, ans;
    if(antonyms == undefined){
        num = randomNumberGenerator(1,2);
    } else {
        num = randomNumberGenerator(1,3);
    }
    switch(num){
        case 1:
            obj = selectObj(definitions);
            ans = promptMsg('What is Word having Definition: ' + chalk.yellow(obj.text));
            // console.log('What is Word having Definition: ' + obj.text);
            break;
        case 2:
            obj = selectObj(synonyms);
            ans = promptMsg('Synonym of ' + chalk.yellow(obj) + ' is?');
            // console.log('Synonym of ' + obj + ' is?');
            break;
        case 3:
            obj = selectObj(antonyms);
            ans = promptMsg('Antonym of ' + chalk.yellow(obj) + ' is?');
            // console.log('Antonym of ' + obj + ' is?');
            break;
    }
    return ans;
}

function evaluate(userAns, ans, ansSynonyms, ansDefinitions, ansAntonyms){
    console.log();
    var ansss = ans;
    if(ans == userAns){
        console.log(chalk.green('Corrent Answer! You are Genius!!'));
        process.exit(1);
    }
    if(ansSynonyms.indexOf(userAns) != -1){
        console.log(chalk.yellow('Not Exact What we were looking for! You were very close!!'));
        console.log(chalk.green('Answer is ') + chalk.green.bold(ans));
        process.exit(1);
    }
    else{
        console.log(chalk.red('Oops! You are Wrong!!'));
        inquirer.prompt([
            {
                type: 'list',
                name: 'opt',
                message: 'What Do You want to do Now?',
                choices: [
                    '1. Try Again',
                    '2. Give Hint!',
                    '3. Quit'
                ]
            }
        ])
        .then(answers => {
            var opt = answers.opt;
            switch(opt){
                case '1. Try Again': 
                    var ansPrompt = promptMsg('Try Again.. You can do better..');
                    ansPrompt.then(answers => {
                        userAns = answers.answer;
                        evaluate(userAns, ansss, ansSynonyms, ansDefinitions, ansAntonyms);
                    });
                    break;
                case '2. Give Hint!':
                    clear();
                    var ansPromise = switchFunc(ansDefinitions, ansSynonyms, ansAntonyms);
                    var userAns;
                    ansPromise.then(answers => {
                        userAns = answers.answer;
                        evaluate(userAns, ansss, ansSynonyms, ansDefinitions, ansAntonyms);
                    });
                    break;
                case '3. Quit':
                    console.log(chalk.blue('Correct Answer is ' + ansss));
                    console.log();
                    getCompleteDetails(ansss);
                    break;
            }
        })
    }
}

function playWordGame(trialWord){
    functionUrl = '/words/randomWord';
    axios({
        method: 'get',
        url: url +  functionUrl,
        params: {
            api_key: apiKey
        }
    })
    .then( res => {
        var word = res.data.word;
        if(trialWord == undefined)
            trialWord = word;
        // functionUrl = '/word/' + word + '/definitions';
        functionUrl = '/word/' + trialWord + '/definitions';
        axios({
            method: 'get',
            url: url +  functionUrl,
            params: {
                api_key: apiKey
            }
        })
        .then( res => {
            var definitions = res.data; 
            // getting the synonyms

            // functionUrl = '/word/' + word + '/relatedWords';
            functionUrl = '/word/' + trialWord + '/relatedWords';
            axios({
                method: 'get',
                url: url +  functionUrl,
                params: {
                    api_key: apiKey
                }
            })
            .then( res => {
                var resp = res.data;
                var synonyms = resp.find((data) => {
                    return data.relationshipType == 'synonym';
                });
                synonyms = synonyms.words;

                var antonyms = resp.find((data) => {
                    return data.relationshipType == 'antonym';
                });
                if(antonyms != undefined)
                    antonyms = antonyms.words;

                console.log(chalk.blue('So, Let\'s Begin Our Word Game & Test You...'));
                var ansPromise = switchFunc(definitions, synonyms, antonyms);
                var ans;
                ansPromise.then(answers => {
                    ans = answers.answer;
                    evaluate(ans, trialWord, synonyms, definitions, antonyms);
                });
            })
        })
        .catch( error => {
            console.log(chalk.red('There was some problem.. Kindly Try Again!!'));
        })
    })
    .catch( error => {
        console.log(chalk.red('There was some problem.. Kindly Try Again!!'));
    })
}

module.exports = { wordOfTheDay, getSynonyms, getAntonyms, getDefinition, getExamples, getCompleteDetails, playWordGame };