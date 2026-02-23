import { Telegraf } from 'telegraf';
import OpenAI from 'openai';
import express from 'express';

// 1. Verificación estricta de variables
if (!process.env.TELEGRAM_TOKEN || !process.env.OPENAI_API_KEY) {
    console.error("❌ FATAL ERROR: Faltan las variables TELEGRAM_TOKEN o OPENAI_API_KEY en Railway.");
    process.exit(1);
}

// 2. Inicializar IA (Groq) y Bot (Telegram)
const ai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"
});

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

// 3. Atrapa-errores global para que NO crashee si Telegram falla
bot.catch((err, ctx) => {
  console.error(`❌ Error silencioso de Telegram atrapado:`, err.message);
});

// 4. Comandos del Bot
bot.start((ctx) => ctx.reply('¡Hola! Sobreviví a Railway y estoy listo.'));

bot.on('text', async (ctx) => {
  try {
    const chatCompletion = await ai.chat.completions.create({
      messages: [
        { role: 'system', content: 'Eres un asistente útil, directo y amigable. Responde en español.' },
        { role: 'user', content: ctx.message.text }
      ],
      model: 'llama3-8b-8192',
    });
    await ctx.reply(chatCompletion.choices[0].message.content);
  } catch (error) {
    console.error("❌ Error con Groq:", error.message);
    await ctx.reply('Tengo un problema temporal con mi IA, pero sigo conectado a Telegram.');
  }
});

// 5. Servidor Web "Antibalas" para Railway
const app = express();
app.get('/', (req, res) => res.send('🤖 Bot funcionando al 100% y sin crashear.'));

// Railway asigna un puerto dinámico, lo leemos aquí
const PORT = process.env.PORT || 3000;

// El secreto: escuchar en '0.0.0.0' para que Railway lo detecte en cualquier red
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Servidor web escuchando a Railway en el puerto ${PORT}`);
  
  // Lanzamos el bot SOLAMENTE cuando el servidor web ya está seguro
  bot.launch()
    .then(() => console.log('✅ BOT CONECTADO A TELEGRAM CON ÉXITO.'))
    .catch(err => console.error('❌ Error al lanzar el bot:', err.message));
});

// 6. Apagado seguro para reinicios
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
