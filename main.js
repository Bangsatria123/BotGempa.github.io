const TelegramBot = require("node-telegram-bot-api");

const token = "6955714716:AAHtwNkBVbM2vFUIHCJST8fVbmoAn0YYeCA";
const option = {
  polling: true,
};

const GempaBot = new TelegramBot(token, option);
const prefix = "/";

const sayHi = new RegExp(`^${prefix}start$`);
const gempa = new RegExp(`^${prefix}gempa$`);
const Help  = new RegExp(`^${prefix}help`)

GempaBot.onText(Help, (callback) => {
    const id = callback.from.id;
    const uName = callback.from.username;
    GempaBot.sendMessage(id, `Hi ${uName}, untuk mengetahui informasi gempa silahkan gunakan /gempa`  )
    console.log(id, `${uName}, ${text}`);
})

GempaBot.onText(sayHi, (callback) => {
  const id = callback.from.id;
  const text = callback.text;
  const uName = callback.from.username;
  GempaBot.sendMessage(id, `HI @${uName}! , untuk mengetahui lebih lanjut silahkan /help`);
  console.log(id, `${uName}, ${text},`);
});
GempaBot.onText(gempa, async (callback) => {
  const BMKG_ENDPOINT = "https://data.bmkg.go.id/DataMKG/TEWS/";

    const apiCall = await fetch(BMKG_ENDPOINT + "autogempa.json")
    const {Infogempa: { gempa : {
        Tanggal, Jam, Magnitude, Kedalaman, Wilayah, Potensi, Shakemap
    }
    
    
    
    }} = await apiCall.json()
    const Image = BMKG_ENDPOINT + Shakemap
    const resulttext = `
INFO BMKG TERBARU
${Tanggal} | ${Jam}
${Wilayah}, Berkekuatan : ${Magnitude} SR, Dengan Kedalaman : ${Kedalaman}
    `
  const uName = callback.from.username
  const text = callback.text
  const id = callback.from.id;
  GempaBot.sendPhoto(
    id,
    Image , {caption : resulttext});
    console.log(id, `${uName}, ${text}`);
});
