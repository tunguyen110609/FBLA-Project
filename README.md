# Fall Local Boost

## What This Project Does
Fall Local Boost is a local business directory web app that helps users 
discover and support small businesses in their community.

## Features
- Browse 35 local businesses with ratings, descriptions, and deals
- Search businesses by name
- Filter by category (Food, Store, Service, Retail, Florist, Arcade)
- Sort by highest rated, most reviewed, or alphabetical
- View detailed business pages with reviews
- Leave reviews with star ratings (math CAPTCHA prevents bot submissions)
- Save favorite businesses using bookmarks
- View business statistics and data analysis

## How To Run
1. Install Node.js
2. Run: npm install
3. Run: npm start
4. Open: http://localhost:3000

## Technologies Used
- HTML, CSS, JavaScript (Frontend)
- Node.js + Express (Backend server)
- SQLite + better-sqlite3 (Database)

## Files
- FrontEnd/Index.html — Main business directory page
- FrontEnd/business.html — Individual business detail page
- FrontEnd/favorites.html — Saved businesses page
- FrontEnd/stats.html — Business statistics page
- BackEnd/app.js — Express server
- BackEnd/database.js — SQLite database setup

## Libraries and Dependencies
- express: Web server framework for Node.js
- cors: Allows frontend to communicate with backend
- better-sqlite3: SQLite database driver

## Open Source / Third Party
- Express.js — MIT License (https://expressjs.com)
- better-sqlite3 — MIT License (https://github.com/WiseLibs/better-sqlite3)

## Data Sources
- Business data created specifically for this project
- 35 local businesses from Menomonee Falls, WI area

## Language Selection Rationale
We chose JavaScript for both frontend and backend because it allows
a consistent language across the full stack. Node.js runs JavaScript
on the server side. Express is an industry-standard lightweight web
framework for building RESTful APIs. SQLite was chosen as our 
relational database because it stores structured data persistently
without requiring a separate database server, making it ideal for
a standalone application.

## Bot Prevention
The review form uses a math CAPTCHA — a randomly generated addition
problem that must be answered correctly before a review can be
submitted. This prevents automated bot submissions.