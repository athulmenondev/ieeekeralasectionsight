import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './hooks';
import { Header, Footer, ScrollToTop } from './components/layout';
import { PageTransition } from './components/ui';
import { HomePage, AboutPage, ProjectsPage, EventsPage, FieldNotesPage } from './pages';
import './styles/globals.css';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}

function AppContent() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
              <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
              <Route path="/projects" element={<PageTransition><ProjectsPage /></PageTransition>} />
              <Route path="/events" element={<PageTransition><EventsPage /></PageTransition>} />
              <Route path="/field-notes" element={<PageTransition><FieldNotesPage /></PageTransition>} />
            </Routes>
          </AnimatePresence>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;