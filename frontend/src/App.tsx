import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { PublicLayout } from './components/layout/PublicLayout';
import { BusinessLayout } from './components/layout/BusinessLayout';
import { OfficerLayout } from './components/layout/OfficerLayout';
import { AdminLayout } from './components/layout/AdminLayout';

import { LandingPage } from './pages/LandingPage';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';

import { IntakePage } from './pages/IntakePage';
import { DashboardPage } from './pages/DashboardPage';
import { ComplianceDetailsPage } from './pages/ComplianceDetailsPage';
import { TrackerPage } from './pages/TrackerPage';

import { OfficerDashboardPage } from './pages/OfficerDashboardPage';
import { OfficerApplicationsPage } from './pages/OfficerApplicationsPage';
import { OfficerPendingPage } from './pages/OfficerPendingPage';
import { OfficerApprovedPage } from './pages/OfficerApprovedPage';
import { ApplicationReviewPage } from './pages/ApplicationReviewPage';

import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AdminApplicationsPage } from './pages/AdminApplicationsPage';
import { AdminDepartmentsPage } from './pages/AdminDepartmentsPage';
import { ComplianceManagementPage } from './pages/ComplianceManagementPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="signin" element={<SignInPage />} />
          <Route path="signup" element={<SignUpPage />} />
        </Route>

        {/* Business User Routes */}
        <Route element={<BusinessLayout />}>
          <Route path="intake" element={<IntakePage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="compliance/:id" element={<ComplianceDetailsPage />} />
          <Route path="tracker" element={<TrackerPage />} />
        </Route>
        
        {/* Officer Routes */}
        <Route path="officer" element={<OfficerLayout />}>
          <Route index element={<OfficerDashboardPage />} />
          <Route path="applications" element={<OfficerApplicationsPage />} />
          <Route path="pending" element={<OfficerPendingPage />} />
          <Route path="approved" element={<OfficerApprovedPage />} />
          <Route path="application/:id" element={<ApplicationReviewPage />} />
        </Route>
        
        {/* Admin Routes */}
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="applications" element={<AdminApplicationsPage />} />
          <Route path="departments" element={<AdminDepartmentsPage />} />
          <Route path="compliances" element={<ComplianceManagementPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
