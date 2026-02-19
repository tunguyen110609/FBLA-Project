// ===================================
// BUSINESS ROUTES
// Handles all /api/businesses requests
// ===================================

const express = require('express');
const router  = express.Router();
const db      = require('../database');

// ── GET all businesses ──────────────────────────────────────────────────
// Example: /api/businesses
// Example: /api/businesses?category=Food
// Example: /api/businesses?sort=rating-high
// Example: /api/businesses?search=cafe
router.get('/', (req, res) => {
    const { category, sort, search } = req.query;

    let query  = 'SELECT * FROM businesses WHERE 1=1';
    const params = [];

    // Filter by category
    if (category && category !== 'all') {
        query += ' AND category = ?';
        params.push(category);
    }

    // Search by name or description
    if (search) {
        query += ' AND (name LIKE ? OR description LIKE ?)';
        params.push(`%${search}%`, `%${search}%`);
    }

    // Sort options
    if (sort === 'rating-high')  query += ' ORDER BY rating DESC';
    else if (sort === 'rating-low')   query += ' ORDER BY rating ASC';
    else if (sort === 'most-reviews') query += ' ORDER BY rating_count DESC';
    else if (sort === 'name')         query += ' ORDER BY name ASC';
    else                              query += ' ORDER BY id ASC';

    try {
        const businesses = db.prepare(query).all(...params);
        res.json(businesses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ── GET one business by ID ──────────────────────────────────────────────
// Example: /api/businesses/1
router.get('/:id', (req, res) => {
    try {
        const business = db
            .prepare('SELECT * FROM businesses WHERE id = ?')
            .get(req.params.id);

        if (!business) {
            return res.status(404).json({ error: 'Business not found' });
        }

        res.json(business);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;