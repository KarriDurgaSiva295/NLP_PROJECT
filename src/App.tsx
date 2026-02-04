import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LinguistApp from './components/LinguistApp'
import Documentation from './components/Documentation'
import ApiReference from './components/ApiReference'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LinguistApp />} />
        <Route path="/documentation" element={<Documentation />} />
        <Route path="/api-reference" element={<ApiReference />} />
      </Routes>
    </Router>
  )
}

export default App
