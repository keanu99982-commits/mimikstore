<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mimik Store</title>
  <style>
    body {
      background: linear-gradient(135deg, #1e1e2f, #121212);
      color: #fff;
      font-family: 'Segoe UI', Tahoma, sans-serif;
      text-align: center;
      padding: 50px;
      animation: fadeIn 1.5s ease-in-out;
    }
    h1 {
      font-size: 2.5rem;
      margin-bottom: 10px;
      color: #00ffcc;
    }
    p {
      font-size: 1.2rem;
      margin-bottom: 20px;
    }
    a {
      display: inline-block;
      padding: 15px 25px;
      background: #00ffcc;
      color: #000;
      font-weight: bold;
      text-decoration: none;
      border-radius: 10px;
      transition: transform 0.2s ease, background 0.3s;
    }
    a:hover {
      background: #00cc99;
      transform: scale(1.05);
    }
    @keyframes fadeIn {
      from {opacity: 0; transform: translateY(20px);}
      to {opacity: 1; transform: translateY(0);}
    }
  </style>
</head>
<body>
  <h1>Selamat Datang di Mimik Store</h1>
  <p>Jika ingin membeli item Roblox atau kebutuhan hosting,<br>langsung klik tombol di bawah ini:</p>
  <a href="https://lynk.id/mimikstore" target="_blank">Website Mimik Store</a>

  <script>
    // Efek sambutan keren di console
    console.log("%c Mimik Store ", "background: #00ffcc; color: #000; font-size: 20px; padding: 5px;");
    console.log("Terima kasih sudah berkunjung ke Mimik Store!");
  </script>
</body>
</html>
