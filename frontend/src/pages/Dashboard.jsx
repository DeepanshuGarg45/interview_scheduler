import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [stats, setStats] = useState({ candidates: 0, interviews: 0 });

  useEffect(() => {
    async function fetchStats() {
      const [candRes, intRes] = await Promise.all([
        axios.get(process.env.REACT_APP_API_URL + '/candidates'),
        axios.get(process.env.REACT_APP_API_URL + '/interviews'),
      ]);
      setStats({ candidates: candRes.data.count, interviews: intRes.data.count });
    }
    fetchStats();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white shadow p-4 rounded-lg">
          <h3 className="text-lg font-semibold">Total Candidates</h3>
          <p className="text-3xl">{stats.candidates}</p>
        </div>
        <div className="bg-white shadow p-4 rounded-lg">
          <h3 className="text-lg font-semibold">Total Interviews</h3>
          <p className="text-3xl">{stats.interviews}</p>
        </div>
      </div>
    </div>
  );
}
