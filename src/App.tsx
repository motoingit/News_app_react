
import './App.css'
import { Component, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import NewsPage from './components/NewsPage'
import Navbar from './components/Navbar';
import LoadingBar from "react-top-loading-bar";

const nCategory = [
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
]

const apiKey = import.meta.env.VITE_NEWS_API_KEY;

const App = ()=>{

  const [progress, setProgress] = useState(10);

    return (
      <>
        <Router>
          <Navbar arrCategory={nCategory} />
          <LoadingBar
            height={3}
            color="#f11946"
            progress={progress}
          />

          <div className="container my-3">
            <Routes>

              <Route
                path="/" 
                element={
                  <NewsPage
                    setStateProgress={setProgress}
                    key="general"
                    pageSize={10}
                    country="us"
                    category="general"
                    apiKey={apiKey}
                  />
                }
              ></Route>

              <Route
                path="/business" 
                element={
                  <NewsPage
                    setStateProgress={setProgress}
                    key="business"
                    pageSize={10}
                    country="us"
                    category="business"
                    apiKey={apiKey}
                  />
                }
              ></Route>

              <Route
                path="/sports" 
                element={
                  <NewsPage
                    setStateProgress={setProgress}
                    key="sports"
                    pageSize={10}
                    country="us"
                    category="sports"
                    apiKey={apiKey}
                  />
                }
              ></Route>

            </Routes>
          </div>

        </Router>
      </>
    );

  interface App {
    progress:number
  }
}

export default App;