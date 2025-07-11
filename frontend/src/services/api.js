const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: { 'Content-Type': 'application/json', ...options.headers },
      ...options
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'API request failed');
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Candidates
  getCandidates() { return this.request('/candidates'); }
  getCandidateById(id) { return this.request(`/candidates/${id}`); }
  createCandidate(candidateData) { return this.request('/candidates', { method: 'POST', body: JSON.stringify(candidateData) }); }
  updateCandidate(id, candidateData) { return this.request(`/candidates/${id}`, { method: 'PUT', body: JSON.stringify(candidateData) }); }
  deleteCandidate(id) { return this.request(`/candidates/${id}`, { method: 'DELETE' }); }

  // Interviews
  getInterviews() { return this.request('/interviews'); }
  createInterview(data) { return this.request('/interviews', { method: 'POST', body: JSON.stringify(data) }); }
  updateInterview(id, data) { return this.request(`/interviews/${id}`, { method: 'PUT', body: JSON.stringify(data) }); }
  deleteInterview(id) { return this.request(`/interviews/${id}`, { method: 'DELETE' }); }

  // Audit
  getAuditLogs() { return this.request('/audit'); }
}

export default new ApiService();
