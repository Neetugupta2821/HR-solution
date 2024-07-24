import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
// import Details from '../Image/moreDetails.jpg';
import img1 from "../Image/01.webp";
import { useLocation, useNavigate } from 'react-router-dom';
import { common } from "@mui/material/colors";
import axios from 'axios'
import { baseUrl } from "../Api/BaseUrl";
import Swal from "sweetalert2";
import allBanner from '../Image/allBanner.jpg'

const BlogDetails = () => {
    const [blog, setBlog] = useState([])
    const navigate = useNavigate();
    const { state } = useLocation();
    const { data, id } = state || {};
    console.log(data, id);

    const selectedUser = data.filter((item) => {
        return item._id === id;
    });
    const getData = selectedUser[0];

    const handleGetCommentData = () => {
        axios.get(`${baseUrl}get_all__blog_section_comments`).then((response) => {
            console.log(response.data.Details)
            setBlog(response.data.Details)
        }).catch((error) => {
            console.log(error)
        })
    }
    console.log(getData);
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [comment, setComment] = useState('')
    const [blogErr, setBlogErr] = useState(false);
    const handlsubmit = (e) => {
        e.preventDefault()
        setBlogErr({
            name: false,
            email: false,
            comment: false
        });
        if (!name) {
            setBlogErr((prevState) => ({ ...prevState, name: true }));
        }
        if (!email) {
            setBlogErr((prevState) => ({ ...prevState, email: true }));
        }
        if (!comment) {
            setBlogErr((prevState) => ({ ...prevState, comment: true }));
        }
        if (!name || !email || !comment) {
            return;
        }
        axios.post(`${baseUrl}blog_section_comment`, {
            Name: name,
            email: email,
            comment: comment,
        }).then((response) => {
            console.log(response)
            Swal.fire({
                title: "New Comment Posted successfully!",
                text: "You clicked the button!",
                icon: "success"
            });
            setBlogErr(false);
            setName('')
            setEmail('')
            setComment('')


        }).catch((error) => {
            Swal.fire("Error", `${error?.response?.data?.message}`, "error");
        })
        console.log({
            name,
            email,
            comment

        })
    }
    useEffect(() => {
        handleGetCommentData()
    }, [])


    return (
        <div>
            <Header />
            <div>
                {/* <section
                    className="gridBanner1"
                // style={{ backgroundImage: `url(${Details})` }}
                ></section> */}

                {/* <section>
                    <div className="container">
                        <div className="row">
                            <div className="justify-content-center mt-4">
                                <div className="col-lg-12 col-xl-12 col-md-12 col-sm-12 ">
                                    <h3 style={{ textAlign: "center" }}>Blog Details</h3>
                                    <p style={{ textAlign: "center", color: "#DCAF2F" }}>
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                        Accusantium, magni?
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> */}
                <section className="gridBanner" style={{ backgroundImage: `url(${allBanner})` }}>
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

                <section className="pt-50 pb-50">
                    <div className="container mb-5">
                        <div className="row justify-content-center">
                            <div className="col-lg-5 col-xl-5 col-md-5 col-sm-12 mt-5">
                                <div className="details_content1">
                                    <div className="row">
                                        <div
                                            className="col-lg-3 mt-4"
                                            style={{
                                                padding: "20px",
                                            }}
                                        >
                                            <img
                                                src={"http://13.51.205.211:4101/" + getData.photo}
                                                style={{
                                                    height: "40px",
                                                    width: "40px",
                                                }}
                                            />
                                        </div>
                                        <div className="col-lg-9 mt-4">
                                            <div>
                                                <h4 className="heading3">{getData.name}</h4>
                                                <span style={{ marginRight: "10px" }}>
                                                    <i
                                                        class="fa-solid fa-location-dot"
                                                        style={{ color: "#DCAF2F" }}
                                                    ></i>
                                                </span>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="details_content2 mt-1.5">
                                    <section className="pt-10 pb-10">
                                        <div className="container">
                                            <div className="row justify-content-start">
                                                <div className="row mt-4">
                                                    <div
                                                        className="col-lg-2"
                                                        style={{
                                                            height: "40px",
                                                            width: "40px",
                                                            borderRadius: "20px",
                                                            border: "2px solid rgb(248, 239, 207)",
                                                            marginTop: "10px",
                                                        }}
                                                    >
                                                        <span
                                                            style={{
                                                                height: "30px",
                                                                width: "30px",
                                                                marginTop: "10px",
                                                                justifyContent: "center",
                                                                color: "#DCAF2F",
                                                            }}
                                                        >
                                                            <i class="fa-solid fa-phone"></i>
                                                        </span>
                                                    </div>
                                                    <div
                                                        className="row col-lg-4"
                                                        style={{
                                                            marginTop: "-10px",
                                                        }}
                                                    >
                                                        <span className="mt-2">Call Us</span>
                                                        <span className="mt-2">6698722389</span>
                                                    </div>
                                                </div>
                                                <div className="row mt-4">
                                                    <div
                                                        className="col-lg-2"
                                                        style={{
                                                            height: "40px",
                                                            width: "40px",
                                                            borderRadius: "20px",
                                                            border: "2px solid rgb(248, 239, 207)",
                                                            marginTop: "10px",
                                                        }}
                                                    >
                                                        <span
                                                            style={{
                                                                height: "30px",
                                                                width: "30px",
                                                                marginTop: "10px",
                                                                justifyContent: "center",
                                                                color: "#DCAF2F",
                                                            }}
                                                        >
                                                            <i class="fa-solid fa-phone"></i>
                                                        </span>
                                                    </div>
                                                    <div
                                                        className="row col-lg-4"
                                                        style={{
                                                            marginTop: "-10px",
                                                        }}
                                                    >
                                                        <span className="mt-2">Email</span>
                                                        <span className="mt-2">
                                                            hrsolution123@gmail.com
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="row mt-4">
                                                    <div
                                                        className="col-lg-2"
                                                        style={{
                                                            height: "40px",
                                                            width: "40px",
                                                            borderRadius: "20px",
                                                            border: "2px solid rgb(248, 239, 207)",
                                                            marginTop: "10px",
                                                        }}
                                                    >
                                                        <span
                                                            style={{
                                                                height: "30px",
                                                                width: "30px",
                                                                marginTop: "10px",
                                                                justifyContent: "center",
                                                                color: "#DCAF2F",
                                                            }}
                                                        >
                                                            <i class="fa-solid fa-phone"></i>
                                                        </span>
                                                    </div>
                                                    <div
                                                        className="row col-lg-4"
                                                        style={{
                                                            marginTop: "-10px",
                                                        }}
                                                    >
                                                        <span className="mt-2">Website</span>
                                                        <span className="mt-2">
                                                            http://itdevelopmentservices.com/hrsolution/
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>

                            <div className="col-lg-5 col-xl-5 col-md-5 col-sm-12 mt-5">
                                <div className="details_content3">
                                    <section className="pt-10 pb-10">
                                        <div className="container">
                                            <div className="row justify-content-center">
                                                <div>
                                                    <h1 className="heading3 mt-4">{getData.Heading}</h1>
                                                    <p className="heading3">
                                                        {getData.Description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mapSec bg-white">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-md-6 wow slideInLeft col-sm-12">
                                <div className="bannnerleftContent ">
                                    <section className="pt-10 pb-10">
                                        <div className="container">
                                            <h1>Comments</h1>
                                            {blog.map((info) => (
                                                <div className="row justify-content-between">


                                                    <div className="col-lg-10 mt-4">
                                                        <div>
                                                            <h4 className="heading3">{info.Name}</h4>
                                                            <span>{info.createdAt}</span>
                                                            <p className="heading3">
                                                                {info.comment}
                                                            </p>
                                                            <h6 className="">
                                                                {info.email}
                                                            </h6>
                                                        </div>
                                                    </div>
                                                </div>

                                            ))}

                                        </div>
                                    </section>



                                    {/* <section className="pt-10 pb-10">
                                        <div className="container">
                                            <div className="row justify-content-between">
                                                <div
                                                    className="col-lg-1 mt-4"
                                                    style={{
                                                        height: "70px",
                                                        width: "70px",
                                                    }}
                                                >
                                                    <img src={img1} />
                                                </div>
                                                <div className="col-lg-10 mt-4">
                                                    <div>
                                                        <h4 className="heading3">Rosalina Kelian</h4>
                                                        <span>16 may 2024</span>
                                                        <p className="heading3">
                                                            Lorem ipsum dolor sit amet, consectetur
                                                            adipisicing elit. Saepe, sit.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section> */}
                                </div>
                            </div>

                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="contactFormdata">
                                    <form className="row g-3" onSubmit={handlsubmit}>
                                        <div className="col-md-12 col-sm-12">
                                            <h1>Post your Comment</h1>
                                        </div>
                                        <div className="col-md-6 col-sm-12">
                                            <label htmlFor="inputEmail4" className="form-label">
                                                Name
                                            </label>
                                            <input
                                                type="name"
                                                className="form-control"
                                                id="inputEmail4"
                                                placeholder="Name"
                                                name="name"
                                                onChange={(e) => setName(e.target.value)}
                                                value={name}
                                            />
                                            <span style={{ color: "red" }}>
                                                {blogErr && !name
                                                    ? "*Please Enter Your name"
                                                    : ""}
                                            </span>
                                        </div>


                                        <div className="col-md-6 col-sm-12">
                                            <label htmlFor="inputAddress2" className="form-label">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="inputAddress2"
                                                placeholder="Email"
                                                name="email" onChange={(e) => setEmail(e.target.value)}
                                                value={email}

                                            />
                                            <span style={{ color: "red" }}>
                                                {blogErr && !email
                                                    ? "*Please Enter Your email"
                                                    : ""}
                                            </span>
                                        </div>

                                        <div className="col-md-12">
                                            <label htmlFor="inputState" className="form-label">
                                                Comment
                                            </label>
                                            <textarea
                                                type="textarea"
                                                className="form-control"
                                                defaultValue={"   "}
                                                name="Comment"
                                                onChange={(e) => setComment(e.target.value)}
                                                value={comment}
                                            />
                                            <span style={{ color: "red" }}>
                                                {blogErr && !comment
                                                    ? "*Please Enter Your comment"
                                                    : ""}
                                            </span>
                                        </div>


                                        <div className="col-lg-12">
                                            <div className="bannerBtnHome text-center">
                                                <button>
                                                    {" "}
                                                    Send <i className="fa fa-arrow-right" />{" "}
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default BlogDetails;
