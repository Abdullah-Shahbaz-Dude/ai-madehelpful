import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Learn from './pages/Learn'
import TutorialDetail from './pages/TutorialDetail'
import Prompts from './pages/Prompts'
import Tools from './pages/Tools'
import Resources from './pages/Resources'
import Courses from './pages/Courses'
import Videos from './pages/Videos'
import Contact from './pages/Contact'

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/learn"
          element={
            <Layout>
              <Learn />
            </Layout>
          }
        />
        <Route
          path="/learn/:slug"
          element={
            <Layout>
              <TutorialDetail />
            </Layout>
          }
        />
        <Route
          path="/prompts"
          element={
            <Layout>
              <Prompts />
            </Layout>
          }
        />
        <Route
          path="/tools"
          element={
            <Layout>
              <Tools />
            </Layout>
          }
        />
        <Route
          path="/resources"
          element={
            <Layout>
              <Resources />
            </Layout>
          }
        />
        <Route
          path="/courses"
          element={
            <Layout>
              <Courses />
            </Layout>
          }
        />
        <Route
          path="/videos"
          element={
            <Layout>
              <Videos />
            </Layout>
          }
        />
        <Route
          path="/contact"
          element={
            <Layout>
              <Contact />
            </Layout>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
