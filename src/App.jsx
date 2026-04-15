import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Blog from './pages/Blog'
import CategoryPage from './pages/CategoryPage'
import PostPage from './pages/PostPage'
import About from './pages/About'
import Contact from './pages/Contact'
import PrivacyPolicy from './pages/PrivacyPolicy'
import MedicalDisclaimer from './pages/MedicalDisclaimer'
import CaseStudies from './pages/CaseStudies'
import CaseStudyDetail from './pages/CaseStudyDetail'
import TermsAndConditions from './pages/TermsAndConditions'
import Footer from './components/Footer'
import ThemeToggle from './components/ThemeToggle'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return(
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/medical-disclaimer" element={<MedicalDisclaimer />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/post/:slug" element={<PostPage />} />
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