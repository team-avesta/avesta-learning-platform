import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import MermaidEditor from './components/MermaidEditor';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MermaidEditor />} />
          <Route path="/home" element={<Home />} />
          <Route path="/playground" element={<MermaidEditor />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
