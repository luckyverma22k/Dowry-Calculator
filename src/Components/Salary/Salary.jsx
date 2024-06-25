import React, { useState } from 'react';
import './Salary.css';

const Salary = () => {
  const [formData, setFormData] = useState({
    name: '',
    jobType: '',
    salary: '',
    fatherProperty: '',
    fatherSalary: '',
    brothersAvgSalary: '',
    noOfBrothers: '',
    noOfUnmarriedSisters: '',
    permanentResidence: ''
  });

  const [result, setResult] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const formatAmount = (amount) => {
    if (amount >= 1e7) {
      return (Math.round(amount / 1e7 * 100) / 100) + ' crore';
    } else if (amount >= 1e5) {
      return (Math.round(amount / 1e5 * 100) / 100) + ' lakh';
    } else {
      return (Math.round(amount * 100) / 100) + ' INR';
    }
  };

  const calculateDowry = (e) => {
    e.preventDefault();
    let { name, jobType, salary, fatherProperty, fatherSalary, brothersAvgSalary, noOfBrothers, noOfUnmarriedSisters, permanentResidence } = formData;

    salary = parseFloat(salary);
    fatherProperty = parseFloat(fatherProperty);
    fatherSalary = parseFloat(fatherSalary);
    brothersAvgSalary = parseFloat(brothersAvgSalary);
    noOfBrothers = parseInt(noOfBrothers);
    noOfUnmarriedSisters = parseInt(noOfUnmarriedSisters);

    // Calculating bride property
    let brideProperty = fatherProperty / (noOfBrothers + 1) - fatherProperty / 10;

    // Adjusting salary for private job
    if (jobType === 'private') {
      salary = salary - salary / 10;
    }

    // Adjusting bride property based on residence
    if (permanentResidence === 'rural') {
      brideProperty = brideProperty - brideProperty / 20;
    } else if (permanentResidence === 'smart city') {
      brideProperty = brideProperty + brideProperty / 20;
    }

    // Adjusting salary based on father's and brothers' salaries
    if (fatherSalary > 0 || brothersAvgSalary > 0) {
      salary = salary + fatherSalary / 10 + brothersAvgSalary / 20;
    }

    // Calculating final dowry amount
    const finalDowryAmount = salary * 2.2 + brideProperty / 7;

    // Formatting the amount to lakhs or crores
    const formattedAmount = formatAmount(finalDowryAmount);

    // Outputting the final dowry amount
    setResult(`Congrats ${name}, your estimated dowry is ${formattedAmount}`);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      jobType: '',
      salary: '',
      fatherProperty: '',
      fatherSalary: '',
      brothersAvgSalary: '',
      noOfBrothers: '',
      noOfUnmarriedSisters: '',
      permanentResidence: ''
    });
    setResult('');
  };
  const [resultt, setResultt] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "d0aeb6aa-782e-4468-937d-8b490815ff23");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
    calculateDowry(event);
  };
  return (
    <div className='dowry-calculator'>
      <h3>Dowry Estimator</h3>
      <form  onSubmit={onSubmit}>
        <label>
          Your Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Job Type:
          <select name="jobType" value={formData.jobType} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="private">Private</option>
            <option value="govt">Govt</option>
            <option value="business">Business</option>
          </select>
        </label>
        <label>
          Salary per Year:
          <input type="number" name="salary" value={formData.salary} onChange={handleChange} required />
        </label>
        <label>
          Father's Property Worth:
          <input type="number" name="fatherProperty" value={formData.fatherProperty} onChange={handleChange} required />
        </label>
        <label>
          Number of Brothers:
          <input type="number" name="noOfBrothers" value={formData.noOfBrothers} onChange={handleChange} required />
        </label>
        <label>
          Number of Unmarried Sisters:
          <input type="number" name="noOfUnmarriedSisters" value={formData.noOfUnmarriedSisters} onChange={handleChange} required />
        </label>
        <label>
          Permanent Place of Residence:
          <select name="permanentResidence" value={formData.permanentResidence} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="city">City</option>
            <option value="smart city">Smart City</option>
            <option value="rural">Rural</option>
          </select>
        </label>
        <label>
          Father's Salary per Year:
          <input type="number" name="fatherSalary" value={formData.fatherSalary} onChange={handleChange} required />
        </label>
        <label>
          Brothers' Average Salary per Year:
          <input type="number" name="brothersAvgSalary" value={formData.brothersAvgSalary} onChange={handleChange} required />
        </label>
        <div className="form-buttons">
          <button type="submit">Calculate</button>
          <button type="button" onClick={resetForm}>Reset</button>
        </div>
      </form>
      <span>{resultt}</span>
      {result && <p>{result}</p>}
    </div>
  );
};

export default Salary;
