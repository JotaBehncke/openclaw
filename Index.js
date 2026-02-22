import { Telegraf } from 'telegraf';
import OpenAI from 'openai';

const token = process.env.TELEGRAM_TOKEN;

// --- MODO DIAGNÓSTICO ---
console.log("===============================");
console.log("¿Hay token en Railway?:", token ? "SÍ" : "NO");
if (token) {
    console.log("Longitud exacta del token:", token.length, "caracteres.");
    console.log("El token empieza con:", token.substring(0, 5));
}
console.log("===============================");

const bot = new Telegraf(token);
const ai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"
});

bot.start((ctx) => ctx.reply('¡Hola! Bot resucitado y funcionando.'));

bot.on('text', async (ctx) => {
  try {
    const response = await ai.chat.completions.create({
      messages: [{ role: 'system', content: 'Responde en español.' }, { role: 'user', content: ctx.message.text }],
      model: 'llama3-8b-8192',
    });
    ctx.reply(response.choices[0].message.content);
  } catch (error) {
    ctx.reply('Error interno.');
  }
});

bot.launch().then(() => console.log("✅ Conectado a Telegram."));
