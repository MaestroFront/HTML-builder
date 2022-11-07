const fs = require("fs");

function createNewFile(fileName) {
    fs.writeFile(`./05-merge-styles/project-dist/${fileName}`, "", err => {
        if (err) console.log(err);
        console.log(`Created/Updated "${fileName}" is successfully!`);
    })
};
createNewFile("bundle.css");

fs.readdir("./05-merge-styles/styles", { encoding: "utf-8", withFileTypes: true }, (error, dirEntryList) => {
    if (error) console.log(error);
    dirEntryList.forEach(item => {
        if (item.isFile() && item.name.split(".")[1] === "css") {
            const readStream = fs.createReadStream(`./05-merge-styles/styles/${item.name}`);
            readStream.on("data", (chunk) => {
                fs.appendFile("./05-merge-styles/project-dist/bundle.css", `${chunk}\n`, err => {
                    if (err) console.log(err);
                    console.log(`Changes "${item.name}" added to "bundle.css"!`);
                })
            });
        }
    });
});