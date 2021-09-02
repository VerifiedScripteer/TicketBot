const discord = require ("discord.js")

module.exports.run = async (client, message, args) => {

    message.channel.send(1+1);
    console.log(1+1);
}

module.exports.help = {
    name: "1+1",
}