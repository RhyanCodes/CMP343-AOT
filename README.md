# Attack on Titan – Episode Reviews

A full-stack web app for rating every episode of Attack on Titan.

**Tech Stack:** React (Vite) · Express · PostgreSQL

## Setup

1. **Install dependencies**
   ```bash
   npm run install:all
   ```

2. **Configure database**
   - Create a PostgreSQL database (local or hosted, e.g. Supabase / Neon)
   - Copy `.env.example` to `.env` and fill in your `DATABASE_URL`

3. **Seed the database**
   ```bash
   npm run seed
   ```

4. **Run the app**
   ```bash
   # Terminal 1 – API server
   npm run dev:server

   # Terminal 2 – React frontend
   npm run dev:client
   ```

   Frontend: `http://localhost:5173` | API: `http://localhost:5000`

## Project Structure

```
├── client/          # React + Vite frontend
│   └── src/
│       ├── App.jsx          # Main app with navigation state
│       ├── IntroScreen.jsx  # Titan peek-over-wall animation
│       ├── SeasonCard.jsx   # Season selection cards
│       ├── EpisodeList.jsx  # Episode listing per season
│       ├── ReviewPanel.jsx  # Reviews for a single episode
│       ├── ReviewForm.jsx   # Create review form
│       ├── ReviewCard.jsx   # Single review with edit/delete
│       ├── StarRating.jsx   # Interactive star rating
│       └── api.js           # API helper functions
├── server/          # Express API
│   ├── index.js     # Routes & server
│   ├── db.js        # PostgreSQL pool
│   └── seed.js      # Seed episodes into DB
├── .env             # Database credentials (git-ignored)
├── .env.example     # Template for .env
├── .gitignore
└── vercel.json      # Vercel deployment config
```
