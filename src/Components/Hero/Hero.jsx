import React from 'react';
import { Link } from 'react-scroll';
import './Hero.css';
import heart from '../../assets/heart2.png'
const Hero = ({ onShowDowry, onShowSalary }) => {
  const handleDowryClick = () => {
    onShowDowry();
    setTimeout(() => {
      document.getElementById('dowry-calculator').scrollIntoView({ behavior: 'smooth' });
    }, 500);
  };

  const handleSalaryClick = () => {
    onShowSalary();
    setTimeout(() => {
      document.getElementById('salary-estimator').scrollIntoView({ behavior: 'smooth' });
    }, 500);
  };

  return (
    <div className='hero'>
      <div className="hero-header">
      <a href="www.linkedin.com/in/lucky-verma-523567223" className='connect-button'>Connect with Us</a>
      </div>
      <div className='hero-content'>
        <h1>Predict Your Soulmate Status Digitally <img src={heart} alt="" /></h1>
        <p>Estimate dowry for your potential husband and plan your future with ease.</p>
        <div className="hero-options">
          <button onClick={handleDowryClick} className='hero-button'>
            Know Your Estimated Dowry
          </button>
          <p>Estimated Salary of your husband based on logical data estimation</p>
          <button onClick={handleSalaryClick} className='hero-button'>
            Predict Husband's Estimated Salary
          </button>
        
        </div>
      </div>
    </div>
  );
}

export default Hero;
