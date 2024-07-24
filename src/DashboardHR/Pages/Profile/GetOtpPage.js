import React, { useState } from 'react'
import axios from 'axios'
import OtpInput from "react-otp-input";
import { baseUrl } from '../../../Api/BaseUrl';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
export default function GetOtpPage() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [error, seterror] = useState({
    error: {

    }, isarray: false
  })


  const handleOnsubmit = (e) => {
    e.preventDefault();
     axios.post(`${baseUrl}verifyOTP`,{
      otp:otp
     }).then((response)=>{
      console.log(response.data.clientId)
      if(response.status===200){
        Swal.fire(
          `${response.data.message}`,
         "You clicked the button!",
         "success"
       );
       navigate("/ResetPasswordPage",{state:{data:response.data.clientId}});
      }
       
     }).catch((error)=>{
      Swal.fire(
        "Error",
        `${error?.response?.data?.message}`,
        "error"
    );
      console.log(error)
     })

  }
  console.log(otp)

  return (
    <>
      {/* Hello world */}
      <section className="section-paddings">
        <div className="loginSignUp">
          <div className="authincation">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-6">
                  <div className="authincation-content pb-5">
                    <div className="row no-gutters">
                      <div className="col-xl-12">
                        <div className="p-4">
                          <h4 className="text-center text-white py-5">
                            OTP Verification
                          </h4>
                          <form  >
                            <p className="text-white text-center">
                              An otp has been sent to ********k876@gmail.com
                            </p>
                            <div className="container text-center">
                              <div id="inputs" className="inputs4">
                                
                                <OtpInput
                                  inputStyle={{
                                    width: "3rem",
                                    height: "3rem",
                                    fontSize: "1rem",
                                    borderRadius: 4,
                                    border: "2px solid rgba(0,0,0,0.3)",
                                    display: "block"
                                  }}
                                  value={otp}
                                  onChange={setOtp}
                                  numInputs={4}
                                  renderSeparator={<span>-</span>}
                                  renderInput={(props) => <input {...props} />}
                                />
                                {error.isarray ? <div className="text-danger">{error.error.response.data.message}</div> : ""}
                              </div>

                            </div>

                            <div className="text-center">
                              <button
                                type="submit"
                                className="btn btnTextColor btn-block mt-5"
                                onClick={handleOnsubmit}
                                style={{"backgroundColor":""}}
                              >
                                Verify
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>

  )
}
