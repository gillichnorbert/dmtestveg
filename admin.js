const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Űrlap elküldésének megakadályozása

  const passwordInput = document.getElementById('password');
  const password = passwordInput.value;

  // Ellenőrzés, hogy a megadott jelszó megfelelő-e
  if (password === 'adminpassword') { // Csak egy példa jelszó, valós alkalmazásban ne használjunk keménykódolt jelszavakat
    window.location.href = 'admin.html'; // Átirányítás az admin felületre
  } else {
    alert('Hibás jelszó! Kérem próbálja újra.');
    passwordInput.value = ''; // Jelszómező ürítése
  }
});
