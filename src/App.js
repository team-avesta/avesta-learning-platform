import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import CollapsibleMenu from './components/CollapsibleMenu';
import Home from './components/Home';
import MermaidEditor from './components/MermaidEditor';
import CourseArea from './components/CourseArea';

function App() {
  return (
    <Router>
      <div className="App flex flex-col h-screen">
        <Header title="Design Learning Platform" />
        <div className="flex flex-1 overflow-hidden">
          <CollapsibleMenu />
          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/playground" element={<MermaidEditor />} />
              <Route path="/course/:moduleId/:lessonId" element={<CourseArea />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
