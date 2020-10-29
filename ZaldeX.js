const Discord = require('discord.js');
const lpp = new Discord.Client();
const prefix = "&"
const moment = require('moment');
const serv = lpp.guilds.cache.get('730060895039914025')
const ms = require('ms');

lpp.on("ready", () => {
    console.log("disponible")
    const TimerActivity = [
      "&help",
      `${lpp.guilds.cache.get('730060895039914025').memberCount}  membres !`,
      "DEV BY BotMakers !",
      "n'importe quoi",
    ];
    setInterval(() => {
      const index = Math.floor(Math.random() * (TimerActivity.length));
      lpp.user.setActivity(TimerActivity[index], {type : "WATCHING"});
    }, 10000 );

    });

        lpp .on('message', async (message) => {
            if (message.content.startsWith(prefix + "kick")) {
              if(!message.member.PermissionResolvable) {
                const args = message.content.slice(prefix.length).trim().split(/ +/g);
              // Let's first check if we have a member and if we can kick them!
              // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
              // We can also support getting the member by ID, which would be args[0]
              let member = message.mentions.members.first() || message.guild.members.get(args[0]);
              if(!member)
                return message.reply("Veuillez mentionner quelqu'un present sur le serveur");
              if(!member.kickable)
                return message.reply("Je ne peux pas kick cet utilisateur ! A t'il un role trop haut ? Ai-je les permissions de kick ?");
              
              // slice(1) removes the first part, which here should be the user mention or ID
              // join(' ') takes all the various parts to make it a single string.
              let reason = args.slice(1).join(' ');
              if(!reason) reason = "Pas de raison precisée";
              
              // Now, time for a swift kick in the nuts!
              await member.kick(reason)
                .catch(error => message.reply(`Desole ${message.author} je ne peux pas kick car : ${error}`));
                const cadegageEmbed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .addField(`${member.user.tag} a été kick par  ${message.author.tag}`,`car: ${reason}`)
              message.channel.send(cadegageEmbed);
          
            }}});
            lpp.on('message', async(message) => {
                if(message.content.startsWith(prefix + "serverinfo")) {
                  let server = lpp.guilds.cache.get(message.guild.id)
                  const statsEmbed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle("Stats")
                .addFields(
                {name: "Nombres de membres:", value: `${server.memberCount} membres.`},
                {name: "Créateur du serveur:", value: `${server.owner}`},
                {name: "Date de création du serveur: ", value: `${server.createdAt}`},
                )
                .setFooter('La Pub Plume | serverinfo')
              message.channel.send(statsEmbed)
          }
        });
        lpp.on('message', async(message) => {
            if(message.content.startsWith(prefix + "userinfo")) {
              const membre = message.mentions.members.first() || message.member;
     
              message.channel.send({
                  embed: {
                      color: 0xe43333,
                      title: `Statistiques du l'utilisateur **${membre.user.username}**`,
                      fields: [
                          {
                              name: 'ID :',
                              value: membre.id
                          },
                          {
                              name: 'Crée le :',
                              value: moment.utc(membre.user.createdAt).format("LL")
                          },
                          {
                              name: 'Rejoint le :',
                              value: moment.utc(membre.joinedAt).format('LL')
                          }
                      ],
                      footer :{
                        icon_url: "https://cdn.discordapp.com/attachments/756754083238379540/756787799113596988/PicsArt_09-19-10.03.50.jpg",
                        text : 'La Pub Plume | userinfo'
                      }
                  }
              });
          };
            }
        )
        lpp.on('message', (message) => {
            if (message.content === prefix + 'idée') {
            const teamRandom = [`&userinfo`, `&serverinfo`, `&kick`, `&say`, `&avatar`, `&help`];
        let math = Math.floor(Math.random() * teamRandom.length);
        let rembed = new Discord.MessageEmbed()
          .setDescription(`Essaye la commande  ${teamRandom[math]}`)
          .setColor(`#7FFF00`)
          .setTimestamp()
          .setFooter("Merci ! ");
        message.channel.send(rembed);
            }
          });

          lpp.on('message', async(message) => {
            if(message.content.startsWith(prefix + "avatar")) {
              const member = message.mentions.members.first() || message.member;
              const imgg = member.user.displayAvatarURL()
              const avtEmbed = new Discord.MessageEmbed()
              .setColor("RANDOM")
              .setTitle(`Avatar de ${member.user.username}`)
              .setImage(imgg)
                message.channel.send(avtEmbed)
            }})

              lpp.on('message', async (message) => {
                if (message.content.startsWith(prefix + "mute")) {
                    const args = message.content.slice(prefix.length).trim().split(/ +/g);
                    const mutedRole = message.guild.roles.cache.get('766663226695614534');
                    // if there is no `Muted` role, send an error
                    if (!mutedRole)
                     return message.channel.send('There is no Muted role on this server');
                     const target = message.mentions.members.first()
                     let reason = args.slice(1).join(' ');
                     target.roles.add(mutedRole);
                     const muteembed = new Discord.MessageEmbed()
                     .setColor("RANDOM")
                     .setTitle('Membre Muté')
                     .setThumbnail(target.user.displayAvatarURL())
                     .addField('Utilisateur Muté ', target.user.username)
                     .addField('Muté par ', message.author)
                     .setFooter('Avatar du Muté ', target.user.displayAvatarURL())
                     .setTimestamp()
                     message.channel.send(muteembed);
                  message.channel.send(`Mute par ${message.author.tag} , raison: ${reason}`)
                };
              });
              lpp.on('message', (message) => {
                if (message.content === prefix + 'help') {
                  message.channel.send({
        
                  embed: {
                    color: "RANDOM",
                    title: "❓ Help - Utilitaires",
                    fields: [
                        {
                            name: "`&serverinfo`",
                            value: "affiche les stats du serveur"
                        },
                        {
                          name: "`&userinfo`",
                          value: "affiche les stats de l'utilisateur en question (userinfo + mention)"
                      },
                        {
                          name: "`&idée`",
                          value: "Donne une idée de commande a faire"
                      },
                      {
                        name: "`&avatar`",
                        value: "affiche l'avatar d'un membre (avatar + mention)"
                    },
                    {
                      name: "`&say`",
                      value: "Redit votre message"
                  },                        {
                    name: "`&texte`",
                    value: "transforme un texte en embed"
                },
                    ],
                    footer :{
                      icon_url: "https://cdn.discordapp.com/attachments/756754083238379540/756787799113596988/PicsArt_09-19-10.03.50.jpg",
                      text : 'LaPubPlume | help'
                    }
                }})
                message.channel.send({
        
                  embed: {
                    color: "RANDOM",
                    title: "❓ Help - Modération",
                    fields: [
                        {
                            name: "`&ban`",
                            value: "ban + mention"
                        },
                        {
                          name: "`&tempban`",
                          value: "tempban + nb de minutes + mention + raison "
                      },
                        {
                          name: "`&mute`",
                          value: "mute + mention"
                      },
                      {
                        name: "`&unmute`",
                        value: "unmute + mention"
                    },
                    {
                      name: "`&tempmute`",
                      value: "tempmute + temps(minutes) + mention"
                  },
                  {
                    name: "`&kick`",
                    value: "kick + mention"
                },
                    ],
                    footer :{
                      icon_url: "https://cdn.discordapp.com/attachments/756754083238379540/756787799113596988/PicsArt_09-19-10.03.50.jpg",
                      text : 'LaPubPlume | help'
                    }
                }})
        
              }})
              lpp.on('message', async (message) => {
                if (message.content.startsWith(prefix + "ban")) {
                const args = message.content.slice(prefix.length).trim().split(/ +/g);
              if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('You can\'t use that!')
              if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send('I don\'t have the right permissions.')
      
              const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      
              if(!args[0]) return message.channel.send('Please specify a user');
      
              if(!member) return message.channel.send('Can\'t seem to find this user. Sorry \'bout that :/');
              if(!member.bannable) return message.channel.send('This user can\'t be banned. It is either because they are a mod/admin, or their highest role is higher than mine');
      
              if(member.id === message.author.id) return message.channel.send('Bruh, you can\'t ban yourself!');
      
              let reason = args.slice(1).join(" ");

              if(!reason) reason = 'Unspecified';
      
              member.ban({ days: 7, reason: 'your reason here' }).catch(err => { 
                message.channel.send('Something went wrong')
                  console.log(err)
              })
      
              const banembed = new Discord.MessageEmbed()
              .setColor("RANDOM")
              .setTitle('Membre Banni')
              .setThumbnail(member.user.displayAvatarURL())
              .addField('Utilisateur ban ', member)
              .addField('Ban par ', message.author)
              .addField('Raison ', reason)
              .setFooter('Avatar du banni ', member.user.displayAvatarURL())
              .setTimestamp()
              message.channel.send(banembed);
      

          }
      })
      lpp.on('message', async (message) => {
        if (message.content.startsWith(prefix + "tempban")) {
          const args = message.content.slice(prefix.length).trim().split(/ +/g);
      if(!message.member.hasPermission("BAN_MEMBERS")){
        return message.channel.send(
            new Discord.MessageEmbed()
                .setTitle('ERREUR')
                .setColor('DARK_RED')
                .setDescription('Il vous faut la permission `BAN_MEMBERS` pour faire cette commande.')
                .setTimestamp()
        )
    }

    if(!args[0]){
        return message.channel.send(
            new Discord.MessageEmbed()
                .setTitle('ERREUR')
                .setColor('DARK_RED')
                .setDescription('Veuillez mentionner un utilisateur ou mettre son identifiant.')
                .setTimestamp()
        )
    }

    if(!args[1]){
        return message.channel.send(
            new Discord.MessageEmbed()
                .setTitle('ERREUR')
                .setColor('DARK_RED')
                .setDescription('Veuillez entrer la duréé du bannissement en ``minutes``.')
                .setTimestamp()
        )
    }

    if(!args[2]){
        return message.channel.send(
            new Discord.MessageEmbed()
                .setTitle('ERREUR')
                .setColor('DARK_RED')
                .setDescription('Veuillez entrer la raison du bannissement.')
                .setTimestamp()
        )
    }

    let user = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));


    await user.send(
        new Discord.MessageEmbed()
            .setTitle('ATTENTION')
            .setColor('DARK_RED')
            .setDescription(`Vous avez été bannis du serveur \`\`${message.guild.name}\`\`.\n\n**Modérateur :** ${message.author}\n**Raison :** ${args.slice(2).join(' ')}\n**Durée :** ${args[1]} minute(s)`)
            .setTimestamp()
    )
    await user.ban()
    message.channel.send(
        new Discord.MessageEmbed()
            .setTitle('SUCCÈS')
            .setColor('GREEN')
            .setDescription(`L'utilisateur avec pour identifiant \`\`${user.id}\`\` à correctement été bannis du serveur.\n\n**Raison :** ${args.slice(2).join(' ')}\n**Durée :** ${ms(ms(args[1]))} minute(s)`)
            .setTimestamp()
    )

    let logchannel = message.guild.channels.cache.find(c => c.id === "756816366979383296");
        logchannel.send(
            new Discord.MessageEmbed()
                .setTitle("TempBan | " + user.displayName)
                .addField('Modérateur', message.author, true)
                .addField('Raison', args.slice(1).join(' '), true)
                .setTimestamp()
                .setColor('DARK_RED')
        )

    setTimeout(function () {
        try {
            message.guild.members.unban(user, {reason: "Unban Automatique"})
            logchannel.send(
                new Discord.MessageEmbed()
                    .setTitle('SUCCÈS')
                    .setColor('GREEN')
                    .setDescription(`L'utilisateur avec pour identifiant \`\`${user}\`\` à correctement été débannis du serveur après ses \`\`${ms(ms(args[1])).replace("s", " secondes").replace("m", " minutes").replace("h", " heures").replace("d", " jours")}\`\` de ban.`)
                    .setTimestamp()
            )
        } catch(e){
            console.log(e.message)
        }
    }, ms(args[1]))
  }})
  lpp.on('message', async (message) => {
    if(message.content.startsWith(prefix + "texte")) {
  if (message.author.bot) return;
  
  const filter = m => m.author.id === message.author.id;
  message.reply("Inserer un texte").then(q => q.delete(15000))
  message.channel.awaitMessages(filter, {
    max: 1,
    time: 30000
  }).then(async collected => {
    collected.delete(15000);
    if (collected.first().content === 'cancel') {
      return message.reply("Canceled.");
    }
  
    const ti = collected.first().content;
  
    const flashEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(ti)
    .setFooter('ZadeX | texte')

    let msg = await message.channel.send(flashEmbed)
      await msg.react("✅")
  
  })
    }
  })
  lpp.on('message', (message) => {
    if (message.content.startsWith(prefix + "say")) {
      let args = message.content.split(" ").slice(1);
      let botmessage = args.join(" ");
      message.delete()
      message.channel.send(botmessage);
      }
    });
    lpp.on('message', async (message) => {
      if (message.content.startsWith(prefix + "unmute")) {
          const args = message.content.slice(prefix.length).trim().split(/ +/g);
          const mutedRole = message.guild.roles.cache.get('766663226695614534');
          // if there is no `Muted` role, send an error
          if (!mutedRole)
           return message.channel.send('Il n`y a pas de role "Muted" sur le serveur');
           const target = message.mentions.members.first()
           target.roles.remove(mutedRole);
           const unmuteembed = new Discord.MessageEmbed()
           .setColor("RANDOM")
           .setTitle('Membre Demuté')
           .setThumbnail(target.user.displayAvatarURL())
           .addField('Utilisateur Demuté ', target.user.username)
           .addField('Demuté par ', message.author)
           .setFooter('Avatar du Demuté ', target.user.displayAvatarURL())
           .setTimestamp()
           message.channel.send(unmuteembed);
        target.send(`Tu es maintenant maintenant demute sur le serveur **${message.guild.name}**`)
  }})
  lpp.on('message', async (message) => {
    if (message.content.startsWith(prefix + "tempmute")) {
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const mutedRole = message.guild.roles.cache.get('766663226695614534');
        const minutes = args[1]
        // if there is no `Muted` role, send an error
        if (!mutedRole)
         return message.channel.send('Il n`y a pas de role "Muted" sur le serveur');
         const target = message.mentions.members.first()
         target.roles.add(mutedRole);
         const tempmuteembed = new Discord.MessageEmbed()
              .setColor("RANDOM")
              .setTitle('Membre Temporairement muté')
              .setThumbnail(target.user.displayAvatarURL())
              .addField('Utilisateur Temporairement muté ', target.user.username)
              .addField('Temporairement muté par ', message.author)
              .addField('Temporairement muté pendant ', `${args[1]} minutes `)
              .setFooter('Avatar du Temporairement muté ', target.user.displayAvatarURL())
              .setTimestamp()
              message.channel.send(tempmuteembed);
      target.send(`Tu es maintenant maintenant mute sur le serveur **${message.guild.name}**`)
      setTimeout(() => {
        target.roles.remove(mutedRole, `Le tempmute de ${target.user.username} a expiré`);
      },minutes * 60000);
    }})

lpp.login('')
