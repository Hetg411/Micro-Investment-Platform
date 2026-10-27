# Micro-Investment Platform

MicroVest is a full-stack micro-investment and personal finance application. Users can record expenses, track rounded-up savings, manage financial goals, and monitor a stock portfolio from a React dashboard.

> **Note:** This project is a software demo, not a financial service. Stock quotes come from Yahoo Finance and may be delayed or unavailable. Nothing in the application is investment or financial advice.

## Features

- **Accounts and authentication:** Sign up and sign in; protected API routes use JWT authentication, and passwords are hashed with bcrypt.
- **Dashboard:** View wallet balance, total round-up savings, goals, recent transactions, and request an AI-generated spending analysis.
- **Transactions:** Add, edit, delete, filter, and paginate expense records. Each record includes a category, date, amount, and round-up amount.
- **Round-up savings and growth:** Round-up amounts are added to the user's wallet, and a monthly view summarizes savings by day.
- **Financial goals:** Create, update, and delete savings goals, and review goal progress.
- **Portfolio:** Browse market quotes for a selection of Nifty 50 stocks, invest from the wallet balance, and view holdings and investment history.
- **AI spending analysis:** Generate a summary of the previous month's recorded spending, including category breakdowns and practical suggestions, using Google Gemini.
- **Rate limiting:** API rate limits are applied to general routes, authentication routes, and AI analysis.

## Tech stack

- **Frontend:** React 19, React Router, Axios, Vite
- **Backend:** Node.js, Express 5
- **Database:** MongoDB with Mongoose
- **Authentication:** JSON Web Tokens and bcrypt
- **External data/services:** Yahoo Finance quotes and Google Gemini analysis

## Repository structure

```text
.
├── Backend/
│   ├── app.js                    # Express app, middleware, route mounting, MongoDB connection
│   ├── middleware/               # JWT authentication and rate limiters
│   ├── routes/                   # Authentication, transactions, goals, portfolio, growth, chatbot
│   └── Database/Models/          # Mongoose models for users, wallets, goals, and investments
└── Frontend/
    └── vite-project/
        └── src/
            ├── components/       # Shared layout and feature-specific UI
            ├── pages/            # Dashboard, transactions, goals, portfolio, growth, auth
            └── services/api.js   # Axios client and API authorization header
```

## Prerequisites

- Node.js and npm
- A MongoDB connection string (local MongoDB or a hosted deployment)
- A Google Gemini API key to use AI spending analysis

## Run locally

1. **Configure the backend.** Create `Backend/.env` with:

   ```env
   MongoDB_URL=your_mongodb_connection_string
   SecretKey=replace_with_a_long_random_secret
   Gemini_Key=your_google_gemini_api_key
   ```

   `MongoDB_URL` and `SecretKey` are required for the backend. `Gemini_Key` is needed for the AI analysis endpoint. Keep this file private and do not commit real credentials.

2. **Install backend dependencies and start the API:**

   ```powershell
   cd Backend
   npm install
   node app.js
   ```

   The API listens on `http://localhost:8080`.

3. **Install frontend dependencies and start Vite** in a second terminal:

   ```powershell
   cd Frontend\vite-project
   npm install
   npm run dev
   ```

   Open the local URL printed by Vite (by default, `http://localhost:5173`). The frontend API client is configured for `http://localhost:8080/api`, and the backend allows the default Vite origin `http://localhost:5173`.

## API route groups

Routes are mounted under `/api` unless noted:

| Route | Purpose |
|---|---|
| `/api/authentication` | Sign up and sign in |
| `/api/transactions` | Transaction records, recent transactions, and savings totals |
| `/api/goals` | Financial goal management |
| `/api/portfolio` | Market data, wallet balance, investments, and holdings |
| `/api/growth` | Monthly round-up savings by day |
| `/api/Chatbot` | AI spending analysis |
| `/profile` | Authenticated profile endpoint |

Most data routes require the JWT returned by sign-in in the request's `Authorization` header. The frontend stores this token and sends it with subsequent API requests.

## Available frontend scripts

Run these from `Frontend/vite-project`:

```powershell
npm run dev       # Start the Vite development server
npm run build     # Build the frontend for production
npm run preview   # Preview the production build locally
npm run lint      # Run ESLint
```
