import React from 'react';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { baseUrl } from '../Api/BaseUrl';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';

export default function Popular() {
  const [jobtitle, setJobtitle] = useState([]);
  const navigate = useNavigate();

  const handelGetAllJobtitle = () => {
    axios.get(`${baseUrl}all_active_jobs_Count_with_title`).then((response) => {
        
        console.log(response.data.jobTitleCounts);
        setJobtitle(response.data.jobTitleCounts);
      
    }).catch((error) => {
      console.error('Error fetching job titles:', error);
    });
  };

  useEffect(() => {
    handelGetAllJobtitle();
  }, []);

  const handleGetsearchData = (jobtitle) => {
    axios.post(`${baseUrl}searchJob`, {
      job_title: jobtitle,
      company_address: ""
    }).then((response) => {
      console.log(response.data);

      if (response.status === 200) {
        navigate("/FindJobPage", { state: { data: response.data, title: jobtitle, location: "" } });
      }
    }).catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response?.data?.message || 'An error occurred'}`,
      });
    });
  };

  return (
    <>
      <div className="categories-area pt-80 grey-bg pb-50 wow fadeInDown">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-6 offset-lg-3 offset-xl-3">
              <div className="section-title text-center ml-50 mr-50 mb-45">
                <h2>Discover your next career move with our job portal!</h2>
                <p>
                  Explore diverse job listings across all industries. Streamline your search and apply with ease. Start your journey today!
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            {jobtitle.slice(0,9).map((info) => (
              <div className="col-xl-4 col-lg-6 col-md-12 mb-30" key={info.id}>
                <div className="categories-wrapper pos-rel">
                  <div className="categories-icon f-left">
                    <WorkOutlineOutlinedIcon style={{"color":"#bf9b2f"}}/>
                  </div>
                  <div className="categories-text">
                    <h4>{info.title}</h4>
                    <span>{info.count} Available Jobs</span>
                  </div>
                  <div className="cat-button">
                    <a  style={{"text-transform":"uppercase"}} onClick={() => handleGetsearchData(info.title)}>
                      <ArrowRightAltIcon />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
