const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    const categoryID = "865576578948005898";

    if (!message.member.hasPermission("MUTE_MEMBERS")) return message.reply("Jij kan dit niet doen");

    var ticketLogs = message.guild.channels.cache.find(ch => ch.id === "867900892400713789");

    if (message.channel.parentID == categoryID) {

        message.channel.delete();

        var closeTicketEmbed = new discord.MessageEmbed()
            .setTitle("Ticket Afgesloten")
            .setDescription(`Ticket afgesloten door de medewerker: ${message.author}.`)
            .setColor("GREEN")
            .setTimestamp();

        return ticketLogs.send(closeTicketEmbed);
    } else {
        var embed = new discord.MessageEmbed()
            .setTitle("Error!")
            .setDescription("Dit commando kan alleen worden toegepast in een ticket.")
            .setColor("#ff4400");

        message.author.send(embed);
    }

}

module.exports.help = {
    name: "close",
    description: "Sluit ticket"
}