const container = document.getElementById('product-container');

function getJson() {
  fetch('./fakestore.json')
    .then(res => res.json())
    .then(data => {
      console.log(data);

      // Filter for women's clothing only
      const womensProducts = data.filter(product => product.category === "women's clothing");

      womensProducts.forEach(product => {
        const div = document.createElement('div');
        div.className = "bg-white rounded-lg py-6 px-4 shadow";

        div.innerHTML = `
          <img src="${product.image}" alt="${product.title}" class="mb-4 w-full h-48 object-cover rounded-md">
          <h2 class="text-2xl font-bold mb-2">${product.title}</h2>
          <p class="text-gray-700 line-clamp-3">${product.description}</p>
          <p class="text-sm text-gray-500 italic mb-1">${product.category}</p>
          <p class="text-yellow-600 mb-4">Rating: ${product.rating.rate} (${product.rating.count} reviews)</p>
          <a href="product.html?id=${product.id}" class="inline-block bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600 transition">
            Buy Now
          </a>
        `;

        container.appendChild(div);
      });
    })
    .catch(err => console.error("Fetch error:", err));
}

document.addEventListener('DOMContentLoaded', () => {
  getJson();
});


// CART
function showCartNumber() {
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

showCartNumber();
