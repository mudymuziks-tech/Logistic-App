const logoutLink = document.querySelector('[data-logout]');

logoutLink.addEventListener('click', () => {
  localStorage.removeItem('quickDropAccount');
  localStorage.removeItem('quickDropLoggedIn');
});
