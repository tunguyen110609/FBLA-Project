// Fetches all businesses and displays statistics and data analysis
document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:3000/api/businesses')
        .then(function(response) { return response.json(); })
        .then(function(businesses) {

            // 1. Total businesses
            document.getElementById('totalBusinesses').innerHTML =
                '<h3>Total Businesses: ' + businesses.length + '</h3>';

            // 2. Average rating — YOU write this
            // hint: add up all ratings with forEach, divide by length
            let total = 0;
            businesses.forEach(function(biz) {
                total += biz.rating;
            });
            let average = total / businesses.length;
            document.getElementById('averageRating').innerHTML =
                '<h3>Average Rating: ' + average.toFixed(1) + ' ⭐</h3>';

            // 3. Top 5 highest rated — YOU write this
            // hint: sort by rating, slice first 5
            let top5 = businesses.sort(function(a, b) {
                return b.rating - a.rating;
            }).slice(0, 5);

            document.getElementById('topRated').innerHTML =
                '<h3>Top 5 Rated</h3>' +
                top5.map(function(biz) {
                    return '<p>' + biz.name + ' — ' + biz.rating + ' ⭐</p>';
                }).join('');

            let mostReviewed = businesses.sort(function(a, b) {
                return b.num_ratings - a.num_ratings;
            })[0];

            document.getElementById('mostReviewed').innerHTML =
                '<h3>Most Reviewed</h3>' +
                '<p>' + mostReviewed.name + ' — ' + mostReviewed.num_ratings + ' reviews</p>';


            // Category breakdown
            let categories = {};
            businesses.forEach(function(biz) {
                if (categories[biz.category]) {
                    categories[biz.category]++;
                } else {
                    categories[biz.category] = 1;
                }
            });

            let breakdown = '<h3>Businesses by Category</h3>';
            Object.keys(categories).forEach(function(cat) {
                breakdown += '<p>' + cat + ': ' + categories[cat] + ' businesses</p>';
            });
            document.getElementById('categoryBreakdown').innerHTML = breakdown;
    });

        
});
