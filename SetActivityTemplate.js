 const activities_list = [
    `Bot Utilities Devs Center`,
    `Dev By ⚡̶̔͑Z̷͆̀ê̵͝u̶̽͘ṡ̴̔⚡̷͌̆#0069`,
    `</>help`
  ];
  
 client.on("ready", () => {
    setInterval(() => {
      const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
      client.user.setActivity(activities_list[index], {
        status: "online",
        type: "STREAMING",
        url: "https://twitch.tv/squeezie"
      });
    }, 2000);
    console.log(
      `${client.user.username} connecté ${client.users.cache.size} utilisateurs !`
    );
  }); 
