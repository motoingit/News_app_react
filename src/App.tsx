
import './App.css'
import { Component } from 'react'
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

interface AppState {
  progress:number
}

//Todo: when receive then we  write like this
// export default class App extends Component <{}, AppProps> { 
export default class App extends  Component<{}, AppState>{

  state = {
    progress:0 
  }
  
  setStateProgress = (progress:number) =>{
    this.setState({progress})
  }

  render() { 
    return (
      <>
        <Router>
          <Navbar arrCategory={nCategory} />
          <LoadingBar
            height={3}
            color="#f11946"
            progress={this.state.progress}
          />

          <div className="container my-3">
            <Routes>

              <Route
                path="/" 
                element={
                  <NewsPage
                    setStateProgress={this.setStateProgress}
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
                    setStateProgress={this.setStateProgress}
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
                    setStateProgress={this.setStateProgress}
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
  }
}