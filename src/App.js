import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import MermaidEditor from './components/MermaidEditor';
import CourseArea from './components/CourseArea';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MermaidEditor />} />
          <Route path="/home" element={<Home />} />
          <Route path="/playground" element={<MermaidEditor />} />
          <Route path="/course/:moduleId/:lessonId" element={<CourseArea />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
