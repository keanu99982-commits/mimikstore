async function login() {
  const key = document.getElementById('key').value.toUpperCase();
  const resp = await fetch(`/api/verify-key?key=${encodeURIComponent(key)}`);
  const data = await resp.json();

  if(data.valid) {
    alert('Login sukses!');
    // nanti bisa arahkan ke dashboard reseller
    window.location.href = 'reseller-dashboard.html';
  } else {
    alert('Key tidak valid');
  }
}
