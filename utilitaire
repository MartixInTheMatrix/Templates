client.on('message', async (message) => {
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
        .setFooter('Barman | texte')

        let msg = await message.channel.send(flashEmbed)
          await msg.react("✅")
      
      })
        }
      })
client.on('message', (message) => {
  if (message.content.startsWith(prefix + "say")) {
    let args = message.content.split(" ").slice(1);
    let botmessage = args.join(" ");
    message.delete()
    message.channel.send(botmessage);
    }
  });

   client.on('message', async(message) => {
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
                    icon_url: "https://cdn.discordapp.com/attachments/626432578509078529/766003990063743026/LogoDevS.png",
                    text : 'Barman | userinfo'
                  }
              }
          });
      };
        }
    )
      client.on('message', (message) => {
        if (message.content === prefix + 'idée') {
        const teamRandom = [`/userinfo`, `/serverinfo`, `/kick`, `/say`, `/avatar`, `/help`];
    let math = Math.floor(Math.random() * teamRandom.length);
    let rembed = new Discord.MessageEmbed()
      .setDescription(`Essaye la commande  ${teamRandom[math]}`)
      .setColor(`#7FFF00`)
      .setTimestamp()
      .setFooter("Merci ! ");
    message.channel.send(rembed);
        }
      });

      client.on('message', async(message) => {
        if(message.content.startsWith(prefix + "avatar")) {
          const member = message.mentions.members.first() || message.member;
          const imgg = member.user.displayAvatarURL()
          const avtEmbed = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setTitle(`Avatar de ${member.user.username}`)
          .setImage(imgg)
            message.channel.send(avtEmbed)
        }})
