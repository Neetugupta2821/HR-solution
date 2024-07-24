import React, { useState } from 'react'
import { Button } from '@mui/material';
import axios from 'axios'
import { baseUrl } from '../../../Api/BaseUrl';
import Swal from "sweetalert2";
import { useLocation } from 'react-router-dom';
import swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
export default function ResetPasswordPage() {
    const { state } = useLocation();
  const { data } = state || {};
  console.log(data);
    const [error, seterror] = useState({
        error: {

        }, isarray: false
    })
    const navigate = useNavigate();

    const userId = localStorage.getItem("empId")
    console.log(userId)
    const [password, setpassword] = useState("")
    const [confirmPassword,setConfirmPassword] =useState("")
    const handleResetpassword = (e) => {
        e.preventDefault();
        navigate('/ResetPasswordPage')
        axios.post(`${baseUrl}clientResetPass/${data}`, {
            password:password,
            confirmPassword:confirmPassword

        }).then((response) => {
            if (response.status === 200) {
                Swal.fire(
                     `${response.data.message}`,
                    "You clicked the button!",
                    "success"
                  );
                navigate("/Signin");
            }
        }).catch((error) => {
            Swal.fire(
                "Error",
                `${error?.response?.data?.message}`,
                "error"
            );
            
        });
    }

    return (
        <>
             

            <section className="section-paddings">
                <div className="loginSignUp">
                    <div className="authincation">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-md-6">
                                    <div className="authincation-content">
                                        <div className="row no-gutters">
                                            <div className="col-xl-12">
                                                <div className="auth-form">
                                                    <h4 className="text-center text-white">
                                                        Reset Password
                                                    </h4>
                                                    <form onSubmit={handleResetpassword} >
                                                        <div className="form-group">
                                                            <label className="mb-1 text-white">
                                                                <strong>password*</strong>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Please enter password"
                                                                required=""
                                                                onChange={(e) => setpassword(e.target.value)}
                                                                value={password}
                                                                name="password"


                                                            />
                                                             {error.isarray ? <div className="text-danger">{error.error.response.data.message}</div> : ""}
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="mb-1 text-white">
                                                                <strong>ConfirmPassword*</strong>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Please  enter ConfirmPassword"
                                                                required=""
                                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                                value={confirmPassword}
                                                                name="confirmPassword"


                                                            />
                                                             {error.isarray ? <div className="text-danger">{error.error.response.data.message}</div> : ""}
                                                        </div>


                                                        <div className="text-center">
                                                            <Button variant="contained" type='submit' className="btn btnTextColor btn-block mt-3">Reset Password</Button>

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
