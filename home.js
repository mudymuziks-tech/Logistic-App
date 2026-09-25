const locationSelector = document.querySelector('.location-selector');
const locationName = document.querySelector('.location-name');
const dropdownButton = document.querySelector('.location-dropdown-button');
const cityOptions = document.querySelectorAll('.city-option');
const searchInput = document.querySelector('.search-input');
const popularItems = document.querySelectorAll('.popular-item');

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

searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLocaleLowerCase();

  popularItems.forEach((item) => {
    item.hidden = !item.textContent.toLocaleLowerCase().includes(query);
  });
});

document.addEventListener('click', (event) => {
  if (!locationSelector.contains(event.target)) {
    closeCityMenu();
  }
});

