import React, { useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import { Link } from 'react-router-dom'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useState } from 'react';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../Api/BaseUrl';
const FindJobPage = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { data, title, location } = state || {};
    console.log(data.Details, title, location)
    const JobTital = title
    const Joblocation = location

    const details = data.Details
    const [activeTab, setActiveTab] = useState(0);
    const handleTabClick = (index) => {
        setActiveTab(index);
    };
    const [jobtype, setJobType] = useState('')
    const [jobschedule, setjobschedule] = useState('')
    const [companyIndustry, setcompanyIndustry] = useState('')
    const [Experiences, setExperiences] = useState('')
 const [filterdata,setFilterdata]=useState([])
    const Job_type = [
        'Full-Time',
        'Part-Time',
        'Temporary',
        'Contract',
        'Internship',
        'Commission',
        'Fresher'
    ];
    const Job_schedule = [
        'Day Shift',
        'Morning Shift',
        'Rotational Shift',
        'Night Shift',
        'Monday to Friday',
        'Evening Shift',
        'Fresher',
        'US Shift',
        'UK Shift',
        'Others'
    ];
    const company_Industry = [
        'Aerospace & Defense',
        'Agriculture',
        'Information Technology',
        'Non-profit & NGO',
        'Real Estate',
        'Restaurant & Food Services',
        'Marketing',
        'Finance',
        'UK Shift',
        'Others'
    ];
    const Experience = [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10
    ];

    const handleJobTypeChange = (event, value) => {
        setJobType(value);
    };
    const handlejobscheduleChange = (event, value) => {
        setjobschedule(value);
    };
    const handlecompanyIndustryChange = (event, value) => {
        setcompanyIndustry(value);
    };
    const handleExperiencesChange = (event, value) => {
        setExperiences(value);
    };
    const handleFilterApiData = () => {
        axios.post(`${baseUrl}filterJob?job_type=${jobtype}&job_schedule=${jobschedule}&Experience=${Experiences}&company_Industry=${companyIndustry}`,{
            job_title:JobTital,
         company_address: Joblocation
        }).then((response)=>{
            console.log(response.data.Details)
            setFilterdata(response.data.Details)
        }).catch((error)=>{
            console.log(error)
        })
    }
    useEffect(()=>{
        handleFilterApiData()
    },[jobtype,jobschedule,Experiences,companyIndustry])
console.log(jobtype,jobschedule,Experiences,companyIndustry)


const multiStep = (e, id,isPsychometricTest,psychometric_Test) => {
    e.preventDefault(); // Ensure that preventDefault is invoked as a function
     console.log(id,isPsychometricTest,psychometric_Test)
    if (isPsychometricTest === 1) {
        navigate("/PsychometricTest", { state: { data: psychometric_Test } });
    } else {
        navigate("/multistepform", { state: { data:id} });
    }
    
    
}

    return (
        <>
            <Header />
            <div>
                <section className='pt-50 pb-30'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-lg-12 col-sm-12 col-md-6'>
                                <div className='parentTopButtons'>

                                    <div className='childButtonTop'>
                                        <div class="dropdown">
                                            <Autocomplete
                                                disablePortal
                                                id="combo-box-demo"
                                                value={jobtype}
                                                onChange={handleJobTypeChange}
                                                options={Job_type}
                                                sx={{ width: 300 }}
                                                renderInput={(params) => <TextField {...params} label="Job type" />}
                                            />
                                        </div>
                                    </div>
                                    <div className='childButtonTop'>
                                        <div class="dropdown">
                                            <Autocomplete
                                                disablePortal
                                                id="combo-box-demo"
                                                value={jobschedule}
                                                onChange={handlejobscheduleChange}
                                                options={Job_schedule}
                                                sx={{ width: 300 }}
                                                renderInput={(params) => <TextField {...params} label="Job schedule" />}
                                            />
                                        </div>
                                    </div>
                                    <div className='childButtonTop'>
                                        <div class="dropdown">
                                            <Autocomplete
                                                disablePortal
                                                id="combo-box-demo"
                                                value={companyIndustry}
                                                onChange={handlecompanyIndustryChange}
                                                options={company_Industry}
                                                sx={{ width: 300 }}
                                                renderInput={(params) => <TextField {...params} label="Company Industry" />}
                                            />
                                        </div>
                                    </div>
                                    <div className='childButtonTop'>
                                        <div class="dropdown">
                                            <Autocomplete
                                                disablePortal
                                                id="combo-box-demo"
                                                options={Experience}
                                                value={Experiences}
                                                onChange={handleExperiencesChange}
                                                sx={{ width: 300 }}
                                                renderInput={(params) => <TextField {...params} label="Experience" />}
                                            />
                                        </div>
                                    </div>
                                    {/* <div className='childButtonTop'>
                                        <div class="dropdown">
                                            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                Education Level
                                            </button>
                                            <ul class="dropdown-menu">
                                                <li><a class="dropdown-item" href="#">Action</a></li>
                                                <li><a class="dropdown-item" href="#">Another action</a></li>
                                                <li><a class="dropdown-item" href="#">Something else here</a></li>
                                            </ul>
                                        </div>
                                    </div> */}

                                </div>

                            </div>

                        </div>
                    </div>
                </section>
                <section className='FilterateJob mt-30 mb-30'>
                    <div className='container'>
                        <div className='row pt-30'>
                            <div className='col-lg-6'>
                                <p className='uploadCvJob'> <Link to="">Upload Your CV</Link> <strong>and find your next job on Indeed!</strong></p>
                                <hr />
                                <small className='smallText'>work from home jobs</small>



                            </div>
                        </div>

                        {/* tab  */}
                        {jobtype=== null || jobschedule=== null || companyIndustry===null || companyIndustry=== null?(<>
                            <div className="align-items-start">
                            <div className='row'>
                                <div className='col-lg-6'>
                                    <div
                                        className="nav flex-column nav-pills me-3"
                                        id="v-pills-tab"
                                        role="tablist"
                                        aria-orientation="vertical"
                                    >
                                        {details.map((info, index) => (
                                            <button
                                                onClick={() => handleTabClick(index)}
                                                className="nav-link"
                                                id={`v-pills-${index}-tab`}
                                                data-bs-toggle="pill"
                                                data-bs-target={`#v-pills-${index}`}
                                                type="button"
                                                role="tab"
                                                aria-controls={`v-pills-${index}`}
                                                aria-selected={activeTab === index}
                                            >
                                                <div className='CardAssigmentmAIN mt-4'>
                                                    <div>
                                                        <div className='parentAssign'>
                                                            <h4>{info.job_title}</h4>
                                                            <div class="dropdown">
                                                                <button type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                    <i class="fi fi-bs-menu-dots-vertical"></i>
                                                                </button>
                                                                {/* <ul class="dropdown-menu">
                                                                    <li><a class="dropdown-item" href="#">Action</a></li>
                                                                    <li><a class="dropdown-item" href="#">Another action</a></li>
                                                                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                                                                </ul> */}
                                                            </div>
                                                        </div>
                                                        <p>{info.company_name}</p>
                                                        <Link>{info.company_address}  </Link>
                                                        <div className='salaryButton'>
                                                            <span>
                                                                {info.salary_pay.map((pay, index) => (
                                                                    <React.Fragment key={index}>
                                                                        {pay.Minimum_pay} - {pay.Maximum_pay}
                                                                    </React.Fragment>
                                                                ))}
                                                            </span>
                                                            <span>{info.job_type} <small><sup>+1</sup></small></span>
                                                            <span>{info.job_schedule}  <small><sup>+2</sup></small> </span>
                                                        </div>
                                                        <p className='easyApply'><i class="fi fi-sr-paper-plane-top"></i>Easy Apply</p>
                                                        <ul className='listFindPage'>
                                                            <li>{info.job_Description}</li>

                                                        </ul>
                                                    </div>
                                                </div>
                                            </button>

                                        ))}
                                    </div>
                                </div>
                                <div className='col-lg-6'>
                                    <div className="tab-content" id="v-pills-tabContent">
                                        {details.map((info, index) => (
                                            <div
                                                key={index}
                                                className={`tab-pane fade ${activeTab === index ? 'show active' : ''}`}
                                                id={`v-pills-${index}`}
                                                role="tabpanel"
                                                aria-labelledby={`v-pills-${index}-tab`}
                                            >
                                                <div className='CardAssigmentDetail mt-4'>
                                                    <div className='shadowDetailFind'>
                                                        <div className='parentAssign'>
                                                            <h4>{info.job_title}</h4>

                                                        </div>
                                                        <p>{info.company_name},{info.company_address}</p>
                                                        <p><span>{info.employee_email},{" "}{info.phone_no}</span>   </p>


                                                        <div className='findApplyBtn'>
                                                        <button onClick={(e) => multiStep(e, info.jobId,info.isPsychometricTest,info.psychometric_Test)}>Apply Now</button>

                                                            <button><i class="fi fi-rr-bookmark"></i></button>
                                                            <button><i class="fi fi-rr-ban"></i></button>
                                                        </div>

                                                    </div>
                                                    <div className='jobDetailSec'>
                                                        <h5>Job details</h5>
                                                        <div className='Jobdetails'>
                                                            <div className='walletFinfDetail'>
                                                                <i class="fi fi-rr-money-bills-simple"></i>
                                                            </div>
                                                            <div className='walletFindText'>
                                                                <h6>Pay</h6>
                                                                <span>
                                                                    {info.salary_pay.map((pay, index) => (
                                                                        <React.Fragment key={index}>
                                                                            {pay.Minimum_pay} - {pay.Maximum_pay}
                                                                        </React.Fragment>
                                                                    ))}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className='Jobdetails'>
                                                            <div className='walletFinfDetail'>
                                                                <i class="fi fi-rr-box-open"></i>
                                                            </div>
                                                            <div className='walletFindText'>
                                                                <h6>Job Type</h6>

                                                                <span> {info.job_type} </span>
                                                            </div>
                                                        </div>
                                                        <div className='Jobdetails'>
                                                            <div className='walletFinfDetail'>
                                                                <i class="fi fi-rr-clock-five"></i>
                                                            </div>
                                                            <div className='walletFindText'>
                                                                <h6>Shift Schedule</h6>
                                                                <span>{info.job_schedule} </span>
                                                            </div>
                                                        </div>
                                                        <div className='Jobdetails'>
                                                            <div className='walletFinfDetail'>
                                                                <GroupAddIcon style={{ "color": "#bf9b2f" }} />
                                                            </div>
                                                            <div className='walletFindText'>
                                                                <h6>Number of emp needed</h6>
                                                                <span>{info.Number_of_emp_needed} </span>
                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <div className='locationDetail'>
                                                            <h5>Location</h5>
                                                            <div className='Jobdetails'>
                                                                <div className='walletFinfDetail'>
                                                                    <i class="fi fi-rr-clock-five"></i>
                                                                </div>
                                                                <div className='walletFindText'>
                                                                    <h6>{info.company_address}</h6>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <div className='benefitFind'>
                                                            <h5>Benefit</h5>
                                                            <ul>
                                                                <li>
                                                                    Cell phone reimbursement

                                                                </li>
                                                                <li>
                                                                    Flexible schedule

                                                                </li>
                                                                <li>
                                                                    Paid sick time

                                                                </li>
                                                                <li>
                                                                    Work from home

                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <hr />
                                                        <div className='FullJobDes'>
                                                            <h5>Full job description</h5>
                                                            <ul>
                                                                <li>Experience-{info.Experience}Experience</li>
                                                                <li>company Industry-{info.company_Industry}</li>
                                                                <li>key qualification-{info.key_qualification}</li>
                                                                <li>{info.job_Description} </li>


                                                            </ul>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <div
                                            className="tab-pane fade"
                                            id="v-pills-profile"
                                            role="tabpanel"
                                            aria-labelledby="v-pills-profile-tab"
                                            tabIndex={0}
                                        >

                                        </div>
                                        <div class="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab" >
                                            <div
                                                className="tab-pane fade show active"
                                                id="v-pills-home"
                                                role="tabpanel"
                                                aria-labelledby="v-pills-home-tab"
                                                tabIndex={0}
                                            >

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        </>):(<>
                            <div className="align-items-start">
                            <div className='row'>
                                <div className='col-lg-6'>
                                    <div
                                        className="nav flex-column nav-pills me-3"
                                        id="v-pills-tab"
                                        role="tablist"
                                        aria-orientation="vertical"
                                    >
                                        {filterdata.map((info, index) => (
                                            <button
                                                onClick={() => handleTabClick(index)}
                                                className="nav-link"
                                                id={`v-pills-${index}-tab`}
                                                data-bs-toggle="pill"
                                                data-bs-target={`#v-pills-${index}`}
                                                type="button"
                                                role="tab"
                                                aria-controls={`v-pills-${index}`}
                                                aria-selected={activeTab === index}
                                            >
                                                <div className='CardAssigmentmAIN mt-4'>
                                                    <div>
                                                        <div className='parentAssign'>
                                                            <h4>{info.job_title}</h4>
                                                            <div class="dropdown">
                                                                <button type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                    <i class="fi fi-bs-menu-dots-vertical"></i>
                                                                </button>
                                                                {/* <ul class="dropdown-menu">
                                                                    <li><a class="dropdown-item" href="#">Action</a></li>
                                                                    <li><a class="dropdown-item" href="#">Another action</a></li>
                                                                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                                                                </ul> */}
                                                            </div>
                                                        </div>
                                                        <p>{info.company_name}</p>
                                                        <Link>{info.company_address}  </Link>
                                                        <div className='salaryButton'>
                                                            <span>
                                                                {info.salary_pay.map((pay, index) => (
                                                                    <React.Fragment key={index}>
                                                                        {pay.Minimum_pay} - {pay.Maximum_pay}
                                                                    </React.Fragment>
                                                                ))}
                                                            </span>
                                                            <span>{info.job_type} <small><sup>+1</sup></small></span>
                                                            <span>{info.job_schedule}  <small><sup>+2</sup></small> </span>
                                                        </div>
                                                        <p className='easyApply'><i class="fi fi-sr-paper-plane-top"></i>Easy Apply</p>
                                                        <ul className='listFindPage'>
                                                            <li>{info.job_Description}</li>

                                                        </ul>
                                                    </div>
                                                </div>
                                            </button>

                                        ))}
                                    </div>
                                </div>
                                <div className='col-lg-6'>
                                    <div className="tab-content" id="v-pills-tabContent">
                                        {filterdata.map((info, index) => (
                                            <div
                                                key={index}
                                                className={`tab-pane fade ${activeTab === index ? 'show active' : ''}`}
                                                id={`v-pills-${index}`}
                                                role="tabpanel"
                                                aria-labelledby={`v-pills-${index}-tab`}
                                            >
                                                <div className='CardAssigmentDetail mt-4'>
                                                    <div className='shadowDetailFind'>
                                                        <div className='parentAssign'>
                                                            <h4>{info.job_title}</h4>

                                                        </div>
                                                        <p>{info.company_name},{info.company_address}</p>
                                                        <p><span>{info.employee_email},{" "}{info.phone_no}</span>   </p>


                                                        <div className='findApplyBtn'>
                                                        <button onClick={(e) => multiStep(e, info.jobId,info.isPsychometricTest,info.psychometric_Test)}>Apply Now</button>

                                                            <button><i class="fi fi-rr-bookmark"></i></button>
                                                            <button><i class="fi fi-rr-ban"></i></button>
                                                        </div>

                                                    </div>
                                                    <div className='jobDetailSec'>
                                                        <h5>Job details</h5>
                                                        <div className='Jobdetails'>
                                                            <div className='walletFinfDetail'>
                                                                <i class="fi fi-rr-money-bills-simple"></i>
                                                            </div>
                                                            <div className='walletFindText'>
                                                                <h6>Pay</h6>
                                                                <span>
                                                                    {info.salary_pay.map((pay, index) => (
                                                                        <React.Fragment key={index}>
                                                                            {pay.Minimum_pay} - {pay.Maximum_pay}
                                                                        </React.Fragment>
                                                                    ))}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className='Jobdetails'>
                                                            <div className='walletFinfDetail'>
                                                                <i class="fi fi-rr-box-open"></i>
                                                            </div>
                                                            <div className='walletFindText'>
                                                                <h6>Job Type</h6>

                                                                <span> {info.job_type} </span>
                                                            </div>
                                                        </div>
                                                        <div className='Jobdetails'>
                                                            <div className='walletFinfDetail'>
                                                                <i class="fi fi-rr-clock-five"></i>
                                                            </div>
                                                            <div className='walletFindText'>
                                                                <h6>Shift Schedule</h6>
                                                                <span>{info.job_schedule} </span>
                                                            </div>
                                                        </div>
                                                        <div className='Jobdetails'>
                                                            <div className='walletFinfDetail'>
                                                                <GroupAddIcon style={{ "color": "#bf9b2f" }} />
                                                            </div>
                                                            <div className='walletFindText'>
                                                                <h6>Number of emp needed</h6>
                                                                <span>{info.Number_of_emp_needed} </span>
                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <div className='locationDetail'>
                                                            <h5>Location</h5>
                                                            <div className='Jobdetails'>
                                                                <div className='walletFinfDetail'>
                                                                    <i class="fi fi-rr-clock-five"></i>
                                                                </div>
                                                                <div className='walletFindText'>
                                                                    <h6>{info.company_address}</h6>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <div className='benefitFind'>
                                                            <h5>Benefit</h5>
                                                            <ul>
                                                                <li>
                                                                    Cell phone reimbursement

                                                                </li>
                                                                <li>
                                                                    Flexible schedule

                                                                </li>
                                                                <li>
                                                                    Paid sick time

                                                                </li>
                                                                <li>
                                                                    Work from home

                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <hr />
                                                        <div className='FullJobDes'>
                                                            <h5>Full job description</h5>
                                                            <ul>
                                                                <li>Experience-{info.Experience}Experience</li>
                                                                <li>company Industry-{info.company_Industry}</li>
                                                                <li>key qualification-{info.key_qualification}</li>
                                                                <li>{info.job_Description} </li>


                                                            </ul>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <div
                                            className="tab-pane fade"
                                            id="v-pills-profile"
                                            role="tabpanel"
                                            aria-labelledby="v-pills-profile-tab"
                                            tabIndex={0}
                                        >

                                        </div>
                                        <div class="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab" >
                                            <div
                                                className="tab-pane fade show active"
                                                id="v-pills-home"
                                                role="tabpanel"
                                                aria-labelledby="v-pills-home-tab"
                                                tabIndex={0}
                                            >

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        </>)}

                        {/* tab end */}
                    </div>
                </section >

            </div >
            <Footer />

        </>
    )
}

export default FindJobPage













