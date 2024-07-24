import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ForgetPassword from "../../DashboardHR/Pages/Profile/ForgetPassword";
import { baseUrl } from "../../Api/BaseUrl";

export default function Signin() {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });
  const [disable, setDisable] = useState("typing");
  const submitInputdata = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const submitAllData = (e) => {
    e.preventDefault();

    axios
      .post(`${baseUrl}Emp_login`, {
        email: inputData.email,
        password: inputData.password,
      })
      .then((response) => {
        console.log(response);
        Swal.fire("Success", "successfully SignUP!", "success");
        if (response.data.data.email) {
          const getEmail = response.data.data.email;
          const empId = response.data.data._id;
          const name = response.data.data.name;
          const profileImage = response.data.data.profileImage;

          localStorage.setItem("Email", getEmail);
          localStorage.setItem("empId", empId);
          localStorage.setItem("name", name);
          localStorage.setItem("profileImage", profileImage);
          console.log(empId);

          Swal.fire(
            "Admin login successfully!",
            "You clicked the button!",
            "success"
          );
          navigate("/admin");
        }

        // Reset the form fields and error state after successful submission

        setInputData({
          email: "",
          password: "",
        });
      })
      .catch((error) => {
        console.log(error);
        setDisable("typing"); // Resetting the disable state
        Swal.fire("Error", `${error?.response?.data?.message}`, "error");
      });
  };

  return (
    <section className="section-paddings" style={{marginBottom:'0px',height: '100vh'}}>
      <div className="loginSignUp">
        <div className="authincation">
          <div className="container">
            <div className="row justify-content-center align-items-center">
              <div className="col-md-6">
                <div className="authincation-content">
                  <div className="row no-gutters">
                    <div className="col-xl-12">
                      <div className="auth-form">
                        <h4 className="text-center mb-4 text-white">
                          Sign in your account
                        </h4>
                        <>
                          {/* Hello world */}
                          <form>
                            <div className="row">
                              <div className="col-12">
                                <div className="form-group">
                                  <label
                                    htmlFor="email"
                                    className="mb-1 text-white"
                                  >
                                    <strong>
                                      Email
                                      <span
                                        style={{ color: "red", margin: "0px" }}
                                      >
                                        *
                                      </span>
                                    </strong>
                                  </label>
                                  <input
                                    type="email"
                                    id="email"
                                    className="form-control"
                                    placeholder="info@camer.com"
                                    name="email"
                                    value={inputData.email}
                                    onChange={submitInputdata}
                                  />
                                </div>
                              </div>
                              <div className="col-12">
                                <div className="form-group">
                                  <label
                                    htmlFor="password"
                                    className="mb-1 text-white"
                                  >
                                    <strong>
                                      Password
                                      <span
                                        style={{ color: "red", margin: "0px" }}
                                      >
                                        *
                                      </span>
                                    </strong>
                                  </label>
                                  <input
                                    type="password"
                                    id="password"
                                    className="form-control"
                                    placeholder="Password"
                                    defaultValue="Password"
                                    onChange={submitInputdata}
                                    name="password"
                                    value={inputData.password}
                                  />
                                </div>
                              </div>
                              <div className="form-group">
                                <Link to="/ForgetPassword">
                                  {" "}
                                  <a
                                    className="text-white"
                                    href="/ForgetPasword"
                                  >
                                    Forgot Password?
                                  </a>
                                </Link>
                              </div>

                              <div className="text-center mt-4">
                                <button
                                  className="btn btnTextColor btn-block"
                                  style={{ backgroundColor: "white" }}
                                  onClick={submitAllData}
                                  disabled={
                                    inputData.email.length === 0 ||
                                    inputData.password.length === 0 ||
                                    disable === "submitted"
                                  }
                                >
                                  Submit
                                </button>
                              </div>
                            </div>
                            <div className="new-account mt-3">
                            <p className="text-white">
                             Do not have an account? {" "}
                              <Link to="/Signup">   <a className="text-white" href="/Signup">
                                Sign up 
                              </a></Link>
                            </p>
                          </div>
                          </form>
                        </>
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
  );
}
