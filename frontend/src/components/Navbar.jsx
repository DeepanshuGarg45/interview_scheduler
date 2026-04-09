import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-4 py-3">
      <ul className="flex space-x-4">
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/candidates">Candidates</Link></li>
        <li><Link to="/interviewers">Interviewers</Link></li>
        <li><Link to="/interviews">Interviews</Link></li>
        <li><Link to="/audit">Audit Logs</Link></li>
      </ul>
    </nav>
  );
}
