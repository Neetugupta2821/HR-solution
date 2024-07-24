import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from './Component/Header';
import Home from './Component/Home'
import Footer from './Component/Footer';
import SignUp from './HRComponent/Signup/SignUp';
import SignUpNext from './HRComponent/Signup/SignUpNext';
import Signin from './HRComponent/Signup/Signin';
import Protected from './DashboardHR/Protected';
import Main from './DashboardHR/SideBar'
import Dashboard from './DashboardHR/Pages/Dashboard';
import GetAllJobs from './DashboardHR/Pages/GetAllJobs';
import AddNewJob from './DashboardHR/Pages/AddNewJob';
import NextAddJob from './DashboardHR/Pages/NextAddJob';
import JobDetailEmp from './DashboardHR/Pages/JobDetailEmp';
import Profile from './DashboardHR/Pages/Profile/Profile';
import ChangePassword from './DashboardHR/Pages/Profile/ChangePassword';
import JobDescription from './DashboardHR/Pages/privacy & Policy Section/JobDescription';
import TearmCandition from './DashboardHR/Pages/privacy & Policy Section/TearmCandition';
import JobDetailFemale from './DashboardHR/Pages/JobDetailFemale';
import Services from './Component/Services';
import ContentAs from './Component/ContentAs';
import Blog from './Component/Blog';
import ForgetPassword from './DashboardHR/Pages/Profile/ForgetPassword';
import Home_Campany from './HRComponent/Company/Home_Campany'
import TermCondition from './Component/smartstartServices/TermCondition';
import GetOtpPage from './DashboardHR/Pages/Profile/GetOtpPage';
import ResetPasswordPage from './DashboardHR/Pages/Profile/ResetPasswordPage';
import PrivacyPolicy from './Component/smartstartServices/PrivacyPolicy'
import MultistepForm from './Component/MultistepForm';
import PsychometricTest from './Component/PsychometricTest';
import FindJobPage from './Component/FindJobPage';
import JobDetailpageTem from './Component/JobDetailpageTem';
import AllJobs from './Component/AllJobs';
import AboutUs from './Component/AboutUs';
import AddJobDescription from './DashboardHR/Pages/privacy & Policy Section/AddJobDescription';
import JobTital from './DashboardHR/Pages/JobTital/JobTital';
import ShortJobTemp from './Component/ShortJobTemp';
import JobDetailpage from './Component/JobDetailpage';
import FixitFinder from './Component/FixitFinder';
import HrConsultancy from './Component/HrConsultancy';
import TraininhDev from './Component/TraininhDev';
import Teleconsult from './Component/Teleconsult';
import BasicLabourTool from './Component/BasicLabourTool';
import OnlineCourses from './Component/OnlineCourses';
import Vacancy from './Component/Vacancy';
import EliteFemale from './Component/EliteFemale';
import AcadmicCredintial from './Component/AcadmicCredintial';
import SuccessfulCandidates from './Component/SuccessfulCandidates';
import CareerAdvice from './Component/CareerAdvice';
import UploadResume from './Component/UploadResume';
import ClientPortfolio from './Component/ClientPortfolio'
import GetAll_candidates from './Component/GetAll_candidates';
import BlogDetails from './Component/BlogDetails';
import ReadOnline from './Component/ReadOnline';
import ReadOnlineTwo from './Component/ReadOnlineTwo';
import ScrollToTop from './Component/ScrollToTop';
import QuiceJob from './Component/QuiceJob';
import Client_Pagedata from './HRComponent/Company/Client_Pagedata';
 import SkillOfJobTitle from './DashboardHR/Pages/SkillOfJobTitle';
function App() {
  console.log("date:22/07/2024 time 05:06pm",'helloyyyyyyyyyyyyyyy')

  return (
    <div className="App"  >
      {/* <AnimaCarsor></AnimaCarsor> */}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/SignUpNext" element={<SignUpNext />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/ContentAs" element={<ContentAs />} />
        <Route path="/Blog" element={<Blog />} />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route path="/Home2" element={<Home_Campany />} />
        <Route path="/TermCondition" element={<TermCondition />} />
        <Route path="/findjobpage" element={<FindJobPage />} />

        <Route path="/GetOtpPage" element={<GetOtpPage />} />
        <Route path="/ResetPasswordPage" element={<ResetPasswordPage />} />
        <Route path="/JobDetailpageTem" element={<JobDetailpageTem />} />
        <Route path="/JobDetailpage" element={<JobDetailpage />} />
        <Route path="/multistepform" element={<MultistepForm />} />
        <Route path="/PsychometricTest" element={<PsychometricTest />} />

        <Route path="/showjobs" element={<AllJobs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/shortjobtemp" element={<ShortJobTemp />} />
        <Route path="fixitfinder" element={<FixitFinder />} />
        <Route path="hrconsultancy" element={<HrConsultancy />} />
        <Route path="teleconsult" element={<Teleconsult />} />
        <Route path="basiclabourtool" element={<BasicLabourTool />} />
        <Route path="traingdev" element={<TraininhDev />} />
        <Route path="onlinecourse" element={<OnlineCourses />} />
        <Route path="Vacancy" element={<Vacancy />} />
        <Route path="EliteFemale" element={<EliteFemale/>} />
        <Route path="AcadmicCredintial" element={<AcadmicCredintial/>} />
        <Route path="SuccessfulCandidates" element={<SuccessfulCandidates/>} />
        <Route path="CareerAdvice" element={<CareerAdvice/>} />
        <Route path="UploadResume" element={<UploadResume/>} />
        <Route path="ClientPortfolio" element={<ClientPortfolio/>} />
        <Route path="GetAll_candidates" element={<GetAll_candidates/>} />
        <Route path="BlogDetails" element={<BlogDetails/>} />
        <Route path="ReadOnline" element={<ReadOnline/>} />
        <Route path="ReadOnlineTwo" element={<ReadOnlineTwo/>} />
        <Route path="QuiceJob" element={<QuiceJob/>} />
        <Route path="Client_Pagedata" element={<Client_Pagedata/>}/>
        
       

        <Route path="/admin" element={<Protected Component={Main} />}>
          <Route index element={<Dashboard />} />
          <Route path="GetAllJobs" element={<GetAllJobs />} />
          <Route path="AddNewJob" element={<AddNewJob />} />
          <Route path="NextAddJob" element={<NextAddJob />} />
          <Route path="JobDetailEmp" element={<JobDetailEmp />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="ChangePassword" element={<ChangePassword />} />
          <Route path="jobDescription" element={<JobDescription />} />
          <Route path="AddJobDescription" element={<AddJobDescription />} />
          <Route path="SkillOfJobTitle" element={<SkillOfJobTitle/>} />
          <Route path="JobTital" element={<JobTital />} />

          {/* <Route path="TearmCandition" element={<PrivacyPolicy />} /> */}
          <Route path="JobDetailFemale" element={<JobDetailFemale />} />

        </Route>
      </Routes>






    </div>
  );
}

export default App;
