import React, { useEffect, useState } from 'react';
import "./Dashboard.css";
import Chart from "react-apexcharts";
import axios from 'axios';
import { baseUrl } from '../../Api/BaseUrl';

export default function Dashboard() {
  var id = localStorage.getItem("empId");
  const [count, setCount] = useState("");
  const [apiResponse, setApiResponse] = useState(null);

  const handleCountData = () => {
    axios.get(`${baseUrl}client_dashboardCount/${id}`)
      .then((response) => {
        console.log(response.data);
        setCount(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGraphData = () => {
    axios.post(`${baseUrl}get_talent_pool_count`)
      .then((response) => {
        console.log(response.data.details);
        setApiResponse(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    handleCountData();
    handleGraphData();
  }, []);

  const [options, setOptions] = useState({
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  });

  const [series, setSeries] = useState([
    {
      name: "Talent Pool",
      data: [],
      color: "#BF9B2E",
    },
    {
      name: "Female Screened",
      data: [],
      color: "#020950",
    },
  ]);

  useEffect(() => {
    if (apiResponse) {
      const talentPoolData = apiResponse.details.map(detail => detail.talentPool_count);
      const femaleScreenedData = apiResponse.details.map(detail => detail.Female_screened_count);

      setSeries([
        {
          name: "Talent Pool",
          data: talentPoolData,
          color: "#F39C12",
        },
        {
          name: "Female Screened",
          data: femaleScreenedData,
          color: "#E74C3C",
        },
      ]);
    }
  }, [apiResponse]);

  return (
    <>
      <div className="">
        <div className="row">
          <div className="cards">
            <div className="dashboard-card">
              <div className="card-content">
                <div className="number">{count.totalJobCount}</div>
                <div className="card-name">Total Job</div>
              </div>
              <div className="icon-box">
                <i className="fas fa-user-graduate"></i>
              </div>
            </div>
            <div className="dashboard-card">
              <div className="card-content">
                <div className="number">{count.active_jobsCount}</div>
                <div className="card-name">Total Active Job</div>
              </div>
              <div className="icon-box">
                <i className="fas fa-chalkboard-teacher"></i>
              </div>
            </div>
            <div className="dashboard-card">
              <div className="card-content">
                <div className="number">{count.femaleCandidateCount}</div>
                <div className="card-name">Total Female candidates</div>
              </div>
              <div className="icon-box">
                <i className="fas fa-users"></i>
              </div>
            </div>
            <div className="dashboard-card">
              <div className="card-content">
                <div className="number">{count.totalCandidateCount}</div>
                <div className="card-name">Total Candidate Apply</div>
              </div>
              <div className="icon-box">
                <i className="fas fa-dollar-sign"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-3"></div>
        <div className="row">
          <div className='col-lg-12'> 
          <div className="col-12 mt-4 col-sm-12">
            <h6 className="desc">MONTHLY REVENUE</h6>
          </div>
          <div className="col-12 scrollable-chart-container">
          <div className="scrollable-chart">
            <Chart options={options} series={series} type="bar" width="100%" />
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}
