import React from 'react'
import ser1 from '../Image/serv1.webp'
import ser2 from '../Image/serv2.webp'
import ser3 from '../Image/serv3.webp'
import ser4 from '../Image/serv4.jpg'
import ser5 from '../Image/serv5.jpg'
import { Link } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

export default function Services() {
    return (
        <>
            <Header />
            <section
                className="blogBanner4"

            >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 ">
                            <h1>Services</h1>
                            <p>
                                Unlock a Wide Array of Tailored and Expert Services Designed to Meet Your Every Need and Beyond.{" "}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <div className="ourServicesSec pbUnset">
                <div className="container">
                    <div className="row text-center">
                        <h3 className="ourSerNew ">Our Services</h3>
                    </div>
                    <div className="row">

                        <div className="col-lg-4 col-md-6 mb20">
                            <div className='serviceNew'>
                                <div className='serviceNewImg'>
                                    <img src={ser1} />
                                </div>
                                <div className='serviceContentNew'>
                                    <h4>Fixit Finder</h4>
                                    <p>
                                        Find reliable solutions from the informal skilled workers sector with Fixit Finder.
                                    </p>
                                    <Link to="/fixitfinder">Read more</Link>
                                </div>
                                <div className='plusICon'> <i className='fa fa-plus'></i> </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 mb20">
                            <div className='serviceNew'>
                                <div className='serviceNewImg'>
                                    <img src={ser2} />
                                </div>
                                <div className='serviceContentNew'>
                                    <h4>HR Consultancy</h4>
                                    <p>
                                        Enhance your HR with expert guidance from Smart Start SL Ltd.'s consultancy services.
                                    </p>
                                    <Link to="/hrconsultancy">Read more</Link>
                                </div>
                                <div className='plusICon'> <i className='fa fa-plus'></i> </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 mb20">
                            <div className='serviceNew'>
                                <div className='serviceNewImg'>
                                    <img src={ser1} />
                                </div>
                                <div className='serviceContentNew'>
                                    <h4>Learning  and Development</h4>
                                    <p>
                                        Boost employee growth with tailored learning and development programs from Smart Start SL Ltd.
                                    </p>
                                    <Link to="/traingdev">Read more</Link>
                                </div>
                                <div className='plusICon'> <i className='fa fa-plus'></i> </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 mb20">
                            <div className='serviceNew'>
                                <div className='serviceNewImg'>
                                    <img src={ser1} />
                                </div>
                                <div className='serviceContentNew'>
                                    <h4>Elite Female Talent Pool </h4>
                                    <p>
                                        Discover elite female talent candidates through our specialised recruitment services.
                                    </p>
                                    <Link to="/elitefemale">Read more</Link>
                                </div>
                                <div className='plusICon'> <i className='fa fa-plus'></i> </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 mb20">
                            <div className='serviceNew'>
                                <div className='serviceNewImg'>
                                    <img src={ser1} />
                                </div>
                                <div className='serviceContentNew'>
                                    <h4>Academic Credential Verifier</h4>
                                    <p>
                                        Your academic credentials and education details have been verified
                                    </p>
                                    <Link to="/acadmiccredintial">Read more</Link>
                                </div>
                                <div className='plusICon'> <i className='fa fa-plus'></i> </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 mb20">
                            <div className='serviceNew'>
                                <div className='serviceNewImg'>
                                    <img src={ser1} />
                                </div>
                                <div className='serviceContentNew'>
                                    <h4>HR Teleconsultation</h4>
                                    <p>
                                        Optimize your HR with Smart Start SL Ltd.'s expert teleconsultation services.
                                    </p>
                                    <Link to="/teleconsult">Read more</Link>
                                </div>
                                <div className='plusICon'> <i className='fa fa-plus'></i> </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
