let correctAnswer = 0;

function getIdFromURL() {
    let params = new URLSearchParams(window.location.search);
    return params.get('id');
}

function generateCaptcha() {
    let num1 = Math.floor(Math.random() * 10) +1;
    let num2 = Math.floor(Math.random() * 10) +1;
    
    correctAnswer = num1 + num2;

    document.getElementById('captchaQuestion').innerHTML = 'Bot Prevention: What is '  +  num1 + ' + ' + num2 + '?';
    
}

function showReviews(id) {
    fetch('http://localhost:3000/api/reviews/' + id)
        .then(function(response) {
            return response.json();
        })
        .then(function(reviews) {
            let list = document.getElementById('reviewsList');
            if (reviews.length === 0) {
                list.innerHTML = '<p>No reviews yet. Be the first!</p>';
                return;
            }
            list.innerHTML = '';
            reviews.forEach(function(review) {
                list.innerHTML += '<div class="review-card">' +
                    '<h3>' + review.author + '</h3>' +
                    '<div>' + '⭐'.repeat(review.rating) + '</div>' +
                    '<p>' + review.review_text + '</p>' +
                    '</div>';
            });
        });
}

document.addEventListener('DOMContentLoaded', function() {
    let id = getIdFromURL();

    // Fetch 1 - business details
    fetch('http://localhost:3000/api/businesses/' + id)
        .then(function(response) {
            return response.json();
        })
        .then(function(biz) {
            let detail = document.getElementById('businessDetail');
            detail.innerHTML = '<h1 class="business-name">' + biz.name + '</h1>' +
                '<span class="business-category">' + biz.category + '</span>' +
                '<p class="business-description">' + biz.description + '</p>' +
                (biz.deals ? '<p class="business-deal">🏷️ ' + biz.deals + '</p>' : '') +
                '<div class="business-rating">' +
                '<span class="stars">' + '⭐'.repeat(Math.round(biz.rating)) + '</span>' +
                '<span class="rating-value">' + biz.rating + '</span>' +
                '<span style="opacity:0.6;">(' + biz.num_ratings + ' reviews)</span>' +
                '</div>';
        });


    // Fetch 2 - reviews
    generateCaptcha();
    showReviews(id);
});