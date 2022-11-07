const { createWriteStream } = require("fs");
const process = require("process");

const readableFromTerminal = process.stdin;
const writableToFile = createWriteStream("./02-write-file/text.txt");

readableFromTerminal.pipe(writableToFile);

console.log("Hello, my friend!");

readableFromTerminal.on("data", (chunk) => {
    if (chunk.toString().match("exit")) {
        console.log("Goodbye, my friend!");
        readableFromTerminal.unpipe(writableToFile);
    };
});

process.on("SIGINT", () => {
    console.log("Goodbye, my friend!");
    readableFromTerminal.unpipe(writableToFile);
});