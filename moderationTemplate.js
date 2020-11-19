client.on('message', async (message) => {
    if (message.content.startsWith(prefix + "mute")) {
      message.guild.roles.create({
        data: {
          name: 'Muted',
        },
      })
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const mutedRole = message.guild.roles.cache.find((role) => role.name === 'Muted')
         const target = message.mentions.members.first()
         let reason = args.slice(1).join(' ');
         target.roles.add(mutedRole);
         const muteembed = new discord.MessageEmbed()
         .setColor("RANDOM")
         .setTitle('Membre Muté')
         .setThumbnail(target.user.displayAvatarURL())
         .addField('Utilisateur Muté ', target.user.username)
         .addField('Muté par ', message.author)
         .setFooter('Avatar du Muté ', target.user.displayAvatarURL())
         .setTimestamp()
        message.channel.send(muteembed)
    };
  });

  client.on('message', async (message) => {
    if (message.content.startsWith(prefix + "ban")) {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
  if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('You can\'t use that!')
  if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send('I don\'t have the right permissions.')

  const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

  if(!args[0]) return message.channel.send('Veuillez mentionner un utlisateur');

  if(!member) return message.channel.send('Je n`arrive pas a detecter l`utilisateur, desole');
  if(!member.bannable) return message.channel.send('Cet utilisateur ne peut pes etre banni. Il a surement les permissions administrateur ou il a un role plus haut que moi.');

  if(member.id === message.author.id) return message.channel.send('Bruh, tu ne peux pas te ban tout seul !');

  let reason = args.slice(1).join(" ");

  if(!reason) reason = 'Non specifié';

  member.ban({ days: 7, reason: 'Ta raison' }).catch(err => { 
    message.channel.send('il y a un truc qui va pas')
      console.log(err)
  })
  const banembed = new discord.MessageEmbed()
  .setColor("RANDOM")
  .setTitle('Membre Banni')
  .setThumbnail(member.user.displayAvatarURL())
  .addField('Utilisateur ban ', member)
  .addField('Ban par ', message.author)
  .addField('Raison ', reason)
  .setFooter('Avatar du banni ', member.user.displayAvatarURL())
  .setTimestamp()
 message.channel.send(banembed)

}
})
client.on('message', async (message) => {
    if (message.content.startsWith(prefix + "tempban")) {
      const args = message.content.slice(prefix.length).trim().split(/ +/g);
  if(!message.member.hasPermission("BAN_MEMBERS")){
    return message.channel.send(
        new discord.MessageEmbed()
            .setTitle('ERREUR')
            .setColor('DARK_RED')
            .setDescription('Il vous faut la permission `BAN_MEMBERS` pour faire cette commande.')
            .setTimestamp()
    )
}

if(!args[0]){
    return message.channel.send(
        new discord.MessageEmbed()
            .setTitle('ERREUR')
            .setColor('DARK_RED')
            .setDescription('Veuillez mentionner un utilisateur ou mettre son identifiant.')
            .setTimestamp()
    )
}

if(!args[1]){
    return message.channel.send(
        new discord.MessageEmbed()
            .setTitle('ERREUR')
            .setColor('DARK_RED')
            .setDescription('Veuillez entrer la duréé du bannissement en ``minutes``.')
            .setTimestamp()
    )
}

if(!args[2]){
    return message.channel.send(
        new discord.MessageEmbed()
            .setTitle('ERREUR')
            .setColor('DARK_RED')
            .setDescription('Veuillez entrer la raison du bannissement.')
            .setTimestamp()
    )
}

let user = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));


await user.send(
    new discord.MessageEmbed()
        .setTitle('ATTENTION')
        .setColor('DARK_RED')
        .setDescription(`Vous avez été bannis du serveur \`\`${message.guild.name}\`\`.\n\n**Modérateur :** ${message.author}\n**Raison :** ${args.slice(2).join(' ')}\n**Durée :** ${args[1]} minute(s)`)
        .setTimestamp()
)
await user.ban()
message.channel.send(
    new discord.MessageEmbed()
        .setTitle('SUCCÈS')
        .setColor('GREEN')
        .setDescription(`L'utilisateur avec pour identifiant \`\`${user.id}\`\` à correctement été bannis du serveur.\n\n**Raison :** ${args.slice(2).join(' ')}\n**Durée :** ${ms(ms(args[1]))} minute(s)`)
        .setTimestamp()
)

    logch.send(
        new discord.MessageEmbed()
            .setTitle("TempBan | " + user.displayName)
            .addField('Modérateur', message.author, true)
            .addField('Raison', args.slice(1).join(' '), true)
            .setTimestamp()
            .setColor('DARK_RED')
    )

setTimeout(function () {
    try {
        message.guild.members.unban(user, {reason: "Unban Automatique"})
        message.channel.send(
            new discord.MessageEmbed()
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
client.on('message', async (message) => {
    if (message.content.startsWith(prefix + "unmute")) {
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const mutedRole = message.guild.roles.cache.find((role) => role.name === 'Muted')
        if (!mutedRole)
         return message.channel.send('Il n`y a pas de role "Muted" sur le serveur');
         const target = message.mentions.members.first()
         target.roles.remove(mutedRole);
         const unmuteembed = new discord.MessageEmbed()
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

  client.on('message', async (message) => {
    if (message.content.startsWith(prefix + "mute")) {
      if(!message.member.PermissionResolvable) {
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const mutedRole = message.guild.roles.cache.find((role) => role.name === 'Muted')
         const target = message.mentions.members.first()
         let reason = args.slice(1).join(' ');
         target.roles.add(mutedRole);
         const muteembed = new discord.MessageEmbed()
         .setColor("RANDOM")
         .setTitle('Membre Muté')
         .setThumbnail(target.user.displayAvatarURL())
         .addField('Utilisateur Muté ', target.user.username)
         .addField('Muté par ', message.author)
         .setFooter('Avatar du Muté ', target.user.displayAvatarURL())
         .setTimestamp()
         message.channel.send(muteembed);
    };
  }});

  client.on('message', async (message) => {
    if (message.content.startsWith(prefix + "kick")) {
      if(!message.member.PermissionResolvable) {
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
      // Let's first check if we have a member and if we can kick them!
      // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
      // We can also support getting the member by ID, which would be args[0]
      let member = message.mentions.members.first() || message.guild.members.get(args[0]);
      if(!member)
        return message.reply("Mentionne on utilisateur valable");
      if(!member.kickable)
        return message.reply("Je ne peux pas kick cette personne ! As-tu le role suffisant ? Tu as la permissions de kick ?");
      
      // slice(1) removes the first part, which here should be the user mention or ID
      // join(' ') takes all the various parts to make it a single string.
      let reason = args.slice(1).join(' ');
      if(!reason) reason = "No reason provided";
      
      // Now, time for a swift kick in the nuts!
      await member.kick(reason)
        .catch(error => message.reply(`Désolé ${message.author} je ne peux pas kick ce membre car : ${error}`));
        const cadegageEmbed = new discord.MessageEmbed()
        .setColor("RANDOM")
        .addField(`${member.user.tag} a été kick par ${message.author.tag}`,`car : ${reason}`)
        .setFooter('Barman | kick')
      message.channel.send(cadegageEmbed);

  
    }}});


    client.on('message', async(message) => {
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
