import React, { useState } from 'react';
import Hero from './Components/Hero/Hero';
import Dowry from './Components/Dowry/Dowry';
import Salary from './Components/Salary/Salary';
import './App.css';

const App = () => {
  const [showDowry, setShowDowry] = useState(false);
  const [showSalary, setShowSalary] = useState(false);

  const handleShowDowry = () => {
    setShowDowry(true);
    setShowSalary(false);
  };

  const handleShowSalary = () => {
    setShowSalary(true);
    setShowDowry(false);
  };

  return (
    <div>
      <Hero onShowDowry={handleShowDowry} onShowSalary={handleShowSalary} />
      {showDowry && (
        <div id="dowry-calculator">
           <Salary />
        </div>
      )}
      {showSalary && (
        <div id='salary-estimator'>
        
          <Dowry />
        </div>
      )}
    </div>
  );
}

export default App;
