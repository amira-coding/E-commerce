const container = document.getElementById('product-container');

//  1. GET PRODUCTS FROM API 
function getAllProducts() {
  fetch('https://fakestoreapi.com/products/')
    .then(res => res.json())
    .then(products => {
      showProducts(products);        // show products in page
      addHeartClickEvents();         
      showCartCount();               
    })
    .catch(error => console.error("Error loading products:", error));
}

//   SHOW CART ITEM COUNT 
function showCartCount() {
  let cart = localStorage.getItem('cart');
  if (cart) {
    cart = JSON.parse(cart);
  } else {
    cart = [];
  }

  let countBox = document.getElementById('cart-count');
  if (countBox) {
    countBox.textContent = cart.length;
  }
}

//  FAVORITES 
let favoriteList = JSON.parse(localStorage.getItem('favorites')) || [];

function saveFavoriteList() {
  localStorage.setItem('favorites', JSON.stringify(favoriteList));
}

function isProductFavorite(productId) {
  return favoriteList.includes(productId);
}

function likeOrUnlike(productId) {
  if (isProductFavorite(productId)) {
    favoriteList = favoriteList.filter(id => id !== productId);
  } else {
    favoriteList.push(productId);
  }
  saveFavoriteList();
  getAllProducts(); // refresh products with updated hearts
}

//  SHOW PRODUCTS ON PAGE 
function showProducts(products) {
  container.innerHTML = '';

  products.forEach(product => {
    const div = document.createElement('div');
    div.className = "bg-white shadow-md rounded-xl overflow-hidden p-4 relative";

    let heartIconClass = isProductFavorite(product.id)
      ? 'fa-solid text-red-600'
      : 'fa-regular text-gray-400 hover:text-red-600 cursor-pointer';

    div.innerHTML = `
      <img src="${product.image}" alt="${product.title}" class="mb-4 w-full h-48 object-contain rounded-md">
      <h2 class="text-2xl font-bold mb-2">${product.title}</h2>
      <p class="text-gray-700 line-clamp-3">${product.description}</p>
      <p class="text-sm text-gray-500 italic">${product.category}</p>
      <div class="flex items-center justify-between mt-4">
        <div class="flex text-amber-400 text-sm space-x-1">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <p class="text-yellow-600">Rating: ${product.rating.rate} (${product.rating.count} reviews)</p>
      </div>
      <a href="product.html?id=${product.id}" class="mt-4 inline-block bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600 transition">
        Buy Now
      </a>

      <!-- Favorite Heart -->
      <i class="fa-heart ${heartIconClass} absolute top-4 right-4 text-3xl" data-id="${product.id}"></i>
    `;

    container.appendChild(div);
  });
}

// ADD CLICK EVENTS TO HEARTS 
function addHeartClickEvents() {
  const hearts = container.querySelectorAll('.fa-heart');
  hearts.forEach(icon => {
    icon.addEventListener('click', (e) => {
      const productId = parseInt(e.target.getAttribute('data-id'));
      likeOrUnlike(productId);
    });
  });
}

//   START EVERYTHING 
getAllProducts();
