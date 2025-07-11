import React, { createContext, useState, useEffect } from 'react';
import ApiService from '../services/api';

export const CandidateContext = createContext();

export const CandidateProvider = ({ children }) => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCandidates = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await ApiService.getCandidates();
      setCandidates(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  return (
    <CandidateContext.Provider value={{ candidates, loading, error }}>
      {children}
    </CandidateContext.Provider>
  );
};
