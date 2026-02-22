import { Telegraf } from 'telegraf';

// PEGA TU TOKEN AQUÍ ADENTRO DE LAS COMILLAS
// Ejemplo: const bot = new Telegraf('123456789:ABCDE...');
const bot = new Telegraf('TU_TOKEN_DE_BOTFATHER_AQUÍ'); 

bot.start((ctx) => ctx.reply('¡AL FIN! El bot está vivo.'));
bot.on('text', (ctx) => ctx.reply('Te recibo perfecto: ' + ctx.message.text));

bot.launch()
  .then(() => console.log('✅ BOT CONECTADO DIRECTAMENTE'))
  .catch((err) => console.log('❌ ERROR DEFINITIVO:', err.message));

// Esto es para que Railway no lo mate por falta de puerto
import http from 'http';
http.createServer((req, res) => res.end('Bot vivo')).listen(process.env.PORT || 8080);
