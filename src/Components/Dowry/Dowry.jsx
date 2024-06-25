import React, { useState } from 'react';
import './Dowry.css';

const SalaryEstimator = () => {
  const initialFormData = {
    name: '',
    age: '',
    followers: '',
    height: '',
    yearlySalary: '',
    dowryAmount: '',
    jobType: 'none',
    qualification: '1',
    pastAffair: 'no',
    skinTone: '1',
    residence: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [result, setResult] = useState('');
  const [submissionMessage, setSubmissionMessage] = useState('');

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

  const calculateSalary = (e) => {
    e.preventDefault();
    let { name, age, followers, height, yearlySalary, dowryAmount, jobType, qualification, pastAffair, skinTone, residence } = formData;

    age = parseInt(age);
    followers = parseInt(followers);
    height = parseInt(height);
    yearlySalary = parseFloat(yearlySalary);
    dowryAmount = parseFloat(dowryAmount);
    qualification = parseInt(qualification);

    // Adjust salary based on height
    if (height < 160) {
      yearlySalary -= yearlySalary / 10;
    } else if (height > 160 && height <= 165) {
      yearlySalary += yearlySalary / 30;
    } else if (height > 165) {
      yearlySalary += yearlySalary / 10;
    }

    // Adjust salary based on skin tone
    if (skinTone === "2" || skinTone === "3") {
      yearlySalary += yearlySalary / (parseInt(skinTone) * 10);
    } else if (skinTone === "4") {
      yearlySalary -= yearlySalary / 8;
    }

    // Adjust salary based on job type
    if (jobType === 'govt') {
      yearlySalary = yearlySalary * 2 + yearlySalary;
    } else if (jobType === 'private' || jobType === 'others') {
      yearlySalary = yearlySalary * 1.5 + yearlySalary;
    }

    // Adjust salary based on age
    if (age <= 25) {
      yearlySalary = yearlySalary / 20 + yearlySalary;
    } else if (age >= 28) {
      yearlySalary = -yearlySalary / 10 + yearlySalary;
    }

    // Adjust salary based on qualification
    if (qualification >= 3) {
      yearlySalary -= yearlySalary / 10;
    } else {
      yearlySalary += yearlySalary / (qualification * 10);
    }

    // Adjust salary based on past affair
    if (pastAffair === 'yes') {
      yearlySalary -= yearlySalary / 5;
    }

    // Calculate husband's estimated salary per month
    const husbandSalaryPerMonth = yearlySalary / 12;

    // Format the husband's estimated salary per month
    const formattedHusbandSalary = formatAmount(husbandSalaryPerMonth);

    // Output the final husband's estimated salary per month
    setResult(`${name}, congrats! Your husband's estimated salary per month is ${formattedHusbandSalary}`);
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setResult('');
    setSubmissionMessage('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmissionMessage("Calculating...");

    const formData = new FormData(event.target);

    formData.append("access_key", "d0aeb6aa-782e-4468-937d-8b490815ff23");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setSubmissionMessage("");
      event.target.reset();
    } else {
      console.log("Error", data);
      setSubmissionMessage(data.message);
    }

    calculateSalary(event); // Calculate salary after form submission
  };

  return (
    <div className='salary-estimator'>
      <h3>Husband Salary Estimator</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Your Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Age:
          <input type="number" name="age" value={formData.age} onChange={handleChange} required />
        </label>
        <label>
          Instagram Followers:
          <input type="number" name="followers" value={formData.followers} onChange={handleChange} required />
        </label>
        <label>
          Height (cm):
          <input type="number" name="height" value={formData.height} onChange={handleChange} required />
        </label>
        <label>
          Yearly Salary:
          <input type="number" name="yearlySalary" value={formData.yearlySalary} onChange={handleChange} required />
        </label>
        <label>
          Dowry You Wish to Give:
          <input type="number" name="dowryAmount" value={formData.dowryAmount} onChange={handleChange} required />
        </label>
        {formData.yearlySalary > 0 && (
          <label>
            Job Type:
            <select name="jobType" value={formData.jobType} onChange={handleChange} required>
              <option value="govt">Govt</option>
              <option value="private">Private</option>
              <option value="others">Others</option>
              <option value="none">None</option>
            </select>
          </label>
        )}
        <label>
          Qualification:
          <select name="qualification" value={formData.qualification} onChange={handleChange} required>
            <option value="1">Above Graduate</option>
            <option value="2">Graduate</option>
            <option value="3">+2</option>
            <option value="4">Below +2</option>
          </select>
        </label>
        <label>
          Any past affair or boyfriend:
          <select name="pastAffair" value={formData.pastAffair} onChange={handleChange} required>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>
        <label>
          Skin Tone:
          <select name="skinTone" value={formData.skinTone} onChange={handleChange} required>
            <option value="1">Milky White</option>
            <option value="2">Fair</option>
            <option value="3">Normal</option>
            <option value="4">Dark</option>
          </select>
        </label>
        <label>
          Place of Residence:
          <input type="text" name="residence" value={formData.residence} onChange={handleChange} required />
        </label>
        <div className="form-buttons">
          <button type="submit">Calculate</button>
          <button type="button" onClick={resetForm}>Reset</button>
        </div>
      </form>
      {submissionMessage && <span>{submissionMessage}</span>}
      {result && <p>{result}</p>}
    </div>
  );
};

export default SalaryEstimator;
