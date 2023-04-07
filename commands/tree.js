const fs = require("fs");
const path = require("path");

const treeFn = (dirPath) => {
  // console.log(`Tree command implemented for ${dirPath}`);

  if (dirPath === undefined) {
    // console.log("Kindly provide any path");
    treeHelperfn(process.cwd(), ""); // for making global
  } else {
    const isExist = fs.existsSync(dirPath);

    if (isExist) {
      treeHelperfn(dirPath, "");
    } else {
      console.log("Please enter the correct path");
    }
  }
};

const treeHelperfn = (source, indent) => {
  let isFile = fs.lstatSync(source).isFile();

  if (isFile === true) {
    let fileName = path.basename(source);
    console.log(indent + "├──📃 " + fileName);
  } else {
    let dirName = path.basename(source);
    console.log(indent + "└──📂 " + dirName);
    let childrens = fs.readdirSync(source);
    for (let i = 0; i < childrens.length; i++) {
      let childPath = path.join(source, childrens[i]);
      treeHelperfn(childPath, indent + "\t");
    }
  }
};

module.exports = {
  treeKey: treeFn,
};
