import React, { useEffect, useState } from 'react'
import blogImage from '../Image/blogcard2.webp'
import blogcard from '../Image/blogcard3.png'
import bannerhome from '../Image/bannerHome2.jpg'
import bannerHome2 from '../Image/bannerHome3.jpg'
import bannerBlog from '../Image/bannerBlog.jpg'
import Banner from "../Image/onlineCourse.jpg"
import Header from './Header'
import Footer from './Footer'
import { baseUrl } from '../Api/BaseUrl'
import axios from 'axios'
import { common } from '@mui/material/colors'
import { Link } from 'react-router-dom'

export default function Blog() {
  const [blog, setBlog] = useState([])
  const handelBlogData = () => {
    axios.get(`${baseUrl}getBlogDetails`).then((response) => {
      console.log(response.data.Blogs)
      setBlog(response.data.Blogs)
    }).catch((error) => {
      console.log(error)
    })
  }
  useEffect(() => {
    handelBlogData()
  }, [])
  return (
    <>
      <Header />
      {/* nav end */}
      <section className="gridBanner" style={{ backgroundImage: `url(${bannerHome2})` }}>
        <div className="container-fluid">
          <div className="row">
            <div className="container">
              <div className="row">
                <h2>Blog </h2>
                <p className='mt-2'>Insights and Updates from the HR World. 
                  </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="blogCardSec">
        <div className="container">
          <div className="row">
            {blog.map((info) => (
              <div className="col-lg-4 pe-3">
                <div className="cardBlog">
                  <div className="blogCardImg">
                    <img s src={"http://13.51.205.211:4101/" + info.photo} alt="" />
                  </div>
                  <small className="postBlog">{info.name}</small>
                  <div className="contentBlogCard">
                    <h5>{info.Heading}</h5>
                    <p>
                      {info.Description}
                    </p>
                  </div>
                  <div className="bannerBtnHome">
                   <Link to='/BlogDetails' state={{data:blog,id:info._id}}><button> See More </button></Link>  
                  </div>
                </div>
              </div>

            ))}



          </div>

        </div>
      </section>
      <Footer />
    </>

  )
}
