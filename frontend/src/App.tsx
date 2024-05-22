import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ExpensePage from './pages/ExpensePage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/expenses" element={<ExpensePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
