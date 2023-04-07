const helpFn = () => {
  console.log(`
        List of all command is given below:
    
                                            node index.js help
                                            node index.js tree "dirPath"
                                            node index.js organize "dirPath"
        
        `);
};

module.exports = {
  helpKey: helpFn,
};
