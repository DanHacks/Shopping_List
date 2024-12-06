// JavaScript File: script.js
const itemInput = document.getElementById('itemInput');
const priceInput = document.getElementById('priceInput');
const addButton = document.getElementById('addButton');
const shoppingList = document.getElementById('shoppingList');
const clearButton = document.getElementById('clearButton');

// Retrieve stored items from localStorage
let items = JSON.parse(localStorage.getItem('shoppingList')) || [];

// Render the list on page load
renderList();

// Add item to the list
addButton.addEventListener('click', () => {
  const itemText = itemInput.value.trim();
  const itemPrice = priceInput.value.trim();
  if (itemText && itemPrice) {
    items.push({ text: itemText, price: itemPrice, purchased: false });
    saveToLocalStorage();
    renderList();
    itemInput.value = '';
    priceInput.value = '';
  }
});

// Mark item as purchased
shoppingList.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    const index = e.target.getAttribute('data-index');
    items[index].purchased = !items[index].purchased;
    saveToLocalStorage();
    renderList();
  }
});

// Clear the list
clearButton.addEventListener('click', () => {
  items = [];
  saveToLocalStorage();
  renderList();
});

// Save the current list to localStorage
function saveToLocalStorage() {
  localStorage.setItem('shoppingList', JSON.stringify(items));
}

// Render the list dynamically
function renderList() {
  shoppingList.innerHTML = '';
  items.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.text} `;
    li.setAttribute('data-index', index);

    const priceSpan = document.createElement('span');
    priceSpan.textContent = `Ksh ${item.price}`;
    priceSpan.classList.add('price');
    li.appendChild(priceSpan);

    if (item.purchased) {
      li.classList.add('purchased');
    }
    shoppingList.appendChild(li);
  });
}
