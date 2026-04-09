import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Candidates from './pages/Candidates';
import Interviewers from './pages/Interviewers';
import Interviews from './pages/Interviews';
import AuditLogs from './pages/AuditLogs';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/candidates" element={<Candidates />} />
          <Route path="/interviewers" element={<Interviewers />} />
          <Route path="/interviews" element={<Interviews />} />
          <Route path="/audit" element={<AuditLogs />} />
        </Routes>
      </div>
    </Router>
  );
}
