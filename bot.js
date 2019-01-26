const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");
const path = require("path");
const client = new Discord.Client();
const appDir = path.dirname(require.main.filename);

const config = require(appDir + "/json/config.json");
const strings = require(appDir + "/json/strings.json");
const functions = require(appDir + "/functions/additional.js");

client.config = config;
client.strings = strings;
client.functions = functions;
client.discord = Discord;
client.appDir = appDir;

fs.readdir(appDir + "/events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`${appDir}/events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
    });
});

client.commands = new Enmap();

fs.readdir(appDir + "/commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`${appDir}/commands/${file}`);
        let commandName = file.split(".")[0];
        client.commands.set(commandName, props);
    });
});

process.on("unhandledRejection", (reason) => {
    console.log("Unhandled Rejection: " + reason + ".\n");
});

client.login(config.token);