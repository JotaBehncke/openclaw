import { Telegraf } from 'telegraf';
import express from 'express';

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);
const app = express();

// Ruta para que Railway vea que estamos vivos
app.get('/', (req, res) => res.send('Bot Online'));

bot.start((ctx) => ctx.reply('¡LO LOGRAMOS! El bot está vivo.'));
bot.on('text', (ctx) => ctx.reply('Recibido: ' + ctx.message.text));

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log('Servidor en puerto', PORT);
  bot.launch()
    .then(() => console.log('✅ Bot conectado'))
    .catch(err => console.log('❌ Error:', err.message));
});
