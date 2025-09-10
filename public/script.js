// Ambil username dari hidden input
const username = document.getElementById("username").value;

// Fungsi untuk submit sewa
async function startSewa() {
  const waNumber = document.getElementById("waNumber").value;
  const durasi = document.getElementById("durasi").value;

  if (!waNumber) {
    alert("Harap isi nomor WhatsApp");
    return;
  }

  try {
    const res = await fetch("/start-sewa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, waNumber, durasi })
    });

    const data = await res.json();
    alert(data.message);

  } catch (err) {
    console.error(err);
    alert("Terjadi kesalahan saat mengirim sewa");
  }
}

// Fungsi untuk fetch saldo live
async function fetchSaldo() {
  try {
    const res = await fetch(`/saldo/${username}`);
    const data = await res.json();
    document.getElementById("saldo").innerText = "Saldo: " + data.saldo;
  } catch (err) {
    console.error(err);
  }
}

// Update saldo setiap 20 detik
setInterval(async () => {
  try {
    await fetch(`/tambah-saldo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, jumlah: 250 })
    });
    fetchSaldo(); // update tampilan saldo
  } catch (err) {
    console.error(err);
  }
}, 20000); // 20000ms = 20 detik

fetchSaldo(); // fetch pertama