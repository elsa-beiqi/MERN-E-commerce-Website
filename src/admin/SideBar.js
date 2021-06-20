import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link, useHistory } from 'react-router-dom';
import { SidebarData } from './SideBarData';
import './SideBar.css';
import { IconContext } from 'react-icons';
import { RiLogoutCircleRFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../actions/userActions';
// import { IoLogOut, IconContext } from 'react-icons/io';



export default function Sidebar() {

    const [sidebar, setSidebar] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const signoutHandler = () => {
        dispatch(signout());
        history.push(`/`);
        window.location.reload();
    };
    const showSidebar = () => setSidebar(!sidebar);
    const userSignin = useSelector((state) => state.userSignin);
    const { userType } = userSignin;

    return (
        <IconContext.Provider value={{ color: '#fff' }}>
            <div className='sidebar'>
                <div className='navbar-container containerX'>
                    <ul className={'nav-menu'}>

                        {SidebarData.map((item, index) => {
                            return (
                                <>
                                    {(userType === item.type || userType === '4' || item.type === '5') ?
                                        <li key={index} className={' side-text'}>
                                            <Link to={item.path}>
                                                {item.icon}
                                                <span>{item.title}</span>
                                            </Link>
                                        </li> : <></>}</>
                            );
                        })}
                        <li className={' side-text'} onClick={signoutHandler}>
                            <RiLogoutCircleRFill />
                        </li>
                    </ul>


                </div>

            </div>
        </IconContext.Provider>
    );
}


{/* <Link to='#' className='menu-bars'>
                            <FaIcons.FaBars onClick={showSidebar} />
                        </Link>
                    </div>
                    <nav className={sidebar ? 'side-menu active w3-sidebar w3-bar-block w3-border-right' : 'side-menu'} id="mySidebar" >
                        <ul className='side-menu-items' onClick={showSidebar}>
                            <li className='sidebar-toggle'>
                                <Link to='#' className='menu-bars'>
                                    <AiIcons.AiOutlineClose />
                                </Link>
                            </li>
                            {SidebarData.map((item, index) => {
                                return (
                                    <li key={index} className={item.cName}>
                                        <Link to={item.path}>
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav> */}