const Discord = require("discord.js");
const path = require('path');

module.exports.run = async(client, message, args) => {

    let langues = require(path.resolve(path.join('..', 'Archimede/database/lang.json')));
    let langue = langues[message.guild.id].langues;

    if(langue === 'fr'){
        const embed = await message.channel.send(
            new Discord.MessageEmbed()
                .setTitle('Système d\'aide')
                .setColor('ORANGE')
                .setDescription('Veuillez cochez les réactions en fonction du code ci-dessous :\n\n> 💾: ``Recevoir l\'aide sur les commandes de base``,\n> 👮‍♂️: ``Recevoir l\'aide sur les commandes de modération.``\n> 🔧: ``Recevoir l\'aide sur les commandes d\'utilitaire.``,\n> 🔮: ``Recevoir l\'aide sur les commandes fun``,\n> 🎉: ``Recevoir l\'aide sur les commandes de giveaways``,\n')
        )
        await embed.react('💾');
        await embed.react('👮‍♂️');
        await embed.react('🔧');
        await embed.react('🔮');
        await embed.react('🎉');

        const filter = (reaction, user) => {
            return ['💾', '👮‍♂️', '🔧', '‍🔮', '‍🎉'].includes(reaction.emoji.name) && user.id === message.author.id;
        };
    
        let bool = false;
        let prefixes = require(path.resolve(path.join('..', 'GWays/database/prefixes.json')));
        let prefix = prefixes[message.guild.id].prefixes;
        
        client.on('messageReactionAdd', (reaction, user) => {
            if (reaction.emoji.name === '💾' || reaction.emoji.name === '👮‍♂️' || reaction.emoji.name === '🔧'|| reaction.emoji.name === '🔮'|| reaction.emoji.name === '🎉' && user.id === message.author.id && user.id != client.user.id) {
    
                if(bool == true){
                    return;
                }
                switch(reaction.emoji.name){
                    case '💾':
                        if(bool === true) return;
                        bool = true;
                        let sended = true;
                        embed.delete();
                        if(langue === 'fr'){
                            message.channel.send(
                                new Discord.MessageEmbed()
                                    .setTitle('\_\_Menu Aide\_\_')
                                    .setColor('RED')
                                    .setDescription(`**Voici la liste des commandes de base :**\n\n\`\`${prefix}help\`\`: Envoie le menu d'aide.\n\`\`${prefix}ping\`\`: Donne la latence du bot.\n\`\`${prefix}ginfo\`\`: Donne le nombre de giveaways.\n\`\`${prefix}info\`\`: Donne des informations sur le bot.\n\`\`🚨\`\`・\`\`${prefix}prefix\`\`: Change le prefix du bot pour vôtre serveur.\n\`\`🚨\`\`・\`\`${prefix}lang\`\`: Change la langue du bot sur vôtre serveur.\n\n\`\`🚨\`\` = **COMMANDE ACCESSIBLE QUE AUX PERSONNES AVEC LES PERMISSIONS ADMINISTRATEUR.**`)
                            )
                        }
                    case '👮‍♂️':
                        if(bool === true) return;
                        bool = true;
                        embed.delete();
                        if(langue === 'fr'){
                            message.channel.send(
                                new Discord.MessageEmbed()
                                            .setTitle('\_\_Menu Aide Moderation\_\_')
                                            .setColor('BLUE')
                                            .setDescription(`**Voici la liste des commandes disponnibles de Modération :**\n\n\`\`${prefix}kick\`\`:kick quelqu'un \`\`<kick> <mention> <raison>\`\`.\n\`\`${prefix}ban\`\`: ban quelqu'un \`\`<ban> <mention> <raison>\`\`.\n\`\`${prefix}tempban\`\`: ban temporairement quelqu'un \`\`<tempban> <durée> <mention> <raison>\`\`.\n\`\`${prefix}clear\`\`: supprime les messages d'un salon \`\`<clear> <nombre de messages a supprimer>\`\`.\n\`${prefix}warn\`: warn quelqu'un, \`\`<warn> <mention> <raison>\`\`.\n\`\`${prefix}infowarn\`\`: donne des informations sur les warns de quelqu'un \`\`<infowarn> <mention>\`\`.\n\`\`${prefix}unwarn\`\`: Enleve un warn à quelqu'un, \`\`<unwarn> <mention> <raison>\`\`.\n\`\`${prefix}mute\`\`: Rendre muet quelqu'un sur le serveur \`\`<mute> <mention> <raison>\`\`.\n\`\`${prefix}unmute\`\`: Ne plus rendre muet quelqu'un sur le serveur \`\`<unmute> <mention>\`\`.\n\n\`\`🚨\`\` = **COMMANDE ACCESSIBLE QUE AUX PERSONNES AVEC LES PERMISSIONS ADMINISTRATEUR.**`)
                                )
                        }
                        case '🔧':
                        if(bool === true) return;
                        bool = true;
                        embed.delete();
                        if(langue === 'fr'){
                            message.channel.send(
                                new Discord.MessageEmbed()
                                                .setTitle('\_\_Menu Aide Utilitaire\_\_')
                                                .setColor('GREEN')
                                                .setDescription(`**Voici la liste des commandes disponnibles d'Utilititaire' :**\n\n\`\`${prefix}userinfo\`\`:Donne les stats de quelqu'un \`\`<userinfo> <mention>\`\` ou juste \`\`<userinfo>\`\`.\n\`\`${prefix}serverinfo\`\`: Donne les stats du serveur.`)
                                    )
                        }
                        case '🔮':
                            if(bool === true) return;
                            bool = true;
                            embed.delete();
                            if(langue === 'fr'){
                                    message.channel.send(
                                        new Discord.MessageEmbed()
                                                    .setTitle('\_\_Menu Aide Fun\_\_')
                                                    .setColor('GOLD')
                                                    .setDescription(`**Voici la liste des commandes disponnibles de musique :**\n\n\`\`${prefix}dog\`\`: Génère ton chien presonnalisé !\n\`\`${prefix}cat\`\`: Génère ton chat presonnalisé !\n\`\`${prefix}fight\`\`: Combat un joueur **<fight> <mention>**\n\`\`${prefix}pat\`\`: Carresse un membre **<pat> <mention>**\n`)
                                        )
                            }
                            case '🎉':
                                if(bool === true) return;
                                bool = true;
                                embed.delete();
                                if(langue === 'fr'){
                                    message.channel.send(
                                            new Discord.MessageEmbed()
                                                .setTitle('\_\_Menu Aide Giveaways\_\_')
                                                .setColor('#12320855')
                                                .setDescription(`**Voici la liste des commandes de giveaways :**\n\n\`\`${prefix}gstart\`\`: Lance un giveaway de la durée souhaitée.\n\`\`${prefix}reroll\`\`: Trouve un nouveau gagnant au giveaway souhaité.\n\`\`${prefix}drop\`\`: Permet de créer un drop dans un salon à l'aide d'un menu interactif.\n\`\`${prefix}ginfo\`\`: Donne le nombre de giveaways.\n\n\`\`🚨\`\` = **COMMANDE ACCESSIBLE QUE AUX PERSONNES AVEC LES PERMISSIONS ADMINISTRATEUR.**`)
                                        )
                                }
                }
    
            }
        })

    } else if(langue === 'en'){
        const embed = await message.channel.send(
            new Discord.MessageEmbed()
                .setTitle('\_\_Help System\_\_')
                .setColor('ORANGE')
                .setDescription('Please check the reactions according to the code below: \n\n> 💾: \`\` Receive help on basic commands\`\`, \n> 👮‍♂️: \`\` Receive help on moderation commands. \`\`, \n > 🔧: \`\` Get help on utility commands. \`\`,\n> 🔮: \`\` Get help on fun commands\`\`, \n> 🎉 : \`\` Receive help on giveaways commands\`\`, \n')
        )
        await embed.react('💾');
        await embed.react('👮‍♂️');
        await embed.react('🔧');
        await embed.react('🔮');
        await embed.react('🎉');

        const filter = (reaction, user) => {
            return ['💾', '👮‍♂️', '🔧', '‍🔮', '‍🎉'].includes(reaction.emoji.name) && user.id === message.author.id;
        };
    
        let bool = false;
        let prefixes = require(path.resolve(path.join('..', 'GWays/database/prefixes.json')));
        let prefix = prefixes[message.guild.id].prefixes;
        
        client.on('messageReactionAdd', (reaction, user) => {
            if (reaction.emoji.name === '💾' || reaction.emoji.name === '👮‍♂️' || reaction.emoji.name === '🔧'|| reaction.emoji.name === '🔮'|| reaction.emoji.name === '🎉' && user.id === message.author.id && user.id != client.user.id) {
    
                if(bool == true){
                    return;
                }
                switch(reaction.emoji.name){
                    case '💾':
                        if(bool === true) return;
                        bool = true;
                        let sended = true;
                        embed.delete();
                        if(langue === 'en'){
                            message.channel.send(
                                new Discord.MessageEmbed()
                                    .setTitle('\_\_Help System\_\_')
                                    .setColor('RED')
                                    .setDescription(`**Here is the list of avaible base commands :**\n\n\`\`${prefix}help\`\`: Send the help menu.\n\`${prefix}ping\`: Send the bot latency.\n\`\`${prefix}ginfo\`\`: Send the number of giveaways.\n\`\`${prefix}info\`\`: Gives you bots informations.\n\`\`🚨\`\`・\`\`${prefix}prefix\`\`: Change the bot prefix on you server.\n\`\`🚨\`\`・\`\`${prefix}lang\`\`: Change the bot language on your server.\n\n\`\`🚨\`\` = **NEED ADMINISTARTOR PERMISSION TO USE THE COMMAND.**`)
                            )
.catch(() => {
                                sended = false;
                                message.channel.send(
                                    new Discord.MessageEmbed()
                                        .setTitle('__ERROR__')
                                        .setColor('RED')
                                        .setDescription('Please, open your DMs and retry.')
                                )

                                if(sended === true) {
                                    message.channel.send(
                                        new Discord.MessageEmbed()
                                            .setTitle("\_\_Help System\_\_")
                                            .setColor('DARK_GREEN')
                                            .setDescription("I sent you the help mesasge in your DMs.")
                                    );
                                }
                            })
                        }
                    case '👮‍♂️':
                        if(bool === true) return;
                        bool = true;
                        embed.delete();
                        if(langue === 'en'){
                            message.channel.send(
                                new Discord.MessageEmbed()
                                            .setTitle('\_\_Help Menu Moderation\_\_')
                                            .setColor('BLUE')
                                            .setDescription(`** Here is the list of available Moderation commands: ** \n\n\`\` ${prefix} kick \`\`: kick someone \`\` <kick> <mention> <reason> \`\`.\n\`\`${prefix} ban \`\`: ban someone \`\`<ban> <mention> <reason> \`\`.\n\`\`${prefix } tempban \`\`: temporarily ban someone \`\` <tempban> <duration> <mention> <reason> \`\`. \n \`\` ${prefix} clear \`\`: delete messages from a room \`\` <clear> <number of messages to delete> \`\`.\n\`${prefix} warn \`: warn someone, \`\` <warn> < mention> <reason> \`\`. \n\`\` ${prefix} infowarn \`\`: gives information about someone's warns \`\` <infowarn> <mention> \`\` . \n \`\` ${prefix} unwarn \`\`: Remove a warn from someone, \`\` <unwarn> <mention> <reason> \`\`. \n \`\` ${prefix} mute \`\`: Mute someone on the server \`\` <mute> <mention> <reason> \`\`. \n \`\` ${prefix} unmute \`\` : Don't silence someone on the server \`\` <unmute> <mention> \`\`. \n \n \`\` 🚨 \`\` = ** COMMAND AVAILABLE ONLY TO PEOPLE WITH PERMISSIONS ADMINISTRATOR.**`)
                                )
                            
                        }
                        case '🔧':
                            if(bool === true) return;
                            bool = true;
                            embed.delete();
                            if(langue === 'en'){
                                message.channel.send(
                                    new Discord.MessageEmbed()
                                                .setTitle('\_\_Help Menu Utility\_\_')
                                                .setColor('GREEN')
                                                .setDescription(`** Here is the list of commands available from Utility ': ** \n \n \`\` ${prefix} userinfo \`\`: Gives someone's stats \`\` <userinfo> <mention> \`\` or just \`\` <userinfo> \`\`. \n \`\` ${prefix} serverinfo \`\`: Gives the server stats.`)
                                    )
                                
                            }
                            case '🔮':
                                if(bool === true) return;
                                bool = true;
                                embed.delete();
                                if(langue === 'en'){
                                    message.channel.send(
                                        new Discord.MessageEmbed()
                                                    .setTitle('\_\_Help Menu Fun\_\_')
                                                    .setColor('GOLD')
                                                    .setDescription(`** Here is the list of available music commands: ** \n \n \`\` ${prefix} dog \`\`: Generate your custom dog! \n \`\` ${prefix} cat \`\`: Generate your custom cat! \n \`\` ${prefix}fight \`\`: Fight one player ** <fight> <mention> ** \n \`\`${prefix} pat \`\`: Stroke a member ** <pat> <mention> ** \n`)
                                        )
                                    
                                }
                                case '🎉':
                                    if(bool === true) return;
                                    bool = true;
                                    embed.delete();
                                    if(langue === 'en'){
                                        message.channel.send(
                                            new Discord.MessageEmbed()
                                                .setTitle('\_\_Help Menu Giveaways\_\_')
                                                .setColor('#12320855')
                                                .setDescription(`**Here is the list of avaible giveaways commands :**\n\n\`\`${prefix}gstart\`\`: Start a giveaway in the channel with a specific duration.\n\`\`${prefix}reroll\`\`: Find a new winner to a specific giveaway.\n\`\`${prefix}drop\`\`: Create a drop in a channel with an interactive menu.\n\n\`\`🚨\`\` = **NEED ADMINISTARTOR PERMISSION TO USE THE COMMAND.**`)
                                        )
                                        
                                    }
                }
    
            }
        })

    }

}
module.exports.help = {
    name: "help"
}