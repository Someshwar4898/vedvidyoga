import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Blog from './pages/Blog'
import CategoryPage from './pages/CategoryPage'
import PostPage from './pages/PostPage'
import About from './pages/About'
import Contact from './pages/Contact'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Footer from './components/Footer'
import ThemeToggle from './components/ThemeToggle'

function App() {
  return(
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/:category" element={<CategoryPage />} />
        <Route path="/:category/:subcategory" element={<CategoryPage />} />
        <Route path="/:category/:subcategory/:slug" element={<PostPage />} />
      </Routes>
      <Footer />
      <ThemeToggle />
    </BrowserRouter>
  )
}

export default App