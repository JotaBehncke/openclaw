import { Telegraf } from 'telegraf';
import OpenAI from 'openai';
import express from 'express';

// 1. Configuración de la IA
const ai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"
});

// 2. Configuración del Bot
const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

bot.start((ctx) => ctx.reply('¡Bot listo! Ahora sí, pregúntame lo que quieras.'));

bot.on('text', async (ctx) => {
  try {
    const chatCompletion = await ai.chat.completions.create({
      messages: [{ role: 'user', content: ctx.message.text }],
      model: 'llama3-8b-8192',
    });
    await ctx.reply(chatCompletion.choices[0].message.content);
  } catch (error) {
    console.error("Error Groq:", error);
    await ctx.reply('Tengo el token de Telegram bien, pero algo falló con la IA.');
  }
});

// 3. Servidor de "Vida" para Railway
const app = express();
app.get('/', (req, res) => res.send('El bot está despierto 🤖'));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor de salud en puerto ${PORT}`);
  bot.launch().then(() => console.log('✅ Bot conectado a Telegram'));
});

// Manejo de errores para que no crashee
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
