import React from 'react';
import one from '../Image/01.webp';
import two from '../Image/02.webp';
import three from '../Image/03.webp';
import four from '../Image/04.webp';
import five from '../Image/05.webp';
import six from '../Image/06.webp';
import { baseUrl } from '../Api/BaseUrl';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

export default function RecentJobs() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);

  const handleResentJob = () => {
    axios.get(`${baseUrl}getAll_Jobs?job_status=${1}`).then((response) => {
      console.log(response.data.allJobs, 'this is the getAll job data');
      setRows(response.data.allJobs);
    }).catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    handleResentJob();
  }, []);

  const addJobsData = (JOBid) => {
    console.log(JOBid);
    navigate("/JobDetailpage", { state: JOBid });
  };

  const showAllJob = () => {
    navigate("/showjobs");
  }

  return (
    <section className="pt-80">
      <div className="container">
        <div className="row wow fadeInDown">
          <div className="col-lg-5 col-md-6">
            <div className="section-title">
              <h2>35k+ Recent Jobs Available</h2>
              <p>
                Unlock over 35,000 recent job opportunities waiting for your
                expertise. Our job portal curates a dynamic list of openings
              </p>
            </div>
          </div>
          <div className="col-lg-7 col-md-6">
            <div className="section-bt">
              <button onClick={showAllJob} className="b-btn job_area_btn" href="job-grid">
                Browse All Jobs <i className="fi fi-sr-arrow-right" />
              </button>
            </div>
          </div>
        </div>
        <div className="row pt-50 wow fadeInDown">
          {rows.slice(0, 5).map((info) => {
            const daysLeft = moment(info.endDate).diff(moment(), 'days');
            return (
              <div className="col-lg-6" key={info.jobId}>
                <div className="job-wrapper mb-30">
                  <div className="">
                    <div>
                      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-30">
                        <div className="job-tag">
                          <span className="tag-normal">{info.job_type}</span>
                          <span className="tag-urgent">urgent</span>
                        </div>
                        <div className="posted_time">
                          <span>
                            <i className="fi fi-rr-calendar" />{moment(info.endDate).format('LL')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="job-instructor-profile mb-30">
                    <div className="job-instructor-img f-left">
                      <img  src={info.job_image? "http://13.51.205.211:4101/" + info.job_image:one} alt="Job" />
                    </div>
                    <div className="job-instructor-title">
                      <h4>
                        <a href="/job-details/1">{info.job_title}</a>
                      </h4>
                      <a className="company_name" href="/employer-details">
                        {info.company_name} <i className="fi fi-rs-award" />
                      </a>
                      <span>
                        <i className="fi fi-rr-marker" />
                        {info.company_address}
                      </span>
                    </div>
                  </div>
                  <div className="job-content">
                    <div className="experience_sallary d-flex flex-wrap">
                      <span>
                        <i className="fi fi-rs-briefcase" />
                        Experience :  {info.Experience}
                      </span>
                    </div>
                    <div className="skills_tags mt-30 mb-30">
                      <p> Photoshop </p>
                      <p> Illustrator </p>
                    </div>
                    <div className="job-salary dead_line">
                      <span>
                        <i className="fi fi-rs-clock-three" />
                        {daysLeft} Days Left To Apply
                      </span>
                      <a onClick={() => addJobsData(info.jobId)}>
                        Job Details <i className="fi fi-sr-arrow-right" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  )
}
