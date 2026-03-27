// Fetches all businesses from the server and displays them on the page
document.addEventListener('DOMContentLoaded', function() {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    let grid = document.getElementById('favoritesGrid');

    if (bookmarks.length === 0) {
        grid.innerHTML = '<p>No saved businesses yet.</p>';
        return;
    }

    fetch('http://localhost:3000/api/businesses')
        .then(function(response) { return response.json(); })
        .then(function(businesses) {
            let saved = businesses.filter(function(biz) {
                return bookmarks.includes(biz.id);
            });
            grid.innerHTML = '';
            saved.forEach(function(biz) {
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
});

// Toggles a business bookmark on or off using localStorag
function toggleBookmark(id) {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    if (bookmarks.includes(id)) {
        bookmarks = bookmarks.filter(function(b) { return b !== id; });
    } else {
        bookmarks.push(id);
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    location.reload();
}

// Returns true if a business is bookmarked, false if not
function isBookmarked(id) {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    return bookmarks.includes(id);
}