const fs = require("fs");

function resolutionFile(direntName) {
    direntName = direntName.split(".");
    return direntName[direntName.length - 1];
};

function createNewFile(fileName) {
    fs.writeFile(`./05-merge-styles/project-dist/${fileName}`, "", err => {
        if (err) console.log(err);
        console.log(`Created/Updated "${fileName}" is successfully!`);
    })
};
createNewFile("bundle.css");

function combineFiles(path, buildName) {
    fs.readdir(path, { encoding: "utf-8", withFileTypes: true }, (error, dirEntryList) => {
        if (error) console.log(error);
        dirEntryList.forEach(item => {
            if (item.isFile() && resolutionFile(item.name) === "css") {
                const readStream = fs.createReadStream(`${path}/${item.name}`);
                readStream.on("data", (chunk) => {
                    fs.appendFile(`./05-merge-styles/project-dist/${buildName}`, `${chunk}\n`, err => {
                        if (err) console.log(err);
                        console.log(`"${item.name}" added/updated to "${buildName}"!`);
                    })
                });
            }
        });
    });
};
combineFiles("./05-merge-styles/styles", "bundle.css");