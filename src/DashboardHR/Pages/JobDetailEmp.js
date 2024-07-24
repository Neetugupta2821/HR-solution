import React, { useEffect, useState } from "react";
import "./JobDetailEmp.css";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import axios from "axios";
import moment from "moment";
import { usePDF } from "react-to-pdf";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Swal from 'sweetalert2'
import { useLocation } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { baseUrl } from "../../Api/BaseUrl";
import InputLabel from '@mui/material/InputLabel';

export default function JobDetailEmp() {
  const location = useLocation();
  console.log(location.state.response);
  const [rows, setRows] = useState([]);
  const [seekerStatus, setSeekerStatus] = React.useState({});
  const selectedUser = location.state.response.filter((item) => {
    return item.jobId === location.state.id;
  });

  const getData = selectedUser[0];
  console.log(getData);


  const handleFemaleJob = () => {
    axios.get(`${baseUrl}get_jobseeker_profile/${getData.jobId}`).then((response) => {
      console.log(response.data.Details)
      setRows(response.data.Details)
    }).catch((error) => {
      console.log(error)
    })
  }
  useEffect(() => {
    handleFemaleJob()
  }, [])
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  const handleChange = (event, id) => {
    const { value } = event.target;
    setSeekerStatus(prevState => ({
        ...prevState,
        [id]: value
    }));
    axios.post(`${baseUrl}candidate_recruitment_process/${id}`, {
        seeker_status: value
    }).then((res) => {
        console.log(res);
        Swal.fire({
            title: `${res.data.message}`,
            text: "You clicked the button!",
            icon: "success"
        });
        handleFemaleJob()
    }).catch((error) => {
        console.log(error);
    });
};
  return (
    <>
      {/*Detail of clicked job [English]*/}
      <h2 className="ps-4">Male</h2>
      <div className="container emp-profile" ref={targetRef}>
        <form method="post">
          <div className="row">
            <div className="col-md-12">
              <div className="profile-head">
                <h5>
                  {/* {getData.first_name} {getData.last_name}{" "} */}
                </h5>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="home-tab"
                      data-toggle="tab"
                      href="#home"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                    >
                      Job Details
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row ps-3">
            <div className="col-md-8">
              <div className="tab-content profile-tab" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <label>Job Id</label>
                    </div>
                    <div className="col-md-6">
                      {getData._id ? <p>{getData._id}</p> : <p>_</p>}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label>Job title</label>
                    </div>
                    <div className="col-md-6">
                      {getData.job_title ? (
                        <p>{getData.job_title}</p>
                      ) : (
                        <p>_</p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Company name</label>
                    </div>
                    <div className="col-md-6">
                      {getData.company_name ? (
                        <p>{getData.company_name}</p>
                      ) : (
                        <p>_</p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Number of emp needed</label>
                    </div>
                    <div className="col-md-6">
                      {getData.Number_of_emp_needed ? (
                        <p>{getData.Number_of_emp_needed}</p>
                      ) : (
                        <p>_</p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Job type</label>
                    </div>
                    <div className="col-md-6">
                      {getData.job_type ? (
                        <p>{getData.job_type}</p>
                      ) : (
                        <p>_</p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Job schedule</label>
                    </div>
                    <div className="col-md-6 mb-2">
                      {getData.job_schedule ? (
                        <p>{getData.job_schedule}</p>
                      ) : (
                        <p>_</p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Salary pay</label>
                    </div>
                    <div className="col-md-6">
                      {getData.salary_pay ? <p>{getData.salary_pay}</p> : <p>_</p>}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Job Description</label>
                    </div>
                    <div className="col-md-6">
                      {getData.job_Description ? (
                        <p>{getData.job_Description}</p>
                      ) : (
                        <p>_</p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Company address</label>
                    </div>
                    <div className="col-md-6">
                      {getData.company_address ? (
                        <p>{getData.company_address}</p>
                      ) : (
                        <p>_</p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Employee_email</label>
                    </div>
                    <div className="col-md-6">
                      {getData.employee_email ? (
                        <p>{getData.employee_email}</p>
                      ) : (
                        <p>_</p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Requirement timeline</label>
                    </div>
                    <div className="col-md-6">
                      {getData.requirement_timeline ? (
                        <p>{getData.requirement_timeline}</p>
                      ) : (
                        <p>_</p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>StartDate</label>
                    </div>
                    <div className="col-md-6">
                      {getData.startDate ? (
                        <p>{getData.startDate}</p>
                      ) : (
                        <p>_</p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>endDate</label>
                    </div>
                    <div className="col-md-6">
                      {getData.endDate ? (
                        <p>{getData.endDate}</p>
                      ) : (
                        <p>_</p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>phone_no</label>
                    </div>
                    <div className="col-md-6">
                      {getData.phone_no ? (
                        <p>{getData.phone_no}</p>
                      ) : (
                        <p>_</p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Experience</label>
                    </div>
                    <div className="col-md-6">
                      {getData.Experience ? (
                        <p>{getData.Experience}</p>
                      ) : (
                        <p>_</p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Template type</label>
                    </div>
                    <div className="col-md-6">
                      {getData.template_type ? (
                        <p>{getData.template_type}</p>
                      ) : (
                        <p>_</p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Company Industry</label>
                    </div>
                    <div className="col-md-6">
                      {getData.company_Industry ? (
                        <p>{getData.company_Industry}</p>
                      ) : (
                        <p>_</p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Status</label>
                    </div>
                    <div className="col-md-6">
                      {getData.status == "0" ? (
                        <p
                          className="mb-2 mr-2 badge"
                          style={{
                            color: "#ffffff",
                            backgroundColor: "#29cc97",
                            position: "static",

                          }}
                        >
                          InActive
                        </p>
                      ) : (
                        <p
                          className="mb-2 mr-2 badge "
                          style={{
                            color: "#ffffff",
                            backgroundColor: "red",
                            position: "static",
                          }}
                        >
                          Active
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className="ms-invoice-table table-responsive mt-4 px-3">

          <h5 className="mb-4">Total apply jobs List</h5>
          <table className="table table-hover text-right thead-light">
            <thead>
              <tr className="text-capitalize">
                <th className="text-center w-5 common_style">S. No.</th>
                <th className="text-left common_style">Name</th>
                <th className="common_style">User Email</th>
                <th className="common_style">Phone No</th>

                <th className="common_style"> Date</th>
                <th className="common_style"> Resume</th>
              </tr>
            </thead>
            <tbody>
              {rows.length > 0 ? (
                rows.map((row, i) => (
                  <tr key={i}>
                    <td className="text-center common_style">{i + 1}</td>
                    <td className="text-left common_style">{row.first_Name}</td>
                    <td className="common_style">{row.user_Email}</td>
                    <td className="common_style">{row.phone_no}</td>


                    <td className="common_style">
                      {moment(row.createdAt).format("LLL")}
                    </td>
                    <td className="common_style">
                      {row.resume ? (
                        <a
                          href={"http://192.168.1.54:4101/" + row.resume}
                          target="Loading Pdf file"
                          rel="noreferrer"
                        >
                          <PictureAsPdfIcon />
                        </a>
                      ) : (
                        "_"
                      )}
                    </td>
                    <td className="common_style">{row.jobSeeker_status === 1?"Pending":row.jobSeeker_status === 2?"Schedule Interview":row.jobSeeker_status===3?"Assessment":row.jobSeeker_status===4?"HR_Discussion":row.jobSeeker_status===5?"Complete":row.jobSeeker_status===6?"Shortlist":row.jobSeeker_status===7?"Reject":null}</td>
                    <td>
                      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id={`demo-select-small-label-${i}`}>Seeker Status</InputLabel>
                        <Select
                          labelId={`demo-select-small-label-${i}`}
                          id={`demo-select-small-${i}`}
                          value={seekerStatus[row._id] || ''} // Set the value from state
                          label="Seeker Status"
                          onChange={(event) => handleChange(event, row._id)}
                        >
                          <MenuItem value="Pending">Pending</MenuItem>
                          <MenuItem value="schedule_Interview">Schedule Interview</MenuItem>
                          <MenuItem value="assessment">Assessment</MenuItem>
                          <MenuItem value="HR_Discussion">HR Discussion</MenuItem>
                          <MenuItem value="complete">Complete</MenuItem>
                          <MenuItem value="shortlist">Shortlist</MenuItem>
                          <MenuItem value="reject">Reject</MenuItem>
                        </Select>
                      </FormControl>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6"><h3 className="text-center">No Jobs Apply</h3></td> 
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="invoice-buttons text-end">
        {" "}
        <a onClick={() => toPDF()} className="btn_invoice btn btn-primary">
          Download pdf
        </a>
      </div>
    </>
  )
}
