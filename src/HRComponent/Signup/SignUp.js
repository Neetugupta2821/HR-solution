import React from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import EastIcon from "@mui/icons-material/East";
import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";
import Swal from "sweetalert2";
import Input from '@mui/material/Input';
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../Api/BaseUrl";
const ariaLabel = { 'aria-label': 'description' };
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Aerospace & Defense",
  "Agriculture",
  "Information Technology",
  "Non-profit & NGO",
  "Real Estate",
  "Restaurant & Food Services",
  "Marketing",
  "Finance",
  "Others",
];

const company = [
  "Western Area Urban",
  "Western Area Rural",
  "Bombali",
  "Bonthe",
  "Kailahun",
  "Kambia",
  "Kenema",
  "Koinadugu",
  "Kono",
  "Moyamba",
  "Port Loko",
  "Pujehun",
  "Tonkolili",
  "Bo",
  "Karene",
  "Falaba",
];

export default function SignUp() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);

  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    password: "",
    phone_no: "",
    company_name: "",
    Number_of_emp: "",
  });

  const [disable, setDisable] = useState("typing");
  const [facilitiesName, setFacilitiesName] = React.useState([]);
  const handleChange2 = (event) => {
    const {
      target: { value },
    } = event;

    setFacilitiesName(
      typeof value === "string" ? value.split(",") : value
    );
  };
  const [companyName, setCompanyName] = React.useState([]);
  const handleChange3 = (event) => {
    const {
      target: { value },
    } = event;

    setCompanyName(
      typeof value === "string" ? value.split(",") : value
    );
  };

  const submitInputdata = (e) => {
    const { name, value } = e.target;
    // Ensure only numeric values for phone_no and Number_of_emp
    if (
      (name === "phone_no" || name === "Number_of_emp") &&
      value !== "" &&
      !/^\d+$/.test(value)
    ) {
      return;
    }
    setInputData({ ...inputData, [name]: value });
  };

  const imageFunction = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const submitAllData = (e) => {
    e.preventDefault();
    setDisable("submitted");

    const formData = new FormData();
    formData.append("name", inputData.name);
    formData.append("email", inputData.email);
    formData.append("password", inputData.password);
    formData.append("phone_no", inputData.phone_no);
    formData.append("profileImage", selectedImage);
    formData.append("company_industry", facilitiesName);
    formData.append("company_name", inputData.company_name);
    formData.append("Number_of_emp", inputData.Number_of_emp);
    formData.append("company_HQ", companyName);

    axios
      .post(`${baseUrl}employeeSignup`, formData)
      .then((response) => {
        console.log(response);
        Swal.fire("Success", "Successfully Signed Up!", "success");
        navigate("/Signin");
        setFacilitiesName([]);
        setSelectedImage(null);
        setInputData({
          name: "",
          email: "",
          password: "",
          phone_no: "",
          company_name: "",
          Number_of_emp: "",
        });
        setCompanyName([]);
      })
      .catch((error) => {
        console.log(error);
        setDisable("typing");
        Swal.fire("Error", `${error?.response?.data?.message}`, "error");
      });
  };

  return (
    <section className="section-paddings" style={{ marginBottom: '0px' }}>
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
                          Sign up your account
                        </h4>
                        <form>
                          <div className="row">
                            <div className="col-lg-12 col-12">
                              <div className="form-group">
                                <div className="profile-pic">
                                  {selectedImage ? (
                                    <img
                                      alt="not found"
                                      className="rounded-circle"
                                      height={200}
                                      src={URL.createObjectURL(selectedImage)}
                                    />
                                  ) : (
                                    <img
                                      alt="not found"
                                      className="rounded-circle"
                                      height={200}
                                      src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                                    />
                                  )}
                                  <input
                                    id="profile-image-upload"
                                    type="file"
                                    name="image"
                                    onChange={imageFunction}
                                    className="file-input"
                                  />
                                  <div style={{ color: "#999" }}></div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6 col-12">
                              <div className="form-group">
                                <label htmlFor="fullname" className="mb-1 text-white">
                                  <strong>
                                    Full Name
                                    <span style={{ color: "red", margin: "0px" }}>*</span>
                                  </strong>
                                </label>
                                <input
                                  type="text"
                                  id="fullname"
                                  className="form-control"
                                  placeholder="Full Name"
                                  name="name"
                                  value={inputData.name}
                                  onChange={submitInputdata}
                                  onKeyPress={(e) => {
                                    if (e.key.match(/[0-9]/)) {
                                      e.preventDefault();
                                    }
                                  }}
                                />
                              </div>
                            </div>
                            <div className="col-lg-6 col-12">
                              <div className="form-group">
                                <label htmlFor="phoneno" className="mb-1 text-white">
                                  <strong>
                                    Phone no
                                    <span style={{ color: "red", margin: "0px" }}>*</span>
                                  </strong>
                                </label>
                                <input
                                  type="text"
                                  id="phoneno"
                                  className="form-control"
                                  placeholder="Phone no"
                                  name="phone_no"
                                  value={inputData.phone_no}
                                  onChange={submitInputdata}
                                />
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="form-group">
                                <label htmlFor="email" className="mb-1 text-white">
                                  <strong>
                                    Email
                                    <span style={{ color: "red", margin: "0px" }}>*</span>
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
                                <label htmlFor="password" className="mb-1 text-white">
                                  <strong>
                                    Password
                                    <span style={{ color: "red", margin: "0px" }}>*</span>
                                  </strong>
                                </label>
                                <input
                                  type="password"
                                  id="password"
                                  className="form-control"
                                  placeholder="Password"
                                  name="password"
                                  value={inputData.password}
                                  onChange={submitInputdata}
                                />
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="form-group">
                                <label htmlFor="companyname" className="mb-1 text-white">
                                  <strong>
                                    Company name
                                    <span style={{ color: "red", margin: "0px" }}>*</span>
                                  </strong>
                                </label>
                                <div className="col-12 d-flex justify-content-center">
                                  <Input
                                    className=" w-100 Input_class"
                                    id="companyname"
                                    label="Company name"
                                    style={{ backgroundColor: "white" }}
                                    rows={4.5}
                                    type="text"
                                    name="company_name"
                                    value={inputData.company_name}
                                    onChange={submitInputdata}
                                    size="normal"
                                    inputProps={ariaLabel}
                                    placeholder="Company name"

                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="form-group">
                                <label htmlFor="numberofemp" className="mb-1 text-white">
                                  <strong>
                                    Number of emp
                                    <span style={{ color: "red", margin: "0px" }}>*</span>
                                  </strong>
                                </label>
                                <div className="col-12 d-flex justify-content-center">
                                  <Input
                                    className="  w-100 Input_class"
                                    id="numberofemp"
                                    label="Number of emp"
                                    style={{ backgroundColor: "white" }}
                                    rows={4.5}
                                    type="text"
                                    name="Number_of_emp"
                                    value={inputData.Number_of_emp}
                                    onChange={submitInputdata}
                                    size="normal"

                                    inputProps={ariaLabel}
                                    placeholder="Number of emp"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="form-group">
                                <label htmlFor="companyindustry" className="mb-1 text-white">
                                  <strong>
                                    Company industry
                                    <span style={{ color: "red", margin: "0px" }}>*</span>
                                  </strong>
                                </label>
                                <div className="col-12 d-flex justify-content-center">
                                  <FormControl sx={{ width: 650 }}>
                                    <TextField
                                      select
                                      label={!facilitiesName.length ? 'Company Industry' : ''}
                                      value={facilitiesName}
                                      onChange={handleChange2}
                                      SelectProps={{
                                       
                                        renderValue: (selected) => selected.join(', '),
                                      }}
                                      variant="outlined"
                                      
                                      style={{ backgroundColor: "white" }}
                                      InputLabelProps={{ shrink: !!facilitiesName.length }}
                                    >
                                      {names.map((name) => (
                                        <MenuItem key={name} value={name}>
                                          <Checkbox checked={facilitiesName.indexOf(name) > -1} />
                                          <ListItemText primary={name} />
                                        </MenuItem>
                                      ))}
                                    </TextField>
                                  </FormControl>
                                </div>
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="form-group">
                                <label htmlFor="companyhq" className="mb-1 text-white">
                                  <strong>
                                    Company HQ
                                    <span style={{ color: "red", margin: "0px" }}>*</span>
                                  </strong>
                                </label>
                                <div className="col-12 d-flex justify-content-center">
                                  <FormControl sx={{ width: 650 }}>

                                    <TextField
                                      select
                                      labelId="demo-multiple-checkbox-label"
                                      label={!companyName.length ? 'companyName' : ''}
                                      value={companyName}
                                      onChange={handleChange3}
                                      SelectProps={{
                                       
                                        renderValue: (selected) => selected.join(', '),
                                      }}
                                      style={{ backgroundColor: "white" }}
                                      InputLabelProps={{ shrink: !!companyName.length }}
                                      
                                    >
                                      {company.map((name) => (
                                        <MenuItem key={name} value={name}>
                                          <Checkbox checked={companyName.indexOf(name) > -1} />
                                          <ListItemText primary={name} />
                                        </MenuItem>
                                      ))}
                                    </TextField>
                                  </FormControl>
                                </div>
                              </div>
                            </div>
                            <div className="text-center mt-4">
                              <button
                                className="btn btnTextColor btn-block"
                                style={{ backgroundColor: "white" }}
                                onClick={submitAllData}
                                disabled={
                                  inputData.name.length === 0 ||
                                  inputData.email.length === 0 ||
                                  inputData.phone_no.length === 0 ||
                                  inputData.password.length === 0 ||
                                  inputData.company_name.length === 0 ||
                                  inputData.Number_of_emp.length === 0 ||
                                  companyName.length === 0 ||
                                  facilitiesName.length === 0 ||
                                  disable === "submitted"
                                }
                              >
                                Submit
                                <EastIcon />
                              </button>
                            </div>
                          </div>
                        </form>
                        <div className="new-account mt-3">
                          <p className="text-white">
                            Already have an account?{" "}
                            <Link to="/Signin" className="text-white">
                              Sign in
                            </Link>
                          </p>
                        </div>
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
