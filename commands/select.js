const discord = require("discord.js");
const { MessageMenuOption, MessageMenu } = require("discord-buttons");

module.exports.run = async (client, message, args) => {

    let option1 = new MessageMenuOption()
        .setLabel("Ticket Sluiten")
        .setValue("Optie 1")
        .setDescription("Sluit ticket af")
        .setDefault()
        .setEmoji(`📝`)

    let option2 = new MessageMenuOption()
        .setLabel("Ticket aannemen")
        .setValue("Optie 2")
        .setDescription("Neemt ticket aan.")
        .setDefault()
        .setEmoji(`🔐`)

    let option3 = new MessageMenuOption()
        .setLabel("Ticket Overzetten")
        .setValue("Optie 3")
        .setDescription("Zet ticket open.")
        .setDefault()
        .setEmoji(`🔒`)

    let selection = new MessageMenu()
        .setID("Selection")
        .setMaxValues(1)
        .setMinValues(1)
        .setPlaceholder("Klik hier om een keuze te maken.")
        .addOption(option1)
        .addOption(option2)
        .addOption(option3)

    var embed = new discord.MessageEmbed()
        .setTitle("Ticket Beheerpaneel")
        .setDescription("Selecteer via hieronder wat je met het ticket wilt doen.")
        .setColor("#010e7d")
        .setTimestamp()
        .setFooter("Ticket Management - Den Haag")

    let menumsg = await message.channel.send(embed, selection)

    function menuselection(menu) {
        switch (menu.values[0]) {
            case "Optie 1":
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
                break;
            case "Optie 2":

                message.channel.updateOverwrite(message.guild.roles.cache.find(x => x.id === '867888851167084564'), {
                    SEND_MESSAGES: false,
                    VIEW_CHANNEL: true
                });      
                message.channel.updateOverwrite(message.author, {
                    SEND_MESSAGES: true,
                    VIEW_CHANNEL: true
                });       
                message.channel.updateOverwrite(message.guild.roles.cache.find(z => z.name === "Management"), {
                    SEND_MESSAGES: true,
                    VIEW_CHANNEL: true
                });       
                message.channel.updateOverwrite(message.guild.roles.cache.find(z => z.id === "867889970604539944"), {
                    SEND_MESSAGES: true,
                    VIEW_CHANNEL: true
                });            

                var embed = new discord.MessageEmbed()
                    .setTitle("Ticket Aangenomen!")
                    .setDescription(`Ticket is aangenomen en zal verder worden behandeld door de medewerker: ${message.author}`)
                    .setColor("BLUE")
                    .setTimestamp();

                message.channel.send(embed);

                message.channel.setTopic(`Ticket wordt behandeld door ${message.author}`);
                break;
            case "Optie 3":

                message.channel.updateOverwrite(message.guild.roles.cache.find(x => x.id === '867888851167084564'), {
                    SEND_MESSAGES: true,
                    VIEW_CHANNEL: true
                });    

                var embed1 = new discord.MessageEmbed()
                    .setTitle("Ticket Opengezet")
                    .setDescription("Ticket is opengezet. Deze zal worden behandeld door een ander staff-li")
                    .setColor("GREEN")
                    .setTimestamp();

                message.channel.send(embed1);

                message.channel.setTopic(`Ticket Opengezet!`)
                break;
            default:
                break;
        }
    }

    client.on("clickMenu", (menu) => {
        if (menu.message.id == menumsg.id) {
            if (menu.clicker.user.id == message.author.id) menuselection(menu)
            else menu.reply(':x: Je hebt hiervoor geen rechten', true)
        }
    })


}

module.exports.help = {
    name: "select",
    description: "Maakt ticket aan",
}