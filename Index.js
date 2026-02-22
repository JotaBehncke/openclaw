import { Telegraf } from 'telegraf';
import OpenAI from 'openai';

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);
const ai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"
});

bot.start((ctx) => ctx.reply('¡Hola! Ya estoy funcionando en español. ¿Qué quieres saber?'));

bot.on('text', async (ctx) => {
  try {
    const response = await ai.chat.completions.create({
      messages: [
        { role: 'system', content: 'Responde siempre en español de forma breve.' },
        { role: 'user', content: ctx.message.text }
      ],
      model: 'llama3-8b-8192',
    });
    ctx.reply(response.choices[0].message.content);
  } catch (error) {
    ctx.reply('Error al conectar con la IA.');
  }
});

bot.launch();
console.log("✅ Bot iniciado correctamente");
