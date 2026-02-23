import { Telegraf } from 'telegraf';
import express from 'express';

const token = process.env.TELEGRAM_TOKEN;

if (!token) {
  console.error("❌ ERROR: No hay TELEGRAM_TOKEN");
  process.exit(1);
}

const bot = new Telegraf(token);
const app = express();

// Esto le dice a Railway: "ESTOY VIVO" de inmediato
app.get('/', (req, res) => res.status(200).send('OK'));

bot.start((ctx) => ctx.reply('¡POR FIN! Si lees esto, el bot no crasheó.'));
bot.on('text', (ctx) => ctx.reply('Recibido'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log('✅ Servidor iniciado en puerto', PORT);
  bot.launch()
    .then(() => console.log('✅ Bot conectado a Telegram'))
    .catch((err) => console.error('❌ Error Telegram:', err.message));
});

// Evita que Node se cierre por errores pequeños
process.on('uncaughtException', (err) => console.error('Error no capturado:', err));
