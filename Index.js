import { Telegraf } from 'telegraf';
import express from 'express';

const token = process.env.TELEGRAM_TOKEN;
const bot = new Telegraf(token);

// Log de diagnóstico
console.log("--- INICIANDO DIAGNÓSTICO ---");
console.log("Token detectado:", token ? "SI" : "NO");

bot.start((ctx) => ctx.reply('¡CONECTADO! Si lees esto, la conexión con Telegram funciona.'));
bot.on('text', (ctx) => ctx.reply('Me dijiste: ' + ctx.message.text));

const app = express();
app.get('/', (req, res) => res.send('Servidor OK'));
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log('✅ Servidor web en puerto', PORT);
  bot.launch()
    .then(() => console.log('✅ BOT ESCUCHANDO MENSAJES'))
    .catch(err => console.log('❌ ERROR DE CONEXIÓN:', err.message));
});
