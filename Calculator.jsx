import React, { useState } from "react";
import './Calculator.css';

const Calculator = () => {
  const [semesterCount, setSemesterCount] = useState('');
  const [sgpa, setSgpa] = useState(Array(6).fill(''));
  const [cgpa, setCgpa] = useState(null);

  const credits = [20.5, 20.5, 23, 20.5, 22.5, 20];

  const handleSgpaChange = (index, value) => {
    const newSgpa = [...sgpa];
    newSgpa[index] = value;
    setSgpa(newSgpa);
  };

  const handleSemesterCountChange = (e) => {
    const value = e.target.value;

    if (value === '' || (Number(value) >= 0 && Number(value) <= 6)) {
      setSemesterCount(value);

      const newSgpa = sgpa.slice(0, Number(value)).concat(Array(6 - Number(value)).fill(''));
      setSgpa(newSgpa);
    }
  };

  const handleCalculateCgpa = () => {
    let totalCredits = 0;
    let totalPoints = 0;

    for (let i = 0; i < Number(semesterCount); i++) {
      totalCredits += credits[i];
      totalPoints += sgpa[i] * credits[i];
    }

    const calculatedCgpa = totalPoints / totalCredits;
    setCgpa(calculatedCgpa.toFixed(2));
  };

  return (
    <div className="calculator">
      <h1>CGPA Calculator</h1>

      <div className="input-section">
        <label>Enter the number of semesters completed: </label>
        <input
          type="text"
          value={semesterCount}
          onChange={handleSemesterCountChange}
          maxLength="1"
          placeholder="0-6"
        />
      </div>

      {[...Array(Number(semesterCount))].map((_, i) => (
        <div className="input-section" key={i}>
          <label>Enter SGPA for Semester {i + 1}: </label>
          <input
            type="number"
            step="0.01"
            value={sgpa[i] || ""}
            onChange={(e) => handleSgpaChange(i, parseFloat(e.target.value))}
            min="0"
            max="10"
          />
        </div>
      ))}

      <button className="calculate-btn" onClick={handleCalculateCgpa} disabled={!semesterCount}>
        Calculate CGPA
      </button>

      {cgpa !== null && (
        <div className="result">
          <h2>Your CGPA is: {cgpa}</h2>
        </div>
      )}
    </div>
  );
};

export default Calculator;
