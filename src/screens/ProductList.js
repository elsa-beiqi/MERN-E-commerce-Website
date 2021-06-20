import React, { useState, useEffect } from 'react'
import axios from 'axios';
import * as RBS from 'react-bootstrap';
import { useParams, } from 'react-router-dom';
import Product from '../components/Products'
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import '../CSS/productlist.css';

export default function ProductList() {
    const { id } = useParams();
    const { type } = useParams();
    const { cat } = useParams();

    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);

    const { loading, products } = productList;



    useEffect(() => {
        console.log(type);
        console.log(cat);
        dispatch(listProducts(id, type, cat));
    }, [dispatch]);


    return (
        <div>
            <RBS.Breadcrumb className="bc breadcrumbz" sticky="top">
                <RBS.Breadcrumb.Item href="#">Home</RBS.Breadcrumb.Item>
                {(typeof (type) === "undefined") ? <RBS.Breadcrumb.Item active>Products</RBS.Breadcrumb.Item> :
                    (id === "search") ? <><RBS.Breadcrumb.Item href="/PL">Products</RBS.Breadcrumb.Item><RBS.Breadcrumb.Item active>Search</RBS.Breadcrumb.Item><RBS.Breadcrumb.Item active>{type}</RBS.Breadcrumb.Item></> :
                        <><RBS.Breadcrumb.Item href="/PL">Products</RBS.Breadcrumb.Item>
                            {(typeof (cat) === 'undefined') ? <RBS.Breadcrumb.Item active> {type} </RBS.Breadcrumb.Item> :
                                <> <RBS.Breadcrumb.Item href={`/PL/Category/${cat}`}> {cat} </RBS.Breadcrumb.Item> <RBS.Breadcrumb.Item active> {type} </RBS.Breadcrumb.Item> </>}</>}
            </RBS.Breadcrumb>

            <div className="right">
                <RBS.NavDropdown title="Filter" id="nav-dropdown">
                    <RBS.NavDropdown.Item href="/PL/Category/Acessory">Acessory</RBS.NavDropdown.Item>
                    <RBS.NavDropdown.Item href="/PL/Category/Brush">Brushes</RBS.NavDropdown.Item>
                    <RBS.NavDropdown.Item href="/PL/Category/Canvas">Canvas</RBS.NavDropdown.Item>
                    <RBS.NavDropdown.Item href="/PL/Category/Paint">Paint</RBS.NavDropdown.Item>
                    <RBS.NavDropdown.Item href="/PL/Category/Painting">Paintings</RBS.NavDropdown.Item>
                    <RBS.NavDropdown.Item href="/PL/Category/Spray">Spray</RBS.NavDropdown.Item>
                </RBS.NavDropdown>

                <RBS.NavDropdown title="Sort" id="nav-dropdown">
                    <RBS.NavDropdown.Item href={`/PL/filter/ratings/${type}`}>Ratings</RBS.NavDropdown.Item>
                    <RBS.NavDropdown.Item href={`/PL/filter/popular/${type}`}>Popularity</RBS.NavDropdown.Item>
                    <RBS.NavDropdown.Item href={`/PL/filter/ascending/${type}`}>Lowest Price</RBS.NavDropdown.Item>
                    <RBS.NavDropdown.Item href={`/PL/filter/descending/${type}`}>Heighest Price</RBS.NavDropdown.Item>
                </RBS.NavDropdown>

            </div>
            <div
                className='home__bs-section'
            >
                <div className='bs-container'>
                    <div
                        className='row-bs home__bs-row'
                    >
                        {loading ? (
                            <></>
                        ) : (
                                <>
                                    {products.map((product) => (
                                        <div key={product._id}>
                                            <Product id={product._id} />
                                        </div>
                                    ))}
                                </>
                            )}
                    </div>
                </div>
            </div>
        </div >
    )
}
