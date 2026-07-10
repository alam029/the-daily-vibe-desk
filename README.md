# The Daily Vibe Desk

A modern, full-stack news platform that brings together trending stories, AI-powered summaries, and a personalized reading experience. Built with React on the frontend and Node.js/Express on the backend, this project delivers a clean interface for discovering and saving news content.

##  Features

- Browse the latest news across categories
- Search articles quickly and efficiently
- View detailed article content with a polished reading experience
- Save and manage your personal summaries
- Responsive UI designed for desktop and mobile devices

##  Tech Stack

### Frontend
- React
- Vite
- React Router DOM
- Axios

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose

##  Project Structure

```bash
backend/
  src/
    controllers/
    middleware/
    models/
    routes/
frontend/
  src/
    components/
    pages/
    context/
    api/
```

##  Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB instance

### 1. Clone the repository

```bash
git clone https://github.com/alam029/the-daily-vibe-desk.git
cd "the-daily-vibe-desk"
```

### 2. Install dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd ../frontend
npm install
```

### 3. Environment Variables

Create a `.env` file in the backend folder and add the following:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_ORIGIN=http://localhost:5173
```

### 4. Run the application

#### Start the backend
```bash
cd backend
npm run dev
```

#### Start the frontend
```bash
cd frontend
npm run dev
```

The frontend will typically run at `http://localhost:5173` and the backend at `http://localhost:5000`.

## Authentication

The application supports user registration and login, allowing users to access personalized features such as saved summaries and account-based interactions.

## Notes

This project is designed as a modern news dashboard with room for future enhancements such as real-time updates, personalized recommendations, and richer AI summarization features.

## Contributing

Contributions are welcome. Feel free to fork the repository, create a feature branch, and submit a pull request.

## License

This project is open-source and available under the MIT License.
