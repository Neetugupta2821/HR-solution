import React, { useEffect, useState } from 'react';
import Header from './Header'
import Footer from './Footer'
import bgimg from '../Image/bg2.png'
import candidatesimg from '../Image/candidate-1.png'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { baseUrl } from '../Api/BaseUrl';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';


const SuccessfulCandidates = () => {
  const bannercss = { backgroundImage: `url(${bgimg})` };
  const [data, setData] = useState([])
  useEffect(() => {
    getdata()
  }, [])


  const getdata = () => {
    axios.get(`${baseUrl}get_successfull_candidate`).then((response) => {
      console.log(response.data.Details)
      setData(response.data.Details)
    }).catch((error) => {
      console.log(error.response.data)
    })
  }
  return (
    <div>
      <Header />
      <section>
        <div className='Page_title' style={bannercss}>
          <div className='container'>
            <div className='row'>
              <div className='col-md-12'>
                <h2>Successful Candidates</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='Select_candidates'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8'>
              <div className='row'>
                {data.map((info) => (
                  <div className='col-md-12'>
                    <div className='Select_candidates_inner'>
                      <div className='d-flex align-items-center'>
                        <div className='candidates_img'>
                          <img src="https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png" alt='' />
                        </div>
                        <div>
                          <h4 className='name'>{info.first_Name}</h4>
                          <ul className="candidate-info">
                            <li className="designation">{info.job_Heading}</li>
                            <li><i className="icon fi fi-rr-marker"></i>{info.city}</li>
                            <li><EmailOutlinedIcon/>{info.user_Email}</li>
                          </ul>
                          <ul class="post-tags">
                          <li><a href=" ">{info.gender}</a></li>
                            <li><a href=" ">{info.Highest_Education}</a></li>
                            <li><a href=" ">{info.job_Heading}</a></li>
                          </ul>
                        </div>
                      </div>
                      {/* <div>
                        <button class="bookmark-btn me-2">
                          <i class="fi fi-br-bookmark"></i>
                        </button>
                        <Link to='/ViewProfile'>
                          <a href='#' >
                            <span className='view_btn'>View Profile</span>
                          </a>
                        </Link>
                      </div> */}
                    </div>
                  </div>

                ))}



              </div>
              {/* <div className="ls-show-more">
                <p>Showing 36 of 497 Jobs</p>
                <div className="progress" role="progressbar" aria-label="Success example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                  <div className="progress-bar bg-success" style={{ width: '25%' }}></div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default SuccessfulCandidates