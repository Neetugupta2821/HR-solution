import React from 'react'
import icone1 from '../Image/icon-1.webp'
import needJob from '../Image/needJob.png'
import icone2 from '../Image/icon-3.webp'
import icone3 from '../Image/icon-2.webp'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { baseUrl } from '../../Api/BaseUrl'
import { useNavigate } from 'react-router-dom'
import  candidates from '../Image/candidates.png'
import delivery from '../Image/delivery.png'
import recruitment from '../Image/recruitment.png'
 

export default function Client_Pagedata() {
    const [heade, setHeade] = useState([])
    const [job, setJob] = useState([])
    const [post, setPost] = useState([])
    const [market, setMarket] = useState([])
    const navigate = useNavigate()
    const handleHeaderdata = () => {
        axios.get(`${baseUrl}cms_getJobs_posted_procedure_section1`).then((res) => {
            // console.log(res.data.Details)
            setHeade(res.data.Details)
        }).catch((error) => {
            console.log(error)
        })
    }
    const handleJobdata = () => {
        axios.get(`${baseUrl}cms_get_need_any_job_section`).then((res) => {
            // console.log(res.data.Details)
            setJob(res.data.Details)

        }).catch((error) => {
            console.log(error)
        })
    }
    const handlePOstdata = () => {
        axios.get(`${baseUrl}get_cms_post_your_job`).then((res) => {
            // console.log(res.data.Details)
            setPost(res.data.Details)

        }).catch((error) => {
            console.log(error)
        })
    }
    const handleMarketData = () => {
        axios.get(`${baseUrl}cms_getjob_market_data`).then((res) => {
            // console.log(res.data.Details)
            setMarket(res.data.Details)

        }).catch((error) => {
            console.log(error)
        })
    }
    useEffect(() => {
        handleHeaderdata()
        handleJobdata()
        handlePOstdata()
        handleMarketData()
    }, [])

    const handleclicknavi = () => {
        navigate('/showjobs')
    }
    const handleclickApply = () => {
        navigate('/Signin')
    }
    const handleUploadResume = () => {
        navigate('/UploadResume')
    }
    return (
        <section className="services__area pt-80 pb-50">
            <div className="container">
                <div className="row wow fadeInDown">
                    <div className="col-xl-6 offset-xl-3 col-lg-6 offset-lg-3 col-md-10 offset-md-1 my-3">

                        <div className="section-title text-center mb-45">
                            <h2>Seamless Solutions!</h2>
                            <p>
                                Unlock the full potential of your recruitment process with Smart Start SL Ltd. Our cutting-edge services include
                            </p>
                        </div>


                    </div>
                </div>
                <div className="row">
                    <div
                        className="col-xl-4 col-lg-4 col-md-6 col-sm-12 wow fadeOut my-3"
                        data-wow-delay="100ms"
                    >

                        <div className="services__item grey-bg transition-3 text-center">
                            <div
                                className="services__shape transition-3"
                                style={{ backgroundImage: `url(${needJob})` }}
                            />
                            <div className="services__icon mb-25">
                                <img src={icone1} alt="" />
                            </div>
                            <div className="services__content">
                                <h2>Applicant Tracking System </h2>
                                <p>
                                    {" "}
                                    Streamline your hiring process with our state-of-the-art ATS, designed for efficiency and precision{" "}
                                </p>
                                {/* <p className="b-btn b-btn-green" onClick={handleclicknavi}  >
                                     Next <i className="fi fi-sr-arrow-right" />
                                </p> */}
                            </div>
                        </div>



                    </div>
                    <div
                        className="col-xl-4 col-lg-4 col-md-6  col-sm-12wow fadeOut my-3"
                        data-wow-delay="500ms"
                    >

                        <div className="services__item grey-bg transition-3 text-center ">
                            <div
                                className="services__shape transition-3"
                                style={{ backgroundImage: `url(${needJob})` }}
                            />
                            <div className="services__icon mb-25">
                                <img src={candidates} alt="" />
                            </div>

                            <div className="services__content">
                                <h2>Elite Female Candidates</h2>
                                <p>
                                    {" "}
                                    Access a curated pool of top-tier female professionals ready to elevate your organisation.{" "}
                                </p>
                                {/* <p className="b-btn b-btn-green" onClick={handleclickApply} >
                                Next <i className="fi fi-sr-arrow-right" />
                                </p> */}
                            </div>
                        </div>

                    </div>
                    <div
                        className="col-xl-4 col-lg-4 col-md-6  col-sm-12 wow fadeOut my-3"
                        data-wow-delay="1000ms"
                    >

                        <div className="services__item grey-bg transition-3 text-center ">
                            <div
                                className="services__shape transition-3"
                                style={{ backgroundImage: `url(${needJob})` }}
                            />
                            <div className="services__icon mb-25">
                                <img src={delivery} alt="" />
                            </div>
                            <div className="services__content">
                                <h2>Comprehensive CV Database</h2>
                                <p>
                                    {" "}
                                    Tap into our extensive CV database to find the perfect match for your job openings{" "}
                                </p>
                                {/* <p className="b-btn b-btn-green" onClick={handleUploadResume} >
                                Next<i className="fi fi-sr-arrow-right" />
                                </p> */}
                            </div>
                        </div>

                    </div>
                    <div
                        className="col-xl-4 col-lg-4 col-md-6 col-sm-12  wow fadeOut my-3"
                        data-wow-delay="1000ms"
                    >

                        <div className="services__item grey-bg transition-3 text-center ">
                            <div
                                className="services__shape transition-3"
                                style={{ backgroundImage: `url(${needJob})` }}
                            />
                            <div className="services__icon mb-25">
                                <img src={icone2} alt="" />
                            </div>
                            <div className="services__content">
                                <h2>Detailed Recruitment Reports</h2>
                                <p>
                                    {" "}
                                    Gain insights and analytics to make informed hiring decisions with our comprehensive recruitment reports{" "}
                                </p>
                                {/* <p className="b-btn b-btn-green" onClick={handleUploadResume} >
                                Next<i className="fi fi-sr-arrow-right" />
                                </p> */}
                            </div>
                        </div>

                    </div>
                    <div
                        className="col-xl-4 col-lg-4 col-md-6  col-sm-12 wow fadeOut my-3"
                        data-wow-delay="1000ms"
                    >

                        <div className="services__item grey-bg transition-3 text-center ">
                            <div
                                className="services__shape transition-3"
                                style={{ backgroundImage: `url(${needJob})` }}
                            />
                            <div className="services__icon mb-25">
                                <img src={recruitment} alt="" />
                            </div>
                            <div className="services__content">
                                <h2>Psychometric Testing</h2>
                                <p>
                                    {" "}
                                    Ensure the right fit for your team with our reliable psychometric assessments.{" "}
                                </p>
                                {/* <p className="b-btn b-btn-green" onClick={handleUploadResume} >
                                Next<i className="fi fi-sr-arrow-right" />
                                </p> */}
                            </div>
                        </div>

                    </div>
                    <div
                        className="col-xl-4 col-lg-4 col-md-6  col-sm-12 wow fadeOut my-3"
                        data-wow-delay="1000ms"
                    >

                        <div className="services__item grey-bg transition-3 text-center ">
                            <div
                                className="services__shape transition-3"
                                style={{ backgroundImage: `url(${needJob})` }}
                            />
                            <div className="services__icon mb-25">
                                <img src={icone3} alt="" />
                            </div>
                            <div className="services__content">
                                <h2>Job Description Database</h2>
                                <p>
                                    {" "}
                                    Utilise our extensive job description database to create clear and effective job postings.
                                    Experience seamless recruitment and attract top talent with Smart Start SL Ltd. – your partner in HR excellence.
                                    {" "}
                                </p>
                                {/* <p className="b-btn b-btn-green" onClick={handleUploadResume} >
                                Next<i className="fi fi-sr-arrow-right" />
                                </p> */}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>

    )
}
