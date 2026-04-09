import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Interviewers() {
  const [interviewers, setInterviewers] = useState([]);

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL + '/interviewers')
      .then(res => setInterviewers(res.data.data || []));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Interviewers</h2>
      <ul className="space-y-2">
        {interviewers.map(i => (
          <li key={i.id} className="border p-2 rounded-md">
            <strong>{i.name}</strong> — {i.department} ({i.role})<br />
            Status: {i.is_available ? '✅ Available' : '❌ Busy'}
          </li>
        ))}
      </ul>
    </div>
  );
}
