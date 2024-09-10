import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const criteriaData = [
  { id: 'geographicalAlignment', label: 'Does the funder prioritize nonprofits in your geographical area?', description: 'The funder has a specific focus or preference for supporting organizations within your geographical region.' },
  { id: 'alignmentWithFocus', label: 'Is there an alignment with your nonprofit\'s program(s) and the funder\'s focus area(s)?', description: 'The grant-making organization\'s focus areas align well with the programs and initiatives of your nonprofit.' },
  { id: 'establishedContact', label: 'Do you have a relationship with the funder?', description: 'Had at least one meaningful conversation with a representative who confirms alignment with our mission and funding strategies.' },
  { id: 'fundedInPast', label: 'Has the funder funded nonprofits that are similar in geography, focus, or sector?', description: 'The organization has a track record of providing grants to nonprofit organizations similar to ours in terms of location, mission, or field of work.' },
  { id: 'similarPrograms', label: 'Does the funder have a track record of funding similar programs that your nonprofit offers?', description: 'The funder has a history of supporting projects or programs that closely align with the initiatives offered by your nonprofit.' },
  { id: 'alignedGivingRange', label: 'Does the funder have a giving range that aligns with the capacity and time you have to submit the proposal?', description: 'The funder\'s typical grant amount matches the effort required for proposal submission and aligns with our organizational capacity.' }
];

const App = () => {
  const [criteria, setCriteria] = useState(Object.fromEntries(criteriaData.map(c => [c.id, false])));
  const [funderName, setFunderName] = useState('');
  const [result, setResult] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleChange = (id, value) => {
    setCriteria(prev => ({ ...prev, [id]: value }));
  };

  const calculateResult = () => {
    const score = Object.values(criteria).filter(Boolean).length;
    let quadrant, color, explanation, position;
    const funderReference = funderName ? `${funderName}` : "This funder";

    if (score <= 2) {
      quadrant = "Low Priority";
      color = "#FF4136";
      explanation = `${funderReference} may not align well with our current goals or capacity.`;
      position = { x: 25, y: 75 };
    } else if (score === 3) {
      quadrant = "Potential, Needs Work";
      color = "#FF851B";
      explanation = `There's potential with ${funderReference}, but more research or relationship building may be needed.`;
      position = { x: 25, y: 25 };
    } else if (score === 4) {
      quadrant = "Good Fit, Limited Funds";
      color = "#2ECC40";
      explanation = `${funderReference} aligns well with our mission, but funding may be competitive.`;
      position = { x: 75, y: 75 };
    } else {
      quadrant = "Strong Match";
      color = "#0074D9";
      explanation = `${funderReference} strongly aligns with our goals and has high potential.`;
      position = { x: 75, y: 25 };
    }

    setResult({ score, quadrant, color, explanation, position });
    setShowResult(true);
  };

  const nextStep = () => {
    if (currentStep < criteriaData.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      calculateResult();
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">GrantLaunch</h1>
      {!showResult ? (
        <div>
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Criterion {currentStep + 1}/{criteriaData.length}</h2>
            <span className="text-sm text-gray-500">Step {currentStep + 1} of {criteriaData.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
            <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${((currentStep + 1) / criteriaData.length) * 100}%` }}></div>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg mb-6">
            <div className="mb-4">
              <label htmlFor="funderName" className="block text-sm font-medium text-gray-700 mb-2">
                Funder Name
              </label>
              <input
                type="text"
                id="funderName"
                value={funderName}
                onChange={(e) => setFunderName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter the name of the funder"
              />
            </div>
            <div className="mb-4">
              <label htmlFor={criteriaData[currentStep].id} className="text-lg font-medium block mb-2">
                {criteriaData[currentStep].label}
              </label>
              <p className="text-sm text-gray-600 mb-4">{criteriaData[currentStep].description}</p>
            </div>
            <div className="flex items-center justify-end">
              <span className={`mr-2 ${!criteria[criteriaData[currentStep].id] ? 'font-bold' : ''}`}>No</span>
              <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                <input
                  type="checkbox"
                  name={criteriaData[currentStep].id}
                  id={criteriaData[currentStep].id}
                  checked={criteria[criteriaData[currentStep].id]}
                  onChange={() => handleChange(criteriaData[currentStep].id, !criteria[criteriaData[currentStep].id])}
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                />
                <label htmlFor={criteriaData[currentStep].id} className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
              </div>
              <span className={`ml-2 ${criteria[criteriaData[currentStep].id] ? 'font-bold' : ''}`}>Yes</span>
            </div>
          </div>
          <div className="flex justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              <ChevronLeft className="inline mr-1" /> Previous
            </button>
            <button
              onClick={nextStep}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              {currentStep === criteriaData.length - 1 ? 'Finish' : 'Next'} <ChevronRight className="inline ml-1" />
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold mb-4">GrantLaunch Analysis for {funderName}</h2>
          {result && (
            <>
              <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden mb-6">
                <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1 p-1">
                  {['Potential, Needs Work', 'Strong Match', 'Low Priority', 'Good Fit, Limited Funds'].map((label, index) => (
                    <div 
                      key={index} 
                      className={`flex items-center justify-center p-2 ${
                        result.quadrant === label 
                          ? 'bg-blue-200 border-2 border-blue-500' 
                          : 'bg-gray-200'
                      }`}
                    >
                      <span className="text-xs font-semibold text-gray-800 text-center">{label}</span>
                    </div>
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div 
                    className="w-20 h-20 rounded-full shadow-lg flex items-center justify-center text-white font-bold text-2xl"
                    style={{ backgroundColor: result.color }}
                  >
                    {result.score}
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg mb-6">
                <h3 className="font-bold text-2xl mb-2" style={{ color: result.color }}>{result.quadrant}</h3>
                <p className="text-gray-600">{result.explanation}</p>
              </div>
              <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-6" role="alert">
                <div className="flex">
                  <div>
                    <p className="font-bold">Recommendation</p>
                    <p className="text-sm">
                      {result.score === 5 ? (
                        `The opportunity with ${funderName} shows excellent potential. Your nonprofit should strongly consider pursuing this grant. The strong alignment across all criteria suggests a high likelihood of success. Prioritize this application and allocate resources accordingly.`
                      ) : result.score === 4 ? (
                        `This grant opportunity from ${funderName} is a good fit for your nonprofit. It's recommended to pursue it, but be prepared for competition. Focus on highlighting your unique strengths and how they align with ${funderName}'s priorities. Consider reaching out to ${funderName} to build a stronger relationship.`
                      ) : result.score === 3 ? (
                        `There's potential in this opportunity with ${funderName}, but it requires careful consideration. Your nonprofit should conduct more research and possibly reach out to ${funderName} for clarification. If you decide to apply, emphasize the areas where you align strongly and address potential concerns proactively in your proposal.`
                      ) : result.score === 2 ? (
                        `This opportunity with ${funderName} has limited alignment with your nonprofit's current situation. While not impossible, pursuing this grant may require significant effort for a lower chance of success. Consider if the potential funding justifies the resources needed for a competitive application.`
                      ) : (
                        `Based on the current alignment, your nonprofit might want to prioritize other opportunities over ${funderName}. The effort required for this application may not justify the low potential for success. However, if ${funderName} is a strategic funder, consider building a relationship for future opportunities that may align better with your organization.`
                      )}
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  setCurrentStep(0);
                  setShowResult(false);
                  setCriteria(Object.fromEntries(criteriaData.map(c => [c.id, false])));
                  setFunderName('');
                }}
                className="w-full px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Start Over
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default App;