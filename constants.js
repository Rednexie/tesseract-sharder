const 
   buffer = require("buffer")
,  proces = require("process")
, child_process = require("child_process")
, cluster = require("cluster")
, path = require("path")
, fs = require("fs")
, os = require("os")
, vm = require("vm")
, readline = require("readline")
, Console = require("console")













// MODIFICATIONS




fs.exists, fs.exists_, fs._exists = (path, callback) => {
    fs.access(path, fs.constants.F_OK, err => {
        !err || typeof(err) == "undefined" || err == null ? callback(err, true) : callback(err, false)
    })
}






// MODIFICATIONS





const cache = require("./cache")
const Tesseract = require("tesseract.js")
const logicalThreads = (os.cpus().length * 2)
module.exports = {
    buffer,
    proces,
    child_process,
    cluster,
    path,
    os,
    fs,
    vm,
    Console,
    readline,

    cache,

    Tesseract,
    logicalThreads,
}