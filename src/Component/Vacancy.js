import React, { useState, useEffect } from 'react';
import Banner from "../Image/vacancyBanner.webp";
import one from '../Image/01.webp';
import Header from './Header';
import Footer from './Footer';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { baseUrl } from '../Api/BaseUrl';
import axios from 'axios';
import TablePagination from '@mui/material/TablePagination';
import moment from "moment";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import WhatsApp_img from '../Image/whtsp.png'

const top100Films = [
    'Western Area Urban',
    'Western Area Rural',
    'Bombali',
    'Bonthe',
    'Kailahun',
    'Kambia',
    'Kenema',
    'Koinadugu',
    'Kono',
    'Moyamba',
    'Port Loko',
    'Pujehun',
    'Tonkolili',
    'Bo',
    'Karene',
    'Falaba',
    'Noida',
    'noida',
    'Tonkolili , Sierra leone',
    'pvtrio tech',
    'CDRT.ltd',
    'Bombali , Sierra leone'
];

const Vacancy = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rows, setRows] = useState([]);
    const [jobTitles, setJobTitles] = useState([]);
    const [selectedJobTitle, setSelectedJobTitle] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [filter, setFilter] = useState([]);

    const handleChangePage = (event, newPage) => {
        console.log('Changing page to:', newPage);
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        console.log('Changing rows per page to:', newRowsPerPage);
        setRowsPerPage(newRowsPerPage);
        setPage(0);
    };

    const handleRecentJob = () => {
        axios.get(`${baseUrl}getAll_Jobs?job_status=1`)
            .then((response) => {
                console.log('Fetched job data:', response.data.allJobs);
                setRows(response.data.allJobs);
            })
            .catch((error) => {
                console.error('Error fetching jobs:', error);
            });
    };

    const fetchJobTitles = () => {
        axios.get(`${baseUrl}alljobTitle`)
            .then((response) => {
                console.log(response.data.details);
                const option = response.data.details.map((info) => info.jobTitle);
                console.log(option);
                setJobTitles(option);
            })
            .catch((error) => {
                console.error('Error fetching job titles:', error);
            });
    };

    useEffect(() => {
        handleRecentJob();
        fetchJobTitles();
    }, []);

    const handleJobTitleChange = (event, value) => {
        setSelectedJobTitle(value);
    };

    const handleJobLocationChange = (event, value) => {
        setSelectedLocation(value);
    };

    const handleSearchJobData = () => {
        axios.post(`${baseUrl}searchJob`, {
            job_title: selectedJobTitle,
            company_address: selectedLocation
        }).then((response) => {
            console.log(response.data.Details);
            setFilter(response.data.Details);
            if (response.status === 200) {
                setSelectedJobTitle(" ")
                setSelectedLocation("")
            }
        }).catch((error) => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${error.response.data.message}`,
            });
        });
    };

    const displayedRows = (selectedJobTitle || selectedLocation ? filter : rows).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    console.log('Displayed rows:', displayedRows);
    console.log('Selected Job Title:', selectedJobTitle);
    console.log('Selected Location:', selectedLocation);

    const addJobsData = (JOBid) => {
        console.log(JOBid);
        navigate("/JobDetailpage", { state: JOBid });
    };

    return (
        <div>
            <Header />
            <section className="gridBanner" style={{ backgroundImage: `url(${Banner})` }}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="container">
                            <div className="row">
                                <h2> Vacancy </h2>
                                <p className='mt-2'>Find your next job here </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='container mt-5'>
                <Link to="https://chat.whatsapp.com/ICzrvs7FxGVFusmG9hdLo2">
                    <marquee width="100%" direction="right" height="100px">
                        <div className='d-flex justify-content-center align-items-center'>
                            <div className='wp_banner_img'>
                                <img src={WhatsApp_img} />
                            </div>
                            <div className='wp_banner_content'>
                                <p>Get updates on vacancies</p>
                            </div>
                        </div>
                    </marquee>
                </Link>
            </section>
            <section className="selectFilterSec pt-50">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <Autocomplete
                                disablePortal
                                id="combo-box-job-title"
                                options={jobTitles}
                                value={selectedJobTitle}
                                onChange={handleJobTitleChange}
                                sx={{ marginTop: 2 }}
                                renderInput={(params) => <TextField {...params} label="Job Title" />}
                            />
                        </div>
                        <div className="col-lg-4">
                            <Autocomplete
                                disablePortal
                                id="combo-box-job-location"
                                options={top100Films}
                                value={selectedLocation}
                                onChange={handleJobLocationChange}
                                sx={{ marginTop: 2 }}
                                renderInput={(params) => <TextField {...params} label="Job Location" />}
                            />
                        </div>
                        <div className="col-lg-4">
                            <div className="FindJob">
                                <button className="b-btn job_area_btn mt-3" href="job-grid" onClick={handleSearchJobData}>
                                    Find Jobs Now <i className="fi fi-sr-arrow-right" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="allJobSec pt-30">
                <div className="container">
                    <div className="row">
                        {displayedRows.map((info) => {
                            const daysLeft = moment(info.endDate).diff(moment(), 'days');
                            return (
                                <div className="col-lg-6" key={info.id}>
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
                                                <img src={info.job_image ? "http://13.51.205.211:4101/" + info.job_image : one} alt="Job" />
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
                                                    Experience: {info.Experience}
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
                        <TablePagination
                            component="div"
                            count={selectedJobTitle || selectedLocation ? filter.length : rows.length}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default Vacancy;