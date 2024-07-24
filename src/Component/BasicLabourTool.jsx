import { React, useState, useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import Banner from "../Image/counterBac.jpeg"
import labourTool from "../Image/labourTool.jpg"
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import axios from 'axios'
import { baseUrl } from '../Api/BaseUrl'
import Swal from 'sweetalert2'
import { use } from 'i18next'

const BasicLabourTool = () => {
    const [value, setValue] = useState('1');
    const [laberTool, setLaberTool] = useState('')

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleGetCmslabourToolDetails = () => {
        axios.get(`${baseUrl}get_cms_labour_tool_details`)
            .then((response) => {
                console.log(response);
                setLaberTool(response.data.Details)
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        handleGetCmslabourToolDetails()
    }, []);
    const renderHTML = (html) => {
        return { __html: html };
    };
    const [Basic_pay, setBasic_pay] = useState('')
    const [OT_Hours_weekday, setOT_Hours_weekday] = useState('')
    const [OT_Hours_weekend, setOT_Hours_weekend] = useState('')
    const [blogErr, setBlogErr] = useState(false);
    const [tableData, setTableData] = useState("")
    const [basicPay, setBasicPay] = useState("")
    const [leave_allowence_percentage, setLeave_allowence_percentage] = useState("")
    const [leave_all, setLeave_all] = useState(null)
    const [contract_start_Date, setContract_start_Date] = useState("")
    const [employment_end_Date, setEmployment_end_Date] = useState("")
    const [EOSB_days_per_year, setEOSB_days_per_year] = useState("")
    const [untilized_leave_days, setUntilized_leave_days] = useState("")
    const [basic, setBasic] = useState("")
    const [EOSB, setEOSB] = useState(null)
    const [pay, setPay] = useState("")
    const [transport_allowance, setTransport_allowance] = useState("")
    const [rent_allowance, setRent_allowance] = useState("")
    const [hazard_and_other_allowance, setHazard_and_other_allowance] = useState("")
    const [salary, setSalary] = useState("")
    const [nassit_percentage, setnassit_percentage] = useState('');






    const handleOverTimeData = (e) => {
        e.preventDefault()
        // setBlogErr({
        //     Basic_pay: false,
        //     OT_Hours_weekday: false,
        //     OT_Hours_weekend: false,

        // });
        // if (!Basic_pay) {
        //     setBlogErr((prevState) => ({ ...prevState, Basic_pay: true }));
        // }
        // if (!OT_Hours_weekday) {
        //     setBlogErr((prevState) => ({ ...prevState, OT_Hours_weekday: true }));
        // }
        // if (!OT_Hours_weekend) {
        //     setBlogErr((prevState) => ({ ...prevState, OT_Hours_weekend: true }));
        // }
        // if (!Basic_pay || !OT_Hours_weekday || !OT_Hours_weekend) {
        //     return;
        // } 
        axios.post(`${baseUrl}Overtime`, {
            Basic_pay: Basic_pay,
            OT_Hours_weekday: OT_Hours_weekday,
            OT_Hours_weekend: OT_Hours_weekend,

        }).then((response) => {
            console.log(response.data.data)
            setTableData(response.data.data)
            Swal.fire({
                title: "Calculation successful!",
                text: "You clicked the button!",
                icon: "success"
            });

            setOT_Hours_weekday('')
            setOT_Hours_weekend('')



        }).catch((error) => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${error.response.data.message}`,

            });
        })
        console.log({
            Basic_pay,
            OT_Hours_weekday,
            OT_Hours_weekend
        })
    }
    const handleAllowanceData = (e) => {
        e.preventDefault()
        axios.post(`${baseUrl}leave_allowence `, {
            Basic_pay: basicPay,
            leave_allowence_percentage: leave_allowence_percentage,


        }).then((response) => {
            console.log(response.data.data)
            setLeave_all(response.data.data)

            Swal.fire({
                title: "Calculation Successful!",
                text: "You clicked the button!",
                icon: "success"
            });

            setBasicPay('')
            setLeave_allowence_percentage('')



        }).catch((error) => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${error.response.data.message}`,

            });
        })
        console.log({
            basicPay,
            leave_allowence_percentage
        })
    }
    const handleEOSBData = (e) => {
        e.preventDefault()
        axios.post(`${baseUrl}calculate_EOSB`, {
            contract_start_Date: contract_start_Date,
            Employment_end_Date: employment_end_Date,
            EOSB_days_per_year: EOSB_days_per_year,
            Basic_pay: basic,


        }).then((response) => {
            console.log(response)
            setEOSB(response.data.data)

            Swal.fire({
                title: "Calculation successful!",
                text: "You clicked the button!",
                icon: "success"
            });

            setContract_start_Date('')
            setEmployment_end_Date('')
            setEOSB_days_per_year('')
            setBasic('')
            setContract_start_Date('')

        }).catch((error) => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${error.response.data.message}`,

            });
        })
        console.log({
            contract_start_Date,
            employment_end_Date,
            EOSB_days_per_year,
            untilized_leave_days,
            contract_start_Date

        })

    }
    const handleSalaryData = (e) => {
        e.preventDefault()
        axios.post(`${baseUrl}net_salary`, {
            Basic_pay: Number(pay),
            total_Allowance: Number(transport_allowance),

            nassit_percent: Number(nassit_percentage)


        }).then((response) => {
            console.log(response)
            setSalary(response.data.data)
            if (response.status === 200) {

                Swal.fire({
                    title: "Calculation successful!",
                    text: "You clicked the button!",
                    icon: "success"
                });
                setPay('')
                setTransport_allowance('')
                 

                setnassit_percentage('')
            }




        }).catch((error) => {
            console.log(error)
        })
        console.log({
            pay,
            transport_allowance,
            rent_allowance,
            hazard_and_other_allowance

        })
    }
    return (
        <div>
            <Header />
            <section className="gridBanner" style={{ backgroundImage: `url(${Banner})` }}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="container">
                            <div className="row">
                                <h2> Basic Labour Tools </h2>
                                <p className='mt-2'>Access essential labour tools for your business needs with ease.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="basicLabourSec pt-80 pb-80">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <div className="OnlineText">
                                <h2>{laberTool.Heading}</h2>
                                <p dangerouslySetInnerHTML={renderHTML(laberTool.Description)}></p>

                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="imgTool">
                                <img src={labourTool} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="row pt-80">
                        <div className="col-lg-12">
                            <h3 className='mb-5 text-center lrBorder'>Labour Tools</h3>
                            <Box sx={{ width: '100%', typography: 'body1' }}>
                                <TabContext value={value}>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                                            <Tab label="Compute  Overtime" value="1" />
                                            <Tab label="Compute  Leave Allowance" value="2" />
                                            <Tab label="Compute End of Service Benefit" value="3" />
                                            <Tab label="Compute Net Salary" value="4" />
                                        </TabList>
                                    </Box>
                                    <TabPanel value="1">
                                        <div className="ovrTime">
                                            <form action="">
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="forInput">
                                                            <h6>Basic Salary </h6>
                                                            <input type="text"
                                                                onChange={(e) => {
                                                                    const value = e.target.value;
                                                                    if (/^\d*$/.test(value)) {
                                                                        setBasic_pay(value);
                                                                    }
                                                                }}

                                                                name="name"
                                                                value={Basic_pay} />

                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="forInput">
                                                            <h6>OT Computation On Weekday
                                                            </h6>
                                                            <input type="text"
                                                                onChange={(e) => {
                                                                    const value = e.target.value;
                                                                    if (/^\d*$/.test(value)) {
                                                                        setOT_Hours_weekday(value);
                                                                    }
                                                                }}

                                                                name="OT_Hours_weekday"
                                                                value={OT_Hours_weekday} />
                                                        </div>

                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="forInput">
                                                            <h6> OT Hours Weekend </h6>
                                                            <input type="text"
                                                                onChange={(e) => {
                                                                    const value = e.target.value;
                                                                    if (/^\d*$/.test(value)) {
                                                                        setOT_Hours_weekend(value);
                                                                    }
                                                                }}

                                                                name="OT_Hours_weekend"
                                                                value={OT_Hours_weekend} />
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="subBtnLabour">
                                                    <button onClick={handleOverTimeData}>Submit</button>
                                                </div>
                                            </form>
                                            {tableData.length === 0 ? "" : (<>
                                                <div className="ms-invoice-table table-responsive mt-5">
                                                    <h6>Overtime Computation</h6>
                                                    <table className="table table-hover text-right thead-light">
                                                        <thead>
                                                            <tr className="text-capitalize" >
                                                                <th className="common_style">Current Basic Salary</th>
                                                                <th className="common_style">Basic Salary Per Day
                                                                </th>
                                                                <th className="text-left common_style">Basic Salary Per Hour</th>

                                                                <th className="common_style">OT Hours Weekday</th>

                                                                <th className="common_style">OT Computation On Weekday</th>
                                                                <th className="common_style">OT Hours Weekend</th>
                                                                <th className="common_style">OT Computation On Weekend</th>
                                                                <th className="common_style">Total OverTime</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>

                                                            <tr>

                                                                <td className="common_style">{tableData.Basic_pay}</td>

                                                                <td className="common_style">{tableData.Basic_pay_per_day}</td>
                                                                <td className="common_style">{tableData.Basic_pay_per_Hour}</td>
                                                                <td className="common_style">{tableData.OT_Hours_weekday}</td>
                                                                <td className="common_style">{tableData.OT_computation_on_weekday}</td>
                                                                <td className="common_style">{tableData.OT_Hours_weekend}</td>

                                                                <td className="common_style">{tableData.OT_computation_on_weekend}</td>
                                                                <td className="common_style">{tableData.total_overTime}</td>



                                                            </tr>


                                                        </tbody>
                                                    </table>
                                                </div>
                                            </>)}
                                        </div>
                                    </TabPanel>
                                    <TabPanel value="2">
                                        <div className="ovrTime">
                                            <form action="">
                                                <div className="forInput">
                                                    <h6>Basic Salary </h6>
                                                    <input type="text"
                                                        onChange={(e) => {
                                                            const value = e.target.value;
                                                            if (/^\d*$/.test(value)) {
                                                                setBasicPay(value);
                                                            }
                                                        }}

                                                        name="basicPay"
                                                        value={basicPay} />
                                                </div>
                                                <div className="forInput">
                                                    <h6>Leave Allowance Percentage</h6>
                                                    <input type="text"
                                                        onChange={(e) => {
                                                            const value = e.target.value;
                                                            if (/^\d*$/.test(value)) {
                                                                setLeave_allowence_percentage(value);
                                                            }
                                                        }}
                                                        name="leave_allowence_percentage"
                                                        value={leave_allowence_percentage} />
                                                </div>
                                                <div className="subBtnLabour">
                                                    <button onClick={handleAllowanceData}>Submit</button>
                                                </div>
                                            </form>
                                            {leave_all === null ? "" : (<>
                                                <div className="ms-invoice-table table-responsive mt-5">
                                                    <h6>Total Leave Allowance</h6>
                                                    <table className="table table-hover text-right thead-light">
                                                        <thead>
                                                            <tr className="text-capitalize" >
                                                                <th className="text-center  common_style">Basic Salary</th>

                                                                <th className="common_style">Annual Basic Salary
                                                                </th>
                                                                <th className="common_style">Leave Allowance % As per Industry CBA</th>
                                                                <th className="common_style">Income Tax on</th>
                                                                <th className="common_style">Leave Allowance</th>

                                                                <th className="common_style">Net Leave Allowance show all of these headings as boxes </th>

                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td className="common_style">{leave_all.Basic_pay}</td>
                                                                <td className="common_style">{leave_all.annual_Basic}</td>
                                                                <td className="common_style">{leave_all.leave_allowence_percentage}</td>
                                                                <td className="common_style">{leave_all.income_tax}</td>
                                                                <td className="common_style">{leave_all.leave_allowence}</td>

                                                                <td className="common_style">{leave_all.net_leave_allow}</td>

                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </>)}
                                        </div>
                                    </TabPanel>


                                    <TabPanel value="3">
                                        <div className="ovrTime">
                                            <form action="">
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="forInput">
                                                            <h6>Contract Start Date </h6>
                                                            <input type="date" onChange={(e) => setContract_start_Date(e.target.value)}
                                                                name="contract_start_Date"
                                                                value={contract_start_Date} />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="forInput">
                                                            <h6>Employment End Date</h6>
                                                            <input type="date" onChange={(e) => setEmployment_end_Date(e.target.value)}
                                                                name="employment_end_Date"
                                                                value={employment_end_Date} />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="forInput">
                                                            <h6>End of Service Benefit Days Per Year</h6>
                                                            <input type="text"
                                                                onChange={(e) => {
                                                                    const value = e.target.value;
                                                                    if (/^\d*$/.test(value)) {
                                                                        setEOSB_days_per_year(value);
                                                                    }
                                                                }}

                                                                name="EOSB_days_per_year"
                                                                value={EOSB_days_per_year} />
                                                        </div>
                                                    </div>
                                                    {/* <div className="col-lg-6">
                                                        <div className="forInput">
                                                            <h6> Untilized Leave Days</h6>
                                                            <input type="text"
                                                                onChange={(e) => {
                                                                    const value = e.target.value;
                                                                    if (/^\d*$/.test(value)) {
                                                                        setUntilized_leave_days(value);
                                                                    }
                                                                }}

                                                                name="untilized_leave_days"
                                                                value={untilized_leave_days} />
                                                        </div>
                                                    </div> */}
                                                    <div className="col-lg-6"><div className="forInput">
                                                        <h6> Basic Salary</h6>
                                                        <input type="text"
                                                            onChange={(e) => {
                                                                const value = e.target.value;
                                                                if (/^\d*$/.test(value)) {
                                                                    setBasic(value);
                                                                }
                                                            }}

                                                            name="basic"
                                                            value={basic} />
                                                    </div>
                                                    </div>
                                                </div>
                                                <div className="subBtnLabour">
                                                    <button onClick={handleEOSBData}>Submit</button>
                                                </div>
                                            </form>
                                            {EOSB === null ? "" : (<>
                                                <div className="ms-invoice-table table-responsive mt-5">
                                                    <h6>End of Service Benefit Computation
                                                    </h6>
                                                    <table className="table table-hover text-right thead-light">
                                                        <thead>
                                                            <tr className="text-capitalize" style={{ "white-space": "nowrap" }}>
                                                                <th className="common_style">Contract Start Date</th>
                                                                <th className="common_style">Employment End Date
                                                                </th>
                                                                <th className="common_style">Year Served</th>
                                                                <th className="common_style">EOSB Days Per Year</th>
                                                                <th className="text-center  common_style">Basic Salary</th>
                                                                <th className="common_style">Gross EOSB</th>
                                                                <th className="common_style">Tax On EOSB</th>
                                                                <th className="common_style">Net EOSB</th>

                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td className="common_style">{EOSB.contract_start_Date}</td>
                                                                <td className="common_style">{EOSB.Employment_end_Date}</td>
                                                                <td className="common_style">{EOSB.year_served}</td>
                                                                <td className="common_style">{EOSB.EOSB_days_per_year}</td>
                                                                <td className="common_style">{EOSB.Basic_salary}</td>
                                                                <td className="common_style">{EOSB.Gross_EOSB}</td>
                                                                <td className="common_style">{EOSB.tax_on_EOSB}</td>
                                                                <td className="common_style">{EOSB.net_EOSB}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </>)}
                                        </div>
                                    </TabPanel>
                                    <TabPanel value="4">
                                        <div className="ovrTime">
                                            <form action="">
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="forInput">
                                                            <h6> Basic Salary</h6>
                                                            <input type="text"
                                                                onChange={(e) => {
                                                                    const value = e.target.value;
                                                                    if (/^\d*$/.test(value)) {
                                                                        setPay(value);
                                                                    }
                                                                }}
                                                                name="pay"
                                                                value={pay} />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="forInput">
                                                            <h6>Total Allowance </h6>
                                                            <input type="text"

                                                                onChange={(e) => {
                                                                    const value = e.target.value;
                                                                    if (/^\d*$/.test(value)) {
                                                                        setTransport_allowance(value);
                                                                    }
                                                                }}
                                                                name="transport_allowance"
                                                                value={transport_allowance} />
                                                        </div>
                                                    </div>
                                                   
                                                </div>
                                            </form>
                                            {salary.length === 0 ? "" : (<>
                                                <div className="ms-invoice-table table-responsive mt-5">
                                                    <h6>Total Net Salary</h6>
                                                    <table className="table table-hover text-right thead-light">
                                                        <thead>
                                                            <tr className="text-capitalize" style={{ "white-space": "nowrap" }}>
                                                                <th className="text-center  common_style">Basic Salary</th>
                                                                <th className="common_style">Total Allowance</th>
                                                                <th className="common_style">Gross Salary</th>
                                                                <th className="common_style"> 5% Nassit</th>
                                                                <th className="common_style">Non Taxable Pay</th>
                                                                <th className="common_style">Taxable Pay</th>
                                                                <th className="common_style">Paye
                                                                </th>
                                                                <th className="common_style">Total Deduction </th>
                                                                <th className="common_style">Net Salary</th>

                                                            </tr>
                                                        </thead>
                                                        <tbody>

                                                            <tr>

                                                                <td className="common_style">{salary.Basic_pay}</td>
                                                                <td className="common_style">{salary.total_Allowance}</td>
                                                                <td className="common_style">{salary.gross_salary}</td>
                                                                <td className="common_style">{salary.nassit}</td>
                                                                <td className="common_style">{salary.non_taxable_pay}</td>
                                                                <td className="common_style">{salary.taxable_pay}</td>
                                                                <td className="common_style">{salary.PAYE}</td>
                                                                <td className="common_style">{salary.total_deduction}</td>
                                                                <td className="common_style">{salary.net_Salary}</td>




                                                            </tr>


                                                        </tbody>
                                                    </table>
                                                </div>
                                            </>)}
                                            <div className="subBtnLabour">
                                                <button onClick={handleSalaryData}>Submit</button>
                                            </div>
                                        </div>
                                    </TabPanel>

                                </TabContext>
                            </Box>
                        </div>
                    </div>
                </div>
            </section >
            <Footer />
        </div >
    )
}

export default BasicLabourTool
