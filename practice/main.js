const container = document.getElementById('product-container');

function getJson() {
  fetch('../fakestore.json')
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);

      data.forEach(function (item) {
        const div = document.createElement('div');
        div.classList.add('product');

        div.innerHTML = `
          <img src="${item.image}" alt="">
          <h2>${item.title}</h2>
          <p>${item.description}</p>
          <i>${item.category}</i>

          <!-- rating -->
          <div class="rating">
            <span>⭐⭐⭐⭐⭐</span>
            <span>Rating: ${item.rating.rate} (${item.rating.count} reviews)</span>
          </div>

          <a href="product.html?id=${item.id}" 
            class="mt-4 inline-block bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition">
            Buy Now
          </a>
        `;

        container.appendChild(div);
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}

getJson();
