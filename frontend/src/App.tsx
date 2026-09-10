
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { LandingPage } from './pages/LandingPage';
import { IntakePage } from './pages/IntakePage';
import { DashboardPage } from './pages/DashboardPage';
import { ComplianceDetailsPage } from './pages/ComplianceDetailsPage';
import { TrackerPage } from './pages/TrackerPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="intake" element={<IntakePage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="compliance/:id" element={<ComplianceDetailsPage />} />
          <Route path="tracker" element={<TrackerPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
