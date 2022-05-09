import React from 'react'
import { Nav, Image } from 'react-bootstrap'
import PoweredByAvalanche from '../../assets/imgs/PoweredByAvalanche.svg'
import { FaFacebookF } from 'react-icons/fa'
import { BsDiscord } from 'react-icons/bs'
import { FacebookShareButton } from 'react-share'
import './style.scss'

export default function Footer() {

    const SHARE_URL = window.location.href


    return (
        <div className='footer'>
            <div className="banner">
                <div className="main container">
                    <div className="row links">
                        <Nav className="col-lg-6 my-auto logos justify-content-center justify-content-lg-start">
                            <Nav.Link href='https://www.avax.network/' target='_blank'>
                                <Image className='powered-by' src={PoweredByAvalanche} alt='powered by avalanche' />
                            </Nav.Link>
                            <Nav.Link href='https://www.assuredefi.io/projects/projectx/' target='_blank'>
                                <Image className='assure' src='https://projectx.financial/img/kyc/Assure_TransBG_White_crop.png' alt='assure' />
                            </Nav.Link>
                        </Nav>
                        <div className="col-lg-6 my-auto list">
                            <Nav className=' nav_ justify-content-center justify-content-lg-end'>
                                <Nav.Link href='#'>About</Nav.Link>
                                <Nav.Link href='#'>FAQs</Nav.Link>
                                <Nav.Link href='#'>Terms & Conditions</Nav.Link>
                                <Nav.Link href='#'>Privacy</Nav.Link>
                            </Nav>
                        </div>
                    </div>
                    <div className='hr' />
                    <div className="row copyright">
                        <div className="col-lg-6 my-auto d-flex justify-content-center justify-content-lg-start">
                            <span>
                                Copyright &copy; {new Date().getFullYear()} ProjectX
                            </span>
                        </div>
                        <div className="col-lg-6 my-auto d-flex justify-content-center justify-content-lg-end">
                            <Nav.Link>
                                <FacebookShareButton
                                    url={SHARE_URL}
                                    quote='Welcome to Gift Cards X'
                                >
                                    <FaFacebookF size={11} />
                                </FacebookShareButton>
                            </Nav.Link>
                            <Nav.Link
                                href='https://discord.gg/projectxfinance'
                                target='_blank'
                            >
                                <BsDiscord size={12} />
                            </Nav.Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
