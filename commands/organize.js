const fs = require("fs");
const path = require("path");

let types = {
  Coding: ["js", "ts", "jsx", "tsx", "py"],
  Documents: ["txt", "doc", "docs", "pdf", "xls", "xlsx", "ps"],
  Media: ["mp4", "mp3", "mkv", "ogg"],
  archives: ["zip", "7z", "rar", "gz", "ar", "iso", "xz"],
  Applications: ["exe", "msi", "dmg", "pkg", "deb"],
};

const organizeFn = (dirPath) => {
  let destPath = "";
  if (dirPath === undefined) {
    // console.log("Kindly provide any path");
    destPath = process.cwd(); // for making global
    return;
  } else {
    const isExist = fs.existsSync(dirPath);

    if (isExist) {
      destPath = path.join(dirPath, "Organized_Files");

      if (fs.existsSync(destPath) === false) {
        fs.mkdirSync(destPath);
        organizedHelperFn(dirPath, destPath);
        console.log(`Organize command implemented for path: ${dirPath}`);
      } else {
        console.log(`Already Organized path: ${dirPath}`);
      }
    } else {
      console.log("Please enter the correct path");
    }
  }
};

const organizedHelperFn = (source, destination) => {
  let childNames = fs.readdirSync(source);
  // console.log(childNames);
  for (let i = 0; i < childNames.length; i++) {
    let childAddress = path.join(source, childNames[i]);
    let isFile = fs.lstatSync(childAddress).isFile();

    if (isFile) {
      // console.log(childNames[i]);
      let category = getCategory(childNames[i]);
      // console.log(`${childNames[i]} belongs to ${category} category`);

      sendFiles(childAddress, destination, category);
    }
  }
};

const getCategory = (childname) => {
  let extension = path.extname(childname);
  // extension = extension.split(".")[1];
  // OR you can also use slice methods for removing dot(.)
  extension = extension.slice(1);
  // console.log(extension);

  for (let type in types) {
    let currentTypeArr = types[type];
    for (let i = 0; i < currentTypeArr.length; i++) {
      if (extension === currentTypeArr[i]) {
        return type;
      }
    }
  }

  return "Others";
};

const sendFiles = (srcFilePath, dest, catgry) => {
  let categoryPath = path.join(dest, catgry);

  if (fs.existsSync(categoryPath) === false) {
    fs.mkdirSync(categoryPath);
  }

  let fileName = path.basename(srcFilePath);
  let destFilePath = path.join(categoryPath, fileName);
  fs.copyFileSync(srcFilePath, destFilePath); // --- For Copy
  fs.unlinkSync(srcFilePath); // to delete the original files ---Only For Cut
  // console.log(`${fileName} copied to ${categoryPath}`);
};

module.exports = {
  organizeKey: organizeFn,
};
