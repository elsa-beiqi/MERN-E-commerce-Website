import React, { useState, useRef } from 'react';
import * as RBS from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../actions/userActions';

export default function Header() {
    const [searchTerm, setSearchTerm] = useState("");
    const searchRef = useRef();
    const history = useHistory();
    const x = <i className="fas fa-user"></i>;

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo, userType } = userSignin;
    const dispatch = useDispatch();
    const signoutHandler = () => {
        dispatch(signout());
    };

    const cart = useSelector((state) => state.cart);
    const { qty } = cart;

    function handleSearch(e) {
        const name = searchRef.current.value;
        if (name === '') return;
        searchRef.current.value = null;
        // console.log("ho");
        // history.push(`/PL/search/${searchTerm}`);
        // window.location.reload();

        // window.open(`/PL/search/${searchTerm}`);
    }



    return (

        <RBS.Navbar collapseOnSelect bg="primary" expand="lg" variant="dark" sticky="top" className="justify-content-between">
            <RBS.Navbar.Brand href="/home">Canvas</RBS.Navbar.Brand>
            <RBS.Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <RBS.Navbar.Collapse id="responsive-navbar-nav">
                <RBS.Nav className="mr-auto">
                    <RBS.Nav.Link href="/home">Home</RBS.Nav.Link>
                    <RBS.NavDropdown title="Products" id="basic-nav-dropdown">
                        <RBS.NavDropdown.Item href="/PL">All</RBS.NavDropdown.Item>
                        <RBS.NavDropdown.Divider />
                        <RBS.NavDropdown.Item href="/PL/category/Brush">Brushes</RBS.NavDropdown.Item>
                        <RBS.NavDropdown.Item href="/PL/category/Canvas">Canvas</RBS.NavDropdown.Item>
                        <RBS.NavDropdown.Item href="/PL/category/Paint">Painting</RBS.NavDropdown.Item>
                        <RBS.NavDropdown.Item href="/PL/category/Painting">Paintings</RBS.NavDropdown.Item>
                        <RBS.NavDropdown.Item href="/PL/category/Acessory">Acessories</RBS.NavDropdown.Item>
                        <RBS.NavDropdown.Item href="/Invoice">Spray</RBS.NavDropdown.Item>
                    </RBS.NavDropdown>
                    {(userType !== "1") ? (
                        <>
                            <RBS.NavDropdown title="Product Manager" id="basic-nav-dropdown">
                                <RBS.NavDropdown.Item href="/Stock">stock management</RBS.NavDropdown.Item>
                                <RBS.NavDropdown.Item href="/PL/category/Canvas">invoices</RBS.NavDropdown.Item>
                                <RBS.NavDropdown.Item href="/PL/category/Acessory">comment approval </RBS.NavDropdown.Item>
                            </RBS.NavDropdown>
                            <RBS.NavDropdown title="Sales Manager" id="basic-nav-dropdown">
                                <RBS.NavDropdown.Item href="/InvoicesGivenRange">Invoices Given Range</RBS.NavDropdown.Item>
                                <RBS.NavDropdown.Item href="/SearchByUser">Search By User</RBS.NavDropdown.Item>
                                <RBS.NavDropdown.Item href="/Coupons">Coupons</RBS.NavDropdown.Item>
                            </RBS.NavDropdown>
                        </>
                    ) : <></>}
                </RBS.Nav>
                <RBS.Form >
                    <RBS.FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={(event) => { setSearchTerm(event.target.value) }} ref={searchRef}
                        onKeyPress={event => {
                            if (event.key === "Enter") {
                                handleSearch()
                            }
                        }} />
                </RBS.Form>

                <RBS.Button className="search" variant="outline-light" size="sm" onClick={handleSearch}
                // href={`/PL/search/${searchTerm}`}
                ><i className="fas fa-search search"></i></RBS.Button>

                <RBS.Nav >
                    <RBS.Nav.Link href="/Cart" className="nav-cart">
                        <span>{qty}</span>
                        <i className="fas fa-shopping-cart"></i>
                    </RBS.Nav.Link>

                    {
                        (userInfo) ? (
                            <RBS.NavDropdown title={x} id="basic-nav-dropdown" alignRight>
                                <RBS.NavDropdown.Item href="/OrderDetail">Order History</RBS.NavDropdown.Item>
                                <RBS.NavDropdown.Item href="#signout" onClick={signoutHandler}>Sign Out</RBS.NavDropdown.Item>

                            </RBS.NavDropdown>
                        ) : (
                                <RBS.Nav.Link href="/FormLogin" className="nav-cart">
                                    <i className="fas fa-sign-in-alt signin" ></i>
                                </RBS.Nav.Link>
                            )
                    }

                </RBS.Nav>
            </RBS.Navbar.Collapse >
        </RBS.Navbar >



    )
}
