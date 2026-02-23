import { Telegraf } from 'telegraf';

// Usamos el nombre exacto que pondrás en Railway
const token = process.env.TELEGRAM_TOKEN;

console.log("-----------------------------------------");
if (!token) {
    console.log("❌ ERROR: No hay ninguna variable llamada TELEGRAM_TOKEN");
} else {
    console.log("🔍 TOKEN DETECTADO. Comienza con:", token.substring(0, 5));
    console.log("🔍 LONGITUD DEL TOKEN:", token.length);
}
console.log("-----------------------------------------");

const bot = new Telegraf(token || '');

bot.telegram.getMe()
    .then((me) => {
        console.log("✅ ¡CONECTADO EXITOSAMENTE!");
        console.log("🤖 Nombre del bot:", me.username);
    })
    .catch((err) => {
        console.log("❌ ERROR DE TELEGRAM:", err.message);
        if (err.message.includes("401")) {
            console.log("👉 EL TOKEN ES INVÁLIDO. Revisa que no tenga espacios o que no sea la clave de Groq.");
        }
    });

// Esto es para que Railway no lo mate por falta de puerto
import http from 'http';
http.createServer((req, res) => res.end('Bot activo')).listen(process.env.PORT || 8080);
