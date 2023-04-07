#!/usr/bin/env node // add shebang syntax

// npm init -y -> in package.json file add "bin": {"prince": "main.js"} after license and then
// npm link

// import command functions
const help = require("./commands/help");
const tree = require("./commands/tree");
const organize = require("./commands/organize");

let pjson = require("./package.json");

const inputArr = process.argv.slice(2);
// console.log(inputArr.toString().split(",").join(" "));
// INPUT: node input.js hello this is prince jain
// OUTPUT: hello this is prince jain

let command = inputArr[0];

switch (command) {
  case "help":
    help.helpKey();
    break;

  case "tree":
    tree.treeKey(inputArr[1]);
    break;

  case "organize":
    organize.organizeKey(inputArr[1]);
    break;

  case "--version":
  case "-v":
    console.log(`v${pjson.version}`);
    break;

  case "--author":
  case "-a":
    console.log(`The great ${pjson.author.toUpperCase()}`);
    break;

  default:
    console.error(
      `${command} naam ki koi command nhi h...\n"help", "tree", "organize", "--version", "-v", "--author", "-a" me se koi command likh`
    );
    break;
}
