const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    if (!args[1]) return message.channel.send("Geef een suggestie op.");

    var channel = message.guild.channels.cache.find(ch => ch.id === "848829367278501888");

    var staffCH = message.guild.channels.cache.find(sc => sc.id === "868692409079439360");

    var succesvolEmbed = new discord.MessageEmbed()
        .setColor("GREEN")
        .setDescription("✅ Suggestie is succesvol verstuurd naar het desbetreffende kanaal voor goedkeuring.");

    message.channel.send(succesvolEmbed);

    var embed = new discord.MessageEmbed()
        .setTitle("Suggestie")
        .setAuthor(message.author.tag)
        .setColor("#ffd500")
        .setDescription(`${args.slice(1).join(' ')}`)
        .setFooter(`Suggestie van ${message.author.username}`)
        .setTimestamp();

    var gembed = new discord.MessageEmbed()
        .setTitle("Suggestie")
        .setAuthor(message.author.tag)
        .setColor("#ffd500")
        .setDescription(`Suggestie van ${message.author.tag}\n ${args.slice(1).join(' ')}`)
        .setFooter(`Suggestie van ${message.author.tag}`)
        .setTimestamp();

    staffCH.send(gembed).then(async msg => {

        message.delete();

        var emoji = await promptMessage(msg, message.author, ["✅", "❌"]);

        if (emoji === "✅") {

            msg.delete();

            message.author.send("Je suggestie in Den Haag is succesvol goedgekeurd en verstuurd naar het desbetreffende kanaal.");

            channel.send(embed);

        } else if (emoji === "❌") {

            message.delete();

            message.author.send("Je suggestie in Den Haag is afgewezen.");

        }


    })

}

// Emojis aan teksten kopellen.
async function promptMessage(message, author, reactions) {

    // We gaan ieder meegegeven reactie onder de reactie plaatsen.
    for (const reaction of reactions) {
        await message.react(reaction);
    }

    var filter = (reaction) => reactions.includes(reaction.emoji.name);

    return message.awaitReactions(filter, { max: 1 }).then(collected => collected.first() && collected.first().emoji.name);

}

module.exports.help = {
    name: "suggest",
    description: "Verstuurd een suggestie",
    category: "Algemeen"
}