# InterviewPrep Frontend

A modern React application for creating and managing personalized interview preparation sessions with AI-generated questions.

## Features

- **Landing Page**: Welcome page for non-logged-in users with navigation to login/register
- **Authentication**: Secure login and registration with JWT tokens
- **Dashboard**: View all interview sessions in a card-based layout
- **Session Management**: Create, view, and delete interview sessions
- **AI-Powered Questions**: Generate personalized questions based on role and experience
- **Responsive Design**: Modern UI that works on all devices
- **Protected Routes**: Automatic redirection for authenticated/unauthenticated users

## Tech Stack

- **React 19** - Modern React with hooks
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **Lucide React** - Beautiful icons
- **Vite** - Fast build tool

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend server running on `http://localhost:5000`

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   └── SessionCard.jsx          # Card component for displaying sessions
├── pages/
│   ├── LandingPage.jsx          # Welcome page for non-logged users
│   ├── LoginPage.jsx            # User login form
│   ├── RegisterPage.jsx         # User registration form
│   ├── Dashboard.jsx            # Main dashboard with session cards
│   ├── CreateSession.jsx        # Form to create new sessions
│   └── ViewSession.jsx          # View session details and questions
├── App.jsx                      # Main app component with routing and auth
├── main.jsx                     # App entry point
└── index.css                    # Global styles and Tailwind imports
```

## API Integration

The frontend integrates with the backend API endpoints:

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/check` - Verify authentication status
- `GET /api/session/sessions` - Get all user sessions
- `POST /api/session/create` - Create new session
- `GET /api/session/:id` - Get specific session
- `DELETE /api/session/:id` - Delete session

## Authentication Flow

1. **Registration**: Users can create accounts with email and password
2. **Login**: Users authenticate with their credentials
3. **Token Storage**: JWT tokens are stored in localStorage
4. **Protected Routes**: Automatic redirection based on auth status
5. **Logout**: Clear tokens and redirect to landing page

## Key Features

### Session Cards
- Display job title, experience level, and question count
- View and delete actions
- Responsive grid layout

### Question Accordion
- Expandable/collapsible question display
- Sample answers for each question
- Expand all/collapse all functionality

### Form Validation
- Client-side validation for all forms
- Error handling and user feedback
- Loading states during API calls

### Responsive Design
- Mobile-first approach
- Responsive grid layouts
- Touch-friendly interactions

## Environment Variables

The application expects the backend to be running on `http://localhost:5000`. If your backend runs on a different port, update the `axios.defaults.baseURL` in `App.jsx`.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of the InterviewPrep application.
