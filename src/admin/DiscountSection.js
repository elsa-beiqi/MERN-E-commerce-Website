import React, { useState } from 'react';
import './invoice/Invoice.css';
import { Button } from './../components/button/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';

function HeroSection({
    _id,
    onlineImageLink,
    productName,
    productPrice,
    productDiscount,
    productDCPrice
}) {
    const [sale, setsale] = useState(0);
    const [pri, setpri] = useState(0)
    const setdiscount = async () => {
        await axios.post(`sm/discount/${_id}`, { discount: sale }, { withCredentials: true })
            .then((response) => {
                alert(response.data);
            })
            .catch((error) => {
                alert(error.response.data);
            })
    }
    const setprice = async () => {
        await axios.put(`sm/setprice/${_id}`, { newprice: pri }, { withCredentials: true })
            .then((response) => {
                alert(response.data);
            })
            .catch((error) => {
                alert(error.response.data);
            })
    }
    return (
        <>
            <div
                className={'re-section weneedmargin'}
            >
                <div className='containerRE' >
                    <div
                        className='row invoice-row'
                        style={{
                            display: 'flex',
                            flexDirection: 'row'
                        }}
                    >
                        <div className='colDIS'>
                            <div className='invoice-text-wrapper'>
                                <div className='refund-img-wrapper'>
                                    <img src={onlineImageLink} alt="img" className='comment-img' />
                                </div>
                            </div>
                        </div>
                        <div className='colDIS'>
                            <div className='invoice-text-wrapper'>

                                <p className={'invoice-subtitle-date dark'} >
                                    {productName}
                                </p>
                                <p className={'invoice-subtitle-date dark'} >
                                    Original Price: ${productPrice}
                                </p>
                                <p className={'invoice-subtitle-date dark'} >
                                    Discount: {productDiscount}%
                        </p>
                                <p className={'invoice-subtitle-date dark'} >
                                    Price at purchase: ${productDCPrice}
                                </p>
                            </div>
                        </div>
                        <div className='colDIS'>
                            <div className='invoice-text-wrapper'>


                                <div className='form-group shmolspace'>
                                    <input
                                        value={sale}
                                        min={0}
                                        max={100}
                                        className='addstocknums'
                                        type="number"
                                        placeholder="0.0%"
                                        required
                                        onChange={(e) => setsale(e.target.value)}
                                    ></input>
                                </div>
                                <div className='form-group shmolspaces'>
                                    <input
                                        value={pri}
                                        min={0}
                                        className='addstocknums'
                                        type="number"
                                        placeholder="$0.0"
                                        required
                                        onChange={(e) => setpri(e.target.value)}
                                    ></input>
                                </div>
                            </div>
                        </div>
                        <div className='colDIS'>
                            <div className='invoice-text-wrapper'>
                                <div className='shmolspace'>
                                    <Button buttonSize='btn--medium' buttonColor='blue' onClick={setdiscount}>
                                        Set Discount
                                    </Button>
                                </div>
                                <Button buttonSize='btn--medium' buttonColor='blue' className='shmolspace' onClick={setprice}>
                                    Set Price
                                    </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HeroSection;