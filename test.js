const TesseractSharder = require(".")
const { fs } = require("./constants")
const img = fs.readFileSync("./img.png")
const bar = require("./bar")
const sharder = new TesseractSharder();
sharder.recognize("./img.png", ev => {
    if(ev){
        console.clear()
        console.log(ev.status)
        console.log(bar(Math.floor(ev.progress * 100)))
    }
});