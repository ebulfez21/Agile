# Agile Learning Platform

A comprehensive learning platform for Agile methodologies, offering courses, tests, community features, and professional certification paths.

## Features

- **Interactive Courses**: Access both free and premium courses covering various Agile methodologies
- **Certification Tests**: Take practice tests and earn certifications
- **Community Hub**: Connect with other Agile practitioners
- **Discussion Forum**: Engage in discussions about Agile practices
- **Resource Library**: Access articles and learning materials
- **User Dashboard**: Track your progress and manage your learning journey
- **Premium Content**: Access advanced courses and exclusive materials

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Firebase (Authentication & Database)
- Framer Motion (Animations)
- Lucide React (Icons)
- Chart.js (Analytics)
- React Router DOM (Navigation)
- React Markdown (Content Rendering)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/agile-learning-platform.git
```

2. Navigate to the project directory:
```bash
cd agile-learning-platform
```

3. Install dependencies:
```bash
npm install
```

4. Create a `.env` file in the root directory and add your Firebase configuration:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

5. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Project Structure

```
src/
├── components/        # Reusable UI components
├── contexts/         # React context providers
├── hooks/           # Custom React hooks
├── pages/           # Page components
├── services/        # API and service functions
├── types/           # TypeScript type definitions
├── App.tsx          # Main application component
└── main.tsx         # Application entry point
```

## Key Features

### Authentication
- Email/Password sign up and login
- Google authentication
- Protected routes
- User profile management

### Courses
- Free and premium course content
- Progress tracking
- Interactive lessons
- Course completion certificates

### Testing Platform
- Practice tests
- Certification exams
- Score tracking
- Performance analytics

### Community Features
- Discussion forums
- User groups
- Event calendar
- Resource sharing

### Premium Features
- Advanced courses
- Expert-led webinars
- One-on-one mentoring
- Industry networking events

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## Support

For support, email 21ebulfez21@agile.com or join our 

## Acknowledgments

- [Firebase](https://firebase.google.com/) for authentication and database services
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Vite](https://vitejs.dev/) for build tooling
- [React](https://reactjs.org/) for the UI framework
- [TypeScript](https://www.typescriptlang.org/) for type safety
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Lucide React](https://lucide.dev/) for icons