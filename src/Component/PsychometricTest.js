import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../Api/BaseUrl';
import Swal from 'sweetalert2'
const PsychometricTest = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { data } = state || {};
  console.log(data);
  const psychometric_Test = data;

  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [currectAns, setCurrectAns] = useState([])

  const handleTestData = () => {
    axios.get(`${baseUrl}getTest/${psychometric_Test}`).then((response) => {
      console.log(response.data.Test.questions);
      setQuestions(response.data.Test.questions);
      // Initialize selected options array with default values
      const defaultOptions = Array(response.data.Test.questions.length).fill(null);
      setSelectedOptions(defaultOptions);
      
    }).catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => {
    handleTestData();
  }, [ ]);

  const handleOptionChange = (questionIndex, optionIndex) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[questionIndex] = optionIndex;
    setSelectedOptions(updatedOptions);
    const correctAnswers = questions.map((info) => info.correctAnswerIndex);

    setCurrectAns(correctAnswers);
  };
  
  console.log(selectedOptions)
  console.log(currectAns)
  
  
  
   
  
  
  // Call the function and log the result
   
 
  const handleChangeChek =()=>{
    let matchCount = 0;

    // Iterate through the arrays simultaneously
    for (let i = 0; i < currectAns.length; i++) {
      // Compare elements at the same index
      if (selectedOptions[i] === currectAns[i]) {
        // If they match, increment the match count
        matchCount++;
      }
    }
    
    console.log("Number of matches:", matchCount);
    console.log(typeof(matchCount));
    if(matchCount > 3 ){
      navigate("/multistepform");
      Swal.fire({
        title: `${matchCount}/5`,
        text: "Congratulations! You have successfully passed the exam. You are now eligible to proceed with the job application.",
        icon: "success"
    });
    }else{
      Swal.fire(`${matchCount}/5`, `We're sorry, but you did not pass the exam this time. Don't be discouraged! You can always try again in the future or explore other job opportunities.`, "error");
      navigate("/");
    }

  }
  
  return (
    <>
      <div className="mcqMain">
        <Header />
        <section className="mcqSection">
          <div className="container">
            <div className="row">
              <h2>
                <div className="text-center">
                  <button>Please complete a quick assessment before applying for the job. Thank you!</button>
                </div>
              </h2>
            </div>
            <div className="row justify-content-center">
              <div className="col-lg-7">
                {questions.map((question, questionIndex) => (
                  <div key={questionIndex} className="questionMcq">
                    <strong>{question.question}</strong>
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="prantMcq">
                        <input
                          type="radio"
                          id={`option_${questionIndex}_${optionIndex}`}
                          name={`question_${questionIndex}`}
                          value={option}
                          checked={selectedOptions[questionIndex] === optionIndex}
                          onChange={() => handleOptionChange(questionIndex, optionIndex)}
                        />
                        <label htmlFor={`option_${questionIndex}_${optionIndex}`}>{option}</label>
                      </div>
                    ))}
                  </div>
                ))}

                <div className="SubmitTest">
                  <button className="b-btn b-btn-green" onClick={handleChangeChek}>Apply Job <i className="fi fi-sr-arrow-right"></i></button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default PsychometricTest;
