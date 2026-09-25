# RentReview — Frontend

RentReview lets renters search for rental properties and read or leave reviews about them. This repo is the React frontend. It talks to a separate RentReview backend API.

> **Note:** the backend isn't hosted at the moment. To use the app, run the backend locally and point `VITE_API_URL` at it (see [Environment variables](#environment-variables)).

## Features

- **Property search:** search properties by keyword from the home page.
- **Property details:** view a property's address, city, and all its reviews.
- **Reviews:** signed-in users can leave a 1–5 star rating with a comment, and delete reviews.
- **Add properties:** signed-in users can add a new property (address and city).
- **Accounts:** sign up, sign in, and sign out, using JWT authentication.
- **Email verification:** new accounts get a verification link that opens `/verify-email/:userId`.
- **Protected routes:** the add-property and add-review pages redirect to sign-in if you aren't signed in.
- Loading spinners and a friendly 404/error page.

## Tech stack

- [React 18](https://react.dev/) + [Vite 6](https://vite.dev/)
- [React Router 7](https://reactrouter.com/)
- [Tailwind CSS 4](https://tailwindcss.com/) (via `@tailwindcss/vite`)
- [react-spinners](https://www.davidhu.io/react-spinners/)
- ESLint + Prettier (with `prettier-plugin-tailwindcss`)
- Deployed on [Vercel](https://vercel.com/)

## Getting started

### Prerequisites

- Node.js 18+ and npm
- A running instance of the RentReview backend API

### Installation

```bash
git clone https://github.com/mcelroa/rent-review-frontend.git
cd rent-review-frontend
npm install
```

### Environment variables

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:5000
```

| Variable       | Description                                              |
| -------------- | -------------------------------------------------------- |
| `VITE_API_URL` | Base URL of the backend API. All requests are sent here. |

Set the URL to wherever your backend is running. Because of the `VITE_` prefix, Vite exposes this value to the browser bundle, so it must not contain secrets.

### Running locally

```bash
npm run dev
```

The app runs at `http://localhost:5173` by default.

## Scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start the Vite dev server with HMR       |
| `npm run build`   | Build for production into `dist/`        |
| `npm run preview` | Serve the production build locally       |
| `npm run lint`    | Run ESLint                               |

## Routes

| Path                       | Page                 | Auth required |
| -------------------------- | -------------------- | ------------- |
| `/`                        | Home / search        | No            |
| `/signup`                  | Sign up              | No            |
| `/signin`                  | Sign in              | No            |
| `/property/:propertyId`    | Property details     | No            |
| `/verify-email/:userId`    | Email verification   | No            |
| `/add/property`            | Add a property       | Yes           |
| `/add/review/:propertyId`  | Add a review         | Yes           |
| `*`                        | Error / not found    | No            |

## Project structure

```
src/
├── main.jsx              # Entry point
├── Routes.jsx            # Route definitions
├── App.jsx               # Home page (property search)
├── config.js             # API base URL from env
├── components/           # Navbar, cards, search bar, spinner, PrivateRoute, loading context
├── pages/
│   ├── core/             # Property, review, email verification, and error pages
│   └── user/             # Sign in / sign up
└── services/
    ├── auth/requests.js  # signup, signin, signout, JWT helpers
    └── core/             # properties and reviews API calls
```

## Backend API

The frontend expects the backend to expose these endpoints (relative to `VITE_API_URL`):

| Method | Endpoint                        | Purpose                     |
| ------ | ------------------------------- | --------------------------- |
| POST   | `/signup`                       | Create an account           |
| POST   | `/signin`                       | Sign in, returns a JWT      |
| GET    | `/signout`                      | Sign out                    |
| GET    | `/verify-email/:userId`         | Verify a user's email       |
| GET    | `/properties?search=<query>`    | Search properties           |
| GET    | `/property/:propertyId`         | Get a single property       |
| POST   | `/property/:userId`             | Create a property (auth)    |
| GET    | `/reviews/:propertyId`          | Get a property's reviews    |
| POST   | `/review/:userId`               | Create a review (auth)      |
| DELETE | `/review/:reviewId/:userId`     | Delete a review (auth)      |

Authenticated requests send the token as `Authorization: Bearer <token>`. After sign-in, the JWT and user data are stored in `localStorage` under the `jwt` key.

## Deployment

The app is set up for Vercel. `vercel.json` rewrites every path to `index.html`, so client-side routes such as email verification links still work when opened directly. Set `VITE_API_URL` in your Vercel project's environment variables before you build.
