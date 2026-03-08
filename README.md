# 🐒 NewsMonkey - Your Daily Dose of News

NewsMonkey is a modern, responsive web application that fetches the latest news from around the world using the NewsAPI. It's built with React, TypeScript, and Bootstrap to provide a premium user experience with smooth infinite scrolling and category-based navigation.

![NewsMonkey Screenshot](https://via.placeholder.com/800x450?text=NewsMonkey+Project+Preview)

## ✨ Features

- **Infinite Scrolling**: Automatically load more news as you scroll down.
- **Category Navigation**: Explore news in Business, Entertainment, Health, Science, Sports, and Technology.
- **Top Headlines**: Get the most important stories first.
- **Responsive Design**: Optimized for mobile, tablet, and desktop views using modern Bootstrap 5 utilities.
- **Top Loading Bar**: Visual progress indicator for API fetches.
- **Premium UI**: Clean cards with hover effects, shadow utilities, and modern typography.

## 🚀 Tech Stack

- **React**: Frontend library for building the UI.
- **TypeScript**: Ensuring type safety and better developer experience.
- **Bootstrap 5**: Responsive styling and UI components.
- **React Router**: Seamless navigation between categories.
- **React Top Loading Bar**: Sleek progress bar at the top of the page.

## 🛠️ Setup and Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd NewsMonkey_1
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   Create a `.env` file in the root directory and add your NewsAPI key:
   ```env
   VITE_NEWS_API_KEY=your_api_key_here
   VITE_NEWS_API_URL=https://newsapi.org/v2/top-headlines?
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

## 📈 Scalability Improvements

- **TypeScript Migration**: Removed all `any` types and implemented proper interfaces for props, states, and API responses.
- **Component Optimization**: Refactored functional components with hooks like `useCallback` for optimized re-renders.
- **Refined Bootstrap**: Used advanced Bootstrap utilities for layout, spacing, and shadows to eliminate bulkier custom CSS.
- **Clean Code**: Standardized naming conventions (e.g., constants in SCREAMING_SNAKE_CASE) and removed redundant logic.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
