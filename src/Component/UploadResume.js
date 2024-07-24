import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import bgimg from '../Image/bg2.png';
import axios from 'axios';
import { baseUrl } from '../Api/BaseUrl';
import Swal from 'sweetalert2';

const UploadResume = () => {

  const initialState = {
    first_Name: '',
    last_Name: '',
    email: '',
    city: '',
    phone_no: '',
    gender: '',
    job_title: '',
    Highest_Education: '',
    candidate_status: '',
    uploadResume: null,
    home_address: '',
    location: ''
  };
  const [selectedJobTitle, setSelectedJobTitle] = useState('');
  const [data, setData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [fileError, setFileError] = useState('');

  const bannercss = { backgroundImage: `url(${bgimg})` };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if ((name === "phone_no") && value !== "" && !/^\d+$/.test(value)) {
      return;
    }

    if (type === 'file') {
      if (files[0].type !== 'application/pdf') {
        setFileError('Please upload a PDF file.');
        setData({ ...data, uploadResume: null });
      } else {
        setFileError('');
        setData({ ...data, [name]: files[0] });
      }
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const handleJobTitleChange = (event) => {
    const value = event.target.value;
    setSelectedJobTitle(value);
    setData({ ...data, location: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!data.first_Name) newErrors.first_Name = 'First name is required';
    if (!data.last_Name) newErrors.last_Name = 'Last name is required';
    if (!data.email) newErrors.email = 'Email is required';
    if (!data.city) newErrors.city = 'City is required';
    if (!data.phone_no) newErrors.phone_no = 'Phone number is required';
    if (!data.gender) newErrors.gender = 'Gender is required';
    if (!data.job_title) newErrors.job_title = 'Job title is required';
    if (!data.Highest_Education) newErrors.Highest_Education = 'Highest education is required';
    if (!data.uploadResume) newErrors.uploadResume = 'Resume is required';
    if (!data.home_address) newErrors.home_address = 'Home address is required';
    if (!selectedJobTitle) newErrors.location = 'Location is required';
    return newErrors;
  };

  const handleClick = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const postData = new FormData();
    Object.keys(data).forEach(key => {
      postData.append(key, data[key]);
    });

    axios.post(`${baseUrl}uploadResume`, postData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        Swal.fire({
          title: "Resume uploaded successfully'!",
          text: "You clicked the button!",
          icon: "success"
        });
        if (response.status === 200) {
          setErrors({});
          setData(initialState);
          setSelectedJobTitle('');
        }
      })
      .catch(error => {
        Swal.fire("Error", `${(error?.response?.data?.message)}`, "error");
      });
  };

  return (
    <div>
      <Header />
      <section>
        <div className='Page_title' style={bannercss}>
          <div className='container'>
            <div className='row'>
              <div className='col-md-12'>
                <h2>Upload Resume</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-md-10'>
              <div className='form_details'>
                <h2>Submit Your CV Here</h2>
                <div className='row align-items-center'>
                  <div className='col-md-6'>
                    <div className='mb-3'>
                      <label htmlFor="fname" className='mb-2'>First Name</label>
                      <input type='text' className='form-control' onChange={handleChange} value={data.first_Name} id='fname' name='first_Name' />
                      {errors.first_Name && <small className="text-danger">{errors.first_Name}</small>}
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='mb-3'>
                      <label htmlFor="lname" className='mb-2'>Last Name</label>
                      <input type='text' className='form-control' onChange={handleChange} value={data.last_Name} id='lname' name='last_Name' />
                      {errors.last_Name && <small className="text-danger">{errors.last_Name}</small>}
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='mb-3'>
                      <label htmlFor="email" className='mb-2'>Email</label>
                      <input type='email' className='form-control' onChange={handleChange} value={data.email} id='email' name='email' />
                      {errors.email && <small className="text-danger">{errors.email}</small>}
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='mb-3'>
                      <label htmlFor="City" className='mb-2'>City</label>
                      <input type='text' className='form-control' onChange={handleChange} value={data.city} id='City' name='city' />
                      {errors.city && <small className="text-danger">{errors.city}</small>}
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='mb-3'>
                      <label htmlFor="phoneno" className='mb-2'>Phone Number</label>
                      <input type='text' className='form-control' onChange={handleChange} value={data.phone_no} id='phoneno' name='phone_no' />
                      {errors.phone_no && <small className="text-danger">{errors.phone_no}</small>}
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='mb-3'>
                      <label htmlFor="home_address" className='mb-2'>Home Address</label>
                      <input type='text' className='form-control' onChange={handleChange} value={data.home_address} id='home_address' name='home_address' />
                      {errors.home_address && <small className="text-danger">{errors.home_address}</small>}
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='mb-3'>
                      <label htmlFor="job_title" className='mb-2'>Job Title</label>
                      <input type='text' className='form-control' onChange={handleChange} value={data.job_title} id='job_title' name='job_title' />
                      {errors.job_title && <small className="text-danger">{errors.job_title}</small>}
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='mb-3'>
                      <label htmlFor="Location" className='mb-2'>Location </label>
                      <select name="location" id="Location" className='form-control' onChange={handleJobTitleChange} value={selectedJobTitle} >
                        <option value=''>Select</option>
                        <option value="Western Area Urban">Western Area Urban</option>
                        <option value="Western Area Rural">Western Area Rural</option>
                        <option value="Bombali">Bombali</option>
                        <option value="Kailahun">Kailahun</option>
                        <option value="Kenema">Kenema</option>
                        <option value="Koinadugu">Koinadugu</option>
                        <option value="Kono">Kono</option>
                        <option value="Moyamba">Moyamba</option>
                        <option value="Port Loko">Port Loko</option>
                        <option value="Pujehun">Pujehun</option>
                        <option value="Tonkolili">Tonkolili</option>
                        <option value="Bo">Bo</option>
                        <option value="Bonthe">Bonthe</option>
                        <option value="Falaba">Falaba</option>
                        <option value="Karene">Karene</option>
                      </select>
                      {errors.location && <small className="text-danger">{errors.location}</small>}
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='mb-3'>
                      <label htmlFor="gender" className='mb-2'>Gender</label>
                      <select name="gender" id="gender" className='form-control' onChange={handleChange} value={data.gender} >
                        <option value=''>Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                      {errors.gender && <small className="text-danger">{errors.gender}</small>}
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='mb-3'>
                      <label htmlFor="education" className='mb-2'>Highest Education</label>
                      <select name="Highest_Education" id="education" className='form-control' onChange={handleChange} value={data.Highest_Education}>
                        <option value=''>Select Education</option>
                        <option value="Masters">Masters</option>
                        <option value="Degree">Degree</option>
                        <option value="Diploma">Diploma</option>
                        <option value="High School Certificate">High School Certificate</option>
                      </select>
                      {errors.Highest_Education && <small className="text-danger">{errors.Highest_Education}</small>}
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='mb-3'>
                      <label htmlFor="cstatus" className='mb-2'>Candidate Status</label>
                      <select name="candidate_status" id="cstatus" className='form-control' onChange={handleChange} value={data.candidate_status}>
                        <option value=''>Select Status</option>
                        <option value="1">Available</option>
                        <option value="0">Not Available</option>
                      </select>
                      {errors.candidate_status && <small className="text-danger">{errors.candidate_status}</small>}
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='mb-3'>
                      <label htmlFor="formFile" className='mb-2'>Upload Resume</label>
                      <input className="form-control" type="file" id="formFile" onChange={handleChange} name="uploadResume" />
                      {fileError && <small className="text-danger">{fileError}</small>}
                      {errors.uploadResume && <small className="text-danger">{errors.uploadResume}</small>}
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='mb-3'>
                      <button className="btn btn-primary" onClick={handleClick}>Submit</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default UploadResume;
