import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AuditLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL + '/audit')
      .then(res => setLogs(res.data.data || []));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Audit Logs</h2>
      <ul className="divide-y">
        {logs.map(log => (
          <li key={log.id} className="py-2">
            <strong>{log.action}</strong> – {log.resource_type} #{log.resource_id} by {log.user_id}<br />
            <small>{log.details}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
