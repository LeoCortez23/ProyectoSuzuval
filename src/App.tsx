
import './App.css'
import Login from './components/auth/login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Document from './components/documents/document';
function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/document" element={<Document />} />
      </Routes>
    </Router>
  )
}

export default App
