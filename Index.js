import { Telegraf } from 'telegraf';
import OpenAI from 'openai';

// Esto ayuda a diagnosticar si Railway está leyendo las llaves
const token = process.env.TELEGRAM_TOKEN;
if (!token) throw new Error("¡Falta la variable TELEGRAM_TOKEN en Railway!");

const bot = new Telegraf(token);
const ai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"
});

bot.start((ctx) => ctx.reply('¡Hola! Ya estoy vivo en Railway. ¿En qué te ayudo?'));

bot.on('text', async (ctx) => {
  try {
    const response = await ai.chat.completions.create({
      messages: [{ role: 'system', content: 'Responde siempre en español.' }, { role: 'user', content: ctx.message.text }],
      model: 'llama3-8b-8192',
    });
    ctx.reply(response.choices[0].message.content);
  } catch (e) {
    ctx.reply('Error al procesar.');
  }
});

bot.launch().then(() => console.log("✅ Bot conectado con éxito a Telegram"));
