const discord = require("discord.js");
const noblox = require("noblox.js");

module.exports.run = async (client, message, args) => {

    var staffCH = message.guild.channels.cache.find(ch => ch.id === "883108991599775784")

    var embed1 = new discord.MessageEmbed()
        .setTitle('ROBLOX - Report Management')
        .setDescription("Wat is de profiellink van de gebruiker?")
        .setColor("BLUE")
        .setTimestamp();

    message.channel.send(embed1);

    message.channel.awaitMessages(s => s.author.id == message.author.id, { max: 1 }).then(antwoord => {
        var antwoord1 = antwoord.first();;

        var embed2 = new discord.MessageEmbed()
            .setTitle("ROBLOX - Report Helpdesk")
            .setDescription(`Geef een reden op.`)
            .setColor("BLUE")
            .setTimestamp();

        message.channel.send(embed2);

        message.channel.awaitMessages(s => s.author.id == message.author.id, { max: 1 }).then(antwoord => {

            var antwoord2 = antwoord.first();;

            var embed4 = new discord.MessageEmbed()
                .setTitle("ROBLOX - Report Helpdesk")
                .setDescription(`Bedankt voor de report, een medewerker neemt zsm contact met u op!`)
                .setColor("BLUE")
                .setTimestamp();

            message.author.send(embed4);

            var embed = new discord.MessageEmbed()
                .setTitle("Binnengekomen report")
                .addFields(
                    { name: "Rapporteerder", value: `${message.author.tag}` },
                    { name: "Reden Rapportage", value: `${antwoord2}` },
                    { name: "Roblox Profiel", value: `${antwoord1}` }
                )
                .setColor("BLUE")
                .setTimestamp();

            staffCH.send(embed).then(async msg => {

                message.delete();

                var emoji = await promptMessage(msg, message.author, ["✅", "❌"]);

                if (emoji === "✅") {

                    msg.delete();

                    staffCH.send("Deze report zal in behandeling worden genomen.");

                    staffCH.send(`Discord gegevens persoon: ${message.author.tag}`);

                } else if (emoji === "❌") {

                    msg.delete();

                    staffCH.send('Deze report is geweigerd');

                    var badEmbed = new discord.MessageEmbed()
                        .setTitle("Roblox - Helpdesk")
                        .addFields(
                            { name: "Status", value: "Afgehandeld, Geweigerd" },
                            { name: `Je report is geweigert `, value: `Een medewerker komt u zsm contacteren.` }
                        )
                        .setColor("BLUE")
                        .setTimestamp()

                    message.author.send(badEmbed);

                    staffCH.send(`Discord gegevens persoon: ${message.author.tag}`);

                }


            })

        })
    })

}

module.exports.help = {
    name: "report",
}

async function promptMessage(message, author, reactions) {

    // We gaan ieder meegegeven reactie onder de reactie plaatsen.
    for (const reaction of reactions) {
        await message.react(reaction);
    }

    var filter = (reaction) => reactions.includes(reaction.emoji.name);

    return message.awaitReactions(filter, { max: 1 }).then(collected => collected.first() && collected.first().emoji.name);

}