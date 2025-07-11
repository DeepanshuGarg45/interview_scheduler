const Interview = require('../models/Interview');

exports.check = async ({ interviewer_id, interview_date, interview_time, duration = 60 }) => {
  const existing = await Interview.checkConflicts(interviewer_id, interview_date, interview_time, duration);
  return existing;
};
