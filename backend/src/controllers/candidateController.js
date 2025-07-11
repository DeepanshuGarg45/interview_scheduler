const Candidate = require('../models/Candidate');
const AuditLog = require('../models/AuditLog');

const candidateController = {
  async getAllCandidates(req, res) {
    try {
      const candidates = await Candidate.findAll();
      res.json({ success: true, data: candidates, count: candidates.length });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error fetching candidates', error: error.message });
    }
  },

  async getCandidateById(req, res) {
    try {
      const candidate = await Candidate.findById(req.params.id);
      if (!candidate) return res.status(404).json({ success: false, message: 'Candidate not found' });
      res.json({ success: true, data: candidate });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error fetching candidate', error: error.message });
    }
  },

  async createCandidate(req, res) {
    try {
      const existing = await Candidate.findByEmail(req.body.email);
      if (existing) return res.status(400).json({ success: false, message: 'Candidate with this email already exists' });

      const candidate = await Candidate.create(req.body);
      await AuditLog.create({
        action: 'Candidate Created',
        user_id: req.user?.id || 'system',
        resource_type: 'candidate',
        resource_id: candidate.id,
        details: `Created candidate: ${candidate.name}`,
        ip_address: req.ip,
        user_agent: req.get('User-Agent')
      });
      res.status(201).json({ success: true, data: candidate });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error creating candidate', error: error.message });
    }
  },

  async updateCandidate(req, res) {
    try {
      const candidate = await Candidate.update(req.params.id, req.body);
      if (!candidate) return res.status(404).json({ success: false, message: 'Candidate not found' });

      await AuditLog.create({
        action: 'Candidate Updated',
        user_id: req.user?.id || 'system',
        resource_type: 'candidate',
        resource_id: candidate.id,
        details: `Updated candidate: ${candidate.name}`,
        ip_address: req.ip,
        user_agent: req.get('User-Agent')
      });
      res.json({ success: true, data: candidate });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error updating candidate', error: error.message });
    }
  },

  async deleteCandidate(req, res) {
    try {
      const candidate = await Candidate.delete(req.params.id);
      if (!candidate) return res.status(404).json({ success: false, message: 'Candidate not found' });

      await AuditLog.create({
        action: 'Candidate Deleted',
        user_id: req.user?.id || 'system',
        resource_type: 'candidate',
        resource_id: candidate.id,
        details: `Deleted candidate: ${candidate.name}`,
        ip_address: req.ip,
        user_agent: req.get('User-Agent')
      });
      res.json({ success: true, message: 'Candidate deleted' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error deleting candidate', error: error.message });
    }
  }
};

module.exports = candidateController;
