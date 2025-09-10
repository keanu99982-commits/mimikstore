const BOT_TOKEN = 'ISI_TOKEN_BOT_KAMU';
const CHAT_ID = 'ISI_CHAT_ID_KAMU';

async function startSewa() {
  const nomor = document.getElementById('waNumber').value.trim();
  const durasi = document.getElementById('durasi').value;

  if (!nomor || !durasi) {
    alert('Lengkapi datanya!');
    return;
  }

  const message = `Sewa Baru!\nNomor: ${nomor}\nDurasi: ${durasi}`;
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message
      })
    });

    const data = await res.json();
    if (data.ok) {
      alert('Sewa berhasil dikirim ke Telegram!');
    } else {
      alert('Gagal kirim ke Telegram.');
    }
  } catch (err) {
    alert('Terjadi error: ' + err.message);
  }
}