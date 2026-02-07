import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import LandingPage from './pages/LandingPage';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import TextAnalysis from './pages/TextAnalysis';
import EmpathyMirror from './pages/EmpathyMirror';
import DeEscalator from './pages/DeEscalator';
import ImageAnalysis from './pages/ImageAnalysis';
import ClickOrCap from './pages/ClickOrCap';
import HateWeatherReport from './pages/HateWeatherReport';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="play" element={<ClickOrCap />} />
          <Route path="analyze" element={<TextAnalysis />} />
          <Route path="empathy" element={<EmpathyMirror />} />
          <Route path="de-escalate" element={<DeEscalator />} />
          <Route path="image-analysis" element={<ImageAnalysis />} />
          <Route path="hate-weather" element={<HateWeatherReport />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
