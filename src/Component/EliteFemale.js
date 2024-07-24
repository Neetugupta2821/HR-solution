import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import img1 from "../Image/Elite.jpg";
import { useNavigate } from "react-router-dom";
import Background from "../Image/bannerHome3.jpg";
import axios from "axios";

import { baseUrl } from "../Api/BaseUrl";

const EliteFemale = () => {
  const [findercms, setFinderCms] = useState([])
  const handelFixiderCMS = () => {
    axios.get(`${baseUrl}get_cms_elite_talent_pool`).then((response) => {
      console.log(response.data.Details)
      setFinderCms(response.data.Details)
    }).catch((error) => {
      console.log(error)
    })
  }
  useEffect(() => {

    handelFixiderCMS()
  }, []);
  const renderHTML = (html) => {
    return { __html: html };
  };

  const navigate = useNavigate();
  const Signin = () => {
    navigate("/Signin");
  };
  return (
    <div className="elite-wrapper">
      <Header />
      <section
        className="gridBanner"
        style={{ backgroundImage: `url(${Background})` }}
      >
        <div className="container-fluid">
          <div className="row">
            <div className="container">
              {findercms.map((info) => (
                <div className="row">

                  <h2>{info.Heading}</h2>
                  <p className="mt-2">
                    {info.Description1}
                  </p>

                  {/* <p className="mt-2">Find your all job from here</p> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pt-50 pb-50">
        <div className="container my-5">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <img src={img1} style={{ height: "100%", width: "100%" }} />
            </div>
            <div className="col-lg-6">
              {findercms.map((info) => (
                <div>
                  <h2 className="mb-4">{info.Heading} </h2>
                  <div className="heading3" dangerouslySetInnerHTML={renderHTML(info.Description)}></div>
                </div>
              ))}
              <button
                onClick={Signin}
                className="b-btn job_area_btn mt-5"
                href="job-grid"
              >
                Check the Details <i className="fi fi-sr-arrow-right" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="pt-50 pb-50">
        <div className="container mb-5">
          <div className="row justify-content-end">
            <div className="col-lg-12">
              <div className="section-bt">
               
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <Footer />
    </div>
  );
};

export default EliteFemale;
