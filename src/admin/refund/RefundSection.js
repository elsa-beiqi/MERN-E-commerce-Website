import React, { useState } from 'react';
import '../invoice/Invoice.css';
import { Button } from '../../components/button/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';

function HeroSection({
    approved,
    invoiceID,
    PriceatPurchase,
    email,
    onlineImageLink,
    productDiscount,
    productPrice,
    quantity,
    productName,
    productSize
}) {
    const [set, setset] = useState(false);
    const approveRefund = async () => {
        console.log("hi")
        await axios.put(`pm/approverefund/${invoiceID}`, { withCredentials: true })
            .then((response) => {
                console.log(response);
                console.log(response.statusText);
                (response.statusText === 'OK') ? setset(true) : <></>
            }).catch((error) => {
                alert(error.response.data);
            });
    }
    const denyRefund = async () => {
        await axios.put(`pm/denyrefund/${invoiceID}`, { withCredentials: true })
            .catch((error) => {
                alert(error.response.data);
            })
    }
    return (
        <>
            <div
                className={'re-section weneedmargin'}
            >
                <div className='containerRE'>
                    <div
                        className='row invoice-row'
                        style={{
                            display: 'flex',
                            flexDirection: 'row'
                        }}
                    >
                        <div className='colRE'>
                            <div className='invoice-text-wrapper'>
                                <Link to={`/InvoiceView/${invoiceID}`}>
                                    <h1 className={'id'}>
                                        Invoice ID: {invoiceID}
                                    </h1>
                                </Link>
                                <div className='refund-img-wrapper'>
                                    <img src={onlineImageLink} alt="img" className='comment-img' />
                                </div>
                                {/* <p className={'invoice-subtitle-info dark'} >
                                    Quantity: {quantity}
                                </p> */}
                                {/* <Link to='/sign-up'>
                                    <Button buttonSize='btn--wide' buttonColor='blue'>
                                        {buttonLabel}
                                    </Button>
                                </Link> */}
                            </div>
                        </div>
                        <div className='colRE'>
                            <div className='invoice-text-wrapper'>

                                <p className={'invoice-subtitle-date dark'} >
                                    {productName} x {quantity}
                                </p>
                                <p className={'invoice-subtitle-date dark'} >
                                    Size: {productSize}
                                </p>
                                <p className={'invoice-subtitle-date dark'} >
                                    Original Price: ${productPrice}
                                </p>
                                <p className={'invoice-subtitle-date dark'} >
                                    Discount: {productDiscount}%
                                </p>
                                <p className={'invoice-subtitle-date dark'} >
                                    Price at purchase: ${PriceatPurchase}
                                </p>
                            </div>
                        </div>
                        <div className='colRE'>
                            <div className='invoice-text-wrapper'>
                                <div>
                                    <p className={'invoice-subtitle-date dark'}>
                                        customer email:  {email}
                                    </p>
                                    {(!set) ?
                                        <>
                                            <Button buttonSize='btn--medium' buttonColor='blue' className='shmolspace' onClick={approveRefund}>
                                                approve
                                    </Button>
                                            <Button buttonSize='btn--medium' buttonColor='blue' onClick={denyRefund}>
                                                deny
                                    </Button></>
                                        : <Button buttonSize='btn--wide' buttonColor='blue' >
                                            changes saved
                                    </Button>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HeroSection;