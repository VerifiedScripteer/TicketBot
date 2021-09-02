const discord = require("discord.js");
const botConfig = require("./botconfig.json");
const fs = require("fs");
const { sep } = require("path");
const warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
const ms = require('ms');
const { EventEmitter } = require("stream");
EventEmitter.setMaxListeners
const { group } = require("console");
const disbut = require("discord-buttons");
const superagent = require ("superagent");

const client = new discord.Client();
require('discord-buttons')(client);
const { MessageMenuOption, MessageMenu } = require("discord-buttons")
client.commands = new discord.Collection();
client.aliases = new discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);

    var jsfiles = files.filter(f => f.split(".").pop() === "js");

    if (jsfiles.length <= 0) {
        console.log("Ik kon geen files vinden.");
        return;
    }

    jsfiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`De file ${f} is geladen.`);

        client.commands.set(fileGet.help.name, fileGet);

    })

});

client.login(process.env.token);

client.on("ready", async () => {

    console.log(`${client.user.username} is online.`);

    client.user.setActivity("Reports", { type: "WATCHING" });


});

client.on("message", async message => {

    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    const args = message.content.slice(prefix.length).split(/ +/);

    if (!message.content.startsWith(prefix)) return;

    var commands = client.commands.get(command.slice(prefix.length));

    if (message.author.bot) return;

    var commandList = [];
    var prefix = botConfig.prefix;

    if (commands) commands.run(client, message, args);
    

});