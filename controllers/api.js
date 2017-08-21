const { lstatSync, readdirSync } = require('fs')
const { join } = require('path')

exports.ping = ((req, res) => {
    res.status(200).json({message: "ALIVE"});
});

exports.getFolderList = ((req, res) => {
    const isDirectory = source => lstatSync(source).isDirectory()
    const getDirectories = source =>
        readdirSync(source).map(name => join(source, name)).filter(isDirectory)
    res.status(200).json({folders:getDirectories("./client/public")});
})