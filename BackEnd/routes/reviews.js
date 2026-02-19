// ===================================
// REVIEWS ROUTES
// Handles all /api/reviews requests
// ===================================

const express = require('express');
const router  = express.Router();
const db      = require('../database');

// ── GET all reviews for a business ─────────────────────────────────────
// Example: /api/reviews/1
router.get('/:businessId', (req, res) => {
    try {
        const reviews = db
            .prepare('SELECT * FROM reviews WHERE business_id = ? ORDER BY date DESC')
            .all(req.params.businessId);

        res.json(reviews);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ── POST add a new review ───────────────────────────────────────────────
// Example: POST /api/reviews
// Body: { business_id, author, rating, title, review_text }
router.post('/', (req, res) => {
    const { business_id, author, rating, title, review_text } = req.body;

    // Validation
    if (!business_id || !author || !rating || !review_text) {
        return res.status(400).json({ 
            error: 'Missing required fields' 
        });
    }

    if (rating < 1 || rating > 5) {
        return res.status(400).json({ 
            error: 'Rating must be between 1 and 5' 
        });
    }

    try {
        const today = new Date().toISOString().split('T')[0];

        db.prepare(`
            INSERT INTO reviews (business_id, author, rating, title, review_text, date)
            VALUES (?, ?, ?, ?, ?, ?)
        `).run(business_id, author, rating, title || '', review_text, today);

        // Update business average rating
        const stats = db.prepare(`
            SELECT 
                ROUND(AVG(rating), 1) as avg_rating,
                COUNT(*) as total_reviews
            FROM reviews 
            WHERE business_id = ?
        `).get(business_id);

        db.prepare(`
            UPDATE businesses 
            SET rating = ?, rating_count = ?
            WHERE id = ?
        `).run(stats.avg_rating, stats.total_reviews, business_id);

        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;