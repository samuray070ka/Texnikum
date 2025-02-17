const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const userNameElement = document.getElementById('userName'); 

// Backend API URL (odatda bu API endpoint bo'ladi)
const apiUrl = 'https://texnikum-api.onrender.com/login'; // Bu URLni backendga moslang

// Login funksiyasi 
loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();  // Passive listener muammolarini bartaraf etish

  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    const { auth_token } = data;

    // Tokenni localStorage-ga saqlash
    localStorage.setItem('auth_token', auth_token);

    // Admin panelga yo'naltirish
    window.location.href = 'admin.html';
  } catch (error) {
    alert('Login failed: ' + error.message);
  }
});
