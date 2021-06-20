import React, { useState, useEffect } from 'react';
import { Button } from '../button/Button';
import { Link, useHistory } from 'react-router-dom';
import './NavBar.css';
import { AiOutlineLogin, AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import { RiLoginCircleFill } from 'react-icons/ri';
import { FaUserCircle, FaPaintRoller, FaBars, FaTimes } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../../actions/userActions';
import * as RBS from 'react-bootstrap';
import SideBar from '../../admin/SideBar'

function Navbar() {
    const [click, setClick] = useState(false);
    const history = useHistory();

    const [search, setsearch] = useState(false);
    const [query, setquery] = useState('')
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const dispatch = useDispatch();
    const signoutHandler = () => {
        dispatch(signout());
        history.push(`/`);
        window.location.reload();
    };

    const cart = useSelector((state) => state.cart);
    const { qty } = cart;

    const x = <FaUserCircle style={{ color: '#5eaaa8' }} />

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    return (
        <IconContext.Provider value={{ color: '#fff' }}>
            <nav className='navbar'>
                <div className='navbar-container container'>
                    <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                        <FaPaintRoller className='navbar-icon' style={{ color: '#5eaaa8' }} />
                         Canvas
                   </Link>
                    <div className='menu-icon' onClick={handleClick}>
                        {click ? <FaTimes style={{ color: '#5eaaa8' }} /> : <FaBars style={{ color: '#5eaaa8' }} />}
                    </div>

                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                                Home
                                    </Link>
                        </li>
                        <li className='nav-item'>
                            <Link
                                to='/PL'
                                className='nav-links'
                                onClick={closeMobileMenu}
                            >
                                Products
                                     </Link>
                        </li>
                        {(!search) ? <>
                        </> :
                            <li className='nav-item'>
                                <form className="nav-links"
                                >
                                    <div >
                                        <input
                                            type='text'
                                            name='fullName'
                                            value={query}
                                            className='form-control'
                                            placeholder='Search'
                                            onChange={(e) => setquery(e.target.value)}
                                            onKeyPress={event => {
                                                if (event.key === 'Enter') {
                                                    console.log(query)
                                                    history.push(`/PL/search/${query}`);
                                                    window.location.reload();
                                                }
                                            }} />
                                    </div>
                                </form>
                            </li>
                        }
                        {(!search) ? <li className='nav-btn'>
                            <Button buttonStyle='btn--invisible' onClick={() => setsearch(true)}><FaSearch style={{ color: '#5eaaa8' }} /></Button>
                        </li> :
                            <li className='nav-btn'>
                                <Button buttonStyle='btn--invisible' onClick={() => setsearch(false)}><FaTimes style={{ color: '#5eaaa8' }} /></Button>
                            </li>
                        }
                        <li className='nav-btn'>
                            <Link to='/cart' className='btn-link'>
                                <Button buttonStyle='btn--invisible'><FaShoppingCart style={{ color: '#5eaaa8' }} /></Button>
                                {(qty > 0) ? <span className="qty">{qty}</span> : <></>}
                            </Link>
                        </li>
                        <li className='nav-btn'>
                            {(userInfo) ? (
                                <RBS.NavDropdown className='btn-link' title={x} id="basic-nav-dropdown" alignRight>
                                    <RBS.NavDropdown.Item href="/OrderDetail">Order History</RBS.NavDropdown.Item>
                                    <RBS.NavDropdown.Item href="#signout" onClick={signoutHandler}>Sign Out</RBS.NavDropdown.Item>
                                </RBS.NavDropdown>
                            ) : (
                                    <Link to='/FormLogin' className='btn-link'>
                                        <Button buttonStyle='btn--invisible'><RiLoginCircleFill style={{ color: '#5eaaa8' }} /> </Button>
                                    </Link>
                                )}
                        </li>
                    </ul>
                </div>
            </nav>
        </IconContext.Provider>
    );
}

export default Navbar;
