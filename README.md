# 🍳 Recigest

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15.0-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)

![Recigest Screenshot](https://via.placeholder.com/800x400?text=Recigest+App+Screenshot) <!-- Replace with actual screenshot -->

A cutting-edge recipe discovery and generation platform powered by AI. Discover, create, and share delicious recipes with intelligent suggestions tailored to your preferences. Built with modern web technologies for a seamless user experience.

## ✨ Features

- 🤖 **AI-Powered Recipe Generation**: Generate personalized recipes using Google Generative AI and OpenAI
- 🔐 **User Authentication**: Secure sign-in and sign-up with JWT tokens
- 📱 **Responsive Design**: Beautiful, mobile-first UI with Tailwind CSS
- ⚡ **Fast Performance**: Optimized with Next.js 15 App Router and server-side rendering
- 🗄️ **Database Integration**: MongoDB with Mongoose for robust data management
- 🔍 **Smart Search**: Find recipes by ingredients, cuisine, or dietary preferences
- 💾 **Recipe Management**: Save favorites and create meal plans
- 🌐 **SEO Optimized**: Server-side rendering for better search engine visibility

## 🛠️ Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework
- **Lucide React** - Beautiful icons

### Backend

- **Next.js API Routes** - Serverless API endpoints
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **jose** - JWT utilities

### AI & Integrations

- **Google Generative AI** - AI-powered content generation
- **OpenAI** - Advanced language models
- **Axios** - HTTP client for API calls

### Development Tools

- **ESLint** - Code linting
- **TypeScript** - Type checking
- **Tailwind CSS** - Styling

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (>= 18.0.0)
- **npm** or **yarn**
- **MongoDB** (local or cloud instance like MongoDB Atlas)

## 🚀 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/AbhayMishra1371/recigest.git
   cd recigest
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory and add the following:

   ```env
   MONGODB_URI=mongodb://localhost:27017/recigest
   # Or for MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/recigest

   JWT_SECRET=your_super_secret_jwt_key_here
   GOOGLE_AI_API_KEY=your_google_generative_ai_api_key
   OPENAI_API_KEY=your_openai_api_key
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📖 Usage

### For Users

1. **Sign Up**: Create an account to access personalized features
2. **Explore Recipes**: Browse featured recipes or search by ingredients
3. **Generate Recipes**: Use AI to create custom recipes based on your preferences
4. **Save Favorites**: Keep track of your favorite recipes
5. **Meal Planning**: Organize recipes into meal plans

### For Developers

- **Development**: `npm run dev` - Start development server
- **Build**: `npm run build` - Build for production
- **Start**: `npm run start` - Start production server
- **Lint**: `npm run lint` - Run ESLint

## 📡 API Documentation

### Authentication Endpoints

#### POST `/api/auth/signin`

Authenticate user login.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "token": "jwt_token_here"
}
```

#### POST `/api/auth/signup`

Register a new user.

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "name": "John Doe",
    "email": "user@example.com"
  }
}
```

### Recipe Endpoints

#### POST `/api/recipe/generate`

Generate a new recipe using AI.

**Request Body:**

```json
{
  "ingredients": ["chicken", "rice", "vegetables"],
  "cuisine": "Italian",
  "dietaryRestrictions": ["gluten-free"]
}
```

**Response:**

```json
{
  "success": true,
  "recipe": {
    "title": "Chicken Risotto",
    "ingredients": [...],
    "instructions": [...],
    "nutrition": {...}
  }
}
```

#### GET `/api/users`

Get all users (admin endpoint).

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "name": "John Doe",
      "email": "user@example.com"
    }
  ]
}
```

## 🗂️ Project Structure

```
recigest/
├── public/                 # Static assets (images, icons)
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── api/            # API routes
│   │   │   ├── auth/       # Authentication endpoints
│   │   │   ├── recipe/     # Recipe-related endpoints
│   │   │   └── users/      # User management
│   │   ├── components/     # Reusable UI components
│   │   ├── lib/            # Utility functions
│   │   ├── middleware/     # Next.js middleware
│   │   ├── models/         # Database models
│   │   └── page.tsx        # Main page
│   ├── components/         # Shared components
│   │   └── ui/             # UI component library
│   └── lib/                # Core utilities
├── .env.local              # Environment variables (not committed)
├── package.json
├── next.config.ts
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework for production
- [React](https://react.dev/) - A JavaScript library for building user interfaces
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [MongoDB](https://www.mongodb.com/) - NoSQL database
- [Google Generative AI](https://ai.google.dev/) - AI-powered content generation
- [OpenAI](https://openai.com/) - Advanced AI models
- [Vercel](https://vercel.com/) - Deployment platform

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact the maintainers.

---

Made with ❤️ by the Recigest team
