document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.nav-button');
  const itemsContainer = document.getElementById('items-container');
  const clearButton = document.getElementById('clear-cart');
  const cartCount = document.getElementById('cart-count');
  const totalPriceElement = document.getElementById('total-price');
  const searchInput = document.getElementById('search');

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  function searchItems(text) {
    let allItems = JSON.parse(localStorage.getItem('allItems')) || [];
    
    if (text) {
        // Convert search text to lowercase for case-insensitive comparison
        text = text.toLowerCase();
        allItems = allItems.filter(item => {
            // Convert item name to lowercase and check if it includes the search text
            return item.name.toLowerCase().includes(text);
        });
    }

    renderItems(allItems);
}


  function updateCartInfo() {
      const totalItems = cart.length;
      const totalPrice = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);

      cartCount.textContent = totalItems;
      totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
  }

  function addToCart(item) {
      cart.push(item);
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartInfo();
  }

  function renderItems(items) {
      itemsContainer.innerHTML = ''; 

      items.forEach(item => {
          const itemElement = document.createElement('div');
          itemElement.classList.add('item');

          const image = document.createElement('img');
          image.src = item.image;
          itemElement.appendChild(image);

          const name = document.createElement('h3');
          name.textContent = item.name;
          itemElement.appendChild(name);

          const price = document.createElement('p');
          price.textContent = `Price - $${item.price}`;
          itemElement.appendChild(price);

          const addToCartButton = document.createElement('button');
          addToCartButton.textContent = 'Add to Cart';
          addToCartButton.classList.add('add-to-cart');
          addToCartButton.addEventListener('click', () => addToCart(item));
          itemElement.appendChild(addToCartButton);

          itemsContainer.appendChild(itemElement);
      });
  }

  buttons.forEach(button => {
      button.addEventListener('click', () => {
          buttons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');
          const category = button.getAttribute('data-category');
          let allItems = JSON.parse(localStorage.getItem('allItems')) || [];

          if (category !== 'all') {
              allItems = allItems.filter(item => item.category === category);
          }

          renderItems(allItems);
      });
  });

  clearButton.addEventListener('click', () => {
      cart = [];
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartInfo();
  });

  searchInput.addEventListener('input', (e) => {
      const query = e.target.value;
      searchItems(query);
  });

  renderItems(JSON.parse(localStorage.getItem('allItems')) || []);
  updateCartInfo();

  
});
