Game_Library_Manager

Manage and view your vast collection of video games from various launchers like Steam, GOG, Epic Games Store, and more, all in one centralized and organized web application!

This project provides a clean, responsive interface to manually add, edit, and delete your games, complete with details like launcher, release year, genre, and an optional image.

✨ Features
Centralized Game Management: Keep track of all your games from different platforms in one place.

Manual Game Entry: Easily add new games, update their details, or remove them from your collection.

Launcher Categorization: Assign a specific launcher to each game for easy filtering.

Search Functionality: Quickly find games by name, launcher, or genre.

Responsive Design: Optimized for seamless viewing and interaction across desktops, tablets, and mobile devices.

Data Persistence: Your game data is securely stored using Supabase, ensuring your library is always saved.

User Authentication: Utilizes anonymous sign-in for individual user data separation.

🚀 Technologies Used
TypeScript: The primary language for building the React user interface (88.1%).

React: A JavaScript library for building user interfaces.

Tailwind CSS: A utility-first CSS framework for rapidly building custom designs (9.5% CSS).

JavaScript: Used alongside TypeScript for various functionalities (1.5%).

HTML: The foundational markup language for the web application (0.9%).

Supabase:

Supabase PostgreSQL Database: A powerful relational database for storing game data.

Supabase Auth: For handling user authentication and providing unique user IDs for data separation.

Supabase Realtime: For real-time updates to your game list.

⚙️ Setup and Installation (For Local Development)
To run this project locally, follow these steps:

Clone the repository:

Bash

git clone https://github.com/JDKamalakar/Game_Library_Manager
cd Game_Library_Manager
Install dependencies:

Bash

npm install
# or
yarn install

Set up Supabase:
This application uses Supabase for its backend. For local development, you need to:

Run the development server:

Bash

npm start
# or
yarn start

This will open the application in your browser, usually at http://localhost:3000.

🖥️ Usage
Add New Game: Click the "Add New Game" button to reveal the form. Fill in the game details (Game Name and Launcher are required) and click "Add Game".

View Games: Your added games will appear in a grid format below the form.

Filter and Search: Use the "Filter by Launcher" dropdown to show games from a specific launcher, or type in the "Search games..." bar to find games by name, launcher, or genre.

Edit Game: Click the "Edit" button on any game card to pre-fill the form with its details, make changes, and click "Update Game".

Delete Game: Click the "Delete" button on a game card. A confirmation modal will appear to prevent accidental deletions.

💡 Future Enhancements
We are always looking to improve! Here are some features planned or being considered for future development:

Automated Library Sync: Integrate with popular game launcher APIs (e.g., Steam, Epic Games Store, GOG) to automatically sync your game library, eliminating the need for manual entry.

Game Details Enrichment: Automatically fetch game covers, descriptions, and metadata from public APIs based on game name.

Launcher Integration: Directly launch games from the web application.

User Accounts & Sharing: Implement full user registration, login, and potentially the ability to share game lists.
