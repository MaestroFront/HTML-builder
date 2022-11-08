const fs = require("fs");

function createFolder(folderName) {
    fs.mkdir(`./06-build-page/${folderName}`, error => {});
};
createFolder("project-dist");
createFolder("project-dist/assets");

function createFile(fileName) {
    fs.writeFile(`./06-build-page/project-dist/${fileName}`, "", err => {});
};
createFile("index.html");
createFile("style.css");

fs.readdir("./06-build-page/assets/", { encoding: "utf-8", withFileTypes: true }, (error, dirEntryList) => {
    if (error) console.log(error);

    dirEntryList.forEach(elem => {

        if (elem.isFile()) {

            fs.copyFile(`./06-build-page/assets/${item.name}`, `./06-build-page/project-dist/assets/${item.name}`, err => {});

        } else if (elem.isDirectory()) {

            createFolder(`project-dist/assets/${elem.name}`);

            fs.readdir(`./06-build-page/assets/${elem.name}`, { encoding: "utf-8", withFileTypes: true }, (error, dirEntryList) => {
                if (error) console.log(error);
                dirEntryList.forEach(item => {
                    fs.copyFile(`./06-build-page/assets/${elem.name}/${item.name}`, `./06-build-page/project-dist/assets/${elem.name}/${item.name}`, err => {
                        if (err) console.log(err);
                    });
                });
            });

        }
    });
});

fs.readdir("./06-build-page/styles", { encoding: "utf-8", withFileTypes: true }, (error, dirEntryList) => {
    if (error) console.log(error);
    let arrayStyles = [];
    dirEntryList.map(elem => {

        if (elem.name.includes("header")) arrayStyles[0] = elem;
        if (elem.name.includes("main")) arrayStyles[1] = elem;
        if (elem.name.includes("footer")) arrayStyles[2] = elem;
        if (elem.name.includes("about")) arrayStyles[3] = elem;

    });
    dirEntryList = arrayStyles;
    dirEntryList.forEach(item => {
        
        if (item.isFile() && item.name.split(".")[1] === "css") {
            const readStream = fs.createReadStream(`./06-build-page/styles/${item.name}`);
            readStream.on("data", (chunk) => {
                fs.appendFile("./06-build-page/project-dist/style.css", `\n${chunk}\n`, err => {
                    if (err) console.log(err);
                })
            });
        }
        
    });
});

const readStreamTemplate = fs.createReadStream("./06-build-page/template.html");
const readStreamHeader = fs.createReadStream("./06-build-page/components/header.html");
const readStreamMain = fs.createReadStream("./06-build-page/components/articles.html");
const readStreamFooter = fs.createReadStream("./06-build-page/components/footer.html");

readStreamTemplate.on("data", (chunk) => {

    readStreamHeader.on("data", (headerChunk) => {

        readStreamMain.on("data", (mainChunk) => {

            readStreamFooter.on("data", (footerChunk) => {

                fs.access("./06-build-page/components/about.html", fs.F_OK, (err) => {
                    if (err) {
                        chunk = chunk.toString()
                            .replace("{{header}}", `\n${headerChunk.toString()}\n`)
                            .replace("{{articles}}", `${mainChunk.toString()}`)
                            .replace("{{footer}}", `\n${footerChunk.toString()}`);

                        fs.appendFile("./06-build-page/project-dist/index.html", chunk, error => {
                            if (error) console.log(error);
                        });
                    } else {
                        const readStreamAbout = fs.createReadStream("./06-build-page/components/about.html");
                        readStreamAbout.on("data", (aboutChunk) => {
                            chunk = chunk.toString()
                                .replace("{{header}}", `\n${headerChunk.toString()}\n`)
                                .replace("{{articles}}", `${mainChunk.toString()}`)
                                .replace("{{footer}}", `\n${footerChunk.toString()}`)
                                .replace("{{about}}", `\n${aboutChunk.toString()}`);

                            fs.appendFile("./06-build-page/project-dist/index.html", chunk, error => {
                                if (error) console.log(error);
                            });
                        })
                    };
                });

            });
        });
    });
});