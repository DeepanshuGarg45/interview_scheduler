import React, { useContext } from 'react';
import { CandidateContext } from '../context/CandidateContext';

function CandidateList() {
  const { candidates, loading, error } = useContext(CandidateContext);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {candidates.map((candidate) => (
        <li key={candidate.id}>
          {candidate.name} - {candidate.position}
        </li>
      ))}
    </ul>
  );
}

export default CandidateList;
