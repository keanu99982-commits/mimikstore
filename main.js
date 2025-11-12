async function login() {
  const key = document.getElementById('key').value.toUpperCase();
  const status = document.getElementById('status');

  const resp = await fetch(`/api/verify-key?key=${encodeURIComponent(key)}`);
  const data = await resp.json();

  if(data.valid) {
    // langsung dialihkan ke halaman dashboard
    window.location.href = 'reseller-dashboard.html?key=' + encodeURIComponent(key);
  } else {
    status.textContent = 'Key tidak valid';
    status.style.color = 'red';
  }
}
