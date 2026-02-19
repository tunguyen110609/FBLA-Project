// ===================================
// FALL LOCAL BOOST - MAIN SERVER
// Run with: npm start
// Then open: http://localhost:3000
// ===================================

const express = require("express");
const cors    = require("cors");
const path    = require("path");

// Import your route files
const businessRoutes = require("./routes/businesses");
const reviewRoutes   = require("./routes/reviews");

const app  = express();
const PORT = 3000;

// ===================================
// MIDDLEWARE
// ===================================
app.use(cors());          
app.use(express.json());  

// Serve your FrontEnd folder (HTML, CSS, JS, images)
app.use(express.static(
    path.join(__dirname, "../FrontEnd")
));

// ===================================
// API ROUTES
// ===================================
app.use("/api/businesses", businessRoutes);
app.use("/api/reviews",    reviewRoutes);

// Test route - check server is working
app.get("/api/health", (req, res) => {
    res.json({ status: "Server is running!" });
});

// ===================================
// START SERVER
// ===================================
app.listen(PORT, () => {
    console.log("");
    console.log("🍂 Fall Local Boost is running!");
    console.log(`   Visit: http://localhost:${PORT}`);
    console.log("");
    console.log("   API routes ready:");
    console.log(`   → http://localhost:${PORT}/api/businesses`);
    console.log(`   → http://localhost:${PORT}/api/businesses?category=Food`);
    console.log(`   → http://localhost:${PORT}/api/businesses?sort=rating-high`);
    console.log(`   → http://localhost:${PORT}/api/reviews/1`);
    console.log("");
});