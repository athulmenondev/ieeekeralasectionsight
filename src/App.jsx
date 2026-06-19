import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './hooks';
import { Header, Footer, ScrollToTop } from './components/layout';
import { HomePage, AboutPage, ProjectsPage, EventsPage, FieldNotesPage } from './pages';
import './styles/globals.css';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col">
          <Header />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/field-notes" element={<FieldNotesPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;