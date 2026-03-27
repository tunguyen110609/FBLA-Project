let allBusinesses = [];
let grid;

// Fetches all businesses from the server and displays them on the page
document.addEventListener('DOMContentLoaded', function() {
  grid = document.getElementById('businessGrid');
    

    fetch('http://localhost:3000/api/businesses')
        .then(function(response) {
            return response.json(); 
        })
        .then(function(business) {
            allBusinesses = business;
            grid.innerHTML = '';  
            business.forEach(function(biz) {
            grid.innerHTML += '<div class="business-card" onclick="window.location.href=\'business.html?id=' + biz.id + '\'">' +
                '<h3 class="business-name">' + biz.name + '</h3>' +
                '<span class="business-category">' + biz.category + '</span>' +
                '<p class="business-description">' + biz.description + '</p>' +
                (biz.deals ? '<p class="business-deal">🏷️ ' + biz.deals + '</p>' : '') +
                '<div class="business-rating">' +
                '<span class="rating-value">' + biz.rating + '</span>' +
                '<span class="stars">' + '⭐'.repeat(Math.round(biz.rating)) + '</span>' +
                '<span style="opacity:0.6;">(' + biz.num_ratings + ' reviews)</span>' +
                '</div>' +
                '<button onclick="event.stopPropagation(); toggleBookmark(' + biz.id + ')" class="bookmark-btn">' +
                (isBookmarked(biz.id) ? '❤️ Saved' : '🤍 Save') +
                '</button>' +
            '</div>';
            });
        });


  document.getElementById('searchInput').addEventListener('input', filterBusinesses);
  document.getElementById('categoryFilter').addEventListener('change', filterBusinesses);
  document.getElementById('sortFilter').addEventListener('change', filterBusinesses);

});
// Filters and sorts businesses based on search input, category, and sort selection
function filterBusinesses() {
    let search = document.getElementById('searchInput').value.toLowerCase();
    let category = document.getElementById('categoryFilter').value;
    let sort = document.getElementById('sortFilter').value;

    let results = allBusinesses.filter(function(biz) {
        let bizName = biz.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        let searchTerm = search.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        let matchesSearch = bizName.includes(searchTerm);
        let matchesCatergory = category === 'all' || biz.category === category;

        return matchesSearch && matchesCatergory;
    });

    if (sort === 'rating-high') {
      results.sort(function(a, b) {
        return b.rating - a.rating;
      });
    }
    if (sort === 'most-reviews') {
      results.sort(function(a, b) {
        return b.num_ratings - a.num_ratings;
      }); 
    }

    if (sort === 'name') {
      results.sort(function(a, b) {
        return a.name.localeCompare(b.name);
      });
    }

    grid.innerHTML = '';
    results.forEach(function(biz) {
      grid.innerHTML += '<div class="business-card" onclick="window.location.href=\'business.html?id=' + biz.id + '\'">' +
                        '<h3 class="business-name">' + biz.name + '</h3>' +
                        '<span class="business-category">' + biz.category + '</span>' +
                        '<p class="business-description">' + biz.description + '</p>' +
                        (biz.deals ? '<p class="business-deal">🏷️ ' + biz.deals + '</p>' : '') +
                        '<div class="business-rating">' +
                        '<span class="stars">' + '⭐'.repeat(Math.round(biz.rating)) + '</span>' +
                        '<span class="rating-value">' + biz.rating + '</span>' +
                        '<span style="opacity:0.6;">(' + biz.num_ratings + ' reviews)</span>' +
                        '</div>' +
                        '<button onclick="event.stopPropagation(); toggleBookmark(' + biz.id + ')" class="bookmark-btn">' +
                        (isBookmarked(biz.id) ? '❤️ Saved' : '🤍 Save') +
                        '</button>' +
                    '</div>';
    });
  }



// Toggles a business bookmark on or off using localStorage
function toggleBookmark(id) {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    
    if (bookmarks.includes(id)) {
        // Remove it
        bookmarks = bookmarks.filter(function(b) { return b !== id; });
    } else {
        // Add it
        bookmarks.push(id);
    }
    
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    filterBusinesses();
}


// Returns true if a business is bookmarked, false if not
function isBookmarked(id) {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    return bookmarks.includes(id);
}