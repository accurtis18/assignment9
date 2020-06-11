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
        type: 'confirm',
        name: 'TOC',
        message: 'Provide a table of contetns', 
        default: false 
      },
      {
        type: 'list',
        name: 'Badge',
        message: 'Do you have any of these badges?',
        default: false,
        choices: ['Apache', 'Eclipse', 'IBM'],
        filter: function(val){
            return val.toLowerCase();
        }  
      },
      {
        type: 'input',
        name: 'Installation',
        message: 'Provide installation instructions',
        default: false  
      },
      {
        type: 'input',
        name: 'Usage',
        message: 'Provide the usage of this code',
        default: false  
      },
      {
        type: 'input',
        name: 'License',
        message: 'Provide your license information',
        default: false  
      },
      {
        type: 'input',
        name: 'Contributing',
        message: 'Provider information on the contributors',
        default: false 
      },
      {
        type: 'input',
        name: 'Tests',
        message: 'Provide testing information',
        default: false 
      },
      {
        type: 'input',
        name: 'email',
        message: 'Provide your github email',
        default: false 
      }
  ])
  .then(async answers => {
    console.log("What is this?", answers);
    console.log(answers.Badge);
    let badgeLink = await badge(answers.Badge);
    // let formatTOC = await editTOC(answers.TOC);
    let response = await createResponse(answers, badgeLink);

//     let readMeString = `
// # Title\ 
// ${answers.ProjectName}
// # Description\ 
// ${answers.Description}
// # Table of Contents\ 
// * ${formatTOC}
// # Badges:
// ${badgeLink}
// # Installation:
//  ${answers.Installation}
// # Usage: 
// ${answers.Usage}
// # License: 
// ${answers.License}
// # Contributing:
// ${answers.Contributing}
// # Test:
// ${answers.Tests}
// # GitHub Email:
// ${answers.email}
//         `

    fs.writeFile("readMe.md", response, function(err){
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

function createResponse(answers, badge){
  let ToC = ""
  let header = `
  # Title\ 
  ${answers.ProjectName}
  # Description\ 
  ${answers.Description}
  `
  let responseBody = `
  # Badges:
${badge}`;
  let response = "";

  if(answers.TOC){
    ToC = `# Table of Contents\n
* [Badges](#badges)`
  }
  if(answers.Installation){
    ToC += `
* [Installation](#installation)`;
    responseBody += `
    # Installation:
 ${answers.Installation}`
  }
  if(answers.Usage){
    ToC += `
* [Usage](#usage)`;
    responseBody += `
    # Usage:
 ${answers.Usage}`
  }
if(answers.License){
  ToC += `
* [License](#license)`;
  responseBody += `
  # License:
${answers.License}`
}
if(answers.Contributing){
  ToC += `
* [Contributing](#contributing)`;
  responseBody += `
  # Contributing:
${answers.Contributing}`
}
if(answers.Tests){
  ToC += `
* [Tests](#tests)`;
  responseBody += `
  # Tests:
${answers.Tests}`
}
if(answers.email){
  ToC += `
* [Email](#email)`;
  responseBody += `
  # Email:
${answers.email}`
}
if(answers.TOC){
  response = header + ToC + responseBody;
  return response;
} else{
  response = header + responseBody;
  return response;
}

}

// function editTOC(toc){
//         let match = toc.indexOf('\n');
//         let trim = toc.lastIndexOf('\n');
//         if(trim === toc.length-1){
//             toc = toc.slice(0, toc.length-1);
//         }
//         let formatTOC = "";
//         let i = 0;
//         while (match > 0){
//             if(i === 0){
//                 formatTOC = toc.slice(0, match+1) + '* ' + toc.slice(match+1, toc.length);
//                 match = formatTOC.indexOf('\n', match+1);
//                 console.log(match);
//             } else{
//                 formatTOC = formatTOC.slice(0, match+1) + '* ' + formatTOC.slice(match+1, formatTOC.length);
//                 match = formatTOC.indexOf('\n', match+1);
//             }
//             i++;
//         }
//         return formatTOC; 
// }
