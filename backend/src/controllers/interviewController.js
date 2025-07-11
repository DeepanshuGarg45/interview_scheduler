const Interview = require('../models/Interview');
const AuditLog = require('../models/AuditLog');
const conflictChecker = require('../utils/conflictChecker');

const interviewController = {
  async getAllInterviews(req, res) {
    try {
      const interviews = await Interview.findAll();
      res.json({ success: true, data: interviews, count: interviews.length });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error fetching interviews', error: error.message });
    }
  },

  async getInterviewById(req, res) {
    try {
      const interview = await Interview.findById(req.params.id);
      if (!interview) return res.status(404).json({ success: false, message: 'Interview not found' });
      res.json({ success: true, data: interview });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error fetching interview', error: error.message });
    }
  },

  async createInterview(req, res) {
    try {
      const conflicts = await conflictChecker.check(req.body);
      if (conflicts.length) return res.status(400).json({ success: false, message: 'Schedule conflict', conflicts });

      const interview = await Interview.create(req.body);
      await AuditLog.create({
        action: 'Interview Created',
        user_id: req.user?.id || 'system',
        resource_type: 'interview',
        resource_id: interview.id,
        details: `Interview scheduled with candidate ${interview.candidate_id}`,
        ip_address: req.ip,
        user_agent: req.get('User-Agent')
      });
      res.status(201).json({ success: true, data: interview });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error creating interview', error: error.message });
    }
  },

  async updateInterview(req, res) {
    try {
      const interview = await Interview.update(req.params.id, req.body);
      if (!interview) return res.status(404).json({ success: false, message: 'Interview not found' });

      await AuditLog.create({
        action: 'Interview Updated',
        user_id: req.user?.id || 'system',
        resource_type: 'interview',
        resource_id: interview.id,
        details: `Interview updated`,
        ip_address: req.ip,
        user_agent: req.get('User-Agent')
      });
      res.json({ success: true, data: interview });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error updating interview', error: error.message });
    }
  },

  async deleteInterview(req, res) {
    try {
      const interview = await Interview.delete(req.params.id);
      if (!interview) return res.status(404).json({ success: false, message: 'Interview not found' });

      await AuditLog.create({
        action: 'Interview Deleted',
        user_id: req.user?.id || 'system',
        resource_type: 'interview',
        resource_id: interview.id,
        details: `Interview deleted`,
        ip_address: req.ip,
        user_agent: req.get('User-Agent')
      });
      res.json({ success: true, message: 'Interview deleted' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error deleting interview', error: error.message });
    }
  }
};

module.exports = interviewController;
