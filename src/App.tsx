import './App.css'
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NewsPage from './components/NewsPage'
import Navbar from './components/Navbar'
import LoadingBar from "react-top-loading-bar"

const CATEGORIES = [
  "general",
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
]

const DEFAULT_PAGE_SIZE = 12
const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY
const COUNTRY = "us"

const App = () => {
  const [progress, setProgress] = useState(0)

  return (
    <Router>
      <Navbar categories={CATEGORIES} />

      <LoadingBar
        height={3}
        color="#0d6efd"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />

      <div className="container-fluid px-4">
        <Routes>
          {/* Default Route */}
          <Route
            path="/"
            element={
              <NewsPage
                key="general"
                setProgress={setProgress}
                pageSize={DEFAULT_PAGE_SIZE}
                country={COUNTRY}
                category="general"
                apiKey={NEWS_API_KEY}
              />
            }
          />

          {/* Dynamic Category Routes */}
          {CATEGORIES
            .filter(category => category !== "general")
            .map((category) => (
              <Route
                key={category}
                path={`/${category}`}
                element={
                  <NewsPage
                    key={category}
                    setProgress={setProgress}
                    pageSize={DEFAULT_PAGE_SIZE}
                    country={COUNTRY}
                    category={category}
                    apiKey={NEWS_API_KEY}
                  />
                }
              />
            ))}
        </Routes>
      </div>
    </Router>
  )
}

export default App
