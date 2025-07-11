const AuditLog = require('../models/AuditLog');

const auditController = {
  async getAll(req, res) {
    try {
      const logs = await AuditLog.findAll();
      res.json({ success: true, data: logs, count: logs.length });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error fetching audit logs', error: error.message });
    }
  }
};

module.exports = auditController;
