import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Interviews() {
  const [interviews, setInterviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [interviewers, setInterviewers] = useState([]);
  const [form, setForm] = useState({
    candidate_id: '',
    interviewer_id: '',
    interview_date: '',
    interview_time: '',
    type: 'Technical'
  });

  const API = process.env.REACT_APP_API_URL;

  const loadInterviews = async () => {
    const res = await axios.get(`${API}/interviews`);
    setInterviews(res.data.data || []);
  };

  const loadFormOptions = async () => {
    const [candRes, intRes] = await Promise.all([
      axios.get(`${API}/candidates`),
      axios.get(`${API}/interviewers`)
    ]);
    setCandidates(candRes.data.data || []);
    setInterviewers(intRes.data.data || []);
  };

  useEffect(() => {
    loadInterviews();
    loadFormOptions();
  }, []);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/interviews`, form);
      setShowForm(false);
      setForm({
        candidate_id: '',
        interviewer_id: '',
        interview_date: '',
        interview_time: '',
        type: 'Technical'
      });
      loadInterviews();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to schedule interview');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this interview?')) return;
    await axios.delete(`${API}/interviews/${id}`);
    loadInterviews();
  };

  return (
    <div>
      {/* header + add button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Interviews</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Schedule Interview
        </button>
      </div>

      {/* interviews table */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">Candidate</th>
            <th className="p-2">Interviewer</th>
            <th className="p-2">Date</th>
            <th className="p-2">Time</th>
            <th className="p-2">Type</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {interviews.map((i) => (
            <tr key={i.id} className="border-b">
              <td className="p-2">{i.candidate_name}</td>
              <td className="p-2">{i.interviewer_name}</td>
              <td className="p-2">{i.interview_date}</td>
              <td className="p-2">{i.interview_time}</td>
              <td className="p-2">{i.type}</td>
              <td className="p-2">
                <button
                  onClick={() => handleDelete(i.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* schedule modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Schedule Interview</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* candidate dropdown */}
              <select
                name="candidate_id"
                value={form.candidate_id}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              >
                <option value="">Select Candidate</option>
                {candidates.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>

              {/* interviewer dropdown */}
              <select
                name="interviewer_id"
                value={form.interviewer_id}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              >
                <option value="">Select Interviewer</option>
                {interviewers.map((i) => (
                  <option key={i.id} value={i.id}>
                    {i.name}
                  </option>
                ))}
              </select>

              {/* date & time */}
              <input
                type="date"
                name="interview_date"
                value={form.interview_date}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="time"
                name="interview_time"
                value={form.interview_time}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />

              {/* type dropdown (fixed) */}
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="Technical">Technical</option>
                <option value="HR">HR</option>
                <option value="Managerial">Managerial</option>
                <option value="Culture Fit">Culture Fit</option>
              </select>

              {/* actions */}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}