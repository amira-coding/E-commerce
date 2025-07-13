  const container = document.getElementById('product-container');

    function getJson() {
      fetch('https://fakestoreapi.com/products/')
        .then(res => res.json())
        .then(data => {
          data.forEach(product => {
            const div = document.createElement('div');
            div.className = "bg-white shadow-md rounded-xl overflow-hidden p-4";

            div.innerHTML = `
              <img src="${product.image}" alt="${product.title}" class="mb-4 w-full h-48 object-contain rounded-md">
              <h2 class="text-2xl font-bold mb-2">${product.title}</h2>
              <p class="text-gray-700 line-clamp-3">${product.description}</p>
              <p class="text-sm text-gray-500 italic">${product.category}</p>
              <div class="flex items-center justify-between mt-4">
                <div class="flex text-amber-400 text-sm space-x-1">
                  <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                </div>
                <p class="text-yellow-600">Rating: ${product.rating.rate} (${product.rating.count} reviews)</p>
              </div>
              <a href="product.html?id=${product.id}" 
                 class="mt-4 inline-block bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition">
                Buy Now
              </a>
            `;

            container.appendChild(div);
          });
        })
        .catch(err => console.error("Fetch error:", err));
    }

    getJson();