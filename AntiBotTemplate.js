//Il faut impérativement créer un script bdd.json et mettre dedans : {}, pour que la commande fonctionne
const fs = require('fs')
 client.on('message', async (message) => {
    if (message.content === prefix + "antibot on") {
      const confirmonEmbed = new discord.MessageEmbed()
      .setColor('RANDOM')
      .setTitle('AntiBot activé!')
      .setTimestamp()
    message.channel.send(confirmonEmbed)
    fs.writeFileSync("./bdd.json", `
    {
      "antibot": true
    }
    `, err => {
      if(err) throw err;
    })
    
    }})

 client.on('message', async (message) => {
    if (message.content === prefix + "antibot off") {
      const confirmoffEmbed = new discord.MessageEmbed()
      .setColor('RANDOM')
      .setTitle('AntiBot désactivé!')
      .setTimestamp()
    message.channel.send(confirmonEmbed)
    fs.writeFileSync("./bdd.json", `
    {
      "antibot": false
    }
    `, err => {
      if(err) throw err;
    })
    
    }})

 

    client.on('guildMemberAdd', async member => {
      console.log("Un boug est arrive")
      if(member.user.bot){
      if(antib.antibot == true){
          member.kick().then((member) => {
            console.log("J'ai degage un boug")
            const bougBot = new discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle("Bot kick")
            .setDescription(`J'ai kick ${member} car c'est un bot et que l'antibot est activé!`)
            member.guild.channels.cache.find(c => c.id === '778328885095432263').send(bougBot)
          })
      }else{
      const newBot = new discord.MessageEmbed()
      .setColor('RANDOM')
      .setTitle(`Un bot a rejoint le serveur : ${member.displayName}`)
      member.guild.channels.cache.find(c => c.id === '778328885095432263').send(newBot)
      }
    }})
