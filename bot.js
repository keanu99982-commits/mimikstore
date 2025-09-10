import TelegramBot from "node-telegram-bot-api";
import fs from "fs-extra";
import path from "path";

const TOKEN = "MASUKKAN_BOT_TOKEN_DI_SINI";
const bot = new TelegramBot(TOKEN, { polling: true });

const USERS_FILE = path.join(process.cwd(), "users.json");
let users = {};
let saldoIntervals = {};

// Load / save users
async function loadUsers() {
  try { users = await fs.readJson(USERS_FILE); } catch { users = {}; }
}
async function saveUsers() { await fs.writeJson(USERS_FILE, users, { spaces: 2 }); }

// Daftar admin Telegram
const ADMINS = [7080925290]; // ganti dengan ID adminmu

function isAdmin(userId) { return ADMINS.includes(userId); }

// START SEWA
bot.onText(/\/startsewa (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  if (!isAdmin(userId)) return bot.sendMessage(chatId, "⛔ Kamu tidak punya izin.");

  const username = match[1]; // username user yang mau sewa
  await loadUsers();
  if (!users[username]) return bot.sendMessage(chatId, "❌ User tidak ditemukan");

  if (!saldoIntervals[username]) {
    saldoIntervals[username] = setInterval(async () => {
      users[username].saldo += 250; // tambah saldo tiap 20 detik
      await saveUsers();
    }, 20000);
  }

  bot.sendMessage(chatId, `✅ Sewa untuk user ${username} dimulai, saldo bertambah 250 tiap 20 detik.`);
});

// STOP SEWA
bot.onText(/\/stopsewa (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  if (!isAdmin(userId)) return bot.sendMessage(chatId, "⛔ Kamu tidak punya izin.");

  const username = match[1];
  await loadUsers();

  if (saldoIntervals[username]) {
    clearInterval(saldoIntervals[username]);
    delete saldoIntervals[username];
  }

  bot.sendMessage(chatId, `🛑 Sewa untuk user ${username} dihentikan.`);
});