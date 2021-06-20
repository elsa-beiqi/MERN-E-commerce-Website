import React from 'react';
import './Footer.css';
import { Button } from '../button/Button';
import { Link } from 'react-router-dom';
import { SiGmail } from 'react-icons/si';
import { FaPaintRoller } from 'react-icons/fa';

function Footer() {
    return (
        <div className='footer-container'>

            <div className='footer-links'>
                <div className='footer-link-wrapper'>
                    <div className='footer-link-items'>
                        <h2>Canvas</h2>
                        <Link to='/sign-up'>Shop</Link>
                        <Link to='/'>Collections</Link>
                        <Link to='/'>Orders</Link>
                        {/* <Link to='/'>Investors</Link>
                        <Link to='/'>Terms of Service</Link> */}
                    </div>
                    <div className='footer-link-items'>
                        <h2>Connect</h2>
                        <Link to='/'> canvas@gmail.com</Link>
                    </div>
                    <div className='footer-link-items'>
                        <h2>Contact</h2>
                        <Link to='/'> Orta Mahalle, Üniversite Caddesi No:27 Tuzla, 34956 İstanbul</Link>
                        <Link to='/'>+90 500 000 00 00</Link>
                        <Link to='/'>info@canvas.com</Link>
                    </div>
                </div>

            </div>
            <section className='social-media'>
                <div className='social-media-wrap'>
                    <div className='footer-logo'>
                        <Link to='/' className='social-logo'>
                            <FaPaintRoller className='navbar-icon' />
              CANVAS
            </Link>
                    </div>
                    <small className='website-rights'>CANVAS © 2021</small>
                    <div className='social-icons'>
                        <Link
                            className='social-icon-link'
                            to='/'
                            target='_blank'
                            aria-label='Facebook'
                        >
                            {/* <SiGmail /> */}
                        </Link>
                    </div>
                </div>
            </section>
        </div >
    );
}

export default Footer;