const Discord = require('discord.js');
const al = new Discord.Client();
const prefix = "/"

al.on("ready", () => {
    console.log("disponible")
    const TimerActivity = [
      "/help",
      "DEV BY BotMakers !",
      "Les gens de haut",
    ];
    setInterval(() => {
      const index = Math.floor(Math.random() * (TimerActivity.length));
      al.user.setActivity(TimerActivity[index], {type : "WATCHING"});
    }, 10000 );

    });

    al.on('message', async(message) => {
        if(message.content.startsWith(prefix + "clear")) {
      const args = message.content.split(' ').slice(1); // All arguments behind the command name with the prefix
      const amount = args.join(' '); // Amount of messages which should be deleted
      if (!amount) return msg.reply('You haven\'t given an amount of messages which should be deleted!'); // Checks if the `amount` parameter is given
      if (isNaN(amount)) return msg.reply('The amount parameter isn`t a number!'); // Checks if the `amount` parameter is a number. If not, the command throws an error
      if (amount > 100) return msg.reply('You can`t delete more than 100 messages at once!'); // Checks if the `amount` integer is bigger than 100
      if (amount < 1) return msg.reply('You have to delete at least 1 message!'); // Checks if the `amount` integer is smaller than 1
      await message.channel.messages.fetch({ limit: amount }).then(messages => { // Fetches the messages
          message.channel.bulkDelete(messages // Bulk deletes all messages that have been fetched and are not older than 14 days (due to the Discord API)
      )});
      let msgnext = await message.channel.send(`J'ai supprimé ${amount} messages`)

      setInterval(() => {
       msgnext.delete()
      }, 5000 );
      }})

al.on('message', async (message) => {
    if (message.content.startsWith(prefix + "tempmute")) {
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const mutedRole = message.guild.roles.cache.find((role) => role.name === 'Muted')
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
    al.on('message', async (message) => {
        if (message.content.startsWith(prefix + "unmute")) {
            const args = message.content.slice(prefix.length).trim().split(/ +/g);
            const mutedRole = message.guild.roles.cache.get('768038837897003009');
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

    al.on('message', async (message) => {
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

  al.on('message', async (message) => {
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
al.on('message', (message) => {
    if (message.content === prefix + 'help') {
message.channel.send({
    embed: {
      color: "RANDOM",
      title: "❓ Help",
      fields: [
          {
              name: "`/ban`",
              value: "ban + mention"
          },
          {
            name: "`/tempban`",
            value: "tempban + nb de minutes + mention + raison "
        },
          {
            name: "`/mute`",
            value: "mute + mention"
        },
        {
          name: "`/unmute`",
          value: "unmute + mention"
      },
      {
        name: "`/tempmute`",
        value: "tempmute + temps(minutes) + mention"
    },
    {
      name: "`/kick`",
      value: "kick + mention"
  },
  {
    name: "`/clear`",
    value: "clear + nombre de messages a supprimer"
},
      ],
      footer :{
        icon_url: "https://cdn.discordapp.com/attachments/756754083238379540/756787799113596988/PicsArt_09-19-10.03.50.jpg",
        text : 'AlphaBot | help'
      }
  }})
    }})
    al.on('message', async (message) => {
        if (message.content.startsWith(prefix + "mute")) {
            const args = message.content.slice(prefix.length).trim().split(/ +/g);
            const mutedRole = message.guild.roles.cache.get('768038837897003009');
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
        };
      });
      al.on('message', async (message) => {
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
al.login('noppp')
