import { Telegraf } from 'telegraf';
import OpenAI from 'openai';

// Forzamos a que si no hay token, el bot ni siquiera intente arrancar
if (!process.env.TELEGRAM_TOKEN) {
  console.error("❌ ERROR CRÍTICO: No se encontró TELEGRAM_TOKEN en las variables.");
  process.exit(1);
}

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

const ai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"
});

// Esto nos dirá si Telegram acepta la llave ANTES de lanzar el bot
bot.telegram.getMe().then((botInfo) => {
  console.log(`✅ BOT AUTORIZADO POR TELEGRAM: @${botInfo.username}`);
}).catch((err) => {
  console.error("❌ TELEGRAM SIGUE RECHAZANDO EL TOKEN:", err.message);
});

bot.on('text', async (ctx) => {
  try {
    const response = await ai.chat.completions.create({
      messages: [{ role: 'user', content: ctx.message.text }],
      model: 'llama3-8b-8192',
    });
    ctx.reply(response.choices[0].message.content);
  } catch (e) {
    ctx.reply("Error con la IA.");
  }
});

bot.launch();
