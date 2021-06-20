import React, { useEffect, useState } from 'react';
import HeroSection from './HeroSection';
import BestSeller from './BestSellers';
import { homeObjThree } from './Data';
import './HeroSection.css'
import './BestSeller.css'
import axios from 'axios';

export default function Home() {
    const [bs_products, setbs_products] = useState([])
    const [sales, setsales] = useState([])
    useEffect(() => {
        const fecthData = async () => {
            const { data } = await axios.get(`/product/top7`, { withCredentials: true })
            setbs_products(data);
        };
        const fecthData1 = async () => {
            const { data } = await axios.get(`/product/discounts`, { withCredentials: true })
            setsales(data.slice(0, 7));
        };
        fecthData();
        fecthData1();
    }, [])

    return (
        <>
            {/* <HeroSection {...homeObjOne} /> */}
            <HeroSection {...homeObjThree} />
            {/* <HeroSection {...homeObjTwo} /> */}
            <div className="bestsellers"> Best Sellers</div>
            <div
                className='home__bs-section'
            >
                <div className='bs-container'>
                    <div
                        className='row-bs home__bs-row'
                        style={{
                            display: 'flex',
                            flexDirection: 'row-bs'
                        }}
                    >
                        {bs_products.map((product) => (
                            <div key={product._id}>
                                <BestSeller id={product._id} img={product.onlineImageLink} name={product.productName} alt={product.productName} price={product.productPrice} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="bestsellers"> Sales</div>
            <div
                className='home__bs-section'
            >
                <div className='bs-container'>
                    <div
                        className='row-bs home__bs-row'
                        style={{
                            display: 'flex',
                            flexDirection: 'row-bs'
                        }}
                    >
                        {sales.map((product) => (
                            <div key={product._id}>
                                <BestSeller id={product._id} img={product.onlineImageLink} name={product.productName} alt={product.productName} price={product.productPrice} discount={product.productDiscount}
                                    productD={product.productDCPrice} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>


        </>
    );
}

