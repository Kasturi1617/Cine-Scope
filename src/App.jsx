import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './css/App.css'
import MovieCard from './components/MovieCard'
import Home from "./pages/Home"
import MovieDetailsPage from "./pages/MovieDetailsPage"
import { Routes, Route } from "react-router-dom"
import Favorite from './pages/Favorites'
import NavBar from './components/NavBar'
import { MovieProvider } from "./contexts/MovieContext"
import MovieDetail from "./components/MovieDetail";
import SearchPage from './pages/SearchPage'

function App() {
  return (
    <MovieProvider>
      <div>
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorite />} />
            <Route path="/movie/:id" element={<MovieDetailsPage />} />
            <Route path="/search/:query" element={<SearchPage />}/>
          </Routes>
        </main>
      </div>
    </MovieProvider>

  )
}

export default App;
