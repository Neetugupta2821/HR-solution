import { React, useState,useEffect } from 'react'
import Header from './Header'
import partner from '../Image/WARD-Logo-Horizontal.jpg'
import Footer from './Footer'
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Banner from "../Image/onlineCourse.jpg"
import coursesImg from "../Image/course.jpg"
import coursesImg2 from "../Image/online-course.png"
import { Link } from 'react-router-dom';
import course1 from "../Image/course1.webp"
import OnlineIcon1 from "../Image/1.webp"
import pech from '../Image/pecb-logo.jpg'
import { baseUrl } from '../Api/BaseUrl';
import axios from 'axios';
const OnlineCourses = () => {
    // const navigate = useNavigate();
    // const openCourse = () => { 
    //     navigate('/https://worldacademy.uk/');
    // }
    const [value, setValue] = useState(2);
    const [sec, setSecond] = useState(2);
    const [third, setThird] = useState(2);
    const[online,setOnline] =useState('')

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleGetCmslabourToolDetails  = () => {
        axios.get(`${baseUrl}get_cms_online_courses_details`)
          .then((response) => {
            console.log(response);
            setOnline(response.data.Details)

          })
          .catch((error) => {
            console.log(error);
          });
      };
    
      useEffect(() => {
        handleGetCmslabourToolDetails()
      }, []);
      const renderHTML = (html) => {
        return { __html: html };
      };
    return (
        <div>
            <Header />
            <section className="gridBanner" style={{ backgroundImage: `url(${Banner})` }}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="container">
                            <div className="row">
                                <h2> Online Courses </h2>
                                <p className='mt-2'>Enhance your skills with our comprehensive online courses from our partners.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="onlineSec pt-50 pb-50">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5 col-md-5">
                            <div className="courseImg">
                                <img src={coursesImg} alt="" />
                            </div>
                        </div>
                        <div className="col-lg-7 d-flex align-items-center col-md-7">
                            <div className='OnlineText'>
                                <h2>{online.Heading}</h2>
                                <p dangerouslySetInnerHTML={renderHTML(online.Description)}></p>
                                 
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="features-section text-center pt-50 ">
                <div className="container features-content">
                    <h2 className="mb-5 lrBorder">Key Features</h2>
                    <div className="row">
                        <div className="col-md-6 col-lg-4 feature-card">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="feature-title">Flexible Learning</h5>
                                    <p>Access courses anytime, anywhere, at your own pace, fitting seamlessly into your schedule.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 feature-card">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="feature-title">Expert Instructors</h5>
                                    <p>Learn from seasoned professionals with extensive experience in their respective fields, ensuring high-quality, relevant content.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 feature-card">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="feature-title">Diverse Topics</h5>
                                    <p>Explore a variety of courses covering essential areas such as HR management, leadership, project management, and more.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 feature-card">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="feature-title">Interactive Content</h5>
                                    <p>Engage with interactive modules, quizzes, and assignments that reinforce learning and practical application.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 feature-card">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="feature-title">Certification</h5>
                                    <p>Earn certificates upon completion, enhancing your credentials and career prospects.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="onlineSec pt-50 pb-50 mb-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7  col-md-8 d-flex align-items-center">
                            <div className='OnlineText'>
                                <h2>Why Choose Our <span>Online Courses ?</span></h2>
                                <p>Our online courses are designed to provide you with the knowledge and skills needed to excel in today's competitive environment. By partnering with international learning institutions, we ensure that you receive globally recognised education that meets the highest standards. Whether you're looking to upskill yourself, train your team, or stay updated with the latest industry trends, our courses offer valuable insights and practical tools to help you succeed.</p>
                                <p><strong>Start Learning Today</strong></p>
                                <p>Unlock your potential with Smart Start SL Ltd.'s online courses. Browse our course catalog, enroll today, and take the first step towards achieving your professional aspirations.</p>
                            </div>
                        </div>
                        <div className="col-lg-5 col-md-4">
                            <div className="courseImg">
                                <img src={coursesImg2} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="cardOnlinesec pb-50">
                <div className="container">
                    <div className="row">
                        <h2 className='lrBorder'>Find your courses</h2>
                    </div>
                    <div className="row pt-50 justify-content-around">
                        <div className="col-md-5">
                            <div className="cardMainOnline">
                                <div className="cardOlineImg">
                                    <img src={pech} alt="" />
                                </div>
                                <div className="cardContentCourse">
                                    <div className="parentTitle">
                                        <img src={OnlineIcon1} alt="" />
                                        <p>Nancy Reyes</p>
                                    </div>
                                    <h4> ISO/IEC 42001 Lead Implementer and Lead Auditor Training Courses</h4>
                                </div>
                                <div className="onlineBottom">
                                    <div className="bannerBtnHome ">
                                        <Link to="https://pecb.com/"><button>  Read More <i class="fi fi-sr-arrow-right"></i> </button>
                                        </Link> </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className="cardMainOnline">
                                <div className="cardOlineImg">
                                    <img src={partner} alt="" />
                                </div>
                                <div className="cardContentCourse">
                                    <div className="parentTitle">
                                        <img src={OnlineIcon1} alt="" />
                                        <p>Nancy Reyes</p>
                                    </div>
                                    <h4>
                                        World Academy For Research and Development
                                    </h4>
                                </div>
                                <div className="onlineBottom">
                                    <div className="bannerBtnHome ">
                                        <Link to="https://www.worldacademy.uk/"><button>  Read More <i class="fi fi-sr-arrow-right"></i> </button>
                                        </Link> </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default OnlineCourses
