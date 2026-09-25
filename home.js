const locationSelector = document.querySelector('.location-selector');
const locationName = document.querySelector('.location-name');
const dropdownButton = document.querySelector('.location-dropdown-button');
const cityOptions = document.querySelectorAll('.city-option');

function closeCityMenu() {
  locationSelector.classList.remove('city-menu-open');
  dropdownButton.setAttribute('aria-expanded', 'false');
}

dropdownButton.addEventListener('click', () => {
  const isOpen = locationSelector.classList.toggle('city-menu-open');
  dropdownButton.setAttribute('aria-expanded', String(isOpen));
});

cityOptions.forEach((cityOption) => {
  cityOption.addEventListener('click', () => {
    locationName.textContent = cityOption.dataset.city;

    cityOptions.forEach((option) => {
      const isSelected = option === cityOption;
      option.classList.toggle('selected-city', isSelected);
      option.setAttribute('aria-selected', String(isSelected));
    });

    closeCityMenu();
  });
});

document.addEventListener('click', (event) => {
  if (!locationSelector.contains(event.target)) {
    closeCityMenu();
  }
});

