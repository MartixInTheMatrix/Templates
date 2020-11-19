const discord = require('discord.js');
const client = new discord.Client();
client.commands = new discord.Collection();
const fs = require('fs');
const prefix = 'm!'

fs.readdir('./Commandes/', (error, f) => {
    if (error) { return console.error(error); }
        let commandes = f.filter(f => f.split('.').pop() === 'js');
        if (commandes.length <= 0) { return console.log('Aucune commande trouvée !'); }

        commandes.forEach((f) => {
            let commande = require(`./Commandes/${f}`);
            console.log(`${f} commande chargée !`);
            client.commands.set(commande.help.name, commande);
        });
});

fs.readdir('./Events/', (error, f) => {
    if (error) { return console.error(error); }
        console.log(`${f.length} events chargés`);

        f.forEach((f) => {
            let events = require(`./Events/${f}`);
            let event = f.split('.')[0];
            client.on(event, events.bind(null, client));
        });
});

client.on('guildMemberAdd', async (member) => {
  let ch = member.guild.channels.cache.find(c => c.id === '752790443502338081');
  ch.send(
      new discord.MessageEmbed()
          .setAuthor(member.displayName, member.user.displayAvatarURL({format : "gif"}))
          .setDescription('Bienvenue sur le serveur !\n\n> Grâce à toi, nous sommes désormais ' + member.guild.memberCount + ' sur le serveur.\n\n> N\'oublie pas d\'aller t\'abonner à la chaine de [Sabzoo](https://www.youtube.com/channel/UC9Tvj1_RWsAwy0ag0UCCUlg).\n\n**__Bon séjour sur le serveur !__**')
          .setTimestamp()
  )

  setTimeout( async () => {
    ch = member.guild.channels.cache.find(c => c.id === '757149457929338911');
    let msg = await ch.send('<@' + member.id + '>').then(
        setTimeout(() => {
            msg.delete()
        }, 1000)
    )
  }, 500)
  
})

const activities_list = [
    `Huummm...`,
    `Mp pour de l'aide | By JustStop__`
  ];
  
  client.on("ready", () => {
    setInterval(() => {
      const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
      client.user.setActivity(activities_list[index], {
        status: "online",
        type: "STREAMING",
        url: "https://twitch.tv/dubrin"
      });
    }, 2000);
    console.log(
      `${client.user.username} connecté ${client.users.cache.size} utilisateurs !`
    );

  });

  client.on("channelDelete", (channel) => {
    if(channel.parentID == channel.guild.channels.cache.find((x) => x.name == "📧» MODMAIL").id) {
        const person = channel.guild.members.cache.find((x) => x.id == channel.name)

        if(!person) return;

        let yembed = new discord.MessageEmbed()
        .setAuthor("Ticket supprimé", client.user.displayAvatarURL())
        .setColor('RED')
        .setDescription(`:alarm_clock: Votre demande a été fermée par les responsables de votre ticket.\n:warning: Merci de ne pas répondre à ce message si c'est pour nous remercier ou nous confirmer la fermeture de votre ticket`)

        return person.send(yembed)
    
    }


})


client.on("message", async message => {
  if(message.author.bot) return;

  let args = message.content.slice(prefix.length).split(' ');
  let command = args.shift().toLowerCase();


  if(message.guild) {
      if(command == "setup") {
          if(!message.member.hasPermission("ADMINISTRATOR")) {
              return message.channel.send("Vous devez avoir les permissions ``ADMINISTRATOR`` pour faire cette commande.")
          }

          let mod1 = message.guild.roles.cache.find((x) => x.id == "760095200998588427")
          let mod2 = message.guild.roles.cache.find((x) => x.id == "760095202571714571")
          let mod3 = message.guild.roles.cache.find((x) => x.id == "760095198016438273")
          let mod4 = message.guild.roles.cache.find((x) => x.id == "760095200197738507")
          let mod5 = message.guild.roles.cache.find((x) => x.id == "755087764382548174")
          let mod6 = message.guild.roles.cache.find((x) => x.id == "760192591995207721")
          let everyone = message.guild.roles.cache.find((x) => x.name == "@everyone")

          await message.guild.channels.create("📧» MODMAIL", {
              type: "category",
              topic: "All the mail will be here :D",
              permissionOverwrites: [
                  {
                      id: mod1.id,
                      allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"]
                  },
                  {
                      id: mod2.id,
                      allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"]
                  },
                  {
                      id: mod3.id,
                      allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"]
                  },
                  {
                      id: mod4.id,
                      allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"]
                  },
                  {
                      id: mod5.id,
                      allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"]
                  },
                  {
                      id: mod6.id,
                      allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"]
                  },
                  {
                      id: everyone.id,
                      deny: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"]
                  }
              ]
          })


          return message.channel.send("Le setup est fini !")

      } else if(command == "close") {


        if(message.channel.parentID == message.guild.channels.cache.find((x) => x.name == "📧» MODMAIL").id) {
            
            const person = message.guild.members.cache.get(message.channel.name)

            if(!person) {
                return message.channel.send("Je ne peux pas fermer le ticket car le nom à probablement été changé.")
            }

            message.channel.delete()
            return;

        }
      } else if(command == "help") {
                    
      }
  } 
  
  
  if(message.channel.parentID) {

    const category = message.guild.channels.cache.find((x) => x.name == "📧» MODMAIL")
    
    if(message.channel.parentID == category.id) {
        if(!message.content.startsWith('m!r ')) return;
        let member = message.guild.members.cache.get(message.channel.name)
    
        if(!member) return message.channel.send('Je ne peux pas envoyer de message à cette personne car je ne la trouve pas. Avez vous changé le nom du salon ? Si oui, merci de remettre l\'identifiant de l\'utilisateur à qui appartient le ticket en nom pour que je puisse lui envoyé un message.')
    
        member.send(`\`📬\` Reçu de \`\`${message.author.username}\`\`: ${message.content.slice(3)}`)
        message.delete()
        message.channel.send(`\`📮\` Message envoyé à <@${member.id}> par \`${message.author.username}\`: ${message.content.slice(3)}`)
    }
    
    
      } 
  
  
  if(!message.guild) {
      const guild = await client.guilds.cache.get("755087764382548168");
      if(!guild) return;

      const main = guild.channels.cache.find((x) => x.name == message.author.id)
      const category = guild.channels.cache.find((x) => x.name == "📧» MODMAIL")


      if(!main) {
          let mx = await guild.channels.create(message.author.id, {
              type: "text",
              parent: category.id,
              topic: "📧» MODMAIL de: **" + message.author.tag + "**\nRaison: " + message.content
          })

          let sembed = new discord.MessageEmbed()
          .setAuthor("Ticket ouvert")
          .setColor("ORRANGE")
          .setDescription("Vôtre conversation avec le staff vient de débuter.\n\n__Comment ça va se passer ?__\n> Lorsqu'un membre du staff souhaitera vous répondre, je vous enverrais un message contenant son message. Pour lui répondre, vous avez juste à m'envoyer un message.\n\n**RAPPEL:** Tout spam, ou abus de ticket est sanctionnable !")

          message.author.send(sembed)


          let eembed = new discord.MessageEmbed()
          .setAuthor("DETAILS", message.author.displayAvatarURL({dynamic: true}))
          .setColor("YELLOW")
          .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
          .setDescription(`\n__Auteur__: ${message.author}\n__Sujet__: ${message.content}\n__Date de création du compte__: ${message.author.createdAt}\n\nPersonne d'autre que vous, les staffs, n'a accès à ce salon. Vous pouvez y parler comme vous voulez, et pour répondre, faites: \`m!r <message>\``)


          mx.send(eembed)
          let msg = await mx.send('@here').then(
            setTimeout(() => {
              msg.delete()
            }, 1000)
          )
          return;
      }

      main.send(`\`📬\` Reçu de <@${message.author.id}>: ${message.content}`)

  } 
 
})
  

client.login("nooop")
