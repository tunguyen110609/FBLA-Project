# Fall Local Boost

## What This Project Does
Fall Local Boost is a local business directory web application designed to help users discover and support small businesses in their community. The project organizes local businesses into an easy-to-use platform where users can search, filter, sort, review, and save their favorite businesses.

## Project Purpose
The goal of this project is to make it easier for people to find local businesses in one place. Instead of searching across multiple websites or social media pages, users can browse businesses by category, view ratings and reviews, and compare options quickly.

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
1. Install Node.js-version v20.20.2(LTS)
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

## Why These Technologies Were Chosen
JavaScript was chosen for both the frontend and backend to keep the project consistent across the full stack. Node.js allows JavaScript to run on the server, while Express provides a lightweight framework for building the backend. SQLite was selected because it stores structured data locally without requiring a separate database server, making it a good choice for a standalone application.

## Libraries and Dependencies
- express: Web server framework for Node.js
- cors: Allows frontend to communicate with backend
- better-sqlite3: SQLite database driver

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
The review form includes a math CAPTCHA. A randomly generated addition problem must be answered correctly before a review can be submitted. This helps prevent automated bot submissions.

## Current Status
The website is currently running locally on my laptop during development. It is not yet public, but it is fully functional as a local demo.

## Future Improvements
- Add more businesses by expanding to additional zip codes.
- Support more cities and regions.
- Add images for businesses.
- Add map integration for location browsing.
- Improve review moderation and user accounts.
- Add more analytics and insights for users.

## Credits & Inspiration
- Basic Express + SQLite REST API structure: https://github.com/deatiger/basic-rest-api
- Express.js documentation: https://expressjs.com
- SQLite3 Node.js guide: https://github.com/mapbox/node-sqlite3

## Open Source / Third Party
- Express.js — MIT License (https://expressjs.com)
- better-sqlite3 — MIT License (https://github.com/WiseLibs/better-sqlite3)

## Summary
Fall Local Boost is a practical local business discovery platform built to help users find and support nearby businesses. It focuses on usability, useful features, and a clean experience while leaving room for future expansion.
