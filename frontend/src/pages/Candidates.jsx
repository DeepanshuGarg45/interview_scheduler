import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Candidates() {
  const [candidates, setCandidates] = useState([]);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', position: '', status: 'active'
  });
  const [showForm, setShowForm] = useState(false);

  const API = process.env.REACT_APP_API_URL;

  useEffect(() => { fetchCandidates(); }, []);

  const fetchCandidates = async () => {
    const res = await axios.get(`${API}/candidates`);
    setCandidates(res.data.data);
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${API}/candidates`, formData);
    setShowForm(false);
    fetchCandidates();
    setFormData({ name: '', email: '', phone: '', position: '', status: 'active' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this candidate?')) return;
    await axios.delete(`${API}/candidates/${id}`);
    fetchCandidates();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Candidates</h2>
        <button onClick={() => setShowForm(true)} className="bg-blue-600 text-white px-4 py-2 rounded">
          + Add Candidate
        </button>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Phone</th>
            <th className="p-2">Position</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map(c => (
            <tr key={c.id} className="border-b">
              <td className="p-2">{c.name}</td>
              <td className="p-2">{c.email}</td>
              <td className="p-2">{c.phone}</td>
              <td className="p-2">{c.position}</td>
              <td className="p-2">{c.status}</td>
              <td className="p-2">
                <button onClick={() => handleDelete(c.id)} className="text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Add New Candidate</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input className="w-full border p-2 rounded" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
              <input className="w-full border p-2 rounded" name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
              <input className="w-full border p-2 rounded" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
              <input className="w-full border p-2 rounded" name="position" placeholder="Position" value={formData.position} onChange={handleChange} required />
              <select className="w-full border p-2 rounded" name="status" value={formData.status} onChange={handleChange}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border rounded">Cancel</button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}