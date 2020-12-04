const discord = require('discord.js');
const client = new discord.Client();
const prefix = '/'
const superagent = require('superagent');

client.on("ready", () => {
    console.log("disponible")
    const TimerActivity = [
      "/help",
      `j'ai peur de ⚡Zeus⚡#0069`
    ];
    setInterval(() => {
      const index = Math.floor(Math.random() * (TimerActivity.length));
      client.user.setActivity(TimerActivity[index]);
    }, 10000 );
    });

    client.on('message', async (message) => {
      if (message.content.startsWith(prefix + "help")) {
        const helpEmbed = new discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Help- Menu")
        .addField("pf","joue a pile ou face")
        .addField("fight", "fight + mention / combat quelqu'un")
        .addField("cat", "Génère votre chat perso ")
        .addField("dog","Génère votre chien perso")
        .addField("pat", "pat + mention / carresse une personne")
        .addField("punch", "punch + mention / frappe quelqu'un")
        message.channel.send(helpEmbed)
      }})
  
    client.on('message', async (message) => {
      if (message.content.startsWith(prefix + "pf")) {
        let random = (Math.floor(Math.random() * Math.floor(2)));
    if(random === 0) {
      message.channel.send('Pile!');
    }
    else {
      message.channel.send('Face!');
    }
      }})

      client.on('message', async (message) => {
        if (message.content.startsWith(prefix + "fight")) {
          const fights = require('./fights.json');
      const membre = message.mentions.users.first();
  const teamRandom = [`${membre.username} a gagné`, `${message.author} a gagné`];
    let math = Math.floor(Math.random() * teamRandom.length);
      message.channel.send(`${message.author} est en train de combattre ${message.mentions.users.first()} ${fights[Math.floor(Math.random() * fights.length)]}`)
        message.channel.send(`> ${teamRandom[math]}`)
        }})


        client.on('message', async (message) => {
          if (message.content.startsWith(prefix + "cat")) {
            const superagent = require('superagent');
            const sf = require("snekfetch");
        const { body } = await superagent
        .get("http://aws.random.cat/meow");
    
        const embed = new discord.MessageEmbed()
        .setColor("BLACK")
        .setTitle("Voici votre chat")
        .setImage(body.file) 
        .setFooter(`GodBot , chat`);
        message.channel.send({embed});

          }})

      client.on('message', async (message) => {
        if (message.content.startsWith(prefix + "pat")) {
          const superagent = require('superagent');

    if (!message.mentions.members.first()) return message.reply("Tu dois mentionner quelqu'un :3");
    if (message.mentions.members.first().id === client.user.id) return message.channel.send('<a:yayyy:497742636439044096>');
    const { body } = await superagent
    .get("https://nekos.life/api/pat");
    
    const pembed = new discord.MessageEmbed()
    .setColor("#BLACK")
    .setTitle(`OwO ${message.mentions.members.first().username}, a été carressé par ${message.author.username}!`)
    .setImage(body.url) 
    .setFooter(`GodBot , pat`);
    message.channel.send(pembed)
        }})

        client.on('message', async (message) => {
          if (message.content.startsWith(prefix + "punch")) {
        var owner = "626431238491734026"

  if(message.author.id !== owner) return message.reply("Tu ne peux pas battre le grand Zeus")
  let user = message.mentions.users.first();
  if(message.mentions.users.size < 1) return message.reply('Tu dois mention quelqu`un.')
  if(user.id = message.author.id) return message.channel.send("https://tenor.com/view/why-huh-but-why-gif-13199396")
  if(user.id === client.user.id) return message.channel.send(`**Punches ${user.username}**`)

          }})

        client.on('message', async (message) => {
          if (message.content.startsWith(prefix + "dog")) {
            let msg = await message.channel.send(". . . Preparation . . .");
        let {body} = await superagent
        .get(`https://dog.ceo/api/breeds/image/random`);
        if(!{body}) return message.channel.send("Malheureusement, une erreur est survenue.");

        await message.channel.send({ //await sending message
            files: [{
                attachment: body.message,
                name: "dog.png"
            }]
        }).then(() => msg.delete()); //after message sent delete ...generating... message
          }})


          client.on('message', async (message) => {
            if (message.content.startsWith(prefix + "meme")) {
              const reddit = require('reddit')
              const randomPuppy = require("random-puppy");
              const snekfetch = require("snekfetch");
              let subreddit = reddit[0];
        let msg = await message.channel.send("...preparation...");
        randomPuppy(subreddit).then(url => { //url = image
            snekfetch.get(url).then(async res => { //get that url, res = image
                await message.channel.send({ //send the image
                    files: [{
                        attachment: res.body,
                        name: 'meme.png'
                    }]
                }).then(() => msg.delete()); //delete ...generating... message after sent meme
            })
          })
          }})

client.login('Ton token')
