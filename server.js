import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs-extra";
import path from "path";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

const USERS_FILE = path.join(process.cwd(), "users.json");
let users = {};
let saldoIntervals = {};

// Load & save users
async function loadUsers() {
  try { users = await fs.readJson(USERS_FILE); } catch { users = {}; }
}
async function saveUsers() { await fs.writeJson(USERS_FILE, users, { spaces: 2 }); }

// SIGN UP
app.post("/signup", async (req, res) => {
  await loadUsers();
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: "Username & password required" });
  if (users[username]) return res.status(400).json({ message: "Username sudah ada" });
  users[username] = { password, saldo: 0 };
  await saveUsers();
  res.json({ message: "Sign Up berhasil, silakan login" });
});

// LOGIN
app.post("/login", async (req, res) => {
  await loadUsers();
  const { username, password } = req.body;
  const user = users[username];
  if (!user || user.password !== password) return res.status(400).json({ message: "Username/password salah" });

  // Start saldo bertambah tiap 20 detik
  if (!saldoIntervals[username]) {
    saldoIntervals[username] = setInterval(async () => {
      users[username].saldo += 250;
      await saveUsers();
    }, 20000);
  }

  res.json({ message: "Login berhasil", username });
});

// LOGOUT
app.post("/logout", async (req, res) => {
  const { username } = req.body;
  if (saldoIntervals[username]) {
    clearInterval(saldoIntervals[username]);
    delete saldoIntervals[username];
  }
  res.json({ message: "Logout berhasil" });
});

// AMBIL SALDO
app.get("/saldo/:username", async (req, res) => {
  await loadUsers();
  const username = req.params.username;
  if (!users[username]) return res.status(404).json({ message: "User tidak ditemukan" });
  res.json({ username, saldo: users[username].saldo });
});

// START SEWA
app.post("/start-sewa", async (req, res) => {
  const { username, waNumber, durasi } = req.body;
  await loadUsers();
  if (!username || !waNumber || !durasi) return res.status(400).json({ message: "Data tidak lengkap" });

  // Contoh tambah saldo saat sewa
  if (users[username]) users[username].saldo += 100;
  await saveUsers();

  res.json({ message: `✅ Sewa nomor ${waNumber} selama ${durasi} berhasil dikirim` });
});

// TAMBAH SALDO MANUAL (opsional)
app.post("/tambah-saldo", async (req, res) => {
  const { username, jumlah } = req.body;
  await loadUsers();
  if (!users[username]) return res.status(404).json({ message: "User tidak ditemukan" });
  users[username].saldo += jumlah;
  await saveUsers();
  res.json({ message: `✅ Saldo ${jumlah} berhasil ditambahkan` });
});

// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));RT}`));