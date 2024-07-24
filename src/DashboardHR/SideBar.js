import React, { useState, useEffect } from "react";
import "./SideBar.css";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import whitelogo from '../Image/white-logo.png'
import NotificationsIcon from '@mui/icons-material/Notifications';
import { AiOutlineDashboard, AiOutlineUser } from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useLocation } from "react-router-dom"; // Import the useLocation hook
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import WorkIcon from '@mui/icons-material/Work';
import axios from "axios";
import { baseUrl } from "../Api/BaseUrl";
const { Header, Sider, Content, Footer } = Layout;

export default function SideBar() {
  const [nameValue, setNameValue] = useState("");
  const [imageValue, setImageValue] = useState("");
  const [notification, setnotification] = useState([])
  const [open1, setOpen1] = useState(false)
  const [count, setCount] = useState("")

  const location = useLocation(); // Get the current location
  const { state } = location;

  const localStorageValue = localStorage.getItem("name");
  const getActiveKey = () => {
    const path = location.pathname;
    // Implement your logic to determine the active key based on the 'path'
    // For example, you can use a switch statement or if-else conditions.
    // Here's a simple example:
    switch (path) {
      case "/admin":
        return ""; // Use the localStorage value if available, otherwise, use an empty string
      case "/admin/GetAllJobs":
        return "GetAllJobs";
      case "/admin/AddNewJob":
        return "AddNewJob";
      case "/admin/NextAddJob":
        return "NextAddJob";

      case "/admin/Profile":
      case "/admin/MyProfile":
      case "/admin/ChangePassword":
      case "/admin/JobDescription":
      case "/admin/JobTital":
      case "/admin/JobDetailFemale":
      case "/admin/EditHotel":
      case "/admin/AddRoomInFloor":
      case "/admin/GetRoomFloorData":
      case "/admin/GetRoomFloorData":
        return "Analytics";

      // Add more cases for other pages
      default:
        return "";
    }
  };

  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();

  const signoutData = () => {
    localStorage.clear();
    navigate("/");
  };
  const adminImage = localStorage.getItem("profileImage");
  useEffect(() => {
    // Retrieve the current value from localStorage
    const storedName = localStorage.getItem("name");
    const storedImage = localStorage.getItem("profileImage");
    console.log(storedName, storedImage)

    if (storedName) {
      setNameValue(storedName);
    } else {
      // If the "name" key doesn't exist in localStorage, set it with the value from state
      localStorage.setItem("name", state?.dataValue?.firstName || "");
      setNameValue(state?.dataValue?.firstName || "");
    }
    if (storedImage) {
      setImageValue(storedImage);
    } else {
      // If the "image" key doesn't exist in localStorage, set it with the value from state
      localStorage.setItem("profileImage", state?.dataValue?.image || "");
      setImageValue(state?.dataValue?.image || "");
    }
  }, [nameValue, imageValue, state]);


  const menuStyle = {
    background: "#001529", // Customize the background color of the menu
    color: "#fff", // Customize the text color of the menu items
    height: "82vh"
  };


  const toggleMenu2 = () => {

    setOpen1(!open1);
    axios.get(`${baseUrl}getNotification_emp/${localStorage.getItem("empId")}`).then((response) => {
      console.log(response.data.notification_details)
      setnotification(response.data.notification_details)
    }).catch((error) => {
      console.log(error)
    })

  };

  const handlUnSeeNotification = () => {
    axios.get(`${baseUrl}unseenNotificationCount/${localStorage.getItem("empId")}`).then((response) => {
      console.log(response.data.unseenNotificationCount)
      setCount(response.data.unseenNotificationCount)
    }).catch((error) => {
      console.log(error)
    })
  }
  useEffect(() => {
    handlUnSeeNotification()
  }, [])

  const handleSeeNotification = (id) => {
    axios.post(`${baseUrl}/seenNotification/${id}`).then((response)=>{
      console.log(response)
      handlUnSeeNotification()
    }).catch((error)=>{
      console.log(error)
    })
  }

  return (
    <Layout /* onContextMenu={(e) => e.preventDefault()} */>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="text-white fs-5 text-center py-3 mb-0">
            <div className="sm-logo px-4">
              {" "}
              <img
                src={whitelogo}
                className=" festabash-l0go mb-3"
                style={{ width: "100%", height: "100%" }}
                alt=""
              />
            </div>
            <div className="lg-logo">Client</div>
          </h2>
        </div>
        <Menu
          // theme="light"
          mode="inline"
          style={menuStyle}
          defaultSelectedKeys={[getActiveKey()]} // Set the active key based on the URL

          onClick={({ key }) => {
            if (key === "signout") {
              // Handle signout
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: " ",
              icon: <AiOutlineDashboard className="fs-4" />,
              label: "Dashboard",
            },
            {
              key: "GetAllJobs",
              icon: <WorkOutlineOutlinedIcon className="fs-4" />,
              label: "Jobs",
            },

            {
              key: "JobDescription",
              icon: <BookmarkBorderIcon className="fs-4" />,
              label: "Job Description",
            },

            // {
            //   key: "JobTital",
            //   icon: < QuestionAnswerOutlinedIcon className="fs-4" />,
            //   label: "JobTital",
            // },

            // {
            //   key: "Analytics",
            //   icon: <WorkOutlineOutlinedIcon className="fs-4" />,
            //   label: "Analytics",
            // },

          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="d-flex justify-content-between ps-3"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div className="d-flex gap-4 align-items-center mx-4">
            <div className="d-flex gap-3 align-items-center dropdown">
              <div
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div className="d-flex align-items-center">
                  <div>
                    {imageValue ? (
                      <img
                        style={{ borderRadius: "50%" }}
                        width={32}
                        height={32}
                        src={"http://13.51.205.211:4101/" + imageValue}
                        alt="loading"
                      />
                    ) : (
                      <img
                        style={{ borderRadius: "50%" }}
                        width={32}
                        height={32}
                        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        alt="loading"
                      />
                    )}
                  </div>
                  <div>
                    <h5 className="mb-0 ps-3">{nameValue}</h5>
                  </div>
                </div>
              </div>
              <div className="nav-item dropdown">
                <a className="nav-link  ai-icon">
                  <NotificationsIcon onClick={toggleMenu2} />
                  {/* {show === 1 ? <span className='badge' style={{ "backgroundColor": "red", "color": "white" }}>{Count}</span> : null} */}
                  <span className='badge'>{count}</span>
                  <div className="pulse-css" />
                </a>
                {open1 && (
                  <div className='menuProfile1' id="myDIV">
                    <div className="widget-media dz-scroll p-3 addClass">
                      <ul className="timeline">
                        {Array.isArray(notification) && notification.map((info, index) => (
                          <li key={index}   onClick={() => handleSeeNotification(info._id)}  style={{"cursor":"pointer"}}>
                            <b >{index + 1}</b>.
                            {info.message}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <NavLink
                    className="dropdown-item py-2 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/admin/Profile"
                  >
                    My Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="dropdown-item py-2 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/admin/ChangePassword"
                  >
                    Change Password
                  </NavLink>
                </li>
                <li>
                  <button
                    className="dropdown-item py-2 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    onClick={signoutData}>
                    Signout
                  </button>
                </li>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            // padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          HR Solution Admin Panel ©2024 Created by Admin
        </Footer>
      </Layout>
    </Layout>
  )
}