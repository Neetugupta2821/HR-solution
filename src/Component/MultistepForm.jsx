import React, { useState } from "react";
import Header from './Header'
import Footer from './Footer'
import "./progress.css";
import "./multi.css";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import { baseUrl } from "../Api/BaseUrl";
import Swal from 'sweetalert2'



const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

const MultistepForm = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { data } = state || {};
  console.log(data);
  const id = data
  const [personal, setpersonal] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    Gender: ""
  })
  const [education, setEducation] = useState({
    Highest_Education: " ",
    Job_Experience: " ",
    Total_Experience: " ",
    Time_range_for_interview: " "

  })

  const [selectedfile, setselectedfile] = useState({
    file: null
  });

  const handleFileUpload = e => {
    e.preventDefault();
    const temp_file = e.target.files[0];
    console.log(temp_file);

    setselectedfile({ file: temp_file });
  }
  const submitInputDataEducation = (e) => {
    const { name, value } = e.target;
    setEducation({ ...education, [name]: value });
  };
  const submitInputdata = (e) => {
    const { name, value } = e.target;
    if (
      (name === "phone") &&
      value !== "" &&
      !/^\d+$/.test(value)
    ) {
      return;
    }
 
    setpersonal({ ...personal, [name]: value });
  };

  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});




  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {

    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
        // find the first step that has been completed
        steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };
  const formData = new FormData();
  formData.append("first_Name", personal.firstName);
  formData.append("last_Name", personal.lastName);
  formData.append("user_Email", personal.email);
  formData.append("city", personal.city);
  formData.append("state", personal.state);
  formData.append("phone_no", personal.phone);
  formData.append("gender", personal.Gender);
  formData.append("Highest_Education", education.Highest_Education);
  formData.append("job_experience", education.Job_Experience);
  formData.append("Total_experience", education.Total_Experience);
  formData.append("Time_range_for_interview", education.Time_range_for_interview);
  formData.append("uploadResume", selectedfile.file);

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();

    if (activeStep === 2) {
      axios.post(`${baseUrl}apply_on_job/${id}`, formData).then((response) => {
        console.log(response)
        if (response.status === 200) {
          Swal.fire({
            title: "Job applied successfully!",
            text: "You clicked the button!",
            icon: "success"
          });
        }
        navigate("/");
      }).catch((error) => {
        Swal.fire("Error", `${error?.response?.data?.message}`, "error");
        console.log(error)
      })
    }


  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };


  console.log(personal)
  console.log(education)
  console.log(selectedfile.file)
  return (
    <>
      <div>
        <Header />
        <section className="multiStepSec">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="multiStepForm">
                  <Box sx={{ width: '100%' }}>
                    <Stepper nonLinear activeStep={activeStep}>
                      {steps.map((label, index) => (
                        <Step key={label} completed={completed[index]}>
                          <StepButton color="inherit" onClick={handleStep(index)}>
                            {label}
                          </StepButton>
                        </Step>
                      ))}
                    </Stepper>
                    <div>
                      {allStepsCompleted() ? (
                        <React.Fragment>
                          <Typography sx={{ mt: 2, mb: 1 }}>
                            All steps completed - you&apos;re finished
                          </Typography>
                          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleReset}>Reset</Button>
                          </Box>
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                            {activeStep === 0 && <>
                              <div>
                                <div className="row">
                                  <div className="col-lg-6">
                                    <div className="six columns">
                                      <label>First Name<span style={{ "color": "red", "margin": "0px" }}>*</span></label>
                                      <input
                                        className="u-full-width"
                                        placeholder="First Name"
                                        type="text"
                                        name="firstName"
                                        onChange={submitInputdata}
                                        value={personal.firstName}
                                        autoFocus
                                      />
                                    </div>
                                  </div>
                                  <div className="col-lg-6">
                                    <div className="six columns">
                                      <label>Last Name<span style={{ "color": "red", "margin": "0px" }}>*</span></label>
                                      <input
                                        className="u-full-width"
                                        placeholder="Last Name"
                                        type="text"
                                        name="lastName"
                                        onChange={submitInputdata}
                                        value={personal.lastName}
                                      />
                                    </div>
                                  </div>


                                </div>
                                <div className="row">
                                  <div className="col-lg-6">
                                    <div className="six columns">
                                      <label>Email<span style={{ "color": "red", "margin": "0px" }}>*</span></label>
                                      <input
                                        className="u-full-width"
                                        placeholder="Email"
                                        type="text"
                                        name="email"
                                        onChange={submitInputdata}
                                        value={personal.email}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-lg-6">
                                    <div className="six columns">
                                      <label>Phone Number<span style={{ "color": "red", "margin": "0px" }}>*</span></label>
                                      <input
                                        className="u-full-width"
                                        placeholder="Phone Number"
                                        type="text"
                                        name="phone"
                                        onChange={submitInputdata}
                                        value={personal.phone}
                                        pattern="\d*"
                                        maxLength="11"
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="row">
                                  <div className="col-lg-6">
                                    <div className="six columns">
                                      <label>City<span style={{ "color": "red", "margin": "0px" }}>*</span></label>
                                      <input
                                        className="u-full-width"
                                        placeholder="City"
                                        type="text"
                                        name="city"
                                        onChange={submitInputdata}
                                        value={personal.city}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-lg-6">
                                    <div className="six columns">
                                      <label>country<span style={{ "color": "red", "margin": "0px" }}>*</span></label>
                                      <input
                                        className="u-full-width"
                                        placeholder="Country"
                                        type="text"
                                        name="state"
                                        onChange={submitInputdata}
                                        value={personal.state}
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="row">
                                  <div className="six columns">
                                    <label>Gender<span style={{ "color": "red", "margin": "0px" }}>*</span></label>
                                    <select value={personal.Gender} onChange={submitInputdata} name="Gender">
                                      <option value="">Select Option</option>
                                      <option value="Female">Female</option>
                                      <option value="Male">Male</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </>}
                            {activeStep === 1 && <>
                              <div>
                                <div className="row">
                                  <div className="six columns">
                                    <label>Highest Education</label>
                                    <select value={education.Highest_Education} onChange={submitInputDataEducation} name="Highest_Education">
                                      <option value="">Select Option</option>
                                      <option value="Doctorate">Doctorate</option>
                                      <option value="Masters">Masters</option>
                                      <option value="Bachelors">Bachelors</option>
                                      <option value="b.Diploma">D.Diploma</option>
                                      <option value="Higher Secondary">Higher Secondary</option>
                                      <option value="secondary">Secondary</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="six columns">
                                    <label>Job Experience</label>
                                    <select value={education.Job_Experience} onChange={submitInputDataEducation} name="Job_Experience">
                                      <option value="">Select Option</option>
                                      <option value="1">1</option>
                                      <option value="2">2</option>
                                      <option value="3">3</option>
                                      <option value="4">4</option>
                                    </select>
                                  </div>
                                  <div className="six columns">
                                    <label>Total Experience</label>
                                    <select value={education.Total_Experience} onChange={submitInputDataEducation} name="Total_Experience">
                                      <option value="">Select Option</option>
                                      <option value="1">1</option>
                                      <option value="2">2</option>
                                      <option value="3">3</option>
                                      <option value="4">4</option>
                                    </select>
                                  </div>
                                  <div className="six columns">
                                    <label>Time range for interview</label>
                                    <textarea rows="4" cols="50" name="Time_range_for_interview" form="usrform" value={education.Time_range_for_interview} onChange={submitInputDataEducation}>
                                      Enter text here...</textarea>
                                  </div>
                                </div>
                              </div>
                            </>}
                            {activeStep === 2 && <>
                              <div className="row">
                                <label htmlFor="fileInputcv">
                                  <div className="uploadFile">
                                    <div>
                                      <i className="fi fi-rr-cloud-upload-alt"></i>
                                      <p>{selectedfile.file ? selectedfile.file.name : " "}</p>
                                      <p>Upload your cv here</p>
                                    </div>
                                  </div>
                                </label>
                                <input type="file" id="fileInputcv" onChange={handleFileUpload} accept=".pdf" />
                              </div></>}



                          </Typography>
                          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                              color="inherit"
                              disabled={activeStep === 0}
                              onClick={handleBack}
                              sx={{ mr: 1 }}
                            >
                              Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            {/* <Button onClick={handleNext} sx={{ mr: 1 }}
                              disabled={
                                (activeStep === 0 &&
                                  (personal.firstName.length === 0 ||
                                    personal.lastName.length === 0 ||
                                    personal.email.length === 0 ||
                                    personal.phone.length === 0 ||
                                    personal.city.length === 0 ||
                                    personal.state.length === 0 ||
                                    personal.Gender.length === 0)) ||
                                personal.firstName.length === 0 ||
                                personal.lastName.length === 0 ||
                                personal.email.length === 0 ||
                                personal.phone.length === 0 ||
                                personal.city.length === 0 ||
                                personal.state.length === 0 ||
                                personal.Gender.length === 0 ||
                                (activeStep === 1 &&
                                  (education.Highest_Education.length === 0 ||
                                    education.Job_Experience.length === 0 ||
                                    education.Total_Experience.length === 0)) ||
                                education.Highest_Education.length === 0 ||
                                education.Job_Experience.length === 0 ||
                                education.Total_Experience.length === 0

                              }>
                              Next
                            </Button> */}
                            {activeStep !== steps.length &&
                              (completed[activeStep] ? (
                                <Typography variant="caption" sx={{ display: 'inline-block' }}>
                                  Step {activeStep + 1} already completed
                                </Typography>
                              ) : (
                                <Button onClick={handleComplete} >
                                  {completedSteps() === totalSteps() - 1
                                    ? 'Finish'
                                    : 'Next'}
                                </Button>
                              ))}
                          </Box>
                        </React.Fragment>
                      )}
                    </div>
                  </Box>

                </div>
              </div>
            </div>
          </div >
        </section >
        <Footer />
      </div >
    </>
  )
}

export default MultistepForm












