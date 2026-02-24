import { Telegraf } from 'telegraf';
import express from 'express';

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);
const app = express();

app.get('/', (req, res) => res.send('Servidor activo'));

bot.start((ctx) => ctx.reply('¡Hola! Por fin funciono.'));
bot.on('text', (ctx) => ctx.reply('Recibí esto: ' + ctx.message.text));

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log('✅ Servidor web listo en puerto', PORT);
  bot.launch()
    .then(() => console.log('✅ Bot conectado a Telegram'))
    .catch((err) => console.error('❌ Error de Telegram:', err));
});
