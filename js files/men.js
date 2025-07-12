const container = document.getElementById('product-container');

function getJson() {
  fetch('./fakestore.json')
    .then(res => res.json())
    .then(data => {
      console.log(data);

      // Filtering men's collection
      const mensProducts = data.filter(product => product.category === "men's clothing");

      mensProducts.forEach(product => {
        const div = document.createElement('div');
        div.className = "bg-white rounded-lg py-6 px-4 shadow";

        div.innerHTML = `
          <img src="${product.image}" alt="${product.title}" class="mb-4 w-full h-48 object-cover rounded-md">
          <h2 class="text-2xl font-bold mb-2">${product.title}</h2>
          <p class="text-gray-700 line-clamp-3">${product.description}</p>
          <p class="text-sm text-gray-500 italic mb-2">${product.category}</p>
          <p class="text-yellow-600 mb-4">Rating: ${product.rating.rate} (${product.rating.count} reviews)</p>
          
          <div class="flex justify-start">
            <a href="product.html?id=${product.id}" 
               class="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition">
              Buy Now
            </a>
          </div>
        `;

        container.appendChild(div);
      });
    })
    .catch(err => console.error("Fetch error:", err));
}

  getJson();

