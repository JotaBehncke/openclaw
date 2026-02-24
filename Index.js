import { Telegraf } from 'telegraf';
import OpenAI from 'openai';
import express from 'express';

const token = process.env.TELEGRAM_TOKEN;
const aiKey = process.env.OPENAI_API_KEY;

const bot = new Telegraf(token);
const ai = new OpenAI({
    apiKey: aiKey,
    baseURL: "https://api.groq.com/openai/v1"
});

const app = express();
app.get('/', (req, res) => res.send('Bot vivo'));

bot.start((ctx) => ctx.reply('¡Al fin! Estoy listo para charlar.'));

bot.on('text', async (ctx) => {
    try {
        const completion = await ai.chat.completions.create({
            messages: [{ role: 'user', content: ctx.message.text }],
            model: 'llama3-8b-8192',
        });
        ctx.reply(completion.choices[0].message.content);
    } catch (err) {
        console.error("Error de IA:", err.message);
        ctx.reply("Perdón, tuve un error con mi cerebro de IA.");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log('✅ Servidor en puerto', PORT);
    bot.launch()
        .then(() => console.log('✅ Bot conectado'))
        .catch(e => console.error('❌ Error Telegram:', e.message));
});
