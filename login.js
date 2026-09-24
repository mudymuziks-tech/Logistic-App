const accountForm = document.querySelector('#account-form');
const pageContainer = document.querySelector('.login-page-container');
const accountTitle = document.querySelector('.account-title');
const accountDescription = document.querySelector('.account-description');
const signupButton = document.querySelector('.signup-button');
const existingAccountText = document.querySelector('.existing-account-text');
const loginLink = document.querySelector('.login-link');
const fullNameInput = document.querySelector('.full-name-input');
const phoneInput = document.querySelector('.phone-input');
const confirmPasswordInput = document.querySelector('.confirm-password-input');
const emailInput = document.querySelector('.email-input');
const passwordInput = document.querySelector('.password-input');

const statusMessage = document.createElement('p');
statusMessage.className = 'form-status';
statusMessage.setAttribute('role', 'status');
accountForm.append(statusMessage);

let isLoginMode = window.location.hash === '#login';

function updateMode() {
  pageContainer.classList.toggle('login-mode', isLoginMode);
  accountTitle.textContent = isLoginMode ? 'Welcome Back' : 'Create Account';
  accountDescription.textContent = isLoginMode
    ? 'Log in to continue with Quick Drop.'
    : 'Join Quick Drop and get your favorite items Delivered.';
  signupButton.textContent = isLoginMode ? 'Log In' : 'Sign Up';
  existingAccountText.textContent = isLoginMode ? 'Need an account?' : 'Already have an account?';
  loginLink.textContent = isLoginMode ? 'Create Account' : 'Log In';
  loginLink.href = isLoginMode ? '#signup' : '#login';
  passwordInput.autocomplete = isLoginMode ? 'current-password' : 'new-password';
  confirmPasswordInput.required = !isLoginMode;
  statusMessage.textContent = '';
  statusMessage.className = 'form-status';
}

function showStatus(message, type = 'error') {
  statusMessage.textContent = message;
  statusMessage.className = `form-status ${type}`;
}

loginLink.addEventListener('click', (event) => {
  event.preventDefault();
  isLoginMode = !isLoginMode;
  window.history.replaceState(null, '', isLoginMode ? '#login' : '#signup');
  updateMode();
});

accountForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!accountForm.reportValidity()) {
    return;
  }

  if (isLoginMode) {
    const savedAccount = JSON.parse(localStorage.getItem('quickDropAccount') || 'null');

    if (!savedAccount || savedAccount.email !== emailInput.value.trim() || savedAccount.password !== passwordInput.value) {
      showStatus('Email or password is incorrect.');
      return;
    }

    localStorage.setItem('quickDropLoggedIn', 'true');
    window.location.href = 'home-page.html';
    return;
  }

  if (passwordInput.value !== confirmPasswordInput.value) {
    showStatus('Passwords do not match.');
    return;
  }

  localStorage.setItem('quickDropAccount', JSON.stringify({
    name: fullNameInput.value.trim(),
    email: emailInput.value.trim(),
    phone: phoneInput.value.trim(),
    password: passwordInput.value
  }));
  localStorage.setItem('quickDropLoggedIn', 'true');
  window.location.href = 'home-page.html';
});

updateMode();