import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '../components/layout/LandingPage';
import TemplateSelectionOverlay from '../components/layout/TemplateSelectionOverlay';
import EditorView from './EditorView';
import AIAssistantView from './AIAssistantView';
import SavedCVsView from './SavedCVsView';
import ToastContainer from '../components/ui/ToastContainer';

function App() {
  return (
    <>
       <ToastContainer />
       <Routes>
         <Route path="/" element={<LandingPage />} />
         <Route path="/templates" element={<TemplateSelectionOverlay />} />
         <Route path="/editor" element={<EditorView />} />
         <Route path="/ai-assistant" element={<AIAssistantView />} />
         <Route path="/saved" element={<SavedCVsView />} />
         <Route path="*" element={<Navigate to="/" replace />} />
       </Routes>
    </>
  );
}

export default App;