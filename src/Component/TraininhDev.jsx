import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Background from "../Image/counterBg.jpeg";
// import iconTrain from "../Image/goals.webp";
import img1 from "../Image/lerning.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../Api/BaseUrl";

const TraininhDev = () => {

  const navigate = useNavigate();
  const ContactUs = () => {
    navigate("/ContentAs");
  };

  const [traning, setTraning] = useState([]);

  const handleGetTraning = () => {
    axios
      .get(`${baseUrl}get_training_development_Details`)
      .then((response) => {
        // console.log(response.data.Details);
        setTraning(response.data.Details);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    handleGetTraning();
  }, []);
  const renderHTML = (html) => {
    return { __html: html };
  };
  return (
    <div>
      <Header />
      <section
        className="gridBanner"
        style={{ backgroundImage: `url(${Background})` }}
      >
        <div className="container-fluid">
          <div className="row ">
            <div className="container">
              <div className="row">
                {traning.map((curElm, index) => (
                  <div key={index}>
                    <h2>{curElm.Heading}</h2>
                    <p className="mt-2">
                      {curElm.Description1}{" "}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-50 pb-50">
        <div className="container my-5">
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-6">
              <div className="image3"> <img src={img1} alt="trainingImage" /></div>
            </div>
            <div className="col-lg-6">
              {traning.map((curElm, index) => (
                <div key={index}>
                  <h2 className="mb-4">{curElm.Heading}</h2>
                  <div className="heading3" dangerouslySetInnerHTML={renderHTML(curElm.Description)}></div>
                </div>
              ))}
              <button
                onClick={ContactUs}
                className="b-btn job_area_btn mt-5"
                href="job-grid"
              >
               Contact Us <i className="fi fi-sr-arrow-right" />
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* <section className="trainingSec pt-80 pb-80">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="traingParent">
                <div className="trainingImg">
                  <img src={iconTrain} alt="" />
                </div>
                <div className="trainContent mt-2">
                  {traning.map((cur, i) => (
                    <p key={i}>{cur.Description2}</p>
                  ))}
                </div>
              </div>
              <div className="traingParent">
                <div className="trainingImg">
                  <img src={iconTrain} alt="" />
                </div>
                <div className="trainContent mt-2">
                  {traning.map((curEl, r) => (
                    <p key={r}>{curEl.Description3}</p>
                  ))}
                </div>
              </div>
              <div className="traingParent">
                <div className="trainingImg">
                  <img src={iconTrain} alt="" />
                </div>
                <div className="trainContent mt-2">
                  {traning.map((curelm, a) => (
                    <p key={a}>{curelm.Description4}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <Footer />
    </div>
  );
};

export default TraininhDev;