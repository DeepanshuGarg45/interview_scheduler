const Joi = require('joi');

const candidateSchema = Joi.object({
  name: Joi.string().max(255).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().max(20).required(),
  position: Joi.string().max(255).required(),
  status: Joi.string().valid('Active', 'Inactive').optional(),
  resume_url: Joi.string().uri().allow(null, '')
});

const interviewSchema = Joi.object({
  candidate_id: Joi.number().integer().required(),
  interviewer_id: Joi.number().integer().required(),
  interview_date: Joi.date().required(),
  interview_time: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/).required(),
  duration: Joi.number().integer().min(15).max(240).optional(),
  type: Joi.string().valid('Technical', 'HR', 'Managerial', 'Culture Fit').required(),
  status: Joi.string().valid('Scheduled', 'Completed', 'Cancelled').optional(),
  notes: Joi.string().allow('', null),
  feedback: Joi.string().allow('', null),
  rating: Joi.number().integer().min(1).max(5).optional()
});

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ success: false, message: error.details[0].message });
  next();
};

module.exports = {
  validateCandidate: validate(candidateSchema),
  validateInterview: validate(interviewSchema)
};
