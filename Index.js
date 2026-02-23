import { Telegraf } from 'telegraf';

const token = process.env.TELEGRAM_TOKEN;

if (!token) {
  console.log("❌ ERROR: No se encontró la variable TELEGRAM_TOKEN en Railway.");
  process.exit(1);
}

const bot = new Telegraf(token);

bot.start((ctx) => ctx.reply('¡POR FIN! Si lees esto, el bot está vivo.'));
bot.on('text', (ctx) => ctx.reply('Recibido: ' + ctx.message.text));

console.log("Intentando conectar con Telegram...");

bot.launch()
  .then(() => console.log("✅ BOT CONECTADO EXITOSAMENTE"))
  .catch((err) => {
    console.error("❌ ERROR AL LANZAR EL BOT:", err.message);
    process.exit(1);
  });

// Mantener el proceso vivo sin servidor web
import http from 'http';
http.createServer((req, res) => { res.write('OK'); res.end(); }).listen(process.env.PORT || 8080);
