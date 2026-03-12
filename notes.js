let grid = document.getElementById('businessGrid');
fetch('http://localhost:3000/api/businesses')
    .then(function(response) {
        return response.json();
    })
    .then(function(business) {
        grid.innerHTML = '';
        business.forEach(function(biz) {
            grid.innerHTML += '<div class="business-card">' +
                '<h3 class="business-name">' + biz.name + '</h3>' +
                '<span class="business-category">' + biz.category + '</span>' +
                '<p class="business-description">' + biz.description + '</p>' +
                (biz.deal ? '<p class="business-deal">🏷️ ' + biz.deal + '</p>' : '') +
                '<div class="business-rating">' +
                '<span class="rating-value">' + biz.rating + '</span>' +
                '</div>' +
            '</div>';
        });
    });


    let bizName = biz.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
let searchTerm = search.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
let matchesSearch = bizName.includes(searchTerm);

<option value="5">⭐⭐⭐⭐⭐ Excellent</option>
            <option value="4">⭐⭐⭐⭐ Good</option>
            <option value="3">⭐⭐⭐ Average</option>
            <option value="2">⭐⭐ Poor</option>
            <option value="1">⭐ Terrible</option>