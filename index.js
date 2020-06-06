console.log('hello')
var inquirer = require('inquirer');
const fs = require("fs");
const axios = require("axios");

inquirer
  .prompt([
      {
          type: 'input',
          name: 'ProjectName',
          message: 'What is your project called?'
      },
      {
        type: 'input',
        name: 'Description',
        message: 'Provide a brief description of the project'  
      },
      {
        type: 'editor',
        name: 'TOC',
        message: 'Provide a table of contetns'  
      },
      {
        type: 'list',
        name: 'Badge',
        message: 'Do you have any of these badges?',
        choices: ['Apache', 'Eclipse', 'IBM'],
        filter: function(val){
            return val.toLowerCase();
        }  
      },
      {
        type: 'input',
        name: 'Installation',
        message: 'Provide installation instructions'  
      },
      {
        type: 'input',
        name: 'Useage',
        message: 'Provide the usage of this code'  
      },
      {
        type: 'input',
        name: 'License',
        message: 'Provide your license information'  
      },
      {
        type: 'input',
        name: 'Contributing',
        message: 'Provider information on the contributors'  
      },
      {
        type: 'input',
        name: 'Tests',
        message: 'Provide testing information'  
      },
      {
        type: 'input',
        name: 'email',
        message: 'Provide your github email'  
      }
  ])
  .then(async answers => {
    console.log("What is this?", answers);
    console.log(answers.Badge);
    let badgeLink = await badge(answers.Badge);
    let formatTOC = await editTOC(answers.TOC);

    let readMeString = `
# Title: 
${answers.ProjectName}
Description: 
${answers.Description}
Table of Contents: 
* ${formatTOC}
Badges:
${badgeLink}
Installation:
 ${answers.Installation}
Usage: 
${answers.Useage}
License: 
${answers.License}
Contributing:
${answers.Contributing}
Test:
${answers.Test}
GitHub Email:
${answers.Email}
        `

    fs.writeFile("readMe.md", readMeString, function(err){
        if (err) throw err;
        console.log('success');
    })
  });

function badge(bad){
    let link = ""
    if(bad === 'apache'){
        link = '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)';
    } else if(bad === 'eclipse'){
        link = '[![License](https://img.shields.io/badge/License-EPL%201.0-red.svg)](https://opensource.org/licenses/EPL-1.0)';
    } else if(bad === 'ibm'){
        link = '[![License: IPL 1.0](https://img.shields.io/badge/License-IPL%201.0-blue.svg)](https://opensource.org/licenses/IPL-1.0)';
    } 
    return link;
}

function editTOC(toc){

        let match = toc.indexOf('\n')
        console.log(match);
        if (match > 0){
            const forT = toc.slice(0, match+1) + '* ' + toc.slice(match+1, toc.length);

        return forT; 

}
}
