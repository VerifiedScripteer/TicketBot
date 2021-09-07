const discord = require("discord.js")

module.exports.run = async (client, message, args) => {


    var embed1 = new discord.MessageEmbed()
        .setTitle('Verlof - Aanvraag')
        .setDescription("Wat is de rede van je verlof?")
        .setColor("BLACK")
        .setTimestamp();

    message.channel.send(embed1);

    message.channel.awaitMessages(s => s.author.id == message.author.id, { max: 1 }).then(antwoord => {
        var antwoord1 = antwoord.first();;

        var embed2 = new discord.MessageEmbed()
            .setTitle("Verlof - Aanvraag")
            .setDescription(`Wanneer begint je afmelding?`)
            .setColor("BLACK")
            .setTimestamp();

        message.channel.send(embed2);

        message.channel.awaitMessages(s => s.author.id == message.author.id, { max: 1 }).then(antwoord => {
            var antwoord2 = antwoord.first();;

            var embed3 = new discord.MessageEmbed()
                .setTitle("Verlof - Aanvraag")
                .setDescription(`Wanneer eindigt je afmelding?`)
                .setColor("BLACK")
                .setTimestamp();

            message.channel.send(embed3);

            message.channel.awaitMessages(s => s.author.id == message.author.id, { max: 1 }).then(antwoord => {
                var antwoord3 = antwoord.first();;

                var embed4 = new discord.MessageEmbed()
                    .setTitle("Verlof - Aanvraag")
                    .setDescription(`Wat is je staff-rang?`)
                    .setColor("BLACK")
                    .setTimestamp();

                message.channel.send(embed4);

                message.channel.awaitMessages(s => s.author.id == message.author.id, { max: 1 }).then(antwoord => {
                    var antwoord4 = antwoord.first();;

                    var channel = message.guild.channels.cache.find(ch => ch.id === "884919041108631603");

                    var staffCH = message.guild.channels.cache.find(sc => sc.id === "884925461375897620");

                    var succesvolEmbed = new discord.MessageEmbed()
                        .setColor("GREEN")
                        .setDescription("✅ Verlof aanvraag is succesvol verstuurd naar het desbetreffende kanaal voor goedkeuring.");

                    message.channel.send(succesvolEmbed);

                    var embed = new discord.MessageEmbed()
                        .setTitle("Verlof")
                        .setDescription("Er is een verlof geplaatst.")
                        .setColor("BLACK")
                        .addFields(
                            { name: `Discordgegevens staff-lid`, value: `${message.author.tag}` },
                            { name: "Rede Verlof", value: `${antwoord1}` },
                            { name: "Begin Verlof", value: `${antwoord2}` },
                            { name: "Einde Verlof", value: `${antwoord3}` },
                            { name: "Staff-rang", value: `${antwoord4}` }
                        )

                    var embed5 = new discord.MessageEmbed()
                        .setTitle("Verlof Aanvraag")
                        .setDescription("Er is een verlof aanvraag gedaan.")
                        .setColor("BLACK")
                        .addFields(
                            { name: `Discordgegevens staff-lid`, value: `${message.author.tag}` },
                            { name: "Rede Verlof", value: `${antwoord1}` },
                            { name: "Begin Verlof", value: `${antwoord2}` },
                            { name: "Einde Verlof", value: `${antwoord3}` },
                            { name: "Staff-rang", value: `${antwoord4}` }
                        )

                    staffCH.send(embed5).then(async msg => {

                        message.delete();

                        var emoji = await promptMessage(msg, message.author, ["✅", "❌"]);

                        if (emoji === "✅") {

                            msg.delete();

                            message.author.send("Je verlof-aanvraag in Den Haag is succesvol goedgekeurd en verstuurd naar het desbetreffende kanaal.");

                            channel.send(embed);

                        } else if (emoji === "❌") {

                            message.delete();

                            message.author.send("Je verlof aanvraag in Den Haag is afgewezen.");

                        }


                    })
                })
            })
        })
    })

}

module.exports.help = {
    name: "verlof",
}

async function promptMessage(message, author, reactions) {

    // We gaan ieder meegegeven reactie onder de reactie plaatsen.
    for (const reaction of reactions) {
        await message.react(reaction);
    }

    var filter = (reaction) => reactions.includes(reaction.emoji.name);

    return message.awaitReactions(filter, { max: 1 }).then(collected => collected.first() && collected.first().emoji.name);

}