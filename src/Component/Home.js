import React from 'react';
import Header from './Header';
 import HomeBanner from './HomeBanner'
 import Popular from './Popular'
 import RecentJobs from './RecentJobs';
 import NumberData from './NumberData';
 import CandidatesSay from './CandidatesSay';
 import GetStarted from './GetStarted';
 import Newsletters from './Newsletters';
 import NewsBlog from './NewsBlog';
 import Footer from './Footer';
 

export default function Home() {
    return (
        <>
        <Header/>
        <HomeBanner/>
        <Popular/>
        <RecentJobs/>
        <NumberData/>
        <CandidatesSay/>
        <GetStarted/>
        <Newsletters/>
        <Footer/>
        
            {/* <Footer/> */}
        </>
    );
}
